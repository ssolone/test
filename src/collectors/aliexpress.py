import hashlib
import hmac
import json
import time
from urllib.parse import urlencode

import requests
from tenacity import retry, stop_after_attempt, wait_exponential

from config.settings import (
    ALIEXPRESS_API_URL,
    ALIEXPRESS_APP_KEY,
    ALIEXPRESS_APP_SECRET,
    ALIEXPRESS_TRACKING_ID,
)
from src.utils.logger import logger


def _sign(params: dict, secret: str) -> str:
    """AliExpress API HMAC-MD5 signature."""
    sorted_params = sorted(params.items())
    sign_string = secret + "".join(f"{k}{v}" for k, v in sorted_params) + secret
    return hmac.new(secret.encode(), sign_string.encode(), hashlib.md5).hexdigest().upper()


def _base_params(method: str) -> dict:
    return {
        "app_key": ALIEXPRESS_APP_KEY,
        "method": method,
        "timestamp": str(int(time.time() * 1000)),
        "sign_method": "hmac",
        "v": "2.0",
        "format": "json",
    }


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def search_products(keyword: str, page_size: int = 10, sort_by: str = "SALE_PRICE_ASC") -> list[dict]:
    """Search AliExpress products via Affiliate API."""
    if not ALIEXPRESS_APP_KEY:
        logger.warning("AliExpress: no API key configured, skipping")
        return []

    params = _base_params("aliexpress.affiliate.product.query")
    params.update({
        "keywords": keyword,
        "page_no": "1",
        "page_size": str(page_size),
        "sort": sort_by,
        "tracking_id": ALIEXPRESS_TRACKING_ID,
        "target_currency": "USD",
        "target_language": "EN",
        "fields": "productId,productTitle,productMainImageUrl,salePrice,commissionRate,originalPrice,productUrl",
    })
    params["sign"] = _sign(params, ALIEXPRESS_APP_SECRET)

    try:
        resp = requests.get(ALIEXPRESS_API_URL, params=params, timeout=15)
        resp.raise_for_status()
        data = resp.json()

        products_raw = (
            data.get("aliexpress_affiliate_product_query_response", {})
            .get("resp_result", {})
            .get("result", {})
            .get("products", {})
            .get("product", [])
        )

        results = []
        for p in products_raw:
            price_str = p.get("sale_price", "0 USD").split()[0]
            try:
                price_usd = float(price_str.replace(",", ""))
            except ValueError:
                price_usd = 0.0

            results.append({
                "source_platform": "aliexpress",
                "source_id": str(p.get("product_id", "")),
                "title_original": p.get("product_title", ""),
                "price_usd": price_usd,
                "image_url": p.get("product_main_image_url", ""),
                "product_url": p.get("product_url", ""),
                "commission_rate": p.get("commission_rate", "0%"),
            })
        return results

    except Exception as e:
        logger.error(f"AliExpress search failed for '{keyword}': {e}")
        return []
