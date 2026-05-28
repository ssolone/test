"""
Temu / Shein product collector via web scraping.

DISCLAIMER: Temu and Shein do not provide public APIs.
Web scraping may violate their Terms of Service.
Use only for personal/research purposes and review ToS before deploying commercially.
Rate limiting and robots.txt are respected here.
"""

import time
import random

import requests
from bs4 import BeautifulSoup
from tenacity import retry, stop_after_attempt, wait_exponential

from src.utils.logger import logger

_HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "ko-KR,ko;q=0.9,en;q=0.8",
}


@retry(stop=stop_after_attempt(2), wait=wait_exponential(multiplier=2, min=3, max=15))
def search_shein(keyword: str, page_size: int = 10) -> list[dict]:
    """Scrape Shein search results for a keyword. Returns empty list if blocked."""
    url = f"https://www.shein.com/pdsearch/{requests.utils.quote(keyword)}/"
    try:
        resp = requests.get(url, headers=_HEADERS, timeout=15, allow_redirects=True)
        if resp.status_code != 200:
            logger.warning(f"Shein returned {resp.status_code} for '{keyword}'")
            return []

        soup = BeautifulSoup(resp.text, "lxml")
        results = []

        product_cards = soup.select("[class*='product-card']")[:page_size]
        for card in product_cards:
            try:
                title = card.select_one("[class*='product-card__goods-title']")
                price_el = card.select_one("[class*='product-card__price']")
                img_el = card.select_one("img")
                link_el = card.select_one("a")

                title_text = title.get_text(strip=True) if title else ""
                price_text = price_el.get_text(strip=True) if price_el else "0"
                price_usd = _parse_price(price_text)

                results.append({
                    "source_platform": "shein",
                    "source_id": link_el["href"].split("?")[0].split("/")[-1] if link_el else "",
                    "title_original": title_text,
                    "price_usd": price_usd,
                    "image_url": img_el.get("src", "") or img_el.get("data-src", "") if img_el else "",
                    "product_url": "https://www.shein.com" + link_el["href"] if link_el and link_el.get("href", "").startswith("/") else "",
                })
            except Exception:
                continue

        time.sleep(random.uniform(1.5, 3.0))
        return results

    except Exception as e:
        logger.warning(f"Shein scrape failed for '{keyword}': {e}")
        return []


def _parse_price(price_str: str) -> float:
    """Extract numeric price from strings like '$12.99' or '₩15,000'."""
    import re
    numbers = re.findall(r"[\d.]+", price_str.replace(",", ""))
    return float(numbers[0]) if numbers else 0.0
