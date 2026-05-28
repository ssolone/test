from src.utils.logger import logger


def compute_trend_score(
    google_score: float,
    naver_score: float,
    google_weight: float = 0.4,
    naver_weight: float = 0.6,
) -> float:
    """Composite trend score weighted toward Naver (Korean market focus)."""
    score = (google_score * google_weight) + (naver_score * naver_weight)
    return round(min(score, 100.0), 2)


def rank_keywords(
    keywords: list[str],
    google_scores: dict[str, float],
    naver_scores: dict[str, float],
) -> list[dict]:
    """Merge Google + Naver scores and sort keywords by composite trend score."""
    ranked = []
    for kw in keywords:
        g = google_scores.get(kw, 0.0)
        n = naver_scores.get(kw, 0.0)
        composite = compute_trend_score(g, n)
        ranked.append({
            "keyword": kw,
            "google_score": g,
            "naver_score": n,
            "composite_score": composite,
        })

    ranked.sort(key=lambda x: x["composite_score"], reverse=True)
    logger.info(f"Top keyword: '{ranked[0]['keyword']}' score={ranked[0]['composite_score']}" if ranked else "No keywords scored")
    return ranked
