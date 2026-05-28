import anthropic
from tenacity import retry, stop_after_attempt, wait_exponential

from config.settings import ANTHROPIC_API_KEY, CLAUDE_MODEL
from src.utils.logger import logger

_client: anthropic.Anthropic | None = None


def _get_client() -> anthropic.Anthropic:
    global _client
    if _client is None:
        _client = anthropic.Anthropic(api_key=ANTHROPIC_API_KEY)
    return _client


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def translate_product(title: str, description: str = "") -> dict:
    """Translate product title/description to Korean and generate a sales-optimized listing."""
    client = _get_client()

    prompt = f"""다음 해외 상품 정보를 한국 네이버 쇼핑몰에 최적화된 형태로 번역 및 변환해주세요.

원본 제목: {title}
원본 설명: {description[:500] if description else "없음"}

다음 JSON 형식으로만 응답해주세요:
{{
  "title_kr": "한국어 상품명 (SEO 최적화, 50자 이내)",
  "description_kr": "한국어 상품 설명 (네이버 쇼핑 스타일, 200자 이내)",
  "tags": ["태그1", "태그2", "태그3", "태그4", "태그5"]
}}"""

    message = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=512,
        messages=[{"role": "user", "content": prompt}],
    )

    import json
    text = message.content[0].text.strip()
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    return json.loads(text.strip())


@retry(stop=stop_after_attempt(3), wait=wait_exponential(multiplier=1, min=2, max=10))
def extract_trending_keywords(category: str, raw_keywords: list[str]) -> list[str]:
    """Use Claude to refine and expand trending keyword list for a category."""
    client = _get_client()

    prompt = f"""카테고리 '{category}'에서 다음 검색량 상위 키워드들을 분석하여,
실제로 소싱 가능한 해외 상품과 연관된 핵심 키워드 5개를 선별해주세요.

입력 키워드: {', '.join(raw_keywords[:20])}

다음 JSON 배열 형식으로만 응답해주세요: ["키워드1", "키워드2", "키워드3", "키워드4", "키워드5"]"""

    message = client.messages.create(
        model=CLAUDE_MODEL,
        max_tokens=256,
        messages=[{"role": "user", "content": prompt}],
    )

    import json
    text = message.content[0].text.strip()
    if text.startswith("```"):
        text = text.split("```")[1]
        if text.startswith("json"):
            text = text[4:]
    result = json.loads(text.strip())
    return result if isinstance(result, list) else raw_keywords[:5]
