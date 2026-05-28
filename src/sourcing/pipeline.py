import time
from datetime import datetime

from config.settings import (
    SOURCING_CATEGORIES,
    TOP_KEYWORDS_PER_CATEGORY,
    TOP_PRODUCTS_PER_KEYWORD,
    MIN_TREND_SCORE,
    MAX_PRODUCTS_TO_LIST,
    ANTHROPIC_API_KEY,
)
from src.collectors import aliexpress, amazon, ebay, temu_shein
from src.collectors import google_trends, naver_datalab
from src.analyzers.trend_scorer import rank_keywords
from src.analyzers.product_ranker import score_products
from src.sourcing.filters import apply_all_filters
from src.utils.database import init_db, upsert_product, get_unlisted_products, save_run_log
from src.utils.translator import translate_product, extract_trending_keywords
from src.utils.logger import logger


def _collect_products_for_keyword(keyword: str) -> list[dict]:
    """Fetch products from all configured platforms for a given keyword."""
    all_products = []

    # AliExpress
    ali = aliexpress.search_products(keyword, page_size=TOP_PRODUCTS_PER_KEYWORD * 2)
    all_products.extend(ali)

    # Amazon
    amz = amazon.search_products(keyword, page_size=TOP_PRODUCTS_PER_KEYWORD * 2)
    all_products.extend(amz)

    # eBay
    eb = ebay.search_products(keyword, page_size=TOP_PRODUCTS_PER_KEYWORD * 2)
    all_products.extend(eb)

    # Shein (scraping - optional, respect ToS)
    shein = temu_shein.search_shein(keyword, page_size=TOP_PRODUCTS_PER_KEYWORD)
    all_products.extend(shein)

    return all_products


def run_daily_pipeline() -> dict:
    """Main daily sourcing pipeline. Returns a summary dict."""
    start_time = time.time()
    run_date = datetime.utcnow().strftime("%Y-%m-%d")
    stats = {"run_date": run_date, "keywords_found": 0, "products_sourced": 0, "products_listed": 0, "errors": ""}

    logger.info(f"=== Daily sourcing pipeline started: {run_date} ===")
    init_db()

    all_top_products: list[dict] = []
    errors = []

    for category in SOURCING_CATEGORIES:
        logger.info(f"Processing category: {category}")

        # 1. Get seed keywords for this category from Google Trends related queries
        seed_keywords = google_trends.get_related_queries(category, top_n=15)
        if not seed_keywords:
            seed_keywords = [category]

        # 2. Use Claude to refine to sourcing-relevant keywords (if API key available)
        if ANTHROPIC_API_KEY:
            try:
                refined_keywords = extract_trending_keywords(category, seed_keywords)
            except Exception as e:
                logger.warning(f"Claude keyword refinement failed: {e}")
                refined_keywords = seed_keywords[:TOP_KEYWORDS_PER_CATEGORY]
        else:
            refined_keywords = seed_keywords[:TOP_KEYWORDS_PER_CATEGORY]

        logger.info(f"  Refined keywords: {refined_keywords}")

        # 3. Score keywords via Google + Naver
        google_scores = google_trends.get_keyword_scores(refined_keywords)
        naver_scores = naver_datalab.get_keyword_scores(refined_keywords)
        ranked = rank_keywords(refined_keywords, google_scores, naver_scores)

        # 4. Take top keywords above threshold
        top_keywords = [r for r in ranked if r["composite_score"] >= MIN_TREND_SCORE][:TOP_KEYWORDS_PER_CATEGORY]
        if not top_keywords:
            logger.info(f"  No keywords above threshold {MIN_TREND_SCORE} for '{category}', using top {TOP_KEYWORDS_PER_CATEGORY}")
            top_keywords = ranked[:TOP_KEYWORDS_PER_CATEGORY]

        stats["keywords_found"] += len(top_keywords)

        # 5. Collect products for each top keyword
        for kw_data in top_keywords:
            kw = kw_data["keyword"]
            trend_score = kw_data["composite_score"]
            logger.info(f"  Collecting products for: '{kw}' (trend={trend_score})")

            raw_products = _collect_products_for_keyword(kw)
            filtered = apply_all_filters(raw_products)
            scored = score_products(filtered, trend_score)

            for p in scored[:TOP_PRODUCTS_PER_KEYWORD]:
                p["category"] = category
                p["keywords"] = [kw]

                # 6. Translate title + description via Claude
                if ANTHROPIC_API_KEY:
                    try:
                        translation = translate_product(p.get("title_original", ""))
                        p["title_kr"] = translation.get("title_kr", p["title_original"])
                        p["description_kr"] = translation.get("description_kr", "")
                        p.setdefault("keywords", []).extend(translation.get("tags", []))
                    except Exception as e:
                        logger.warning(f"Translation failed for '{p.get('title_original')}': {e}")
                        p["title_kr"] = p.get("title_original", "")
                        p["description_kr"] = ""
                else:
                    p["title_kr"] = p.get("title_original", "")
                    p["description_kr"] = ""

                upsert_product(p)
                all_top_products.append(p)
                stats["products_sourced"] += 1

            time.sleep(1)  # polite pause between keywords

    # 7. Push top scored products to Naver Smart Store
    unlisted = get_unlisted_products(limit=MAX_PRODUCTS_TO_LIST)
    if unlisted:
        from src.stores.naver_smartstore import list_products_batch
        listed_count = list_products_batch(unlisted)
        stats["products_listed"] = listed_count
    else:
        logger.info("No unlisted products to push to Naver Smart Store")

    stats["duration_sec"] = round(time.time() - start_time, 1)
    stats["errors"] = "; ".join(errors) if errors else ""

    save_run_log(stats)
    logger.info(f"=== Pipeline finished: {stats} ===")
    return stats
