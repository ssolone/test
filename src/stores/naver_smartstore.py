"""
Naver Smart Store (Commerce API) integration.

API docs: https://developer-smartstore.naver.com/
Authentication: OAuth 2.0 (client_credentials grant)

To activate:
  1. Apply for Naver Commerce API at https://developer-smartstore.naver.com/
  2. Set NAVER_COMMERCE_CLIENT_ID and NAVER_COMMERCE_CLIENT_SECRET in GitHub Secrets
"""

import base64
import hashlib
import hmac
import time

import requests
from tenacity import retry, stop_after_attempt, wait_exponential

from config.settings import (
    NAVER_COMMERCE_BASE_URL,
    NAVER_COMMERCE_CLIENT_ID,
    NAVER_COMMERCE_CLIENT_SECRET,
)
from src.utils.database import mark_as_listed
from src.utils.logger import logger

_token_cache: dict = {}


def _get_access_token() -> str:
    """Fetch OAuth 2.0 access token from Naver Commerce API."""
    global _token_cache
    now = time.time()
    if _token_cache.get("expires_at", 0) > now + 60:
        return _token_cache["access_token"]

    timestamp = str(int(now * 1000))
    password = f"{NAVER_COMMERCE_CLIENT_ID}_{timestamp}"
    hashed = hmac.new(
        NAVER_COMMERCE_CLIENT_SECRET.encode("utf-8"),
        password.encode("utf-8"),
        hashlib.sha256,
    ).digest()
    signature = base64.b64encode(hashed).decode("utf-8")

    resp = requests.post(
        f"{NAVER_COMMERCE_BASE_URL}/v1/oauth2/token",
        data={
            "client_id": NAVER_COMMERCE_CLIENT_ID,
            "timestamp": timestamp,
            "client_secret_sign": signature,
            "grant_type": "client_credentials",
            "type": "SELF",
        },
        timeout=15,
    )
    resp.raise_for_status()
    data = resp.json()
    _token_cache = {
        "access_token": data["access_token"],
        "expires_at": now + data.get("expires_in", 3600),
    }
    return data["access_token"]


def _auth_headers() -> dict:
    token = _get_access_token()
    return {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json;charset=UTF-8",
    }


def _build_product_payload(product: dict) -> dict:
    """Map sourced product dict to Naver Smart Store product payload."""
    return {
        "originProduct": {
            "statusType": "SALE",
            "saleType": "NEW",
            "leafCategoryId": "50000803",  # 해외직구 > 기타 (adjust per category)
            "name": product.get("title_kr") or product.get("title_original", ""),
            "detailContent": product.get("description_kr", ""),
            "images": {
                "representativeImage": {"url": product.get("image_url", "")},
                "optionalImages": [],
            },
            "salePrice": product.get("price_krw", 0),
            "stockQuantity": 99,
            "deliveryInfo": {
                "deliveryType": "DELIVERY",
                "deliveryAttributeType": "NORMAL",
                "deliveryFee": {
                    "deliveryFeeType": "FREE",
                    "baseFee": 0,
                },
            },
            "detailAttribute": {
                "originAreaInfo": {
                    "originAreaCode": "0200037",  # 해외 기타
                    "importer": "",
                },
                "afterServiceInfo": {
                    "afterServiceTelephoneNumber": "02-0000-0000",
                    "afterServiceGuideContent": "고객센터로 문의해주세요.",
                },
                "purchaseQuantityInfo": {"minPurchaseQuantity": 1},
            },
        },
        "smartstoreChannelProduct": {
            "naverShoppingRegistration": True,
            "channelProductDisplayStatusType": "ON",
        },
    }


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=3, max=15))
def create_product(product: dict) -> str | None:
    """Create a product in Naver Smart Store. Returns naver_product_id or None."""
    if not NAVER_COMMERCE_CLIENT_ID or not NAVER_COMMERCE_CLIENT_SECRET:
        logger.warning("Naver Smart Store: API credentials not configured — skipping listing")
        return None

    payload = _build_product_payload(product)
    try:
        resp = requests.post(
            f"{NAVER_COMMERCE_BASE_URL}/v2/products",
            headers=_auth_headers(),
            json=payload,
            timeout=20,
        )
        resp.raise_for_status()
        data = resp.json()
        naver_product_id = str(data.get("originProductNo", ""))
        logger.info(f"Listed on Naver: '{product.get('title_kr')}' → productNo={naver_product_id}")
        return naver_product_id
    except requests.HTTPError as e:
        logger.error(f"Naver listing failed for '{product.get('title_kr')}': {e.response.text}")
        return None


@retry(stop=stop_after_attempt(2), wait=wait_exponential(multiplier=2, min=3, max=10))
def update_product_price(naver_product_id: str, new_price_krw: int) -> bool:
    """Update price of an existing Naver Smart Store product."""
    if not NAVER_COMMERCE_CLIENT_ID:
        return False
    try:
        resp = requests.patch(
            f"{NAVER_COMMERCE_BASE_URL}/v2/products/origin-products/{naver_product_id}",
            headers=_auth_headers(),
            json={"originProduct": {"salePrice": new_price_krw}},
            timeout=15,
        )
        resp.raise_for_status()
        return True
    except Exception as e:
        logger.error(f"Naver price update failed for product {naver_product_id}: {e}")
        return False


def list_products_batch(products: list[dict]) -> int:
    """List multiple products. Returns count of successfully listed products."""
    listed = 0
    for p in products:
        naver_id = create_product(p)
        if naver_id:
            mark_as_listed(p["source_platform"], p["source_id"], naver_id)
            listed += 1
        time.sleep(0.5)  # avoid rate limiting
    return listed
