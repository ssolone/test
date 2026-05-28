from tenacity import retry, stop_after_attempt, wait_exponential

from config.settings import (
    AMAZON_ACCESS_KEY,
    AMAZON_SECRET_KEY,
    AMAZON_PARTNER_TAG,
    AMAZON_REGION,
    AMAZON_MARKETPLACE,
)
from src.utils.logger import logger

try:
    from paapi5_python_sdk.api.default_api import DefaultApi
    from paapi5_python_sdk.models.search_items_request import SearchItemsRequest
    from paapi5_python_sdk.models.search_items_resource import SearchItemsResource
    from paapi5_python_sdk.models.partner_type import PartnerType
    from paapi5_python_sdk import ApiClient, Configuration

    PAAPI_AVAILABLE = True
except ImportError:
    PAAPI_AVAILABLE = False


def _build_client():
    config = Configuration()
    config.host = f"webservices.{AMAZON_MARKETPLACE}"
    return DefaultApi(
        ApiClient(configuration=config),
        AMAZON_ACCESS_KEY,
        AMAZON_SECRET_KEY,
        AMAZON_REGION,
    )


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=5, max=30))
def search_products(keyword: str, page_size: int = 10) -> list[dict]:
    """Search Amazon products via PA-API v5."""
    if not AMAZON_ACCESS_KEY or not PAAPI_AVAILABLE:
        logger.warning("Amazon PA-API: credentials not configured or SDK unavailable, skipping")
        return []

    resources = [
        SearchItemsResource.ITEMINFO_TITLE,
        SearchItemsResource.OFFERS_LISTINGS_PRICE,
        SearchItemsResource.IMAGES_PRIMARY_MEDIUM,
        SearchItemsResource.ITEMINFO_FEATURES,
    ]

    request = SearchItemsRequest(
        partner_tag=AMAZON_PARTNER_TAG,
        partner_type=PartnerType.ASSOCIATES,
        keywords=keyword,
        search_index="All",
        item_count=min(page_size, 10),
        resources=resources,
    )

    try:
        api = _build_client()
        response = api.search_items(request)
        results = []

        for item in (response.search_result.items or []):
            price_usd = 0.0
            try:
                price_usd = float(
                    item.offers.listings[0].price.amount
                )
            except (AttributeError, IndexError, TypeError):
                pass

            image_url = ""
            try:
                image_url = item.images.primary.medium.url
            except AttributeError:
                pass

            results.append({
                "source_platform": "amazon",
                "source_id": item.asin,
                "title_original": item.item_info.title.display_value if item.item_info and item.item_info.title else "",
                "price_usd": price_usd,
                "image_url": image_url,
                "product_url": item.detail_page_url or "",
            })
        return results

    except Exception as e:
        logger.error(f"Amazon search failed for '{keyword}': {e}")
        return []
