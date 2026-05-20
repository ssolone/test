import type { FestivalEvent } from '../types';

// ─────────────────────────────────────────────
// 도시별 특별 축제 (cityDataMap에 없는 도시)
// ─────────────────────────────────────────────
export const cityFestivalMap: Record<string, FestivalEvent[]> = {

  // ─── 일본 ───
  '삿포로': [
    { name: '삿포로 눈 축제', period: '2월 초 (약 7~10일간)', months: [2], description: '오도리 공원에 거대한 눈·얼음 조각품 300여 개가 전시됩니다. 국제 눈 조각 대회와 야간 일루미네이션이 하이라이트. 매년 200만 명 이상 방문하는 일본 겨울 최대 축제입니다.', type: 'festival', impact: 'positive', tip: '방한 장비 철저히 (기온 -10도 이하 가능). 숙소는 3개월 전 예약 필수. 스스키노 얼음 조각 행사도 함께 즐기세요.' },
    { name: '요사코이 소란 축제', period: '6월 둘째 주 (5~6일간)', months: [6], description: '삿포로 전역에서 3만 명의 댄서가 화려한 의상으로 에너지 넘치는 춤을 선보입니다. 일본 최대 댄스 축제 중 하나로 오도리 공원이 메인 무대입니다.', type: 'festival', impact: 'positive', tip: '오도리 공원 메인 스테이지 앞에서 관람. 입장 무료. 6월 삿포로는 날씨도 쾌적합니다.' },
    { name: '골든위크', period: '4월 29일 ~ 5월 5일', months: [4,5], description: '일본 최대 연휴. 삿포로도 관광지·숙소 극혼잡, 가격 급등. 홋카이도는 이 시기 벚꽃이 만개(서울보다 약 1개월 늦음)해 더욱 인기.', type: 'holiday', impact: 'caution', tip: '5월 초 삿포로 벚꽃과 겹쳐 숙소는 최소 3개월 전 예약 필수.' },
    { name: '오봉·연말연시', period: '8월 13~16일 / 12월 31일~1월 3일', months: [8,12,1], description: '일본 귀성 시즌. 일부 현지 식당·가게 휴업. 12~3월은 삿포로 스키 리조트 시즌으로 루스츠·닛코·기로로 리조트가 인기입니다.', type: 'holiday', impact: 'caution', tip: '스키 시즌 숙소는 성수기 2~3개월 전 예약 필수.' },
  ],

  '후쿠오카': [
    { name: '하카타 기온 야마카사', period: '7월 1~15일 (클라이맥스: 15일 새벽 4시 59분)', months: [7], description: '1,000년 역사의 하카타 총진수 신사 축제. 15일 새벽 4시 59분 수 톤 짜리 장식 수레(야마카사)를 메고 구도심을 달리는 "오이야마"가 클라이맥스. 일본 3대 축제 중 하나입니다.', type: 'festival', impact: 'positive', tip: '오이야마 당일은 새벽 3시 이전에 나카스·캐널시티 일대에서 자리 잡기. 7월 후쿠오카 여름은 덥고 습하니 물 충분히 준비.' },
    { name: '하카타 돈타쿠 항구 축제', period: '5월 3~4일 (골든위크)', months: [5], description: '일본 최대 규모 시민 축제. 200만 명이 방문하며 퍼레이드·음악·공연이 후쿠오카 도심 전역에서 열립니다. 골든위크와 겹쳐 숙소·교통 극혼잡.', type: 'festival', impact: 'positive', tip: '하카타역~캐널시티 메인 퍼레이드 무료 관람. 숙소는 6개월 전 예약.' },
    { name: '나카스 야타이 포장마차', period: '연중 (우천·폭서 제외)', months: [1,2,3,4,5,6,7,8,9,10,11,12], description: '나카스강 옆 수십 개의 야타이(포장마차)에서 하카타 라멘·모츠나베·야키토리를 즐기는 후쿠오카 최고의 밤 문화. 현지인·관광객이 어울리는 특별한 공간.', type: 'festival', impact: 'positive', tip: '저녁 6시 이후 방문. 단골 야타이 스타일이라 자리 잡고 옆 사람과 대화하며 즐기기 추천.' },
    { name: '골든위크', period: '4월 29일 ~ 5월 5일', months: [4,5], description: '하카타 돈타쿠(5/3~4)와 겹쳐 후쿠오카 최대 성수기. 숙소·교통 모두 2배 이상 혼잡.', type: 'holiday', impact: 'avoid', tip: '6개월 전 예약이 필수. 골든위크 직전(4월 말) 방문이 벚꽃+여유 조합으로 최고.' },
  ],

  '오키나와': [
    { name: '우미히라키 (바다 개방)', period: '4월 초', months: [4], description: '오키나와 바다 공식 개막일. 이후 해변·스노클링·다이빙 시즌 본격 시작. 일본에서 가장 먼저 여름 바다를 즐길 수 있는 곳입니다. 3~4월이 오키나와 최고 시즌.', type: 'event', impact: 'positive', tip: '4~6월은 해파리 주의. 만타가오리 다이빙은 6~11월이 시즌.' },
    { name: '태풍 시즌', period: '7월 ~ 10월', months: [7,8,9,10], description: '오키나와는 일본에서 태풍이 가장 잦은 지역. 특히 8~9월 직격탄 다수. 항공편 결항·해변 폐쇄가 빈번합니다.', type: 'warning', impact: 'caution', tip: '여행자보험 필수. 출발 3~4일 전부터 기상 앱 실시간 확인. 태풍 시즌엔 일정 유연성 필수.' },
    { name: '슈리조 축제', period: '11월 초~중순', months: [11], description: '류큐 왕조 시대 의식을 재현하는 슈리성 가을 축제. 전통 의상·무용·음악이 어우러진 오키나와 문화 최대 행사. 11월은 태풍도 끝나고 날씨도 최고의 시기입니다.', type: 'festival', impact: 'positive', tip: '11월 오키나와는 기온 22~25도로 쾌적한 최성수기. 숙소 조기 예약 필요.' },
    { name: '골든위크', period: '4월 29일 ~ 5월 5일', months: [4,5], description: '오키나와는 일본 내국인 최애 황금연휴 행선지. 가격 최고점·혼잡 최고점.', type: 'holiday', impact: 'avoid', tip: '이 기간 오키나와 숙소는 6개월~1년 전 예약. 4월 초나 5월 중순이 가성비 최고.' },
  ],

  '나고야': [
    { name: '나고야 축제 (나고야마츠리)', period: '10월 셋째 토~일', months: [10], description: '오다 노부나가·도요토미 히데요시·도쿠가와 이에야스 세 전국시대 무장의 행렬을 재현. 나고야성~사카에를 행진하는 화려한 역사 퍼레이드.', type: 'festival', impact: 'positive', tip: '나고야성 입구 앞 행렬이 가장 볼만합니다. 10월 나고야는 날씨도 쾌적.' },
    { name: '골든위크', period: '4월 29일 ~ 5월 5일', months: [4,5], description: '레고랜드·나고야항 수족관 등 가족 명소 극혼잡. 숙소 가격 2배 이상.', type: 'holiday', impact: 'caution', tip: '레고랜드는 온라인 사전 예매 시 대기 시간 단축. 평일 방문 권장.' },
  ],

  '나라': [
    { name: '와카쿠사 산 야화', period: '1월 넷째 토요일', months: [1], description: '와카쿠사 산 전체를 불태우는 장엄한 전통 행사. 불꽃놀이와 함께 산이 타오르는 광경이 장관입니다.', type: 'festival', impact: 'positive', tip: '나라 공원 동쪽 와카쿠사야마 입구에서 관람. 오후 6시 이전 자리 확보 필요.' },
    { name: '나라 사슴·꽃 시즌', period: '3월 말 ~ 4월 초', months: [3,4], description: '나라 공원의 1,200여 마리 사슴과 벚꽃의 조화. 일본에서도 손꼽히는 벚꽃 명소로 관광객이 몰립니다.', type: 'festival', impact: 'positive', tip: '사슴 전병(시카센베이) 판매 중 사슴이 달려드는 경우 있음. 어린이·어르신 주의 필요.' },
  ],

  '히로시마': [
    { name: '평화 기념식', period: '8월 6일', months: [8], description: '원폭 투하 희생자를 추모하는 세계적인 평화 기념식. 평화 기념 공원에서 수만 명이 모이며 전 세계 미디어가 중계합니다.', type: 'event', impact: 'positive', tip: '8월 히로시마는 매우 덥습니다. 이른 아침 기념식 후 평화 기념 박물관 방문 추천.' },
    { name: '히로시마 꽃 축제', period: '5월 3~5일 (골든위크)', months: [5], description: '히로시마 최대 시민 축제. 평화 대로에서 퍼레이드·음악 공연·댄스 등 다채로운 행사.', type: 'festival', impact: 'positive', tip: '5월 초 히로시마는 날씨 쾌적. 미야지마(이쓰쿠시마 신사) 당일치기와 조합 추천.' },
  ],

  // ─── 태국 ───
  '치앙마이': [
    { name: '이펑 축제 (하늘 등불)', period: '11월 보름달 날 (로이 끄라통과 동일)', months: [11], description: '수천 개의 하늘 등불이 밤하늘을 수놓는 태국 최고의 장관. 세계 여행 버킷리스트 1위에 꼽히는 장면. 치앙마이가 방콕보다 등불 밀도가 훨씬 높습니다.', type: 'festival', impact: 'positive', tip: '숙소는 6개월 전 예약 필수. 등불 방향 고려해 공터나 메핑강 인근에서 날리기. 화재 주의.' },
    { name: '치앙마이 꽃 축제', period: '2월 첫째 주말', months: [2], description: '치앙마이 전역이 형형색색의 꽃으로 장식되는 퍼레이드. 가장 날씨 좋은 건기 시즌(2월)과 겹쳐 치앙마이 최고 여행 시기 중 하나입니다.', type: 'festival', impact: 'positive', tip: '2월은 건기 최고 시즌. 꽃 마차 퍼레이드는 2월 첫째 토요일 오전에 진행.' },
    { name: '송크란 (치앙마이 물 축제)', period: '4월 13~15일 (치앙마이는 4월 한 달 연장)', months: [4], description: '방콕보다 더 격렬한 물 싸움. 구시가지 해자 주변에서 사흘간 대규모 물 싸움. 태국 물 축제 최고 명소.', type: 'festival', impact: 'positive', tip: '방수팩·방수 케이스 필수. 전자기기 방수 케이스에. 하얀 옷 피하기.' },
    { name: '우기 (스콜 시즌)', period: '6월 ~ 10월', months: [6,7,8,9,10], description: '매일 오후 강한 스콜. 그러나 방콕보다 기온이 낮아 상대적으로 쾌적. 트레킹은 오전에 마무리 권장.', type: 'warning', impact: 'caution', tip: '오전 트레킹, 오후 사원 내부·쿠킹클래스·스파로 일정 조정.' },
  ],

  '푸껫': [
    { name: '베지터리언 페스티벌', period: '9~10월 (중국력 9월, 매년 날짜 변동)', months: [9,10], description: '9일간 화교 문화의 독특한 채식 축제. 불 걷기·볼에 꼬챙이 꽂기 등 극한 의식이 열립니다. 채식 음식 가판이 도시를 가득 메우고 화려한 퍼레이드.', type: 'festival', impact: 'positive', tip: '꼬챙이 의식은 강렬한 장면이므로 심약한 분 주의. 카투 사원 등에서 진행.' },
    { name: '건기 & 성수기', period: '11월 ~ 4월', months: [11,12,1,2,3,4], description: '푸껫 최고 여행 시기. 맑은 하늘, 잔잔한 바다, 에메랄드 물색. 12~1월 가격 최고점이지만 날씨도 최고.', type: 'event', impact: 'positive', tip: '해양 스포츠·스노클링·다이빙은 이 시기가 최적. 10~11월 성수기 전환 시점에 가면 가성비 좋습니다.' },
    { name: '우기 & 거친 파도', period: '5월 ~ 10월', months: [5,6,7,8,9,10], description: '파타야·카말라 서쪽 해변에 거친 파도와 강한 스콜. 적기(Red Flag) 게양 시 입수 금지. 스피드보트 투어 일부 취소.', type: 'warning', impact: 'caution', tip: '적기 무시하면 익사 위험. 파도 조건 확인 후 수영·서핑 결정.' },
  ],

  // ─── 베트남 ───
  '하노이': [
    { name: '뗏 (베트남 설날)', period: '1~2월 (음력, 매년 날짜 변동)', months: [1,2], description: '베트남 최대 명절. 대부분의 상점·식당이 1~2주간 문을 닫습니다. 호안끼엠 호수 주변 장식이 아름답지만 도시는 한산해집니다.', type: 'holiday', impact: 'caution', tip: '호텔·대형 레스토랑은 영업하지만 현지 식당·가게 대부분 휴업. 뗏 3~5일 전 방문하면 꽃 시장과 활기찬 분위기 즐길 수 있습니다.' },
    { name: '건기 최적 시즌', period: '10월 ~ 4월', months: [10,11,12,1,2,3,4], description: '하노이 여행 최적 시기. 10~11월은 쾌청하고 시원. 12~2월은 흐리고 쌀쌀할 수 있지만 우기보다 낫습니다.', type: 'event', impact: 'positive', tip: '하노이는 동남아 기준 겨울이 있습니다 (12~2월 15~20도). 가디건 하나 챙기세요.' },
    { name: '우기 (북부)', period: '5월 ~ 9월', months: [5,6,7,8,9], description: '하노이 포함 북부 베트남 우기. 매일 강한 소나기와 높은 습도. 호안끼엠 호수 일대 침수 가능.', type: 'warning', impact: 'caution', tip: '우산 또는 비옷 필수. 오토바이 이동 시 빗길 미끄러움 주의.' },
  ],

  '호치민': [
    { name: '뗏 (구정)', period: '1~2월 (음력, 매년 날짜 변동)', months: [1,2], description: '베트남 최대 명절. 호치민도 대부분의 상점·식당이 1주일 이상 문을 닫습니다. 뗏 꽃 시장(Chợ hoa Tết)이 구정 전주에 열려 화려합니다.', type: 'holiday', impact: 'caution', tip: '구정 3~5일 전 방문하면 꽃 시장과 활기찬 분위기 즐길 수 있습니다.' },
    { name: '통일 기념일', period: '4월 30일', months: [4], description: '1975년 사이공 함락 기념일. 국가 공휴일로 통일궁·전쟁박물관 무료 입장 가능. 혁명 퍼레이드.', type: 'holiday', impact: 'positive', tip: '전쟁박물관은 베트남전 역사를 깊이 이해하는 최고 장소. 오전 이른 방문 추천.' },
    { name: '우기 (남부)', period: '5월 ~ 11월', months: [5,6,7,8,9,10,11], description: '호치민 포함 남부 우기. 오후 2~5시 집중 스콜. 아침은 보통 맑아 오전 관광 후 오후 실내 이동 패턴 추천.', type: 'warning', impact: 'caution', tip: '오전 관광, 오후 쇼핑몰(이온몰·빈콤)·카페로 대피 패턴이 현지인 방식.' },
  ],

  '호이안': [
    { name: '음력 보름 등불 축제', period: '매월 음력 14일 (월 1회)', months: [1,2,3,4,5,6,7,8,9,10,11,12], description: '매달 보름날 전기를 끄고 종이 등불로만 구시가지를 밝히는 환상적인 축제. 투본강에 등불 띄우기. 호이안 최대 매력이자 세계 각국 여행자가 찾는 이유.', type: 'festival', impact: 'positive', tip: '15,000동(약 900원)에 등불을 사서 강에 띄워보세요. 오후 6시 이후 구시가지 진입. 매달 1회이니 방문 일정을 음력 보름에 맞추면 최고.' },
    { name: '우기 태풍 시즌', period: '9월 ~ 12월', months: [9,10,11,12], description: '베트남 중부 우기로 태풍 및 집중 강우. 특히 10~11월 홍수로 구시가지 침수 가능. 해변 활동 불가 기간 발생.', type: 'warning', impact: 'caution', tip: '여행자보험 필수. 10~11월은 침수 가능성 있으니 호이안 방문은 2~4월·7~8월 추천.' },
  ],

  // ─── 유럽 ─── (이탈리아)
  '로마': [
    { name: '부활절 & 성주간', period: '3~4월 (매년 날짜 변동, 부활절 전 1주)', months: [3,4], description: '바티칸 성 베드로 광장의 교황 부활절 미사. 세계 최대의 종교 행사로 전 세계 순례자·관광객이 몰려 숙소·교통 극혼잡. 콜로세움·포로 로마노 일대 장엄한 행진.', type: 'festival', impact: 'positive', tip: '바티칸 미사 입장권은 무료이나 사전 온라인 예약 필수. 숙소는 최소 3개월 전 예약. 성주간 중 바티칸 박물관은 예약 필수.' },
    { name: '페라고스토 (8월 중순)', period: '8월 15일 전후 (1~2주)', months: [8], description: '이탈리아 최대 휴가 시즌. 로마 현지 식당·상점 상당수가 2~4주간 문을 닫습니다. 기온 35~42도로 야외 관광 매우 힘든 시기.', type: 'warning', impact: 'avoid', tip: '8월 로마는 피하거나 에어컨 있는 박물관 위주 관광. 5~6월 또는 9~10월이 훨씬 좋습니다.' },
    { name: '로마 영화제', period: '10월 중순 (약 10일간)', months: [10], description: '칸·베니스에 버금가는 로마 국제 영화제. 아우디토리움 무지카 부근에서 야외 상영과 스타 레드카펫 행사.', type: 'event', impact: 'positive', tip: '10월 로마는 날씨·인파·가격 모두 최적. 가장 추천하는 로마 방문 시기.' },
    { name: '로마 마라톤', period: '3월 (이른 봄)', months: [3], description: '콜로세움·포로 로마노·바티칸을 달리는 역사 속 마라톤. 오전 도심 일부 도로 통제.', type: 'event', impact: 'caution', tip: '마라톤 당일 대중교통 이용 권장. 참가 등록은 수개월 전 마감.' },
  ],

  '베네치아': [
    { name: '베네치아 카니발레', period: '2월 (재의 수요일 전 약 2주)', months: [1,2], description: '세계 3대 카니발 중 하나. 화려한 가면과 의상을 입은 사람들이 산 마르코 광장을 가득 메웁니다. 1,000년 전통의 세계 최고 가면 축제.', type: 'festival', impact: 'positive', tip: '가면·의상 대여 가능. 주말 최고 혼잡. 숙소는 6개월 전 예약 필수.' },
    { name: '베네치아 비엔날레 (미술)', period: '홀수해 6월 ~ 11월', months: [6,7,8,9,10,11], description: '세계 최대 현대 미술 전시. 전 세계 80여 개국 작가 참여. 자르디니·아르세날레 전시장이 메인. 2027년 개최 예정.', type: 'event', impact: 'positive', tip: '일반 입장권 온라인 구매. 오전 일찍 입장하면 비교적 한산.' },
    { name: '아쿠아 알타 (만조 침수)', period: '10월 ~ 3월', months: [10,11,12,1,2,3], description: '베네치아 특유의 조수 현상으로 산 마르코 광장 등 저지대가 물에 잠깁니다.', type: 'warning', impact: 'caution', tip: '호텔에서 장화 대여 가능. 도시 곳곳의 임시 보행 목교를 따라 이동.' },
    { name: '레덴토레 축제', period: '7월 셋째 주 토요일', months: [7], description: '주데카 운하 위 임시 다리를 건너는 전통 행사 후 화려한 불꽃놀이. 베네치아 최대 여름 축제.', type: 'festival', impact: 'positive', tip: '자르디니 공원 또는 리도섬에서 불꽃놀이 감상 추천.' },
  ],

  '피렌체': [
    { name: '스코피오 델 카로 (부활절 불꽃 마차)', period: '부활절 일요일', months: [3,4], description: '두오모 앞 수백 년 전통의 마차 폭죽 행사. 비둘기 모양 로켓이 마차를 향해 날아가 폭죽을 폭발시키는 피렌체만의 독특한 부활절 의식.', type: 'festival', impact: 'positive', tip: '두오모 광장 행사 1~2시간 전 자리 잡기. 오전 11시경 시작.' },
    { name: '마지오 무지칼레 피오렌티노', period: '4월 말 ~ 6월', months: [4,5,6], description: '이탈리아 최고 수준의 오페라·클래식 음악 축제. 볼로냐와 함께 이탈리아 양대 음악 축제.', type: 'festival', impact: 'positive', tip: '공연 티켓 공식 사이트에서 사전 구매. 5~6월 피렌체는 날씨도 완벽.' },
    { name: '여름 극혼잡', period: '7~8월', months: [7,8], description: '피렌체 여름은 섭씨 38~42도. 우피치·아카데미아 미술관 대기 4~5시간. 8월 현지 식당 다수 휴업.', type: 'warning', impact: 'caution', tip: '우피치·다비드 상은 최소 2개월 전 온라인 예약 필수. 여름엔 새벽 일찍 명소 방문.' },
  ],

  // ─── 스페인 ───
  '바르셀로나': [
    { name: '라 메르세 축제', period: '9월 24일 전후 (1주간)', months: [9], description: '바르셀로나 수호성인 축제. 무료 콘서트·카스텔레르(인간 탑)·불꽃놀이·코레포크(불 축제). 현지인이 가장 사랑하는 축제로 모두 무료입니다.', type: 'festival', impact: 'positive', tip: '카스텔레르는 산타 마리아 델 마르 광장에서 관람. 불 축제는 야간 해변에서 진행.' },
    { name: '카르나발', period: '2월 말 ~ 3월 초 (사순절 40일 전)', months: [2,3], description: '바르셀로나 카니발. 화려한 의상 퍼레이드. 근교 시체스(차로 30분)는 세계적인 카니발 명소로 함께 방문하면 특별한 경험.', type: 'festival', impact: 'positive', tip: '시체스 카니발은 RENFE 기차 30분. 의상 참여 환영. 기차 예매 권장.' },
    { name: '여름 성수기 혼잡', period: '7~8월', months: [7,8], description: '바르셀로나 최대 관광 성수기. 사그라다 파밀리아 대기 3~4시간, 숙소 가격 3~4배. 해변(바르셀로네타) 발 디딜 틈 없음.', type: 'warning', impact: 'caution', tip: '사그라다 파밀리아·가우디 작품은 반드시 온라인 사전 예약. 오전 8시 개장에 맞춰 방문.' },
    { name: '세마나 산타 (성주간)', period: '3~4월 (부활절 전 1주)', months: [3,4], description: '종교 행렬과 공휴일. 카탈루냐 지방은 다른 지역보다 세속적이지만 공휴일로 일부 상점 휴무.', type: 'holiday', impact: 'caution', tip: '성주간 연휴에 스페인 국내 이동 교통이 혼잡. 숙소·렌터카 미리 예약.' },
  ],

  '마드리드': [
    { name: '산 이시드로 축제', period: '5월 15일 전후 (1~2주)', months: [5], description: '마드리드 수호성인 축제. 라스 벤타스 투우장 최고 경기, 무료 야외 공연, 사로수엘라(스페인 전통 오페라). 현지 전통 의상 추라파가 거리를 채웁니다.', type: 'festival', impact: 'positive', tip: '레티로 공원 야외 음악회·미술 전시 무료. 5월 마드리드 날씨 최고.' },
    { name: '레예스 마고스 (동방박사의 날)', period: '1월 6일', months: [1], description: '스페인에서 크리스마스보다 중요한 날. 화려한 동방박사 퍼레이드가 알칼라 거리에서 진행되고 사탕을 던집니다.', type: 'festival', impact: 'positive', tip: '1월 5일 저녁 퍼레이드. 아이들과 함께라면 최고의 경험. 혼잡 대비 필요.' },
    { name: '여름 성수기', period: '7~8월', months: [7,8], description: '마드리드 여름은 38~42도. 프라도 미술관·레이나 소피아 등 실내 관광 위주로 일정 짜는 것이 현명합니다.', type: 'warning', impact: 'caution', tip: '오전 9~12시, 저녁 7시 이후에 야외 활동. 낮 12~6시는 실내 미술관 투어로 대체.' },
  ],

  // ─── 미국 ───
  '로스앤젤레스': [
    { name: '아카데미 시상식 & 시상식 시즌', period: '2~3월', months: [2,3], description: '오스카·골든글로브 등 할리우드 시상식 시즌. 돌비 시어터 일대 도로 통제. 스타 트레일 투어·유니버설 스튜디오 방문 최적기.', type: 'event', impact: 'positive', tip: '3월 LA 날씨 최고. 오스카 레드카펫은 시상식 당일 일반 관람 구역에서 무료 관람 가능.' },
    { name: '코첼라 밸리 뮤직 페스티벌', period: '4월 둘째·셋째 주말', months: [4], description: '세계 최대 음악 페스티벌. LA에서 차로 2시간 팜스프링스 인근 사막에서 개최. 비욘세·테일러 스위프트 등 최고 아티스트 헤드라인.', type: 'festival', impact: 'positive', tip: '티켓은 10월에 발매, 수 분 내 매진. 캠핑 패키지 포함. 4월 사막 기온 30~38도.' },
    { name: '산타아나 바람 & 산불 시즌', period: '10월 ~ 1월', months: [10,11,12,1], description: '건조한 산타아나 바람이 불 때 LA 외곽 산불 위험 급증. 대형 산불 발생 시 공항 접근로 통제·항공 딜레이 가능.', type: 'warning', impact: 'caution', tip: '출발 전 캘리포니아 산불 현황 확인. 여행자보험에 자연재해 항목 포함 여부 확인 필수.' },
    { name: '독립기념일', period: '7월 4일', months: [7], description: '미국 독립기념일. LA 곳곳에서 불꽃놀이 행사. 그리피스 공원·산타모니카 부두 불꽃놀이 유명.', type: 'festival', impact: 'positive', tip: '그리피스 천문대 언덕에서 LA 불꽃놀이 파노라마 뷰 감상 가능. 자리 오후 3~4시 선점.' },
  ],

  '시드니': [
    { name: '시드니 새해 불꽃놀이', period: '12월 31일 자정', months: [12], description: '세계 최초 새해 불꽃놀이 (서울보다 2시간 앞서 시작). 하버 브리지·오페라 하우스 배경으로 30분간 10만 발 불꽃. 세계 최고 수준의 새해 이벤트입니다.', type: 'festival', impact: 'positive', tip: '밀슨즈 포인트·보타닉 가든 관람 명당은 오후 3~4시부터 자리 확보. 유료 행사 티켓은 6개월 전 예매.' },
    { name: '비비드 시드니 (빛의 축제)', period: '5월 말 ~ 6월 중순', months: [5,6], description: '시드니 오페라 하우스·하버 브리지 등에 미디어 아트가 투영되는 빛 축제. 라이브 음악·푸드 이벤트 동반. 매년 300만 명 방문.', type: 'festival', impact: 'positive', tip: '원형 부두(Circular Quay)~달링하버 구간 도보 코스. 입장 무료. 주말 극혼잡.' },
    { name: '남반구 겨울 비수기', period: '6월 ~ 8월', months: [6,7,8], description: '시드니 겨울은 온화함(10~18도). 한국의 봄 날씨. 비수기라 숙소 가격 합리적. 겨울에도 본다이 비치 산책 가능.', type: 'event', impact: 'positive', tip: '비수기라 숙소 가격 절반. 7~8월 고래 관찰 투어도 가능합니다.' },
    { name: '남반구 여름 성수기', period: '12월 ~ 2월', months: [12,1,2], description: '시드니 여름(남반구). 해변 시즌 최성수기. 본다이·맨리 비치 인파 최고. 크리스마스~새해는 전 세계 여행자로 극혼잡.', type: 'event', impact: 'caution', tip: '성수기 숙소는 3개월 전 예약. 새해 불꽃놀이 명당 자리는 경쟁 매우 치열.' },
  ],

  '멜버른': [
    { name: '호주 오픈 테니스', period: '1월 중순 ~ 말 (약 2주)', months: [1], description: '세계 4대 테니스 그랜드슬램 첫 번째. 멜버른 파크에서 개최. 전 세계 테니스 팬이 몰리는 멜버른 최대 이벤트.', type: 'event', impact: 'positive', tip: '빅티켓(센터 코트)은 6~9개월 전 예매. 아웃사이드 코트 데이 패스는 당일 구매 가능.' },
    { name: 'F1 오스트레일리아 그랑프리', period: '3월 셋째~넷째 주말', months: [3], description: 'F1 시즌 개막 그랑프리. 앨버트 파크 호수 서킷에서 개최. 멜버른 전체가 F1 분위기.', type: 'event', impact: 'positive', tip: '목요일 피트 레인 오픈(무료 구역)에서 머신 가까이서 볼 수 있습니다.' },
    { name: '멜버른 컵 (말 경주)', period: '11월 첫째 화요일', months: [11], description: '"온 국민이 멈추는 날". 빅토리아주 공휴일. 화려한 패션 쇼와 함께하는 세계적 경마 이벤트. 플레밍턴 경마장에서 개최.', type: 'festival', impact: 'positive', tip: '드레스 코드 엄격 (정장·모자). 경마장 입장권 5~6개월 전 예매.' },
  ],

  // ─── 홍콩 ───
  '홍콩': [
    { name: '춘절 (중국 설날)', period: '1~2월 (음력, 매년 날짜 변동)', months: [1,2], description: '홍콩 최대 명절. 빅토리아 항구 불꽃놀이(춘절 당일 밤)와 시내 꽃시장이 화려합니다. 상점 일부 2~4일 휴업하지만 관광 명소는 대부분 운영.', type: 'festival', impact: 'positive', tip: '춘절 불꽃놀이는 침사추이 해변가 최고 명당. 오후 6시 이전 자리 확보 필수.' },
    { name: '용선 경기 (드래곤 보트)', period: '음력 5월 5일 (보통 6월)', months: [5,6], description: '스탠리·포우만에서 용선 경기 관람 가능. 쫑쯔(대나무 잎 찰밥) 먹는 날. 스탠리 비치 경기가 가장 유명합니다.', type: 'festival', impact: 'positive', tip: '스탠리까지는 버스 6X번 이용. 당일 오전부터 혼잡하므로 이른 이동 권장.' },
    { name: '중추절 (추석)', period: '음력 8월 15일 (보통 9~10월)', months: [9,10], description: '빅토리아 파크 중추절 등불 박람회. 전통 월병을 즐기며 달 감상. 빅토리아 피크에서 달빛과 야경을 즐기는 홍콩 최고의 낭만.', type: 'festival', impact: 'positive', tip: '빅토리아 피크 트램은 이날 대기 2~3시간. 미니버스 이용 추천.' },
    { name: '태풍 시즌', period: '6월 ~ 10월', months: [6,7,8,9,10], description: '홍콩 태풍 시즌. 신호 8호 이상 발령 시 모든 교통·상점·학교 폐쇄. 10호는 드물지만 직격 태풍 시 신변 안전 주의.', type: 'warning', impact: 'caution', tip: '홍콩 천문대 앱 실시간 확인. 신호 1~3호는 일상적, 8호 이상이면 실내 대피.' },
  ],

  // ─── 대만 ───
  '타이베이': [
    { name: '타이베이 등불 축제', period: '정월 대보름 (음력 1월 15일)', months: [1,2], description: '타이베이 최대 등불 축제. 자유광장에서 화려한 등불과 레이저 쇼. 핑시 천등 날리기 체험도 함께 진행됩니다.', type: 'festival', impact: 'positive', tip: '핑시 천등 날리기는 지하철+기차 약 1시간. 행운 글귀 적어 날리기 체험 강추.' },
    { name: '춘절 연휴', period: '1~2월 (음력, 매년 날짜 변동)', months: [1,2], description: '대만 최대 명절. 현지 야시장·식당 일부 4~6일 휴업. 지우펀·예류·화롄 등 명소는 대만 관광객으로 극혼잡합니다.', type: 'holiday', impact: 'caution', tip: '명소는 대만인 국내 여행자로 넘침. 전날 저녁이나 아침 일찍 방문이 최선.' },
    { name: '쌍십절 (국경절)', period: '10월 10일', months: [10], description: '대만 국경절. 총통부 앞 광장에서 대규모 열병식·공연. 공휴일로 일부 상점 휴무.', type: 'holiday', impact: 'positive', tip: '총통부 행사는 오전 9시 시작. 중정기념당과 함께 방문 추천.' },
    { name: '중추절 바비큐', period: '음력 8월 15일 (9~10월)', months: [9,10], description: '대만 중추절은 특별히 "바비큐 명절"로 변화. 모든 가족이 옥상·공원에서 바비큐를 즐기는 독특한 문화.', type: 'festival', impact: 'positive', tip: '현지인과 친해졌다면 바비큐 초대를 꼭 수락하세요.' },
  ],

  // ─── 이스탄불 (터키) ───
  '이스탄불': [
    { name: '이스탄불 튤립 축제', period: '4월 한 달간', months: [4], description: '에밀간 공원 등 이스탄불 전역에 1,500만 송이 튤립이 만개합니다. 튤립은 오스만 제국의 상징. 보스포루스 배경의 꽃밭이 장관.', type: 'festival', impact: 'positive', tip: '에밀간 공원이 최고 명소. 4월 이스탄불은 날씨도 좋고 성수기 전이라 가성비 최고.' },
    { name: '라마단 & 이프타르', period: '이슬람력 기준 (매년 약 11일씩 앞당겨짐)', months: [1,2,3,4,5,6,7,8,9,10,11,12], description: '라마단 기간 일몰 후 이프타르(금식 해제) 식사로 도시가 축제 분위기. 대부분 레스토랑은 정상 영업하지만 일부 음식점 낮 영업 단축.', type: 'event', impact: 'caution', tip: '이프타르 식사는 현지 레스토랑에서 꼭 체험해보세요. 라마단 중 술집·바는 제한적.' },
    { name: '이스탄불 음악 페스티벌', period: '6월', months: [6], description: '아야 이리니 교회·룸엘리 히사르 성에서 클래식·재즈 공연. 역사적 배경과 음악이 어우러지는 특별한 공연.', type: 'festival', impact: 'positive', tip: '공연 티켓 공식 사이트에서 사전 예매. 6월 이스탄불 날씨 최고 시기.' },
    { name: '관광 성수기', period: '4월 ~ 10월', months: [4,5,6,7,8,9,10], description: '이스탄불 최고 여행 시기. 7~8월 가장 덥고 혼잡. 4~5월, 9~10월이 날씨·인파·가격 균형 최적.', type: 'event', impact: 'positive', tip: '4~5월 또는 9~10월 방문이 가장 추천. 이 시기 카파도키아 연계 여행도 완벽.' },
  ],

  // ─── 그리스 ───
  '아테네': [
    { name: '정교회 부활절', period: '3~5월 (서방 부활절보다 1~4주 늦은 경우 많음)', months: [3,4,5], description: '그리스 최대 명절. 부활절 전야 자정 교회에서 촛불을 전하는 "아나스타시" 의식이 장관. 양 통구이를 온 가족이 즐기는 명절.', type: 'festival', impact: 'positive', tip: '대형 교회(미트로폴리스 성당) 자정 행사 참석 가능. 공연 종료 후 거리에서 떠들썩한 축제 분위기.' },
    { name: '여름 성수기', period: '6월 ~ 9월', months: [6,7,8,9], description: '아테네 최고 성수기. 아크로폴리스 입장 대기 1~2시간, 기온 35~42도.', type: 'warning', impact: 'caution', tip: '아크로폴리스는 오전 8~9시 방문이 필수. 정오 이후 직사광선+달궈진 대리석으로 매우 힘듭니다.' },
    { name: '아테네 클래식 마라톤', period: '11월 (첫째 주 일요일)', months: [11], description: '마라톤 전투 발원지에서 열리는 정통 마라톤. 마라톤 마을~판아테나이코 경기장 (42.195km) 역사적 코스.', type: 'event', impact: 'positive', tip: '11월 아테네 날씨 선선. 참가 또는 관람 가능. 판아테나이코 경기장 도착 장면이 감동적.' },
  ],

  '산토리니': [
    { name: '성수기 혼잡', period: '6월 ~ 9월', months: [6,7,8,9], description: '이아(Oia) 마을 일몰 명당은 오후 5시부터 1,000명 이상 모입니다. 숙소 4~5배, 레스토랑 1~2시간 대기.', type: 'warning', impact: 'caution', tip: '이아 일몰은 나비기스 비치 방향 골목에서도 볼 수 있습니다. 이아 광장보다 덜 혼잡.' },
    { name: '비수기 낭만', period: '4~5월 / 10~11월', months: [4,5,10,11], description: '성수기 대비 가격 절반, 인파 1/4. 꽃이 피는 봄과 포도 수확기 10월은 산토리니 진짜 매력을 즐길 수 있는 시기.', type: 'event', impact: 'positive', tip: '10월은 포도 수확 체험 와이너리 투어 가능. 봄은 칼데라 뷰 레스토랑 예약이 여유롭습니다.' },
    { name: '겨울 폐장 시즌', period: '11월 말 ~ 3월', months: [11,12,1,2,3], description: '대부분의 레스토랑·호텔·투어 서비스가 폐장합니다. 운영 중인 숙소·식당 찾기 매우 어렵습니다.', type: 'warning', impact: 'avoid', tip: '겨울 산토리니 방문은 비추천. 아테네 또는 크레타가 겨울에도 운영합니다.' },
  ],

  // ─── 퀘벡시티 (캐나다) ───
  '퀘벡시티': [
    { name: '퀘벡 겨울 카니발', period: '2월 초~중 (약 2주)', months: [2], description: '세계 최대 겨울 축제 중 하나. 눈 조각 경연·개썰매·아이스바·보나옴(카니발 마스코트). 영하 20도 칼바람 속에서 즐기는 퀘벡만의 겨울 문화.', type: 'festival', impact: 'positive', tip: '두꺼운 방한복 필수. 카니발 패스 구매 추천. 올드 퀘벡 성벽 내 행사장 집중.' },
    { name: '퀘벡 여름 페스티벌', period: '7월 초 (약 11일)', months: [7], description: '북미 최대 야외 음악 축제. 플레인스 오브 아브라함에서 세계적 아티스트 무료~유료 공연.', type: 'festival', impact: 'positive', tip: '무료 야외 공연 많음. 7월 퀘벡 날씨 가장 쾌적. 숙소는 2~3개월 전 예약.' },
  ],

  // ─── 리스본 (포르투갈) ───
  '리스본': [
    { name: '산투 안토니우 축제 (이정의 밤)', period: '6월 12~13일', months: [6], description: '리스본 최대 연례 축제. 알파마·모우라리아 골목에서 정어리 구이·빈주·파두 공연. 6월 12일 자정부터 아침까지 온 도시가 거리 파티.', type: 'festival', impact: 'positive', tip: '알파마 구시가 골목이 가장 활기찹니다. 정어리(사르디냐)는 꼭 드세요.' },
    { name: '리스본 카르나발', period: '2월 말 ~ 3월 초', months: [2,3], description: '리스본 카니발. 시내 퍼레이드와 가면 파티. 2월 리스본 날씨 15도 안팎으로 선선.', type: 'festival', impact: 'positive', tip: '가을 코트 하나 챙기세요. 리스본 카니발은 브라질보다 작지만 유럽 분위기로 특별합니다.' },
    { name: '여름 성수기', period: '7~8월', months: [7,8], description: '리스본 최고 성수기. 나자레·카스카이스·신트라 극혼잡. 벨렝탑·제로니무스 수도원 대기 1~2시간.', type: 'warning', impact: 'caution', tip: '제로니무스 수도원 온라인 사전 예약 필수. 에그 타르트(파스텔 데 나타) 벨렝 원조 가게는 아침 방문 추천.' },
  ],

  '포르투': [
    { name: '상 주앙 축제', period: '6월 23~24일', months: [6], description: '포르투 최대 명절. 6월 23일 밤 자정부터 도시 전체가 거리 파티로 변합니다. 플라스틱 망치로 서로 머리를 치고 마늘 꽃을 선물하는 기묘한 전통. 불꽃놀이·콘서트.', type: 'festival', impact: 'positive', tip: '망치 맞을 준비하고(!) 현지 분위기에 동참하면 최고의 밤. 아벤이다 다 보아비스타에서 무료 콘서트.' },
  ],

  // ─── 멕시코 ───
  '칸쿤': [
    { name: '디아 데 무에르토스', period: '11월 1~2일', months: [11], description: 'UNESCO 무형문화유산. 멕시코 전통 제단과 해골 의상. Xcaret 테마파크의 죽은 자의 날 행사 추천.', type: 'festival', impact: 'positive', tip: 'Xcaret 사전 온라인 예약 필수. 정통 체험은 오아하카·멕시코시티가 더 좋습니다.' },
    { name: '허리케인 시즌', period: '6월 ~ 11월', months: [6,7,8,9,10,11], description: '카리브해 허리케인 시즌. 특히 8~10월 위험. 허리케인 직격 시 항공편 전면 취소·호텔 대피.', type: 'warning', impact: 'avoid', tip: '6~11월 칸쿤 여행은 여행자보험 필수. 항공권 환불 조건 확인 필수.' },
    { name: '건기 & 최적 시즌', period: '12월 ~ 4월', months: [12,1,2,3,4], description: '칸쿤 최고 여행 시기. 맑은 날씨, 에메랄드 바다, 30도 안팎의 쾌적한 기온.', type: 'event', impact: 'positive', tip: '12~1월은 성수기로 가격 최고. 성수기 피하려면 4~5월 전환 시점 추천.' },
  ],
};

// ─────────────────────────────────────────────
// 국가별 공통 축제 (매핑 없는 도시 폴백)
// ─────────────────────────────────────────────
export const countryFestivalMap: Record<string, FestivalEvent[]> = {

  '일본': [
    { name: '벚꽃 시즌 (하나미)', period: '3월 말 ~ 4월 초', months: [3,4], description: '일본 최고의 봄 이벤트. 도심 공원·강변 일대가 벚꽃으로 뒤덮입니다. 숙소·교통이 극혼잡해지며 가격도 급등합니다.', type: 'festival', impact: 'positive', tip: '항공권·숙소는 최소 3개월 전 예약. 평일 이른 아침(7시 이전)에 명소를 먼저 둘러보세요.' },
    { name: '골든위크 (황금연휴)', period: '4월 29일 ~ 5월 5일', months: [4,5], description: '일본 최대 연휴. 관광지·신칸센·숙소 모두 2배 이상 가격이 오르고 극도로 혼잡합니다.', type: 'holiday', impact: 'avoid', tip: '피하거나, 피할 수 없다면 6개월 전 예약이 필수입니다.' },
    { name: '오봉 연휴', period: '8월 13~16일', months: [8], description: '일본 귀성 시즌. 신칸센·고속도로 극혼잡. 도심 관광지는 오히려 한산해지는 경우도 있습니다.', type: 'holiday', impact: 'caution', tip: '장거리 이동 티켓은 2개월 전 예매 필수.' },
    { name: '단풍 시즌', period: '11월 중순 ~ 12월 초', months: [11,12], description: '일본 단풍 시즌. 각 도시 유명 공원·산사에서 단풍이 절경을 이룹니다. 벚꽃 시즌 못지않게 인기.', type: 'festival', impact: 'positive', tip: '야간 라이트업은 사전 예약 필수인 곳이 많습니다.' },
    { name: '연말연시 (오쇼가쓰)', period: '12월 31일 ~ 1월 3일', months: [12,1], description: '대부분의 상점·식당이 휴업하며 신사에서 하쓰모데(새해 참배) 인파가 몰립니다.', type: 'holiday', impact: 'caution', tip: '편의점·패밀리레스토랑은 영업. 31일 자정 신사 카운트다운은 특별한 경험.' },
  ],

  '태국': [
    { name: '송크란 (태국 물 축제)', period: '4월 13~15일', months: [4], description: '태국 최대 명절. 거리 전체에서 물 싸움이 벌어집니다. 외국인도 완전히 참여 가능한 국민 축제.', type: 'festival', impact: 'positive', tip: '방수팩·방수 케이스 필수. 중요 물품은 호텔 보관. 하얀 옷 피하기.' },
    { name: '로이 끄라통 (빛의 축제)', period: '11월 보름달 날', months: [11], description: '연꽃 모양 등불을 강이나 연못에 띄우는 아름다운 축제. 치앙마이 이펑 축제와 같은 날.', type: 'festival', impact: 'positive', tip: '치앙마이가 방콕보다 훨씬 장관입니다. 등불은 현장에서 구매.' },
    { name: '우기 스콜 시즌', period: '5월 ~ 10월', months: [5,6,7,8,9,10], description: '매일 오후 2~5시 강한 스콜이 20~40분 내립니다. 교통 체증 평소의 3배 이상.', type: 'warning', impact: 'caution', tip: '오전에 야외 관광, 오후는 실내(쇼핑몰·사원 내부)로 일정 조정.' },
    { name: '태국 국왕 생일·국경일', period: '12월 5일', months: [12], description: '대규모 국경일 기념행사. 태국 왕실에 대한 경의가 국법으로 의무화되어 있습니다.', type: 'holiday', impact: 'caution', tip: '왕실 관련 발언·사진에 절대 주의. 왕실 모독죄(레세마제스테)는 외국인도 처벌 대상.' },
  ],

  '베트남': [
    { name: '뗏 (베트남 설날)', period: '1~2월 (음력, 매년 날짜 변동)', months: [1,2], description: '베트남 최대 명절. 대부분의 상점·식당이 1~2주 휴업. 이동이 불편해집니다.', type: 'holiday', impact: 'caution', tip: '호텔·대형 레스토랑은 영업. 뗏 전주의 꽃 시장과 활기찬 분위기는 오히려 볼거리.' },
    { name: '베트남 독립기념일', period: '9월 2일', months: [9], description: '베트남 최대 국경일. 각 도시 광장에서 기념 행사·불꽃놀이. 공휴일로 일부 상점 휴무.', type: 'holiday', impact: 'positive', tip: '밤 불꽃놀이는 각 도시 강변 또는 중앙 광장에서 무료 관람 가능.' },
  ],

  '유럽 - 프랑스': [
    { name: '바스티유 데이 (혁명 기념일)', period: '7월 14일', months: [7], description: '에펠탑 불꽃놀이와 샹젤리제 군사 퍼레이드. 프랑스 최대 국경일.', type: 'festival', impact: 'positive', tip: '트로카데로 광장이 불꽃놀이 최고 명당. 오후 3시 이전 도착. 소매치기 극주의.' },
    { name: '8월 바캉스 시즌', period: '8월', months: [8], description: '프랑스인 대부분이 8월에 휴가를 떠나 현지 상점 상당수가 휴업합니다.', type: 'warning', impact: 'caution', tip: '방문 전 구글맵으로 영업 여부 확인 필수.' },
    { name: '크리스마스 마켓', period: '11월 말 ~ 12월 24일', months: [11,12], description: '프랑스 각 도시에서 크리스마스 마켓이 열립니다. 뱅쇼(뜨거운 와인)와 크레페로 유럽 겨울 낭만.', type: 'festival', impact: 'positive', tip: '스트라스부르 크리스마스 마켓이 프랑스에서 가장 유명합니다.' },
  ],

  '유럽 - 이탈리아': [
    { name: '페라고스토 (8월 중순 대휴가)', period: '8월 15일 전후', months: [8], description: '이탈리아 최대 휴가 시즌. 현지 식당·상점 대거 2~4주 휴업. 관광지는 열리지만 기온 35~42도로 야외 관광이 힘듭니다.', type: 'warning', impact: 'avoid', tip: '5~6월 또는 9~10월이 이탈리아 여행 최적 시기.' },
    { name: '카르네발레 (카니발)', period: '2월 (재의 수요일 전 2주)', months: [1,2], description: '이탈리아 전국 카니발. 베네치아가 가장 유명하지만 다른 도시도 화려한 행사를 즐깁니다.', type: 'festival', impact: 'positive', tip: '베네치아 카니발 기간 숙소는 6개월 전 예약 필수.' },
    { name: '부활절 & 성주간', period: '3~4월', months: [3,4], description: '이탈리아 최대 종교 명절. 각 도시마다 성주간 행렬과 의식이 열립니다.', type: 'festival', impact: 'positive', tip: '로마 바티칸 부활절 미사가 세계 최대. 성주간 숙소는 3개월 전 예약.' },
  ],

  '유럽 - 스페인': [
    { name: '세마나 산타 (성주간)', period: '3~4월 (부활절 전 1주)', months: [3,4], description: '스페인 최대 종교 행렬 주간. 세비야와 말라가 행렬이 특히 유명합니다.', type: 'festival', impact: 'positive', tip: '세비야 성주간 숙소는 1년 전 예약 권장. 인파 극심.' },
    { name: '스페인 국경일', period: '10월 12일', months: [10], description: '히스파니다드의 날. 마드리드에서 대규모 열병식.', type: 'holiday', impact: 'positive', tip: '공휴일로 일부 상점 휴무. 마드리드 프라도 미술관은 무료 입장 시간 있음.' },
    { name: '여름 성수기', period: '7~8월', months: [7,8], description: '스페인 여름은 38~42도(특히 남부). 관광 성수기이지만 야외 활동이 힘든 더위.', type: 'warning', impact: 'caution', tip: '오전·저녁에 야외 활동. 한낮은 실내 피난. 지중해 해변 도시는 여름이 오히려 최성수기.' },
  ],

  '미국': [
    { name: '독립기념일', period: '7월 4일', months: [7], description: '미국 최대 국경일. 전국 주요 도시에서 불꽃놀이 행사. 뉴욕 허드슨강, LA 그리피스 공원, DC 내셔널몰 불꽃놀이가 유명.', type: 'festival', impact: 'positive', tip: '불꽃놀이 명당은 오후 3~4시부터 자리 잡기.' },
    { name: '추수감사절 (Thanksgiving)', period: '11월 넷째 목요일', months: [11], description: '미국 최대 가족 명절. 대부분의 상점·레스토랑 휴업 또는 단축 영업. 다음날 블랙프라이데이 쇼핑 시작.', type: 'holiday', impact: 'caution', tip: '추수감사절 당일 식사할 레스토랑 사전 예약 필수. 관광지는 대부분 운영.' },
    { name: '크리스마스 & 연말', period: '12월 25일 ~ 1월 1일', months: [12,1], description: '연말 연휴 시즌. 뉴욕 타임스퀘어 볼 드롭, LA 로즈 퍼레이드 (1/1) 등 미국 최대 이벤트.', type: 'festival', impact: 'positive', tip: '연말 숙소·항공은 6개월 전 예약 권장. 타임스퀘어 새해 인파는 100만 명 이상.' },
  ],

  '영국': [
    { name: '가이 포크스 나이트', period: '11월 5일', months: [11], description: '전국 불꽃놀이 영국 전통 축제. 런던은 배터시 파크·알렉산드라 팰리스 불꽃놀이가 유명합니다.', type: 'festival', impact: 'positive', tip: '무료 공공 불꽃놀이가 전국에서 열립니다. 두꺼운 방한복 필수.' },
    { name: '에든버러 프린지 페스티벌', period: '8월 초~말 (약 3주)', months: [8], description: '세계 최대 예술 축제. 에든버러 도시 전체가 공연 무대로 변합니다. 3,500개 이상의 공연. 코미디·연극·음악·무용.', type: 'festival', impact: 'positive', tip: '무료 공연도 수백 개. 인기 공연은 6개월 전 예매. 8월 에든버러 숙소는 1년 전 예약 필요.' },
    { name: '크리스마스 & 복싱데이', period: '12월 25일 ~ 26일', months: [12], description: '영국 최대 연휴. 12월 26일 복싱데이는 쇼핑 세일 시즌. 상점 대부분 12월 25일 휴업.', type: 'holiday', impact: 'caution', tip: '크리스마스 당일 여행 계획은 현지 영업 여부 사전 확인 필수.' },
  ],

  '호주': [
    { name: '호주 국경일 (Australia Day)', period: '1월 26일', months: [1], description: '호주 건국 기념일. 공휴일로 불꽃놀이·콘서트. 일부 도시에서는 시위 및 대안 행사도 열립니다.', type: 'holiday', impact: 'positive', tip: '남반구 한여름(1월). 시드니 하버에서 행사 관람 추천.' },
    { name: '안작 데이 (ANZAC Day)', period: '4월 25일', months: [4], description: '호주·뉴질랜드 전몰 장병 추모일. 새벽 Dawn Service와 퍼레이드. 공휴일로 상점 오전 휴업.', type: 'holiday', impact: 'positive', tip: '멜버른·시드니 새벽 4시 30분 Dawn Service는 매우 엄숙하고 감동적인 경험.' },
    { name: '남반구 여름 성수기', period: '12월 ~ 2월', months: [12,1,2], description: '호주 여름 시즌. 크리스마스~새해·여름 방학 성수기로 숙소 가격 최고점. 새해 불꽃놀이는 세계 최초.', type: 'event', impact: 'caution', tip: '성수기 숙소는 3개월 전 예약. 해변 도시는 자외선 SPF 50+ 필수.' },
  ],

  '싱가포르': [
    { name: '차이니즈 뉴이어', period: '1~2월 (음력, 매년 날짜 변동)', months: [1,2], description: '차이나타운 전체가 화려한 붉은 장식으로. 리버 홍바오 이벤트·용춤·불꽃놀이.', type: 'festival', impact: 'positive', tip: '차이나타운 야간 조명 관람 추천. 리버 홍바오는 마리나베이 인근.' },
    { name: '싱가포르 국경일', period: '8월 9일', months: [8], description: '싱가포르 독립기념일. 마리나베이에서 화려한 국경일 퍼레이드와 불꽃놀이.', type: 'festival', impact: 'positive', tip: '마리나베이 샌즈 루프탑에서 퍼레이드·불꽃놀이 최고 뷰. 사전 예약 필수.' },
    { name: '디파발리 (빛의 축제)', period: '10~11월', months: [10,11], description: '리틀 인디아가 전통 등불로 빛납니다. 힌두교 최대 명절로 화려한 의상과 인도 음식 페스티벌.', type: 'festival', impact: 'positive', tip: '리틀 인디아 야간 방문 추천. 무스타파 센터에서 쇼핑+음식 체험.' },
  ],

  '홍콩': [
    { name: '춘절 (중국 설날)', period: '1~2월 (음력)', months: [1,2], description: '홍콩 최대 명절. 빅토리아 항구 불꽃놀이와 시내 꽃시장.', type: 'festival', impact: 'positive', tip: '춘절 불꽃놀이는 침사추이 해변가 최고 명당.' },
    { name: '태풍 시즌', period: '6월 ~ 10월', months: [6,7,8,9,10], description: '태풍 신호 8호 이상 발령 시 모든 교통·상점 폐쇄.', type: 'warning', impact: 'caution', tip: '홍콩 천문대 앱 실시간 확인 필수.' },
  ],

  '대만': [
    { name: '춘절 연휴', period: '1~2월 (음력)', months: [1,2], description: '대만 최대 명절. 현지 야시장·식당 일부 4~6일 휴업. 명소는 현지 관광객으로 극혼잡.', type: 'holiday', impact: 'caution', tip: '아침 일찍 명소 방문이 최선.' },
    { name: '쌍십절 (국경절)', period: '10월 10일', months: [10], description: '대만 국경절. 총통부 앞 열병식.', type: 'holiday', impact: 'positive', tip: '총통부 행사 오전 9시 시작. 중정기념당과 연계 방문.' },
  ],

  '중국': [
    { name: '춘절 황금연휴', period: '1~2월 (음력 설날, 약 1주일)', months: [1,2], description: '중국 최대 명절. 전국 대이동(춘윈)으로 교통 예약 매우 어렵습니다. 관광지 폭발적 혼잡.', type: 'holiday', impact: 'avoid', tip: '가능하면 춘절 1~2주 전후로 일정 잡기. 이 기간 중국 여행은 비추천.' },
    { name: '국경절 황금연휴', period: '10월 1~7일', months: [10], description: '중국 국경절 7일 연휴. 국내 관광 폭발. 만리장성·故宫 등 유명 명소 입장 불가 수준 혼잡.', type: 'holiday', impact: 'avoid', tip: '10월 황금연휴 직전(9월 하순) 또는 직후(10월 중순)가 날씨·혼잡 모두 양호.' },
    { name: '5월 노동절 연휴', period: '5월 1~5일', months: [5], description: '5일 연휴로 중국 내국인 여행 성수기. 관광지 극혼잡.', type: 'holiday', impact: 'caution', tip: '연휴 직전·직후 방문이 혼잡을 피하는 최선의 방법.' },
  ],

  '인도네시아': [
    { name: '이슬람 금식월 (라마단)', period: '이슬람력 기준 (매년 약 11일 앞당겨짐)', months: [1,2,3,4,5,6,7,8,9,10,11,12], description: '이슬람 금식월. 낮에 공공장소 음식·음료 소비 제한. 일부 식당 낮 영업 단축. 이프타르(일몰 후 식사) 분위기는 특별합니다.', type: 'holiday', impact: 'caution', tip: '발리는 힌두 문화 지역이라 라마단 영향이 비교적 적습니다. 자카르타 등 이슬람 도시는 영향 큼.' },
    { name: '인도네시아 독립기념일', period: '8월 17일', months: [8], description: '인도네시아 독립기념일. 각 도시 기념 행사와 경기 대회.', type: 'holiday', impact: 'positive', tip: '자카르타 독립궁전 행사가 가장 규모 큼.' },
  ],

  '말레이시아': [
    { name: '하리 메르데카 (독립기념일)', period: '8월 31일', months: [8], description: '말레이시아 독립기념일. 쿠알라룸푸르 메르데카 광장에서 대규모 퍼레이드.', type: 'festival', impact: 'positive', tip: '야간 조명과 불꽃놀이 감상 추천. 주요 도로 통제 예상.' },
    { name: '타이푸삼', period: '1~2월 (힌두력 기준)', months: [1,2], description: '힌두교 축제. 쿠알라룸푸르 바투 동굴에서 수십만 명이 참여하는 대규모 종교 행사. 신자들이 몸에 꼬챙이를 꽂고 272개 계단을 오르는 의식.', type: 'festival', impact: 'positive', tip: '이른 아침에 방문하면 인파가 덜합니다. 반바지·민소매 입장 불가.' },
    { name: '라마단 & 하리 라야', period: '이슬람력 기준', months: [1,2,3,4,5,6,7,8,9,10,11,12], description: '말레이시아 이슬람 금식월 및 이드 알피트르(하리 라야). 축제 기간 상점·식당 휴업, 귀성으로 교통 혼잡.', type: 'holiday', impact: 'caution', tip: '하리 라야 전날 저녁 라마단 야시장(바자 라마단) 체험 강추.' },
  ],

  '터키': [
    { name: '공화국 기념일', period: '10월 29일', months: [10], description: '터키 공화국 수립 기념일. 이스탄불·앙카라에서 퍼레이드와 불꽃놀이.', type: 'festival', impact: 'positive', tip: '이스탄불 탁심 광장 행사가 가장 활기차습니다.' },
    { name: '라마단 & 이드', period: '이슬람력 기준 (매년 약 11일 앞당겨짐)', months: [1,2,3,4,5,6,7,8,9,10,11,12], description: '이슬람 금식월과 이드 알피트르 연휴. 일부 식당 낮 영업 단축. 이드 연휴 중 대중교통 혼잡.', type: 'holiday', impact: 'caution', tip: '이프타르 식사는 꼭 현지 레스토랑에서 체험. 라마단 기간 음주는 공공장소에서 자제.' },
    { name: '관광 성수기', period: '4월 ~ 10월', months: [4,5,6,7,8,9,10], description: '터키 최고 여행 시기. 4~5월, 9~10월이 날씨·인파·가격 모두 최적.', type: 'event', impact: 'positive', tip: '카파도키아 열기구 투어는 4~10월 최적. 6~8개월 전 예약 권장.' },
  ],

  '그리스': [
    { name: '정교회 부활절', period: '3~5월 (서방 부활절보다 1~4주 늦은 경우 많음)', months: [3,4,5], description: '그리스 최대 명절. 자정 촛불 의식 "아나스타시"가 장관. 양 통구이 전통.', type: 'festival', impact: 'positive', tip: '그리스 어느 도시에서든 교회 자정 행사 참석 가능. 매우 감동적인 경험.' },
    { name: '여름 성수기', period: '6월 ~ 9월', months: [6,7,8,9], description: '그리스 최고 성수기. 모든 섬이 극혼잡. 기온 35~42도.', type: 'warning', impact: 'caution', tip: '산토리니·미코노스 성수기 숙소는 6개월 전 예약. 4~5월·10월이 가성비 최고.' },
    { name: '오히 데이', period: '10월 28일', months: [10], description: '2차 세계대전 이탈리아 침공 거절 기념일. 각 도시에서 퍼레이드.', type: 'holiday', impact: 'positive', tip: '아테네·테살로니키 퍼레이드가 가장 큽니다.' },
  ],

  '캐나다': [
    { name: '캐나다 데이 (Canada Day)', period: '7월 1일', months: [7], description: '캐나다 독립기념일. 오타와 국회의사당 앞 불꽃놀이가 가장 유명. 전국에서 축제.', type: 'festival', impact: 'positive', tip: '밴쿠버·토론토·몬트리올 등 주요 도시 모두 행사 진행. 공항 근처 명소는 아침부터 혼잡.' },
    { name: '추수감사절 (Thanksgiving)', period: '10월 둘째 월요일', months: [10], description: '캐나다 추수감사절. 미국보다 1개월 빠름. 가족 명절로 대부분의 가게 휴업.', type: 'holiday', impact: 'caution', tip: '추수감사절 전날부터 이동 혼잡. 대형 마트·레스토랑 예약 필요.' },
    { name: '겨울 스키 시즌', period: '12월 ~ 3월', months: [12,1,2,3], description: '휘슬러·밴프·퀘벡 스키 시즌 최성수기. 세계적 수준의 스키 리조트가 운영됩니다.', type: 'event', impact: 'positive', tip: '스키 숙소는 2~3개월 전 예약. 밴프 아이스필드 파크웨이 드라이브도 겨울에 장관.' },
  ],

  '뉴질랜드': [
    { name: '와이탕이 데이 (Waitangi Day)', period: '2월 6일', months: [2], description: '뉴질랜드 건국 기념일. 와이탕이 조약 체결지(베이 오브 아일랜즈)에서 원주민 마오리 문화 행사.', type: 'holiday', impact: 'positive', tip: '오클랜드에서 차로 3시간. 2월 뉴질랜드는 여름(남반구) 성수기.' },
    { name: '마타리키 (마오리 신년)', period: '6월 말 ~ 7월 초 (공휴일 지정)', months: [6,7], description: '마오리족 신년 축제. 2022년 공휴일로 지정된 뉴질랜드 새 전통 명절. 별자리 플레이아데스 출현을 기념.', type: 'festival', impact: 'positive', tip: '오클랜드·웰링턴 등 주요 도시에서 마오리 문화 공연·불꽃놀이 행사.' },
    { name: '남반구 겨울 비수기', period: '6월 ~ 8월', months: [6,7,8], description: '뉴질랜드 겨울(남반구). 퀸스타운 스키 시즌 절정. 온천·자연 트레킹은 계속 가능.', type: 'event', impact: 'positive', tip: '퀸스타운 겨울(남반구 7~8월) 스키 리조트 최성수기. 비수기라 숙박비 저렴.' },
  ],

  '포르투갈': [
    { name: '카르나발', period: '2월 말 ~ 3월 초', months: [2,3], description: '포르투갈 카니발. 리스본·포르투·아게다 등에서 화려한 퍼레이드.', type: 'festival', impact: 'positive', tip: '2월 포르투갈 날씨 15도 안팎. 시원하니 가디건 지참.' },
    { name: '포르투갈 국경일', period: '6월 10일', months: [6], description: '포르투갈 국경일. 리스본 산투 안토니우 축제와 겹쳐 6월 리스본이 최고 분위기.', type: 'festival', impact: 'positive', tip: '6월 리스본은 날씨도 좋고 축제도 많아 가장 추천하는 방문 시기.' },
    { name: '여름 성수기', period: '7~8월', months: [7,8], description: '포르투갈 최고 성수기. 리스본·포르투·알가르베 해변 극혼잡. 숙소 3배 가격.', type: 'warning', impact: 'caution', tip: '9~10월에 방문하면 날씨 여전히 좋고 가격은 절반.' },
  ],

  '모로코': [
    { name: '라마단 & 이드 알피트르', period: '이슬람력 기준 (매년 약 11일 앞당겨짐)', months: [1,2,3,4,5,6,7,8,9,10,11,12], description: '모로코 최대 종교 축제. 라마단 중 낮 식당 다수 휴업, 저녁 이프타르 분위기는 특별합니다.', type: 'holiday', impact: 'caution', tip: '라마단 중 공공장소 음식·음료 소비 자제. 이프타르 야시장 체험은 강추.' },
    { name: '마라케시 국제 영화제', period: '11월 말 ~ 12월 초', months: [11,12], description: '마라케시에서 열리는 아프리카 최대 영화제. 세계적 배우와 감독들이 방문.', type: 'event', impact: 'positive', tip: '11~12월 마라케시는 날씨가 쾌적(20도 안팎). 최고 여행 시기.' },
    { name: '여름 극더위', period: '6월 ~ 9월', months: [6,7,8,9], description: '사하라 인근 마라케시·페스는 여름 40~45도. 야외 활동이 매우 힘들며 일부 관광객 탈수 주의.', type: 'warning', impact: 'avoid', tip: '모로코 여행은 봄(3~5월)·가을(10~11월)이 최적. 여름은 강력 비추천.' },
  ],

  '두바이 (UAE)': [
    { name: '두바이 쇼핑 페스티벌', period: '12월 중순 ~ 2월 초', months: [12,1,2], description: '세계 최대 쇼핑 축제. 두바이 전역 할인·경품·콘서트. 글로벌 빌리지 동시 운영.', type: 'festival', impact: 'positive', tip: '글로벌 빌리지(10월~4월)는 두바이 최고의 가족 엔터테인먼트 명소.' },
    { name: 'UAE 국경일', period: '12월 2일', months: [12], description: 'UAE 건국 기념일. 대규모 불꽃놀이와 행사. 공공장소에 UAE 국기가 넘칩니다.', type: 'festival', impact: 'positive', tip: '부르즈 칼리파 분수쇼와 함께 국경일 불꽃놀이 감상 추천.' },
    { name: '두바이 극더위', period: '6월 ~ 9월', months: [6,7,8,9], description: '낮 최고기온 42~48도. 야외 활동 불가 수준. 실내 쇼핑몰 위주로 시간을 보냅니다.', type: 'warning', impact: 'caution', tip: '사막 사파리 등 야외 활동은 이른 아침(7~10시) 또는 야간으로 예약.' },
    { name: '라마단', period: '이슬람력 기준', months: [1,2,3,4,5,6,7,8,9,10,11,12], description: '공공장소 낮 음식·음료 소비 금지. 일부 레스토랑 낮 영업 단축.', type: 'holiday', impact: 'caution', tip: '쇼핑몰·호텔 내 식사는 가능. 이프타르 뷔페 체험은 두바이에서만 가능한 특별한 경험.' },
  ],

  '멕시코': [
    { name: '디아 데 무에르토스 (죽은 자의 날)', period: '11월 1~2일', months: [11], description: 'UNESCO 무형문화유산. 전통 제단·해골 의상·꽃 장식. 멕시코 전통 문화의 진수.', type: 'festival', impact: 'positive', tip: '오아하카·멕시코시티에서 가장 정통적인 체험 가능.' },
    { name: '독립기념일', period: '9월 16일 (전날 밤 "El Grito")', months: [9], description: '멕시코 독립기념일. 9월 15일 밤 소칼로 광장에서 대통령 독립 외침(El Grito) 행사.', type: 'festival', impact: 'positive', tip: '15일 밤 11시 그리토 행사 자리 오후 6시 이전 선점.' },
    { name: '세마나 산타 (성주간)', period: '3~4월 (부활절 전 1주)', months: [3,4], description: '멕시코 최대 연휴. 해변 도시(칸쿤·로스카보스)에 멕시코인 관광객이 몰려 극혼잡.', type: 'holiday', impact: 'caution', tip: '성주간 해변 숙소는 3개월 전 예약 필수.' },
  ],
};
