import type { TravelResult, SearchParams, CompanionType, FestivalEvent } from '../types';

const getMonthSeason = (month: string | undefined, _year?: string): string => {
  const m = parseInt(month || '6');
  if (m >= 3 && m <= 5) return '봄';
  if (m >= 6 && m <= 8) return '여름';
  if (m >= 9 && m <= 11) return '가을';
  return '겨울';
};

const getSeasonFromDateString = (dateStr: string | undefined): string => {
  if (!dateStr) return '봄';
  const m = new Date(dateStr).getMonth() + 1;
  if (m >= 3 && m <= 5) return '봄';
  if (m >= 6 && m <= 8) return '여름';
  if (m >= 9 && m <= 11) return '가을';
  return '겨울';
};

// Outfit search URLs by season and gender/age
const getOutfitSearchUrl = (_gender: string, ageGroup: string, destination: string, season: string) => {
  const query = encodeURIComponent(`${destination} ${season} ${ageGroup} 여행 패션 코디`);
  return `https://www.pinterest.co.kr/search/pins/?q=${query}`;
};

const getNaverOutfitUrl = (destination: string, season: string, gender: string) => {
  const query = encodeURIComponent(`${destination} ${season} ${gender} 여행 옷차림`);
  return `https://search.naver.com/search.naver?query=${query}`;
};

// Companion label helper
export const companionLabels: Record<CompanionType, string> = {
  family_elderly: '어르신 포함 가족',
  family_young_kids: '유소아 포함 가족',
  family_all: '전 세대 가족',
  couple: '연인 / 부부',
  small_group: '소규모 그룹 (2-4명)',
  large_group: '대규모 그룹 (5명+)',
};

export const generateMockResult = (params: SearchParams): TravelResult => {
  const season =
    params.dateType === 'month'
      ? getMonthSeason(params.month, params.year)
      : getSeasonFromDateString(params.startDate);

  const dest = params.destinationCity;
  const country = params.destinationCountry;

  // --- Distance & Time zone map (approximate) ---
  const cityData: Record<string, { distanceKm: number; flightHours: number; timeDiff: number; currency: string; language: string }> = {
    '도쿄': { distanceKm: 1200, flightHours: 2.5, timeDiff: 0, currency: '엔 (JPY)', language: '일본어' },
    '오사카': { distanceKm: 1100, flightHours: 2, timeDiff: 0, currency: '엔 (JPY)', language: '일본어' },
    '교토': { distanceKm: 1100, flightHours: 2, timeDiff: 0, currency: '엔 (JPY)', language: '일본어' },
    '삿포로': { distanceKm: 1400, flightHours: 2.5, timeDiff: 0, currency: '엔 (JPY)', language: '일본어' },
    '후쿠오카': { distanceKm: 550, flightHours: 1.2, timeDiff: 0, currency: '엔 (JPY)', language: '일본어' },
    '방콕': { distanceKm: 3700, flightHours: 5.5, timeDiff: -2, currency: '바트 (THB)', language: '태국어' },
    '치앙마이': { distanceKm: 3500, flightHours: 5, timeDiff: -2, currency: '바트 (THB)', language: '태국어' },
    '푸껫': { distanceKm: 4000, flightHours: 6, timeDiff: -2, currency: '바트 (THB)', language: '태국어' },
    '하노이': { distanceKm: 2900, flightHours: 4.5, timeDiff: -2, currency: '동 (VND)', language: '베트남어' },
    '호치민': { distanceKm: 3800, flightHours: 5, timeDiff: -2, currency: '동 (VND)', language: '베트남어' },
    '다낭': { distanceKm: 3200, flightHours: 4.5, timeDiff: -2, currency: '동 (VND)', language: '베트남어' },
    '파리': { distanceKm: 9050, flightHours: 12, timeDiff: -8, currency: '유로 (EUR)', language: '프랑스어' },
    '로마': { distanceKm: 9100, flightHours: 12, timeDiff: -8, currency: '유로 (EUR)', language: '이탈리아어' },
    '바르셀로나': { distanceKm: 9500, flightHours: 13, timeDiff: -8, currency: '유로 (EUR)', language: '스페인어' },
    '런던': { distanceKm: 9000, flightHours: 12, timeDiff: -9, currency: '파운드 (GBP)', language: '영어' },
    '뉴욕': { distanceKm: 11100, flightHours: 14, timeDiff: -14, currency: '달러 (USD)', language: '영어' },
    '하와이': { distanceKm: 7400, flightHours: 9, timeDiff: -19, currency: '달러 (USD)', language: '영어' },
    '싱가포르': { distanceKm: 4700, flightHours: 6.5, timeDiff: -1, currency: '싱가포르달러 (SGD)', language: '영어' },
    '발리': { distanceKm: 5400, flightHours: 7, timeDiff: -1, currency: '루피아 (IDR)', language: '인도네시아어' },
    '이스탄불': { distanceKm: 7900, flightHours: 10.5, timeDiff: -6, currency: '리라 (TRY)', language: '터키어' },
  };

  const defaultCityInfo = { distanceKm: 5000, flightHours: 7, timeDiff: -3, currency: '현지 통화', language: '현지어' };
  const cityInfo = cityData[dest] || defaultCityInfo;

  // --- Weather by season ---
  const weatherMap: Record<string, Record<string, { high: number; low: number; precip: string; humidity: string; desc: string; warnings: string[] }>> = {
    '도쿄': {
      '봄': { high: 18, low: 10, precip: '보통', humidity: '보통', desc: '벚꽃 시즌으로 맑고 포근한 날씨가 이어집니다. 간혹 비가 내리기도 합니다.', warnings: ['꽃가루 주의 (삼나무 알레르기)', '황금연휴 기간 인파 혼잡'] },
      '여름': { high: 32, low: 24, precip: '많음', humidity: '높음', desc: '고온다습한 여름으로 6월 장마 후 무더위가 계속됩니다.', warnings: ['열사병 주의 (수분 보충 필수)', '장마(6월) 우비 필수', '태풍 주의보 확인'] },
      '가을': { high: 22, low: 14, precip: '적음', humidity: '보통', desc: '단풍이 아름다운 쾌청한 날씨의 최고 여행 시즌입니다.', warnings: ['태풍 시즌 초입 (9월) 날씨 확인', '행락객 혼잡 주의'] },
      '겨울': { high: 10, low: 2, precip: '적음', humidity: '낮음', desc: '맑고 건조한 편이지만 아침저녁으로 쌉쌀합니다. 눈은 드물게 내립니다.', warnings: ['체감온도 낮음, 보온 의류 필수', '건조한 날씨로 보습 케어 필요'] },
    },
    '오사카': {
      '봄': { high: 19, low: 9, precip: '보통', humidity: '보통', desc: '벚꽃 명소가 많아 봄 여행의 하이라이트입니다. 쾌적한 날씨입니다.', warnings: ['꽃가루 알레르기 주의', '성수기 숙박 예약 필수'] },
      '여름': { high: 35, low: 26, precip: '많음', humidity: '매우 높음', desc: '일본에서 가장 더운 지역 중 하나로 열대야가 계속됩니다.', warnings: ['혹서 주의, 낮 야외 활동 자제', '선블록·부채 필수'] },
      '가을': { high: 24, low: 15, precip: '적음', humidity: '보통', desc: '온화하고 맑은 날씨로 관광하기 가장 좋은 시기입니다.', warnings: ['단풍 시즌 혼잡'] },
      '겨울': { high: 10, low: 3, precip: '적음', humidity: '낮음', desc: '춥고 건조하지만 눈이 내리는 경우는 드뭅니다. 행사가 풍성합니다.', warnings: ['얇은 내의 레이어드 착용 권장'] },
    },
    '방콕': {
      '봄': { high: 36, low: 27, precip: '적음', humidity: '높음', desc: '4월은 연중 가장 더운 달로, 송크란 축제(물 축제)가 열립니다.', warnings: ['열사병·탈수 주의', '4월 송크란 기간 교통 혼잡'] },
      '여름': { high: 33, low: 26, precip: '매우 많음', humidity: '매우 높음', desc: '우기 시즌으로 매일 스콜성 소나기가 쏟아집니다.', warnings: ['가벼운 우비 또는 우산 필수', '홍수 가능 지역 확인'] },
      '가을': { high: 33, low: 25, precip: '많음', humidity: '높음', desc: '우기 후반부로 비가 서서히 줄어들며 녹음이 짙습니다.', warnings: ['10~11월까지 비 지속', '모기 기피제 필수'] },
      '겨울': { high: 32, low: 22, precip: '적음', humidity: '낮음', desc: '건기로 맑고 쾌청한 최고의 여행 시즌입니다. 아침은 선선합니다.', warnings: ['자외선 지수 높음, 선블록 필수'] },
    },
    '파리': {
      '봄': { high: 16, low: 8, precip: '보통', humidity: '보통', desc: '꽃이 피는 아름다운 계절이지만 비가 자주 내립니다.', warnings: ['갑작스러운 소나기 대비 우산 필수', '성수기 시작으로 예약 권장'] },
      '여름': { high: 25, low: 15, precip: '보통', humidity: '낮음', desc: '유럽 최고 성수기로 쾌청한 날씨가 이어집니다.', warnings: ['소매치기 각별 주의 (관광지)', '8월 현지인 휴가로 일부 상점 휴업'] },
      '가을': { high: 15, low: 8, precip: '많음', humidity: '보통', desc: '낙엽이 아름다운 계절이지만 비가 잦아집니다.', warnings: ['레이어드 옷차림 필수', '일찍 어두워지므로 일정 조정'] },
      '겨울': { high: 7, low: 2, precip: '보통', humidity: '높음', desc: '춥고 흐린 날이 많지만 크리스마스 시즌 분위기가 매력적입니다.', warnings: ['두꺼운 방한복 필수', '일부 야외 관광지 입장 제한'] },
    },
  };

  const defaultWeather = {
    봄: { high: 22, low: 14, precip: '보통', humidity: '보통', desc: '여행하기 좋은 봄 날씨입니다. 맑은 날이 많습니다.', warnings: ['자외선 차단제 챙기기', '얇은 겉옷 준비'] },
    여름: { high: 30, low: 22, precip: '많음', humidity: '높음', desc: '무덥고 습한 여름입니다. 수분 보충에 주의하세요.', warnings: ['열사병 주의', '선블록 필수', '가벼운 우비 준비'] },
    가을: { high: 20, low: 12, precip: '적음', humidity: '보통', desc: '맑고 건조한 쾌적한 날씨의 여행 최적기입니다.', warnings: ['일교차 대비 겉옷 필수'] },
    겨울: { high: 8, low: 0, precip: '보통', humidity: '낮음', desc: '추운 겨울이지만 독특한 매력의 여행이 가능합니다.', warnings: ['두꺼운 방한복 필수', '동상 주의'] },
  };

  const weatherSource = (weatherMap[dest] || {})[season] || defaultWeather[season as keyof typeof defaultWeather];

  // --- Spots by companion ---
  const getSpots = (_companion: CompanionType, destination: string) => {
    const baseSpots = [
      { name: `${destination} 구시가지 & 문화거리`, type: '역사/문화', description: '현지 문화와 역사를 한눈에 볼 수 있는 핵심 관광지', tip: '오전 일찍 방문하면 한산하게 즐길 수 있습니다', companionFit: ['couple', 'small_group', 'large_group', 'family_all', 'family_elderly', 'family_young_kids'] as CompanionType[] },
      { name: `${destination} 중앙 마켓 & 야시장`, type: '쇼핑/미식', description: '현지 음식과 특산품을 체험할 수 있는 활기찬 시장', tip: '오후 4시 이후 방문 시 가장 활기차며 가격 흥정 가능', companionFit: ['couple', 'small_group', 'large_group', 'family_all', 'family_young_kids'] as CompanionType[] },
      { name: `${destination} 유명 박물관`, type: '박물관/전시', description: '지역 역사와 예술을 체험하는 문화 공간', tip: '무료 입장일을 확인하면 절약 가능', companionFit: ['family_elderly', 'family_all', 'couple', 'small_group'] as CompanionType[] },
      { name: `${destination} 자연공원 & 뷰포인트`, type: '자연/경치', description: '탁 트인 전망과 자연을 즐길 수 있는 명소', tip: '일출·일몰 시간에 방문하면 최고의 경치를 감상할 수 있습니다', companionFit: ['couple', 'small_group', 'large_group', 'family_all', 'family_elderly', 'family_young_kids'] as CompanionType[] },
      { name: `${destination} 전통 사원 & 종교 문화지`, type: '종교/문화', description: '지역 전통 신앙과 건축미를 느낄 수 있는 장소', tip: '복장 규정 확인 (어깨·무릎 가리기), 조용한 태도 유지', companionFit: ['family_elderly', 'family_all', 'couple', 'small_group'] as CompanionType[] },
      { name: `${destination} 테마파크 & 어트랙션`, type: '테마파크/놀이', description: '온 가족이 함께 즐길 수 있는 엔터테인먼트 공간', tip: '온라인 사전 예매 시 15-30% 할인 가능', companionFit: ['family_young_kids', 'family_all', 'large_group'] as CompanionType[] },
      { name: `${destination} 로컬 카페 & 감성 골목`, type: '카페/감성', description: '현지인이 즐겨 찾는 인스타그래머블 카페와 골목', tip: '이른 아침 방문 시 웨이팅 없이 조용히 즐길 수 있습니다', companionFit: ['couple', 'small_group'] as CompanionType[] },
    ];
    return baseSpots;
  };

  // --- Routes ---
  const getRoutes = (destination: string, _companion: CompanionType) => [
    {
      duration: 'short' as const,
      durationLabel: '단기 (2박 3일)',
      days: 3,
      highlight: '핵심 명소만 빠르게 압축 탐방',
      route: [
        { day: 1, title: '도착 & 도심 탐방', spots: [`${destination} 중심가 산책`, '야시장 or 나이트마켓', '도착 환경 적응'], meals: '현지 유명 식당 1곳', accommodation: '도심 접근성 좋은 호텔' },
        { day: 2, title: '핵심 관광지 집중 공략', spots: [`${destination} 대표 랜드마크`, '문화/역사 유적지', '쇼핑 거리'], meals: '조식 호텔, 중식 현지 음식, 석식 루프탑 레스토랑', accommodation: '전일 동일' },
        { day: 3, title: '마지막 관광 & 귀국', spots: ['아침 자유 관광', '기념품 쇼핑', '공항 이동'], meals: '조식 후 출국', accommodation: '체크아웃' },
      ],
    },
    {
      duration: 'medium' as const,
      durationLabel: '중기 (4박 5일)',
      days: 5,
      highlight: '핵심 + 근교 스폿까지 여유있게',
      route: [
        { day: 1, title: '도착 & 첫날 적응', spots: ['공항 도착', '숙소 체크인', '근처 저녁 산책'], meals: '가벼운 현지식', accommodation: '메인 호텔' },
        { day: 2, title: '도심 핵심 투어', spots: [`${destination} 랜드마크`, '역사 문화지구', '현지 마켓'], meals: '조식 호텔, 현지 맛집 탐방', accommodation: '전일 동일' },
        { day: 3, title: '근교 당일치기', spots: ['근교 유명 소도시 or 자연명소', '현지 체험 프로그램'], meals: '도시락 or 현지 식당', accommodation: '전일 동일' },
        { day: 4, title: '자유 탐방 & 쇼핑', spots: ['로컬 카페 투어', '시장 & 쇼핑몰', '감성 골목 사진 투어'], meals: '원하는 곳 자유롭게', accommodation: '전일 동일' },
        { day: 5, title: '귀국', spots: ['아침 자유 시간', '기념품 구매', '공항 이동'], meals: '조식 후 출국', accommodation: '체크아웃' },
      ],
    },
    {
      duration: 'long' as const,
      durationLabel: '장기 (7박 이상)',
      days: 8,
      highlight: '도시 + 근교 + 자연까지 심층 여행',
      route: [
        { day: 1, title: '도착 & 현지 적응', spots: ['공항 도착', '숙소 체크인', '주변 동네 산책'], meals: '편의점 or 가벼운 식사', accommodation: '장기 숙소 (에어비앤비 추천)' },
        { day: 2, title: '도심 1일차', spots: [`${destination} 구시가지`, '전통 시장', '랜드마크 투어'], meals: '현지 맛집 3곳 탐방', accommodation: '전일 동일' },
        { day: 3, title: '도심 2일차 (문화)', spots: ['박물관 & 미술관', '유명 카페 골목', '야경 투어'], meals: '파인다이닝 디너 경험', accommodation: '전일 동일' },
        { day: 4, title: '근교 1 (자연)', spots: ['자연공원 하이킹', '폭포 or 해변', '선셋 포인트'], meals: '피크닉 or 로컬 식당', accommodation: '전일 동일' },
        { day: 5, title: '근교 2 (역사/문화)', spots: ['UNESCO 유산지', '전통 마을', '테마파크'], meals: '현지 전통 음식 체험', accommodation: '근교 숙소 1박' },
        { day: 6, title: '현지 생활 체험', spots: ['로컬 시장 쇼핑', '쿠킹 클래스 or 체험', '찜질방 or 스파'], meals: '직접 요리 or 로컬 식당', accommodation: '메인 숙소 복귀' },
        { day: 7, title: '쇼핑 & 정리', spots: ['주요 쇼핑 센터', '기념품 쇼핑', '마지막 맛집 방문'], meals: '맛집 2곳 집중 탐방', accommodation: '전일 동일' },
        { day: 8, title: '귀국', spots: ['아침 자유 시간', '공항 이동'], meals: '조식 후 출국', accommodation: '체크아웃' },
      ],
    },
  ];

  // --- Restaurants & Accommodations ---
  const getRestaurants = (destination: string, _companion: CompanionType): import('../types').Restaurant[] => [
    {
      name: `${destination} 현지 전통 음식점`,
      cuisine: '현지 전통식',
      priceRange: '₩₩',
      description: `${destination}에서 반드시 먹어야 할 현지 전통 음식을 제공하는 현지인 맛집. 관광객에게도 친절하며 메뉴판에 사진이 있어 주문이 쉽습니다.`,
      companionFit: ['family_elderly', 'family_young_kids', 'family_all', 'couple', 'small_group', 'large_group'],
    },
    {
      name: `뷰맛집 루프탑 레스토랑`,
      cuisine: '인터내셔널 퓨전',
      priceRange: '₩₩₩₩',
      description: `${destination} 도심 전경이 한눈에 보이는 루프탑 레스토랑. 특별한 날 기념 식사나 분위기 있는 저녁 식사 장소로 인기.`,
      companionFit: ['couple', 'small_group'],
    },
    {
      name: `패밀리 레스토랑 & 뷔페`,
      cuisine: '뷔페/다국적',
      priceRange: '₩₩₩',
      description: '어린이 의자와 놀이 공간이 있으며 어른·아이 모두 즐길 수 있는 다양한 메뉴를 제공합니다. 단체 이용 시 예약 필수.',
      companionFit: ['family_young_kids', 'family_all', 'large_group'],
    },
    {
      name: `현지 야시장 & 스트리트 푸드`,
      cuisine: '길거리 음식',
      priceRange: '₩',
      description: `${destination} 야시장에서 즐기는 현지 길거리 음식. 저렴하고 다양한 메뉴로 현지 문화를 가장 생생하게 체험할 수 있습니다.`,
      companionFit: ['couple', 'small_group', 'large_group', 'family_young_kids'],
    },
    {
      name: `어르신 배려 한식당`,
      cuisine: '한식 / 현지 건강식',
      priceRange: '₩₩₩',
      description: '어르신들이 편하게 드실 수 있는 입맛에 맞는 한식 또는 현지 건강식. 음식 조절이 가능하고 개인 테이블 서비스를 제공합니다.',
      companionFit: ['family_elderly', 'family_all'],
    },
  ];

  const getAccommodations = (destination: string, _companion: CompanionType): import('../types').Accommodation[] => [
    {
      name: `${destination} 시내 비즈니스 호텔`,
      type: '비즈니스 호텔 (4성급)',
      priceRange: '₩₩₩',
      description: '교통 중심지에 위치한 편리한 호텔로 조식 포함 패키지가 인기입니다. 피트니스와 비즈니스 센터 완비.',
      companionFit: ['couple', 'small_group', 'family_elderly'],
      bookingUrl: 'https://www.booking.com',
    },
    {
      name: `가족 스위트룸 리조트`,
      type: '패밀리 리조트',
      priceRange: '₩₩₩₩',
      description: '가족 단위에 최적화된 스위트룸 보유. 수영장, 키즈클럽, 베이비시팅 서비스 제공. 미끄럼 방지 욕조 등 어린이 안전 시설 완비.',
      companionFit: ['family_young_kids', 'family_all'],
      bookingUrl: 'https://www.booking.com',
    },
    {
      name: `감성 부티크 호텔`,
      type: '부티크 호텔',
      priceRange: '₩₩₩₩',
      description: `${destination}의 현지 감성이 물씬 풍기는 디자인 호텔. 각 객실마다 개성 있는 인테리어와 프리미엄 어메니티 제공.`,
      companionFit: ['couple', 'small_group'],
      bookingUrl: 'https://www.booking.com',
    },
    {
      name: `대형 그룹 게스트하우스 & 호스텔`,
      type: '게스트하우스 / 호스텔',
      priceRange: '₩~₩₩',
      description: '넓은 공용 공간과 다인실 옵션으로 대규모 그룹에 적합. 현지 여행자와 교류하기 좋으며 도미토리부터 개인실까지 다양.',
      companionFit: ['large_group', 'small_group'],
      bookingUrl: 'https://www.booking.com',
    },
    {
      name: `시니어 프렌들리 5성 호텔`,
      type: '럭셔리 호텔 (5성급)',
      priceRange: '₩₩₩₩₩',
      description: '배리어프리 시설과 한국어 가능 컨시어지 서비스 보유. 의료 시설 연계 서비스와 이동 보조 서비스를 제공합니다.',
      companionFit: ['family_elderly', 'family_all'],
      bookingUrl: 'https://www.booking.com',
    },
  ];

  // --- Outfits ---
  const getOutfits = (destination: string, season: string): import('../types').OutfitItem[] => {
    const outfits: import('../types').OutfitItem[] = [];

    const seasonItems: Record<string, { male: string[]; female: string[]; kids: string[]; desc: string }> = {
      '봄': {
        male: ['얇은 재킷 or 가디건', '면 티셔츠', '치노 팬츠 or 청바지', '운동화 or 로퍼', '가벼운 스카프'],
        female: ['플로럴 블라우스', '카디건 or 트렌치코트', '와이드 팬츠 or 플리츠 스커트', '스니커즈 or 플랫슈즈', '크로스백'],
        kids: ['레이어드 티셔츠', '청바지 or 조거 팬츠', '후드집업', '미끄럼 방지 운동화'],
        desc: `${season} ${destination}은 일교차가 있으므로 레이어드 룩이 핵심입니다. 낮에는 가볍게, 아침저녁엔 겉옷을 챙기세요.`,
      },
      '여름': {
        male: ['반팔 린넨 셔츠', '반바지 or 쇼츠', '슬리퍼 or 샌들', '모자 (챙 넓은 것)', '자외선 차단제'],
        female: ['민소매 원피스 or 린넨 세트업', '샌들 or 뮬', '챙넓은 모자', '선글라스', '자외선 차단 가디건 (실내 냉방 대비)'],
        kids: ['통기성 좋은 반팔·반바지 세트', '샌들', 'UPF 수영복 (해변 방문 시)', '유아용 선글라스', '모자'],
        desc: `무덥고 습한 ${destination} 여름. 통기성이 좋은 소재를 선택하고, 자외선 차단이 필수입니다. 실내 냉방이 강하므로 얇은 겉옷도 꼭 챙기세요.`,
      },
      '가을': {
        male: ['맨투맨 or 니트', '얇은 점퍼 or 블레이저', '슬랙스 or 청바지', '로퍼 or 앵클부츠'],
        female: ['니트 스웨터', '가을 팬츠 or 미디 스커트', '트렌치코트', '앵클부츠 or 로퍼', '머플러'],
        kids: ['긴팔 티셔츠', '조거 팬츠', '얇은 점퍼', '운동화'],
        desc: `${destination}의 가을은 단풍과 함께 쾌적한 여행 최적기입니다. 레이어드 패션으로 유행하는 가을 컬러(카멜, 버건디, 올리브)를 활용해보세요.`,
      },
      '겨울': {
        male: ['두꺼운 패딩 or 울코트', '히트텍 내의', '두꺼운 스웨터', '방한 부츠', '장갑 & 모자 & 머플러'],
        female: ['롱 패딩 or 퍼 코트', '기모 레깅스 or 두꺼운 스타킹', '터틀넥 니트', '스노우 부츠 or 앵클 보온 부츠', '비니 & 장갑'],
        kids: ['기모 내의 (상하)', '방한 패딩', '발목까지 오는 방한 부츠', '방한 장갑 & 귀마개'],
        desc: `${destination}의 겨울은 체감온도가 낮을 수 있습니다. 레이어드(속옷→니트→외투)로 보온성을 최대화하세요. 히트텍이나 기모 내의는 필수입니다.`,
      },
    };

    const items = seasonItems[season] || seasonItems['봄'];

    outfits.push({
      gender: 'male',
      ageGroup: '성인 남성',
      description: items.desc,
      keyItems: items.male,
      searchUrl: getNaverOutfitUrl(destination, season, '남성'),
      referenceUrl: getOutfitSearchUrl('male', '남성', destination, season),
    });
    outfits.push({
      gender: 'female',
      ageGroup: '성인 여성',
      description: items.desc,
      keyItems: items.female,
      searchUrl: getNaverOutfitUrl(destination, season, '여성'),
      referenceUrl: getOutfitSearchUrl('female', '여성', destination, season),
    });
    outfits.push({
      gender: 'all',
      ageGroup: '어린이 / 유아',
      description: `어린이는 활동량이 많으므로 편안하고 튼튼한 소재를 선택하세요. ${season === '여름' ? '자외선 차단과 열 관리가 중요합니다.' : season === '겨울' ? '체온 손실이 빠르니 보온에 특히 주의하세요.' : '레이어드로 활동 편의성을 높이세요.'}`,
      keyItems: items.kids,
      searchUrl: getNaverOutfitUrl(destination, season, '아동'),
      referenceUrl: getOutfitSearchUrl('all', '아동', destination, season),
    });
    outfits.push({
      gender: 'all',
      ageGroup: '시니어 (60대+)',
      description: `체온 조절 능력이 낮아지는 시니어는 특히 ${season === '여름' ? '열사병과 탈수에 주의하고 통기성 소재를 선택하세요.' : season === '겨울' ? '보온에 각별히 신경쓰고 방풍 기능이 있는 외투를 준비하세요.' : '레이어드 착용을 권장하며 편안한 신발이 중요합니다.'}`,
      keyItems: season === '여름'
        ? ['통기성 면 소재 상하의', '챙 넓은 모자', '자외선 차단 아우터', '편안한 쿠션 샌들', '휴대용 선풍기']
        : season === '겨울'
        ? ['기모 내의 (필수)', '두꺼운 패딩 점퍼', '방한 장화 or 보온 운동화', '귀마개 & 장갑', '목도리']
        : ['편안한 신발 (쿠션 충분한)', '레이어드 가능한 겉옷', '모자 or 양산', '압박 스타킹 (장시간 보행 시)'],
      searchUrl: getNaverOutfitUrl(destination, season, '시니어'),
      referenceUrl: getOutfitSearchUrl('all', '시니어', destination, season),
    });

    return outfits;
  };

  // --- Festivals & Warnings ---
  const getFestivalsAndWarnings = (destination: string, season: string, _monthNum: number): FestivalEvent[] => {
    const festivalMap: Record<string, FestivalEvent[]> = {
      '도쿄': [
        { name: '벚꽃 시즌 (하나미)', period: '3월 말 ~ 4월 초', description: '우에노·신주쿠교엔·메구로 강 등 도쿄 전역에서 벚꽃 축제가 열립니다. 현지인·관광객 모두 몰려 공원은 인산인해입니다.', type: 'festival', impact: 'positive', tip: '숙소·항공권은 최소 3개월 전 예약 필수. 평일 이른 아침 방문 추천.' },
        { name: '골든위크 (황금연휴)', period: '4월 29일 ~ 5월 5일', description: '일본 최대 연휴로 관광지·교통·숙소 모두 극성수기입니다. 가격이 2배 이상 오를 수 있습니다.', type: 'holiday', impact: 'caution', tip: '이 기간 여행을 피하거나 완전 사전 예약 필수. 인기 레스토랑 웨이팅 2시간 이상 예상.' },
        { name: '오봉 연휴', period: '8월 13~16일', description: '일본 귀성 시즌으로 일부 상점이 휴업하고 고속도로와 신칸센이 극도로 혼잡합니다.', type: 'holiday', impact: 'caution', tip: '대중교통 조기 예매 필수. 일부 지역 상점·식당 휴업 확인.' },
        { name: '도쿄 여름 축제 (마츠리) 시즌', period: '7월 ~ 8월', description: '스미다강 불꽃놀이, 아사쿠사 삼바 카니발 등 다양한 마츠리가 열립니다.', type: 'festival', impact: 'positive', tip: '유카타(일본 전통 여름 옷) 대여 체험과 함께 즐기면 더욱 특별합니다.' },
        { name: '연말연시 시즌', period: '12월 31일 ~ 1월 3일', description: '일본 최대 명절로 대부분 상점이 문을 닫습니다. 신사에서 하쓰모데(새해 참배) 인파가 몰립니다.', type: 'holiday', impact: 'caution', tip: '편의점·패밀리레스토랑은 영업하나 일반 음식점·쇼핑몰 대부분 휴업.' },
      ],
      '오사카': [
        { name: '텐진 마츠리', period: '7월 24~25일', description: '일본 3대 축제 중 하나. 텐만구 신사 행렬과 선상 불꽃놀이가 장관입니다.', type: 'festival', impact: 'positive', tip: '선착순 자리 잡기 경쟁이 치열하므로 오후 1시 이전 도착 추천.' },
        { name: '골든위크 (황금연휴)', period: '4월 29일 ~ 5월 5일', description: '도톤보리, 유니버설 스튜디오 일본 등 관광지 극혼잡. 유니버설은 대기 3시간 이상 예상.', type: 'holiday', impact: 'caution', tip: 'USJ는 익스프레스 패스 구매 필수. 인기 식당 예약 필수.' },
        { name: '오사카 빛 축제 (루미나리에)', period: '12월 초 ~ 중순', description: '도심 전체가 아름다운 일루미네이션으로 빛나는 겨울 대표 행사입니다.', type: 'festival', impact: 'positive', tip: '주말 저녁엔 극도로 혼잡하므로 평일 방문 추천.' },
      ],
      '방콕': [
        { name: '송크란 (태국 물 축제)', period: '4월 13~15일', description: '태국 최대 명절로 거리 전체에서 물 싸움이 벌어집니다. 태국 최대 물축제 체험 기회!', type: 'festival', impact: 'positive', tip: '방수팩 필수. 중요한 전자기기·문서는 호텔에 보관. 이동 극혼잡 주의.' },
        { name: '로이 끄라통 (빛의 축제)', period: '11월 보름달 날', description: '연꽃 모양 등불을 강에 띄우는 아름다운 축제. 치앙마이의 이펑 축제와 함께 태국 대표 야간 축제입니다.', type: 'festival', impact: 'positive', tip: '강변·공원에서 관람. 연등 날리기 유료 체험 추천.' },
        { name: '우기 (태풍 시즌)', period: '5월 ~ 10월', description: '매일 오후 스콜이 쏟아지고 홍수 위험 지역이 있습니다. 이동 지연 빈번합니다.', type: 'warning', impact: 'caution', tip: '우산 또는 간편 우의 상시 휴대. 지하 쇼핑몰 중심 일정 조율 가능.' },
        { name: '타이 국경일 / 왕실 관련 공휴일', period: '연중 복수 (12월 5일, 12월 10일 등)', description: '국경일에는 일부 관광지·정부 기관이 휴무이며, 복장 규정이 엄격해집니다.', type: 'holiday', impact: 'caution', tip: '왕실 관련 발언·사진에 극도로 주의 (법적 처벌 가능).' },
      ],
      '파리': [
        { name: '파리 패션 위크', period: '3월 초·9월 말 (연 2회)', description: '세계 최대 패션 행사로 도심 교통이 혼잡하고 특급 호텔·레스토랑 예약이 어렵습니다.', type: 'event', impact: 'caution', tip: '패션에 관심 있다면 최고의 기회. 쇼 티켓은 초청 전용이나 거리 스트리트 패션 구경 가능.' },
        { name: '바스티유 데이 (프랑스 혁명 기념일)', period: '7월 14일', description: '에펠탑 불꽃놀이와 샹젤리제 군사 퍼레이드. 프랑스 최대 국경일로 에펠탑 주변 극혼잡.', type: 'festival', impact: 'positive', tip: '좋은 자리는 오후 4시 이전 선점 필요. 소매치기 극주의.' },
        { name: '파리 올림픽 관련 행사', period: '일정 확인 필요', description: '대규모 국제 행사 시 숙박가 폭등 및 인파 혼잡이 예상됩니다.', type: 'event', impact: 'caution', tip: '행사 기간 피하거나 완전 사전 예약 권장.' },
        { name: '8월 바캉스 시즌', period: '8월 (특히 1~3주)', description: '프랑스인들이 대거 휴가를 떠나 현지 빵집·식당·미용실 등 상당수가 휴업합니다.', type: 'warning', impact: 'caution', tip: '관광 명소는 열지만 현지 식당은 예약 전 영업 여부 반드시 확인.' },
        { name: '크리스마스 마켓', period: '11월 말 ~ 12월 24일', description: '샹젤리제를 포함한 전역에서 크리스마스 마켓이 열립니다. 유럽 최고 수준의 겨울 낭만.', type: 'festival', impact: 'positive', tip: '스트라스부르 당일치기 여행과 함께 즐기면 최고의 크리스마스 여행.' },
      ],
      '발리': [
        { name: '발리 뇨피 (침묵의 날)', period: '힌두력 새해 (3월경)', description: '발리 전도가 24시간 완전히 멈추는 날. 공항 폐쇄, 호텔 밖 외출 금지, 불·소리 사용 제한.', type: 'holiday', impact: 'avoid', tip: '이 날은 호텔 밖 외출 완전 불가. 이 날을 피해 일정을 짜거나 호텔 내에서만 시간을 보낼 각오 필요.' },
        { name: '갈룽안 & 쿠닝간 축제', period: '힌두력 기준 (약 210일 주기)', description: '발리 힌두교 최대 명절로 전통 의상을 입은 현지인들이 사원을 찾습니다. 이 기간 발리 문화를 가장 생생하게 볼 수 있습니다.', type: 'festival', impact: 'positive', tip: '사원 방문 시 전통 스카프(사롱) 착용 필수. 사진 촬영 전 허락 구하기.' },
        { name: '발리 우기 (스콜 시즌)', period: '11월 ~ 3월', description: '매일 오후 강한 스콜이 내립니다. 서핑 조건은 좋아지나 야외 활동 제약이 생깁니다.', type: 'warning', impact: 'caution', tip: '우산·방수 샌들 필수. 오전에 야외 투어 몰아서 진행 추천.' },
      ],
      '싱가포르': [
        { name: '중국 설날 (차이니즈 뉴이어)', period: '1~2월 (음력)', description: '차이나타운 일대 화려한 장식과 퍼레이드. 싱가포르 최대 명절 중 하나입니다.', type: 'festival', impact: 'positive', tip: '차이나타운 조기 방문 추천. 이틀간 일부 식당·상점 휴무.' },
        { name: '싱가포르 그랑프리 (F1)', period: '9월 말', description: '세계 유일 야간 F1 레이스. 시내 도로 통제와 숙박가 폭등 예상.', type: 'event', impact: 'caution', tip: '레이스 관람 계획이 없다면 이 주를 피하거나 숙박 조기 예약 필수.' },
        { name: '디파발리 (빛의 축제)', period: '10~11월', description: '리틀 인디아가 아름다운 빛으로 물드는 힌두교 명절입니다.', type: 'festival', impact: 'positive', tip: '리틀 인디아 야간 방문 추천. 인도 음식 체험과 함께.' },
      ],
      '이스탄불': [
        { name: '라마단 (금식월)', period: '이슬람력 기준 (매년 날짜 변동)', description: '해 뜰 때부터 해 질 때까지 금식하는 기간. 일부 식당이 낮에 문을 닫거나 제한 영업합니다.', type: 'holiday', impact: 'caution', tip: '비무슬림 관광객은 일반적으로 괜찮으나 공개 음식 섭취는 예의 갖추기. 이프타르(석식 후 만찬) 체험 추천.' },
        { name: '이드 알피트르 (라마단 종료 명절)', period: '라마단 종료 후 3일간', description: '터키 최대 명절로 대부분 관광지·상점이 폐쇄되고 대중교통이 혼잡합니다.', type: 'holiday', impact: 'caution', tip: '이 기간 여행 시 사전에 식당·투어 예약 필수.' },
        { name: '이스탄불 튤립 축제', period: '4월', description: '굴한파크를 비롯한 전 도시가 수백만 송이 튤립으로 뒤덮입니다.', type: 'festival', impact: 'positive', tip: '이른 아침 굴한파크 방문으로 튤립·보스포러스 합쳐진 최고의 사진 촬영 가능.' },
      ],
    };

    const defaultEvents: FestivalEvent[] = [
      { name: '현지 공휴일 주의', period: '방문 전 확인 필요', description: `${destination} 공휴일에는 주요 관광지·음식점이 예고 없이 휴무할 수 있습니다.`, type: 'warning', impact: 'caution', tip: '외교부 해외안전여행 사이트에서 현지 공휴일을 미리 확인하고 일정 조정 하세요.' },
      { name: '성수기 혼잡 주의', period: season + ' 시즌', description: `${season} 시즌은 여행 성수기로 주요 관광지 혼잡도가 높습니다. 인기 레스토랑과 숙소는 조기 마감됩니다.`, type: 'event', impact: 'caution', tip: '인기 레스토랑·투어·숙소는 최소 2~4주 전 예약 권장.' },
      { name: '여행 경보 & 안전 정보', period: '출국 전 확인', description: `외교부 해외안전여행 포털에서 ${destination} 최신 여행 경보 단계와 주의사항을 반드시 확인하세요.`, type: 'warning', impact: 'caution', tip: '해외여행자 보험 가입 후 출국. 여권 사본·비상 연락처 보관.' },
    ];

    const cityEvents = festivalMap[destination] || [];
    return [...cityEvents, ...defaultEvents];
  };

  return {
    basicInfo: {
      destination: dest,
      country,
      weather: {
        season,
        avgTempHigh: weatherSource.high,
        avgTempLow: weatherSource.low,
        precipitation: weatherSource.precip,
        humidity: weatherSource.humidity,
        description: weatherSource.desc,
        warnings: weatherSource.warnings,
      },
      distanceKm: cityInfo.distanceKm,
      flightHours: cityInfo.flightHours,
      timeDifferenceHours: cityInfo.timeDiff,
      currency: cityInfo.currency,
      language: cityInfo.language,
      bestSeason: '봄·가을',
    },
    spots: getSpots(params.companion, dest),
    routes: getRoutes(dest, params.companion),
    restaurants: getRestaurants(dest, params.companion),
    accommodations: getAccommodations(dest, params.companion),
    outfits: getOutfits(dest, season),
    festivalsAndWarnings: getFestivalsAndWarnings(dest, season, parseInt(params.month || String(new Date(params.startDate || Date.now()).getMonth() + 1))),
  };
};
