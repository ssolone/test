import requests
from tenacity import retry, stop_after_attempt, wait_exponential

from config.settings import EBAY_APP_ID, EBAY_FINDING_URL
from src.utils.logger import logger


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def search_products(keyword: str, page_size: int = 10) -> list[dict]:
    """Search eBay listings via Finding API."""
    if not EBAY_APP_ID:
        logger.warning("eBay: EBAY_APP_ID not configured, skipping")
        return []

    params = {
        "OPERATION-NAME": "findItemsByKeywords",
        "SERVICE-VERSION": "1.0.0",
        "SECURITY-APPNAME": EBAY_APP_ID,
        "RESPONSE-DATA-FORMAT": "JSON",
        "REST-PAYLOAD": "",
        "keywords": keyword,
        "paginationInput.entriesPerPage": str(min(page_size, 100)),
        "sortOrder": "BestMatch",
        "itemFilter(0).name": "Condition",
        "itemFilter(0).value": "New",
        "itemFilter(1).name": "ListingType",
        "itemFilter(1).value": "FixedPrice",
    }

    try:
        resp = requests.get(EBAY_FINDING_URL, params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()

        items = (
            data.get("findItemsByKeywordsResponse", [{}])[0]
            .get("searchResult", [{}])[0]
            .get("item", [])
        )

        results = []
        for item in items:
            try:
                price_usd = float(
                    item.get("sellingStatus", [{}])[0]
                    .get("currentPrice", [{}])[0]
                    .get("__value__", 0)
                )
            except (IndexError, ValueError, TypeError):
                price_usd = 0.0

            image_url = (
                item.get("galleryURL", [""])[0] if isinstance(item.get("galleryURL"), list)
                else item.get("galleryURL", "")
            )

            results.append({
                "source_platform": "ebay",
                "source_id": item.get("itemId", [""])[0] if isinstance(item.get("itemId"), list) else item.get("itemId", ""),
                "title_original": item.get("title", [""])[0] if isinstance(item.get("title"), list) else item.get("title", ""),
                "price_usd": price_usd,
                "image_url": image_url,
                "product_url": (
                    item.get("viewItemURL", [""])[0] if isinstance(item.get("viewItemURL"), list)
                    else item.get("viewItemURL", "")
                ),
            })
        return results

    except Exception as e:
        logger.error(f"eBay search failed for '{keyword}': {e}")
        return []
