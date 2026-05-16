export interface DestinationOption {
  country: string;
  countryCode: string;
  cities: string[];
}

export const destinations: DestinationOption[] = [
  { country: '일본', countryCode: 'JP', cities: ['도쿄', '오사카', '교토', '삿포로', '후쿠오카', '나고야', '오키나와', '나라', '히로시마', '가마쿠라'] },
  { country: '태국', countryCode: 'TH', cities: ['방콕', '치앙마이', '푸껫', '파타야', '코사무이', '아유타야', '후아힌'] },
  { country: '베트남', countryCode: 'VN', cities: ['하노이', '호치민', '다낭', '호이안', '나트랑', '하롱베이', '달랏', '푸꾸옥'] },
  { country: '유럽 - 프랑스', countryCode: 'FR', cities: ['파리', '니스', '리옹', '마르세유', '보르도', '스트라스부르', '몽생미셸'] },
  { country: '유럽 - 이탈리아', countryCode: 'IT', cities: ['로마', '밀라노', '피렌체', '베네치아', '나폴리', '아말피', '친퀘테레', '시칠리아'] },
  { country: '유럽 - 스페인', countryCode: 'ES', cities: ['바르셀로나', '마드리드', '세비야', '그라나다', '발렌시아', '산세바스티안', '말라가'] },
  { country: '미국', countryCode: 'US', cities: ['뉴욕', '로스앤젤레스', '샌프란시스코', '라스베가스', '시카고', '하와이', '마이애미', '시애틀', '보스턴', '워싱턴 D.C.'] },
  { country: '영국', countryCode: 'GB', cities: ['런던', '에든버러', '옥스퍼드', '코츠월드', '맨체스터', '리버풀', '바스'] },
  { country: '호주', countryCode: 'AU', cities: ['시드니', '멜버른', '브리즈번', '골드코스트', '케언즈', '퍼스', '아들레이드', '울룰루'] },
  { country: '싱가포르', countryCode: 'SG', cities: ['싱가포르'] },
  { country: '홍콩', countryCode: 'HK', cities: ['홍콩'] },
  { country: '대만', countryCode: 'TW', cities: ['타이베이', '타이중', '타이난', '가오슝', '화롄', '지룽'] },
  { country: '중국', countryCode: 'CN', cities: ['베이징', '상하이', '청두', '시안', '항저우', '광저우', '계림', '장자제'] },
  { country: '인도네시아', countryCode: 'ID', cities: ['발리', '자카르타', '롬복', '보로부두르', '코모도', '길리 아이르'] },
  { country: '말레이시아', countryCode: 'MY', cities: ['쿠알라룸푸르', '페낭', '코타키나발루', '랑카위', '말라카'] },
  { country: '터키', countryCode: 'TR', cities: ['이스탄불', '카파도키아', '파묵칼레', '에페수스', '보드룸', '안탈리아'] },
  { country: '그리스', countryCode: 'GR', cities: ['아테네', '산토리니', '미코노스', '크레타', '로도스'] },
  { country: '캐나다', countryCode: 'CA', cities: ['밴쿠버', '토론토', '퀘벡시티', '몬트리올', '밴프', '나이아가라폴스'] },
  { country: '뉴질랜드', countryCode: 'NZ', cities: ['오클랜드', '퀸스타운', '크라이스트처치', '로토루아', '웰링턴', '밀포드사운드'] },
  { country: '포르투갈', countryCode: 'PT', cities: ['리스본', '포르투', '신트라', '알가르베', '마데이라'] },
  { country: '모로코', countryCode: 'MA', cities: ['마라케시', '페스', '카사블랑카', '샤우엔', '메르주가'] },
  { country: '두바이 (UAE)', countryCode: 'AE', cities: ['두바이', '아부다비'] },
  { country: '멕시코', countryCode: 'MX', cities: ['칸쿤', '멕시코시티', '과달라하라', '오아하카', '툴룸', '산 크리스토발'] },
];

// 국가별 통화 · 언어
export const countryInfo: Record<string, { currency: string; language: string }> = {
  '일본':           { currency: '엔 (JPY)',               language: '일본어' },
  '태국':           { currency: '바트 (THB)',             language: '태국어' },
  '베트남':         { currency: '동 (VND)',               language: '베트남어' },
  '유럽 - 프랑스':  { currency: '유로 (EUR)',             language: '프랑스어' },
  '유럽 - 이탈리아':{ currency: '유로 (EUR)',             language: '이탈리아어' },
  '유럽 - 스페인':  { currency: '유로 (EUR)',             language: '스페인어' },
  '미국':           { currency: '달러 (USD)',             language: '영어' },
  '영국':           { currency: '파운드 (GBP)',           language: '영어' },
  '호주':           { currency: '호주달러 (AUD)',         language: '영어' },
  '싱가포르':       { currency: '싱가포르달러 (SGD)',     language: '영어·중국어' },
  '홍콩':           { currency: '홍콩달러 (HKD)',         language: '광둥어·영어' },
  '대만':           { currency: '신타이완달러 (TWD)',     language: '중국어 (번체)' },
  '중국':           { currency: '위안 (CNY)',             language: '중국어 (표준어)' },
  '인도네시아':     { currency: '루피아 (IDR)',           language: '인도네시아어' },
  '말레이시아':     { currency: '링깃 (MYR)',             language: '말레이어·영어' },
  '터키':           { currency: '리라 (TRY)',             language: '터키어' },
  '그리스':         { currency: '유로 (EUR)',             language: '그리스어' },
  '캐나다':         { currency: '캐나다달러 (CAD)',       language: '영어·프랑스어' },
  '뉴질랜드':       { currency: '뉴질랜드달러 (NZD)',    language: '영어' },
  '포르투갈':       { currency: '유로 (EUR)',             language: '포르투갈어' },
  '모로코':         { currency: '모로코 디르함 (MAD)',    language: '아랍어·프랑스어' },
  '두바이 (UAE)':   { currency: '디르함 (AED)',           language: '아랍어 (영어 통용)' },
  '멕시코':         { currency: '페소 (MXN)',             language: '스페인어' },
};

// 국제공항이 있는 한국 도시 + 취항 가능 지역
export interface KoreanAirport {
  city: string;
  airportName: string;
  airportCode: string;
  note?: string;
  // 'ALL' = 인천처럼 모든 노선, string[] = 직항 취항 도시 목록
  destinations: 'ALL' | string[];
}

export const koreanAirports: KoreanAirport[] = [
  {
    city: '인천',
    airportName: '인천국제공항 (ICN)',
    airportCode: 'ICN',
    destinations: 'ALL',
  },
  {
    city: '김포',
    airportName: '김포국제공항 (GMP)',
    airportCode: 'GMP',
    note: '일부 아시아 노선만 운항',
    destinations: ['도쿄', '오사카', '나고야', '상하이', '베이징', '타이베이', '타이중', '홍콩'],
  },
  {
    city: '부산',
    airportName: '김해국제공항 (PUS)',
    airportCode: 'PUS',
    destinations: [
      '도쿄', '오사카', '삿포로', '후쿠오카', '나고야', '오키나와',
      '방콕', '치앙마이', '푸껫',
      '하노이', '호치민', '다낭',
      '타이베이', '가오슝', '홍콩',
      '베이징', '상하이', '칭다오',
      '싱가포르', '쿠알라룸푸르', '세부',
    ],
  },
  {
    city: '대구',
    airportName: '대구국제공항 (TAE)',
    airportCode: 'TAE',
    destinations: [
      '도쿄', '오사카', '후쿠오카', '오키나와',
      '방콕', '하노이', '호치민', '다낭',
      '타이베이', '베이징', '상하이',
    ],
  },
  {
    city: '청주',
    airportName: '청주국제공항 (CJJ)',
    airportCode: 'CJJ',
    destinations: [
      '도쿄', '오사카', '후쿠오카', '삿포로',
      '방콕', '하노이', '호치민', '다낭',
      '베이징', '상하이',
    ],
  },
  {
    city: '무안',
    airportName: '무안국제공항 (MWX)',
    airportCode: 'MWX',
    note: '2026년 7월 재개통 예정 (현재 임시 폐쇄)',
    destinations: [
      '도쿄', '오사카', '후쿠오카',
      '방콕', '다낭', '하노이', '호치민',
      '타이베이', '베이징', '상하이',
    ],
  },
  {
    city: '제주',
    airportName: '제주국제공항 (CJU)',
    airportCode: 'CJU',
    destinations: [
      '도쿄', '오사카', '후쿠오카',
      '방콕', '상하이', '베이징', '홍콩',
    ],
  },
  {
    city: '양양',
    airportName: '양양국제공항 (YNY)',
    airportCode: 'YNY',
    note: '국제선 극소수 운항',
    destinations: ['도쿄', '오사카', '방콕'],
  },
];

// 멀티시티 추천 조합
export interface MultiCityGroup {
  label: string;
  cities: string[];
  description: string;
  transport: string;
}

export const multiCityRecommendations: Record<string, MultiCityGroup[]> = {
  '일본': [
    { label: '도쿄 + 오사카', cities: ['도쿄', '오사카'], description: '일본 도시 여행의 정석 루트', transport: '신칸센 약 2시간 30분' },
    { label: '도쿄 + 오사카 + 교토', cities: ['도쿄', '오사카', '교토'], description: '일본 황금 트라이앵글, 7박 이상 권장', transport: '신칸센·로컬 이동' },
    { label: '오사카 + 교토', cities: ['오사카', '교토'], description: '관서 문화 여행, 오사카 숙박+교토 당일치기', transport: '특급열차 약 15분' },
    { label: '도쿄 + 삿포로', cities: ['도쿄', '삿포로'], description: '도쿄 도심+홋카이도 자연', transport: '국내선 항공 약 1시간 30분' },
  ],
  '유럽 - 프랑스': [
    { label: '파리 + 스트라스부르', cities: ['파리', '스트라스부르'], description: '크리스마스 마켓 시즌 최고 조합', transport: 'TGV 약 2시간' },
    { label: '파리 + 니스', cities: ['파리', '니스'], description: '파리 도심 + 코트다쥐르 해안', transport: 'TGV 약 5시간 30분' },
  ],
  '유럽 - 이탈리아': [
    { label: '로마 + 피렌체', cities: ['로마', '피렌체'], description: '이탈리아 르네상스 핵심 루트', transport: '고속열차 약 1시간 30분' },
    { label: '로마 + 피렌체 + 베네치아', cities: ['로마', '피렌체', '베네치아'], description: '이탈리아 3대 도시, 10박 이상 권장', transport: '고속열차 이동' },
    { label: '밀라노 + 베네치아', cities: ['밀라노', '베네치아'], description: '패션·예술 도시 콤보', transport: '고속열차 약 2시간 30분' },
  ],
  '유럽 - 스페인': [
    { label: '바르셀로나 + 마드리드', cities: ['바르셀로나', '마드리드'], description: '스페인 양대 도시 완전 정복', transport: 'AVE 고속열차 약 2시간 30분' },
    { label: '바르셀로나 + 세비야', cities: ['바르셀로나', '세비야'], description: '가우디 건축 + 안달루시아 문화', transport: '항공 또는 고속열차' },
  ],
  '태국': [
    { label: '방콕 + 치앙마이', cities: ['방콕', '치앙마이'], description: '태국 남북 핵심 도시', transport: '국내선 항공 약 1시간 / 야간버스' },
    { label: '방콕 + 푸껫', cities: ['방콕', '푸껫'], description: '도시 관광 + 해양 리조트', transport: '국내선 항공 약 1시간 30분' },
  ],
  '베트남': [
    { label: '하노이 + 다낭 + 호치민', cities: ['하노이', '다낭', '호치민'], description: '베트남 남북 종단 여행', transport: '국내선 항공 이동' },
    { label: '다낭 + 호이안', cities: ['다낭', '호이안'], description: '베트남 중부 가성비 최고 루트', transport: '택시·버스 약 30분' },
    { label: '하노이 + 하롱베이', cities: ['하노이', '하롱베이'], description: '수도 + 자연유산 크루즈', transport: '버스 약 3~4시간' },
  ],
  '미국': [
    { label: '뉴욕 + 보스턴', cities: ['뉴욕', '보스턴'], description: '동부 명문 도시 코스', transport: '기차 약 3시간 30분 / 버스' },
    { label: '로스앤젤레스 + 라스베가스', cities: ['로스앤젤레스', '라스베가스'], description: '엔터테인먼트 + 카지노 도시', transport: '차 약 4시간' },
    { label: '샌프란시스코 + 로스앤젤레스', cities: ['샌프란시스코', '로스앤젤레스'], description: '캘리포니아 서부 코스트', transport: '항공 1시간 / 기차 약 12시간' },
  ],
};
