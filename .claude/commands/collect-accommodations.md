# collect-accommodations

숙소 데이터를 웹에서 수집해 accommodations.json을 업데이트하는 커맨드입니다.

## 사용법
```
/collect-accommodations <도시명>
```
예시: `/collect-accommodations 도쿄`, `/collect-accommodations 방콕`

## 실행 절차

### 1단계: 파라미터 확인

`$ARGUMENTS`에서 도시명을 읽습니다. 없으면 안내하고 중단합니다.

### 2단계: 현재 DB 확인

`/home/user/test/travel-app/src/data/db/accommodations.json`을 읽어 해당 도시의 현재 숙소 목록을 확인합니다.

### 3단계: 웹 검색으로 데이터 수집

다음 항목을 WebSearch로 검색합니다:

1. `<도시명> best hotels families kids 2026 booking.com`
2. `<도시명> best hotels couples romantic 2026`
3. `<도시명> best hotels elderly seniors accessible`
4. `<도시명> top hotels groups large party`
5. `<도시명> 가족 여행 숙소 추천 유소아`

### 4단계: AccommodationRecord 형식으로 변환

각 숙소를 다음 스키마로 변환합니다:

```json
{
  "id": "city-hotelname-kebab",
  "name": "숙소명 (한국어 표기)",
  "type": "5성급 럭셔리|4성급|부티크 호텔|리조트|게스트하우스|에어비앤비형",
  "priceRange": "₩|₩₩|₩₩₩|₩₩₩₩|₩₩₩₩₩",
  "description": "한국어 설명 (위치·특징·분위기, 2~3문장)",
  "bookingUrl": "https://www.booking.com/... (실제 URL)",
  "distanceToStation": "주요 역/교통 거점까지 거리",
  "reviewScore": 4.5,
  "reviewCount": "3,200건+",
  "amenities": ["수영장", "조식 포함", "키즈 클럽", "셔틀 서비스"],
  "companionProfiles": {
    "couple": {
      "score": 5,
      "fit": true,
      "highlights": ["로맨틱 뷰", "스파 완비"],
      "tip": "커플 특이사항"
    },
    "family_young_kids": {
      "score": 3,
      "fit": true,
      "highlights": ["키즈 풀"],
      "tip": "유소아 특이사항"
    },
    "family_elderly": {
      "score": 4,
      "fit": true,
      "highlights": ["엘리베이터 완비", "무장애 시설"],
      "tip": "어르신 동반 특이사항"
    },
    "small_group": {"score": 3, "fit": true, "highlights": [], "tip": ""},
    "large_group": {"score": 2, "fit": false, "highlights": [], "tip": ""},
    "family_all": {"score": 4, "fit": true, "highlights": [], "tip": ""}
  },
  "lastUpdated": "오늘 날짜 YYYY-MM-DD",
  "sources": []
}
```

**점수 기준 (1~5):**
- 5: 이 동반자 유형에 완벽히 최적화됨
- 4: 매우 적합
- 3: 적합
- 2: 보통 (fit: false 추천)
- 1: 부적합 (fit: false)

**fit: false인 경우** highlights와 tip은 빈 값으로 설정합니다.

### 5단계: accommodations.json 업데이트

1. accommodations.json을 읽습니다
2. 해당 도시가 없으면 새 도시 키로 추가, 있으면 기존 숙소에 새 숙소 머지 (id 기준 중복 제거)
3. `lastUpdated` 필드를 오늘 날짜로 업데이트
4. 파일을 저장합니다

### 6단계: 빌드 검증

```bash
cd /home/user/test/travel-app && npm run build 2>&1 | tail -20
```

### 7단계: 완료 보고

추가/업데이트된 숙소 목록과 함께 결과를 보고합니다.
