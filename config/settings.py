import os
from dotenv import load_dotenv

load_dotenv()

# --- Google Trends ---
GOOGLE_TRENDS_GEO = os.getenv("GOOGLE_TRENDS_GEO", "KR")
GOOGLE_TRENDS_TIMEFRAME = os.getenv("GOOGLE_TRENDS_TIMEFRAME", "today 1-m")

# --- Naver DataLab ---
NAVER_CLIENT_ID = os.getenv("NAVER_CLIENT_ID", "")
NAVER_CLIENT_SECRET = os.getenv("NAVER_CLIENT_SECRET", "")
NAVER_DATALAB_URL = "https://openapi.naver.com/v1/datalab/search"

# --- Naver Smart Store (Commerce API) ---
NAVER_COMMERCE_CLIENT_ID = os.getenv("NAVER_COMMERCE_CLIENT_ID", "")
NAVER_COMMERCE_CLIENT_SECRET = os.getenv("NAVER_COMMERCE_CLIENT_SECRET", "")
NAVER_COMMERCE_BASE_URL = "https://api.commerce.naver.com/external"

# --- AliExpress Affiliate API ---
ALIEXPRESS_APP_KEY = os.getenv("ALIEXPRESS_APP_KEY", "")
ALIEXPRESS_APP_SECRET = os.getenv("ALIEXPRESS_APP_SECRET", "")
ALIEXPRESS_TRACKING_ID = os.getenv("ALIEXPRESS_TRACKING_ID", "")
ALIEXPRESS_API_URL = "https://api-sg.aliexpress.com/sync"

# --- Amazon PA-API v5 ---
AMAZON_ACCESS_KEY = os.getenv("AMAZON_ACCESS_KEY", "")
AMAZON_SECRET_KEY = os.getenv("AMAZON_SECRET_KEY", "")
AMAZON_PARTNER_TAG = os.getenv("AMAZON_PARTNER_TAG", "")
AMAZON_REGION = os.getenv("AMAZON_REGION", "us-east-1")
AMAZON_MARKETPLACE = os.getenv("AMAZON_MARKETPLACE", "www.amazon.com")

# --- eBay Finding API ---
EBAY_APP_ID = os.getenv("EBAY_APP_ID", "")
EBAY_FINDING_URL = "https://svcs.ebay.com/services/search/FindingService/v1"

# --- Claude API (Anthropic) ---
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
CLAUDE_MODEL = "claude-sonnet-4-6"

# --- Sourcing Config ---
SOURCING_CATEGORIES = [
    "스마트폰 액세서리",
    "홈 인테리어",
    "뷰티 스킨케어",
    "패션 의류",
    "건강 피트니스",
    "주방용품",
    "반려동물 용품",
    "아웃도어 캠핑",
]

TOP_KEYWORDS_PER_CATEGORY = int(os.getenv("TOP_KEYWORDS_PER_CATEGORY", "5"))
TOP_PRODUCTS_PER_KEYWORD = int(os.getenv("TOP_PRODUCTS_PER_KEYWORD", "3"))
MIN_TREND_SCORE = float(os.getenv("MIN_TREND_SCORE", "40.0"))
MAX_PRODUCTS_TO_LIST = int(os.getenv("MAX_PRODUCTS_TO_LIST", "20"))

# margin filter: skip products where estimated margin is below this %
MIN_MARGIN_PERCENT = float(os.getenv("MIN_MARGIN_PERCENT", "30.0"))

# --- Database ---
DB_PATH = os.getenv("DB_PATH", "data/products.db")
