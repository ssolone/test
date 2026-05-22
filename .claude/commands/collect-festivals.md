# collect-festivals

축제/공휴일 데이터를 웹에서 수집해 festivals.json을 업데이트하는 커맨드입니다.

## 사용법
```
/collect-festivals <도시명>
```
예시: `/collect-festivals 도쿄`, `/collect-festivals 바르셀로나`

## 실행 절차

다음 단계를 순서대로 수행하세요.

### 1단계: 파라미터 확인

`$ARGUMENTS`에서 도시명을 읽습니다. 없으면 "도시명을 입력해 주세요 (예: /collect-festivals 도쿄)" 라고 안내하고 중단합니다.

### 2단계: 현재 DB 확인

`/home/user/test/travel-app/src/data/db/festivals.json`을 읽어 해당 도시가 이미 있는지 확인합니다.

### 3단계: 웹 검색으로 데이터 수집

다음 항목을 WebSearch로 검색합니다 (연도 2026~2030 기준):

1. `<도시명> public holidays 2026 2027 2028 2029 2030 dates`
2. `<도시명> major festivals events annual calendar`
3. `<도시명> 공휴일 축제 날짜 2026`

### 4단계: FestivalRecord 형식으로 변환

검색 결과를 다음 스키마로 변환합니다:

```json
{
  "id": "unique-kebab-id",
  "name": "한국어 이벤트명",
  "type": "festival|event|holiday|warning",
  "impact": "positive|caution|avoid",
  "recurrence": "annual|oneoff|seasonal",
  "months": [해당 월 숫자 배열, 예: [3,4]],
  "occurrences": [
    {"year": 2026, "startDate": "2026-MM-DD", "endDate": "2026-MM-DD", "confirmed": true},
    ...연도별로 2026~2030
  ],
  "description": "한국어 설명 (2~3문장, 여행자 관점)",
  "tip": "한국어 팁 (여행자 실용 조언)",
  "lastUpdated": "오늘 날짜 YYYY-MM-DD",
  "sources": []
}
```

**변환 규칙:**
- 날짜가 매년 고정(예: 1월 1일)이면 각 연도별로 occurrences 추가, confirmed: true
- 날짜가 매년 바뀌면(예: 음력 기준) 계산된 날짜 추가, confirmed: false
- 날짜를 모르면 occurrences: [], months[]만 작성

### 5단계: festivals.json 업데이트

1. festivals.json을 읽습니다
2. 해당 도시 키가 없으면 새로 추가, 있으면 events 배열에 새 이벤트 머지 (id 기준 중복 제거)
3. `lastUpdated` 필드를 오늘 날짜로 업데이트
4. 파일을 저장합니다

### 6단계: 빌드 검증

```bash
cd /home/user/test/travel-app && npm run build 2>&1 | tail -20
```

빌드가 성공하면 완료 메시지를 출력합니다. 에러가 있으면 수정합니다.

### 7단계: 완료 보고

추가/업데이트된 이벤트 목록과 함께 결과를 보고합니다.
