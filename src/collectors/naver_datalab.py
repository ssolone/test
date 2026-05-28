import json
from datetime import datetime, timedelta

import requests
from tenacity import retry, stop_after_attempt, wait_exponential

from config.settings import NAVER_CLIENT_ID, NAVER_CLIENT_SECRET, NAVER_DATALAB_URL
from src.utils.logger import logger


def _headers() -> dict:
    return {
        "X-Naver-Client-Id": NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": NAVER_CLIENT_SECRET,
        "Content-Type": "application/json",
    }


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def get_keyword_scores(keywords: list[str], period_days: int = 30) -> dict[str, float]:
    """Return Naver DataLab relative search volume score (0-100) for each keyword."""
    if not keywords or not NAVER_CLIENT_ID:
        logger.warning("Naver DataLab: missing credentials or empty keywords, skipping")
        return {kw: 0.0 for kw in keywords}

    end_date = datetime.today()
    start_date = end_date - timedelta(days=period_days)

    # DataLab accepts up to 5 keyword groups per request
    scores: dict[str, float] = {}
    for i in range(0, len(keywords), 5):
        batch = keywords[i:i + 5]
        keyword_groups = [{"groupName": kw, "keywords": [kw]} for kw in batch]

        body = {
            "startDate": start_date.strftime("%Y-%m-%d"),
            "endDate": end_date.strftime("%Y-%m-%d"),
            "timeUnit": "date",
            "keywordGroups": keyword_groups,
        }

        try:
            resp = requests.post(NAVER_DATALAB_URL, headers=_headers(), json=body, timeout=15)
            resp.raise_for_status()
            data = resp.json()
            for result in data.get("results", []):
                name = result.get("title", "")
                values = [p.get("ratio", 0) for p in result.get("data", [])]
                scores[name] = float(sum(values) / len(values)) if values else 0.0
        except Exception as e:
            logger.warning(f"Naver DataLab error for batch {batch}: {e}")
            for kw in batch:
                scores[kw] = 0.0

    return scores


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def get_shopping_insight(keyword: str) -> dict:
    """Get Naver Shopping search trend insight for a keyword."""
    if not NAVER_CLIENT_ID:
        return {}

    url = "https://openapi.naver.com/v1/datalab/shopping/category/keywords/ratio"
    end_date = datetime.today()
    start_date = end_date - timedelta(days=30)

    body = {
        "startDate": start_date.strftime("%Y-%m-%d"),
        "endDate": end_date.strftime("%Y-%m-%d"),
        "timeUnit": "date",
        "category": "50000000",  # 전체
        "keyword": keyword,
        "gender": "",
        "ages": [],
    }

    try:
        resp = requests.post(url, headers=_headers(), json=body, timeout=15)
        resp.raise_for_status()
        return resp.json()
    except Exception as e:
        logger.warning(f"Naver Shopping Insight error for '{keyword}': {e}")
        return {}
