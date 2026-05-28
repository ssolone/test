import time
import pandas as pd
from pytrends.request import TrendReq
from tenacity import retry, stop_after_attempt, wait_exponential

from config.settings import GOOGLE_TRENDS_GEO, GOOGLE_TRENDS_TIMEFRAME
from src.utils.logger import logger


def _build_client() -> TrendReq:
    return TrendReq(hl="ko-KR", tz=540, timeout=(10, 30), retries=2, backoff_factor=0.5)


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=5, max=30))
def get_keyword_scores(keywords: list[str]) -> dict[str, float]:
    """Return Google Trends interest score (0-100) for each keyword over the past month."""
    if not keywords:
        return {}

    pytrends = _build_client()
    scores: dict[str, float] = {}

    # pytrends accepts up to 5 keywords per request
    for i in range(0, len(keywords), 5):
        batch = keywords[i:i + 5]
        try:
            pytrends.build_payload(batch, cat=0, timeframe=GOOGLE_TRENDS_TIMEFRAME, geo=GOOGLE_TRENDS_GEO)
            df: pd.DataFrame = pytrends.interest_over_time()
            if df.empty:
                for kw in batch:
                    scores[kw] = 0.0
                continue
            for kw in batch:
                if kw in df.columns:
                    scores[kw] = float(df[kw].mean())
                else:
                    scores[kw] = 0.0
        except Exception as e:
            logger.warning(f"Google Trends error for batch {batch}: {e}")
            for kw in batch:
                scores[kw] = 0.0
        time.sleep(2)  # be polite to the unofficial API

    return scores


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=2, min=5, max=30))
def get_related_queries(keyword: str, top_n: int = 10) -> list[str]:
    """Return top related search queries for a keyword."""
    pytrends = _build_client()
    try:
        pytrends.build_payload([keyword], cat=0, timeframe=GOOGLE_TRENDS_TIMEFRAME, geo=GOOGLE_TRENDS_GEO)
        related = pytrends.related_queries()
        top_df = related.get(keyword, {}).get("top")
        if top_df is not None and not top_df.empty:
            return top_df["query"].tolist()[:top_n]
    except Exception as e:
        logger.warning(f"Google related queries error for '{keyword}': {e}")
    return []
