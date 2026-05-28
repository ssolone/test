from config.settings import MIN_MARGIN_PERCENT
from src.utils.logger import logger

# KRW/USD exchange rate — updated via environment variable or hardcoded fallback
import os
USD_TO_KRW = float(os.getenv("USD_TO_KRW", "1350"))

# Assumed Naver Smart Store markup multiplier for price estimation
MARKUP_MULTIPLIER = float(os.getenv("MARKUP_MULTIPLIER", "2.5"))


def estimate_krw_price(price_usd: float) -> int:
    """Convert USD to KRW and apply markup for Smart Store listing price."""
    if price_usd <= 0:
        return 0
    krw_cost = price_usd * USD_TO_KRW
    listing_price = krw_cost * MARKUP_MULTIPLIER
    # Round to nearest 100 KRW
    return int(round(listing_price / 100) * 100)


def estimate_margin_percent(price_usd: float) -> float:
    """Estimate gross margin % after sourcing cost and markup."""
    if price_usd <= 0:
        return 0.0
    cost_krw = price_usd * USD_TO_KRW
    listing_krw = cost_krw * MARKUP_MULTIPLIER
    # Naver fee ~3.85% + payment 3.3% + shipping ~5% = ~12% total cost
    naver_fees = listing_krw * 0.12
    margin = (listing_krw - cost_krw - naver_fees) / listing_krw * 100
    return round(margin, 1)


def score_products(products: list[dict], keyword_trend_score: float) -> list[dict]:
    """
    Compute a final product score combining:
      - Keyword trend score (40%)
      - Estimated margin (30%)
      - Source platform reliability (20%)
      - Price competitiveness (10%)
    """
    PLATFORM_RELIABILITY = {
        "aliexpress": 0.7,
        "amazon": 1.0,
        "ebay": 0.85,
        "shein": 0.6,
        "temu": 0.55,
    }

    scored = []
    for p in products:
        price_usd = p.get("price_usd", 0)
        if price_usd <= 0:
            continue

        margin = estimate_margin_percent(price_usd)
        if margin < MIN_MARGIN_PERCENT:
            logger.debug(f"Skipping '{p.get('title_original', '')}': margin {margin}% < {MIN_MARGIN_PERCENT}%")
            continue

        platform = p.get("source_platform", "unknown")
        reliability = PLATFORM_RELIABILITY.get(platform, 0.5)

        # Price score: cheaper relative to $50 baseline = higher score
        price_score = max(0, 1 - (price_usd / 50)) * 100

        final_score = (
            keyword_trend_score * 0.40
            + margin * 0.30
            + reliability * 100 * 0.20
            + price_score * 0.10
        )

        p["price_krw"] = estimate_krw_price(price_usd)
        p["margin_pct"] = margin
        p["product_score"] = round(final_score, 2)
        p["trend_score"] = keyword_trend_score
        scored.append(p)

    scored.sort(key=lambda x: x["product_score"], reverse=True)
    return scored
