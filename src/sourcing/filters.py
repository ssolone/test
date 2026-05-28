import re

# Keywords that indicate potentially problematic products for import/resale
_BLOCKED_TERMS = [
    "weapon", "gun", "knife", "blade", "counterfeit", "fake", "replica",
    "prescription", "medicine", "drug", "tobacco", "cigarette",
    "adult", "xxx", "porn",
]

# Minimum image quality threshold (non-empty and not a placeholder)
_PLACEHOLDER_URLS = ["no_image", "placeholder", "default"]


def is_product_safe(product: dict) -> bool:
    """Filter out products with blocked terms or missing critical fields."""
    title = (product.get("title_original") or "").lower()
    if any(term in title for term in _BLOCKED_TERMS):
        return False
    if not product.get("title_original"):
        return False
    if product.get("price_usd", 0) <= 0:
        return False
    return True


def has_valid_image(product: dict) -> bool:
    url = product.get("image_url", "")
    if not url:
        return False
    if any(p in url.lower() for p in _PLACEHOLDER_URLS):
        return False
    return True


def deduplicate(products: list[dict]) -> list[dict]:
    """Remove duplicates by (source_platform, source_id)."""
    seen = set()
    unique = []
    for p in products:
        key = (p.get("source_platform"), p.get("source_id"))
        if key not in seen and p.get("source_id"):
            seen.add(key)
            unique.append(p)
    return unique


def apply_all_filters(products: list[dict]) -> list[dict]:
    filtered = [p for p in products if is_product_safe(p) and has_valid_image(p)]
    return deduplicate(filtered)
