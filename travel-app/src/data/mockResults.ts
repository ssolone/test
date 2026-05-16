import type { TravelResult, SearchParams, CompanionType, OutfitItem } from '../types';
import { getCityData } from './cityData';
import { destinations, countryInfo } from './destinations';

const getMonthNum = (params: SearchParams): number => {
  if (params.dateType === 'month') return parseInt(params.month || '6');
  if (params.startDate) return new Date(params.startDate).getMonth() + 1;
  return 6;
};

const getMonthSeason = (monthNum: number): string => {
  if (monthNum >= 3 && monthNum <= 5) return '봄';
  if (monthNum >= 6 && monthNum <= 8) return '여름';
  if (monthNum >= 9 && monthNum <= 11) return '가을';
  return '겨울';
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

// 도시 → 국가명 역매핑 (currency·language 조회용)
const cityToCountry: Record<string, string> = {};
for (const d of destinations) {
  for (const c of d.cities) cityToCountry[c] = d.country;
}

// --- 전 도시 거리·비행시간·시차 ---
// timeDifferenceHours: 서울(KST=UTC+9) 기준. 음수 = 현지가 서울보다 늦음
const cityGeoMap: Record<string, { distanceKm: number; flightHours: number; timeDiff: number }> = {
  // 일본 (UTC+9, 시차 0)
  '도쿄':       { distanceKm: 1200,  flightHours: 2.5,  timeDiff: 0  },
  '오사카':     { distanceKm: 950,   flightHours: 2,    timeDiff: 0  },
  '교토':       { distanceKm: 1000,  flightHours: 2,    timeDiff: 0  },
  '삿포로':     { distanceKm: 1300,  flightHours: 2.5,  timeDiff: 0  },
  '후쿠오카':   { distanceKm: 550,   flightHours: 1.5,  timeDiff: 0  },
  '나고야':     { distanceKm: 1050,  flightHours: 2,    timeDiff: 0  },
  '오키나와':   { distanceKm: 1550,  flightHours: 2.5,  timeDiff: 0  },
  '나라':       { distanceKm: 980,   flightHours: 2,    timeDiff: 0  }, // 오사카 경유
  '히로시마':   { distanceKm: 900,   flightHours: 1.5,  timeDiff: 0  },
  '가마쿠라':   { distanceKm: 1200,  flightHours: 2.5,  timeDiff: 0  }, // 도쿄 경유
  // 태국 (UTC+7, 시차 -2)
  '방콕':       { distanceKm: 3700,  flightHours: 5.5,  timeDiff: -2 },
  '치앙마이':   { distanceKm: 3400,  flightHours: 5,    timeDiff: -2 },
  '푸껫':       { distanceKm: 4200,  flightHours: 6,    timeDiff: -2 },
  '파타야':     { distanceKm: 3750,  flightHours: 5.5,  timeDiff: -2 },
  '코사무이':   { distanceKm: 4100,  flightHours: 6,    timeDiff: -2 },
  '아유타야':   { distanceKm: 3700,  flightHours: 5.5,  timeDiff: -2 }, // 방콕 경유
  '후아힌':     { distanceKm: 3800,  flightHours: 5.5,  timeDiff: -2 },
  // 베트남 (UTC+7, 시차 -2)
  '하노이':     { distanceKm: 2600,  flightHours: 4,    timeDiff: -2 },
  '호치민':     { distanceKm: 3600,  flightHours: 5,    timeDiff: -2 },
  '다낭':       { distanceKm: 2900,  flightHours: 4,    timeDiff: -2 },
  '호이안':     { distanceKm: 2900,  flightHours: 4,    timeDiff: -2 }, // 다낭 경유
  '나트랑':     { distanceKm: 3200,  flightHours: 5,    timeDiff: -2 },
  '하롱베이':   { distanceKm: 2600,  flightHours: 4,    timeDiff: -2 }, // 하노이 경유
  '달랏':       { distanceKm: 3400,  flightHours: 5,    timeDiff: -2 },
  '푸꾸옥':     { distanceKm: 3400,  flightHours: 5,    timeDiff: -2 },
  // 프랑스 (UTC+1 → 시차 -8)
  '파리':       { distanceKm: 9000,  flightHours: 12,   timeDiff: -8 },
  '니스':       { distanceKm: 9200,  flightHours: 13,   timeDiff: -8 },
  '리옹':       { distanceKm: 9100,  flightHours: 12.5, timeDiff: -8 },
  '마르세유':   { distanceKm: 9200,  flightHours: 13,   timeDiff: -8 },
  '보르도':     { distanceKm: 9400,  flightHours: 13,   timeDiff: -8 },
  '스트라스부르':{ distanceKm: 8900, flightHours: 12,   timeDiff: -8 },
  '몽생미셸':   { distanceKm: 9200,  flightHours: 13,   timeDiff: -8 },
  // 이탈리아 (UTC+1 → 시차 -8)
  '로마':       { distanceKm: 8700,  flightHours: 12,   timeDiff: -8 },
  '밀라노':     { distanceKm: 8500,  flightHours: 12,   timeDiff: -8 },
  '피렌체':     { distanceKm: 8700,  flightHours: 12,   timeDiff: -8 },
  '베네치아':   { distanceKm: 8800,  flightHours: 12,   timeDiff: -8 },
  '나폴리':     { distanceKm: 8900,  flightHours: 12.5, timeDiff: -8 },
  '아말피':     { distanceKm: 8900,  flightHours: 12.5, timeDiff: -8 },
  '친퀘테레':   { distanceKm: 8600,  flightHours: 12,   timeDiff: -8 },
  '시칠리아':   { distanceKm: 9100,  flightHours: 13,   timeDiff: -8 },
  // 스페인 (UTC+1 → 시차 -8)
  '바르셀로나': { distanceKm: 9600,  flightHours: 13,   timeDiff: -8 },
  '마드리드':   { distanceKm: 9800,  flightHours: 13.5, timeDiff: -8 },
  '세비야':     { distanceKm: 10000, flightHours: 14,   timeDiff: -8 },
  '그라나다':   { distanceKm: 9900,  flightHours: 14,   timeDiff: -8 },
  '발렌시아':   { distanceKm: 9700,  flightHours: 13.5, timeDiff: -8 },
  '산세바스티안':{ distanceKm: 9500, flightHours: 13,   timeDiff: -8 },
  '말라가':     { distanceKm: 10100, flightHours: 14,   timeDiff: -8 },
  // 미국
  '뉴욕':       { distanceKm: 11100, flightHours: 14,   timeDiff: -14 },
  '로스앤젤레스':{ distanceKm: 9600, flightHours: 11.5, timeDiff: -17 },
  '샌프란시스코':{ distanceKm: 9300, flightHours: 11,   timeDiff: -17 },
  '라스베가스': { distanceKm: 9400,  flightHours: 11,   timeDiff: -17 },
  '시카고':     { distanceKm: 10200, flightHours: 13,   timeDiff: -15 },
  '하와이':     { distanceKm: 7300,  flightHours: 8.5,  timeDiff: -19 },
  '마이애미':   { distanceKm: 13000, flightHours: 16,   timeDiff: -14 },
  '시애틀':     { distanceKm: 8400,  flightHours: 10.5, timeDiff: -17 },
  '보스턴':     { distanceKm: 11000, flightHours: 14,   timeDiff: -14 },
  '워싱턴 D.C.':{ distanceKm: 11200, flightHours: 14,   timeDiff: -14 },
  // 영국 (UTC+0/+1 → 시차 -9/-8, 표준시 기준 -9)
  '런던':       { distanceKm: 8700,  flightHours: 12,   timeDiff: -9 },
  '에든버러':   { distanceKm: 8900,  flightHours: 12.5, timeDiff: -9 },
  '옥스퍼드':   { distanceKm: 8700,  flightHours: 12,   timeDiff: -9 },
  '코츠월드':   { distanceKm: 8700,  flightHours: 12,   timeDiff: -9 },
  '맨체스터':   { distanceKm: 8700,  flightHours: 12,   timeDiff: -9 },
  '리버풀':     { distanceKm: 8800,  flightHours: 12,   timeDiff: -9 },
  '바스':       { distanceKm: 8700,  flightHours: 12,   timeDiff: -9 },
  // 호주 (AEST UTC+10 → 시차 +1)
  '시드니':     { distanceKm: 8300,  flightHours: 10,   timeDiff: 1  },
  '멜버른':     { distanceKm: 8500,  flightHours: 10.5, timeDiff: 1  },
  '브리즈번':   { distanceKm: 7800,  flightHours: 9.5,  timeDiff: 1  },
  '골드코스트': { distanceKm: 7900,  flightHours: 10,   timeDiff: 1  },
  '케언즈':     { distanceKm: 6900,  flightHours: 8,    timeDiff: 1  },
  '퍼스':       { distanceKm: 7000,  flightHours: 8.5,  timeDiff: -1 }, // AWST UTC+8
  '아들레이드': { distanceKm: 8500,  flightHours: 10.5, timeDiff: 0.5 },
  '울룰루':     { distanceKm: 7700,  flightHours: 9,    timeDiff: 0.5 },
  // 싱가포르 (UTC+8 → 시차 -1)
  '싱가포르':   { distanceKm: 4700,  flightHours: 6.5,  timeDiff: -1 },
  // 홍콩 (UTC+8 → 시차 -1)
  '홍콩':       { distanceKm: 2100,  flightHours: 3.5,  timeDiff: -1 },
  // 대만 (UTC+8 → 시차 -1)
  '타이베이':   { distanceKm: 1500,  flightHours: 2.5,  timeDiff: -1 },
  '타이중':     { distanceKm: 1500,  flightHours: 2.5,  timeDiff: -1 },
  '타이난':     { distanceKm: 1600,  flightHours: 2.5,  timeDiff: -1 },
  '가오슝':     { distanceKm: 1600,  flightHours: 2.5,  timeDiff: -1 },
  '화롄':       { distanceKm: 1500,  flightHours: 2.5,  timeDiff: -1 },
  '지룽':       { distanceKm: 1500,  flightHours: 2.5,  timeDiff: -1 },
  // 중국 (UTC+8 → 시차 -1)
  '베이징':     { distanceKm: 950,   flightHours: 2,    timeDiff: -1 },
  '상하이':     { distanceKm: 900,   flightHours: 1.5,  timeDiff: -1 },
  '청두':       { distanceKm: 2100,  flightHours: 3.5,  timeDiff: -1 },
  '시안':       { distanceKm: 1700,  flightHours: 3,    timeDiff: -1 },
  '항저우':     { distanceKm: 950,   flightHours: 2,    timeDiff: -1 },
  '광저우':     { distanceKm: 1900,  flightHours: 3,    timeDiff: -1 },
  '계림':       { distanceKm: 2100,  flightHours: 3.5,  timeDiff: -1 },
  '장자제':     { distanceKm: 1900,  flightHours: 3,    timeDiff: -1 },
  // 인도네시아 (발리=WITA UTC+8, 자카르타=WIB UTC+7)
  '발리':       { distanceKm: 5200,  flightHours: 7,    timeDiff: -1 },
  '자카르타':   { distanceKm: 5300,  flightHours: 7,    timeDiff: -2 },
  '롬복':       { distanceKm: 5400,  flightHours: 7.5,  timeDiff: -1 },
  '보로부두르': { distanceKm: 5200,  flightHours: 7,    timeDiff: -2 },
  '코모도':     { distanceKm: 5600,  flightHours: 8,    timeDiff: 0  }, // WITA+1=WIT
  '길리 아이르':{ distanceKm: 5400,  flightHours: 7.5,  timeDiff: -1 },
  // 말레이시아 (UTC+8 → 시차 -1)
  '쿠알라룸푸르':{ distanceKm: 4700, flightHours: 6.5,  timeDiff: -1 },
  '페낭':       { distanceKm: 4600,  flightHours: 6.5,  timeDiff: -1 },
  '코타키나발루':{ distanceKm: 3700, flightHours: 5,    timeDiff: 0  },
  '랑카위':     { distanceKm: 4900,  flightHours: 7,    timeDiff: -1 },
  '말라카':     { distanceKm: 4700,  flightHours: 6.5,  timeDiff: -1 },
  // 터키 (UTC+3 → 시차 -6)
  '이스탄불':   { distanceKm: 8200,  flightHours: 11,   timeDiff: -6 },
  '카파도키아': { distanceKm: 8000,  flightHours: 11,   timeDiff: -6 },
  '파묵칼레':   { distanceKm: 8200,  flightHours: 11,   timeDiff: -6 },
  '에페수스':   { distanceKm: 8300,  flightHours: 11.5, timeDiff: -6 },
  '보드룸':     { distanceKm: 8400,  flightHours: 11.5, timeDiff: -6 },
  '안탈리아':   { distanceKm: 8000,  flightHours: 11,   timeDiff: -6 },
  // 그리스 (UTC+2 → 시차 -7)
  '아테네':     { distanceKm: 8600,  flightHours: 12,   timeDiff: -7 },
  '산토리니':   { distanceKm: 8800,  flightHours: 12,   timeDiff: -7 },
  '미코노스':   { distanceKm: 8800,  flightHours: 12,   timeDiff: -7 },
  '크레타':     { distanceKm: 8700,  flightHours: 12,   timeDiff: -7 },
  '로도스':     { distanceKm: 8700,  flightHours: 12,   timeDiff: -7 },
  // 캐나다
  '밴쿠버':     { distanceKm: 8200,  flightHours: 10,   timeDiff: -17 },
  '토론토':     { distanceKm: 10700, flightHours: 14,   timeDiff: -14 },
  '퀘벡시티':   { distanceKm: 10800, flightHours: 14,   timeDiff: -14 },
  '몬트리올':   { distanceKm: 10800, flightHours: 14,   timeDiff: -14 },
  '밴프':       { distanceKm: 8500,  flightHours: 11,   timeDiff: -17 },
  '나이아가라폴스':{ distanceKm: 10700, flightHours: 14, timeDiff: -14 },
  // 뉴질랜드 (UTC+12 → 시차 +3)
  '오클랜드':   { distanceKm: 10700, flightHours: 13,   timeDiff: 3  },
  '퀸스타운':   { distanceKm: 10400, flightHours: 13,   timeDiff: 3  },
  '크라이스트처치':{ distanceKm: 10500, flightHours: 13, timeDiff: 3  },
  '로토루아':   { distanceKm: 10600, flightHours: 13,   timeDiff: 3  },
  '웰링턴':     { distanceKm: 10500, flightHours: 13,   timeDiff: 3  },
  '밀포드사운드':{ distanceKm: 10300, flightHours: 13,  timeDiff: 3  },
  // 포르투갈 (UTC+0 → 시차 -9)
  '리스본':     { distanceKm: 10100, flightHours: 14,   timeDiff: -9 },
  '포르투':     { distanceKm: 10200, flightHours: 14,   timeDiff: -9 },
  '신트라':     { distanceKm: 10100, flightHours: 14,   timeDiff: -9 },
  '알가르베':   { distanceKm: 10300, flightHours: 14,   timeDiff: -9 },
  '마데이라':   { distanceKm: 10800, flightHours: 15,   timeDiff: -10 },
  // 모로코 (UTC+1 → 시차 -8)
  '마라케시':   { distanceKm: 9500,  flightHours: 13,   timeDiff: -8 },
  '페스':       { distanceKm: 9400,  flightHours: 13,   timeDiff: -8 },
  '카사블랑카': { distanceKm: 9400,  flightHours: 13,   timeDiff: -8 },
  '샤우엔':     { distanceKm: 9500,  flightHours: 13,   timeDiff: -8 },
  '메르주가':   { distanceKm: 9700,  flightHours: 14,   timeDiff: -8 },
  // 두바이 (UTC+4 → 시차 -5)
  '두바이':     { distanceKm: 6400,  flightHours: 9.5,  timeDiff: -5 },
  '아부다비':   { distanceKm: 6300,  flightHours: 9.5,  timeDiff: -5 },
  // 멕시코
  '칸쿤':       { distanceKm: 12000, flightHours: 17,   timeDiff: -15 },
  '멕시코시티': { distanceKm: 11700, flightHours: 15,   timeDiff: -16 },
  '과달라하라': { distanceKm: 11800, flightHours: 15,   timeDiff: -16 },
  '오아하카':   { distanceKm: 11800, flightHours: 15,   timeDiff: -16 },
  '툴룸':       { distanceKm: 12100, flightHours: 17,   timeDiff: -15 },
  '산 크리스토발':{ distanceKm: 11900, flightHours: 16, timeDiff: -16 },
};

const getCityInfo = (city: string, country: string) => {
  const geo = cityGeoMap[city] || { distanceKm: 5000, flightHours: 7, timeDiff: -3 };
  const info = countryInfo[country] || { currency: '현지 통화', language: '현지어' };
  return { ...geo, currency: info.currency, language: info.language };
};

// --- Weather by destination & season ---
const weatherMap: Record<string, Record<string, { high: number; low: number; precip: string; humidity: string; desc: string; warnings: string[] }>> = {
  '도쿄': {
    '봄': { high: 18, low: 10, precip: '보통', humidity: '보통', desc: '벚꽃 시즌으로 맑고 포근한 날씨가 이어집니다. 간혹 비가 내리기도 합니다.', warnings: ['꽃가루 주의 (삼나무 알레르기)', '골든위크 기간 숙박·교통 극혼잡'] },
    '여름': { high: 32, low: 24, precip: '많음', humidity: '높음', desc: '고온다습한 여름. 6월 장마 이후 무더위가 계속됩니다.', warnings: ['열사병 주의 (수분 보충 필수)', '장마(6월) 우비 필수', '태풍 주의보 확인'] },
    '가을': { high: 22, low: 14, precip: '적음', humidity: '보통', desc: '단풍이 아름다운 쾌청한 날씨의 최고 여행 시즌입니다.', warnings: ['태풍 시즌 초입 (9월) 날씨 확인', '단풍 시즌 인파 혼잡'] },
    '겨울': { high: 10, low: 2, precip: '적음', humidity: '낮음', desc: '맑고 건조한 편이지만 아침저녁으로 추습니다. 눈은 드뭅니다.', warnings: ['체감온도 낮음, 보온 의류 필수', '건조한 날씨로 보습 케어 필요'] },
  },
  '오사카': {
    '봄': { high: 19, low: 9, precip: '보통', humidity: '보통', desc: '벚꽃 명소가 많아 봄 여행의 하이라이트입니다. 쾌적한 날씨입니다.', warnings: ['꽃가루 알레르기 주의', '성수기 숙박 예약 필수'] },
    '여름': { high: 35, low: 26, precip: '많음', humidity: '매우 높음', desc: '일본에서 가장 더운 지역 중 하나. 열대야가 계속됩니다.', warnings: ['혹서 주의, 낮 야외 활동 자제', '선블록·부채 필수'] },
    '가을': { high: 24, low: 15, precip: '적음', humidity: '보통', desc: '온화하고 맑은 날씨로 관광하기 가장 좋은 시기입니다.', warnings: ['단풍 시즌 인파 혼잡'] },
    '겨울': { high: 10, low: 3, precip: '적음', humidity: '낮음', desc: '춥고 건조하지만 눈이 내리는 경우는 드뭅니다.', warnings: ['레이어드 착용 권장'] },
  },
  '교토': {
    '봄': { high: 18, low: 9, precip: '보통', humidity: '보통', desc: '벚꽃과 함께 가장 아름다운 시기. 일본 최대 관광 성수기입니다.', warnings: ['숙소 4~6개월 전 예약 필수', '아라시야마·기요미즈데라 이른 아침 방문 권장'] },
    '여름': { high: 34, low: 25, precip: '많음', humidity: '높음', desc: '분지 지형으로 오사카보다 더욱 무덥습니다. 기온 마츠리가 7월 열립니다.', warnings: ['열사병 주의', '7월 기온 마츠리 기간 극혼잡'] },
    '가을': { high: 22, low: 12, precip: '적음', humidity: '보통', desc: '단풍이 일본 최고 수준. 교토 가을의 절경을 감상하기 최적입니다.', warnings: ['11월 단풍 성수기 숙소 조기 예약 필수'] },
    '겨울': { high: 9, low: 2, precip: '보통', humidity: '낮음', desc: '눈 쌓인 금각사·청수사는 겨울 교토의 별미. 관광객이 줄어 여유롭습니다.', warnings: ['기온 낮음, 방한 철저히', '일부 명소 야간 라이트업 사전 예약'] },
  },
  '방콕': {
    '봄': { high: 36, low: 27, precip: '적음', humidity: '높음', desc: '4월은 연중 가장 더운 달. 송크란 축제(물 축제)가 열립니다.', warnings: ['열사병·탈수 주의', '4월 송크란 기간 교통 극혼잡'] },
    '여름': { high: 33, low: 26, precip: '매우 많음', humidity: '매우 높음', desc: '우기 시즌. 매일 오후 강한 스콜이 쏟아집니다.', warnings: ['우비 또는 우산 상시 휴대', '홍수 가능 저지대 확인'] },
    '가을': { high: 33, low: 25, precip: '많음', humidity: '높음', desc: '우기 후반부. 비가 서서히 줄어들며 녹음이 짙습니다.', warnings: ['10~11월까지 스콜 지속', '모기 기피제 필수'] },
    '겨울': { high: 32, low: 22, precip: '적음', humidity: '낮음', desc: '건기로 맑고 쾌청한 최고의 방콕 여행 시즌. 아침은 선선합니다.', warnings: ['자외선 지수 높음, 선블록 필수'] },
  },
  '파리': {
    '봄': { high: 16, low: 8, precip: '보통', humidity: '보통', desc: '꽃이 피는 아름다운 계절이지만 비가 자주 내립니다.', warnings: ['갑작스러운 소나기 대비 우산 필수', '성수기 시작, 예약 권장'] },
    '여름': { high: 25, low: 15, precip: '보통', humidity: '낮음', desc: '유럽 최고 성수기. 쾌청한 날씨가 이어집니다.', warnings: ['소매치기 각별 주의 (관광지)', '8월 현지인 휴가로 일부 상점 휴업'] },
    '가을': { high: 15, low: 8, precip: '많음', humidity: '보통', desc: '낙엽이 아름다운 계절이지만 비가 잦아집니다.', warnings: ['레이어드 옷차림 필수', '일찍 어두워지므로 일정 조정'] },
    '겨울': { high: 7, low: 2, precip: '보통', humidity: '높음', desc: '춥고 흐린 날이 많지만 크리스마스 마켓이 매력적입니다.', warnings: ['두꺼운 방한복 필수', '크리스마스 마켓 소매치기 주의'] },
  },
  '발리': {
    '봄': { high: 30, low: 24, precip: '많음', humidity: '높음', desc: '3월까지 우기 후반. 4~5월은 건기 시작으로 여행 최적입니다.', warnings: ['3월 뇨피(침묵의 날) 일정 필수 확인', '우기 중 스콜 대비'] },
    '여름': { high: 30, low: 22, precip: '적음', humidity: '낮음', desc: '발리 최고 건기. 서핑 파도도 좋고 야외 활동 최적입니다.', warnings: ['자외선 지수 매우 높음, 선크림 필수', '인기 해변 성수기 혼잡'] },
    '가을': { high: 31, low: 23, precip: '보통', humidity: '보통', desc: '건기에서 우기로 넘어가는 시기. 10~11월부터 스콜 빈도 증가.', warnings: ['11월 우기 시작, 방수 준비', '서핑 파도 높아져 초보자 주의'] },
    '겨울': { high: 29, low: 23, precip: '매우 많음', humidity: '매우 높음', desc: '우기 한창. 매일 스콜이 내리지만 가격이 가장 저렴합니다.', warnings: ['야외 활동 오전 집중', '일부 도로 침수 가능', '방수 샌들 필수'] },
  },
  '싱가포르': {
    '봄': { high: 32, low: 25, precip: '보통', humidity: '높음', desc: '연중 더운 열대 기후. 봄 시즌도 차이가 거의 없습니다.', warnings: ['실내 냉방 강하므로 얇은 겉옷 필수', '자외선 강함'] },
    '여름': { high: 33, low: 26, precip: '보통', humidity: '높음', desc: '고온다습하지만 도심 전체 에어컨이 완비되어 쾌적하게 관광 가능합니다.', warnings: ['야외 이동 최소화, 지하철 이용 권장', '수분 보충 필수'] },
    '가을': { high: 31, low: 25, precip: '많음', humidity: '높음', desc: '10~11월 북동 몬순 시작으로 강수량 증가. 실내 명소 중심 계획 추천.', warnings: ['스콜 대비 우산 필수', 'F1 시즌(9월) 숙박 가격 폭등'] },
    '겨울': { high: 30, low: 24, precip: '매우 많음', humidity: '매우 높음', desc: '북동 몬순으로 12~1월 가장 비가 많습니다. 그래도 기온은 30도 내외.', warnings: ['우산 필수', '강수 시 이동 계획 여유있게'] },
  },
  '하와이': {
    '봄': { high: 28, low: 20, precip: '보통', humidity: '보통', desc: '4~5월은 하와이 베스트 시즌. 날씨 완벽하고 성수기 인파가 줄어듭니다.', warnings: ['자외선 매우 강함, 선크림 필수', '일부 해변 파도 높음 확인'] },
    '여름': { high: 31, low: 24, precip: '적음', humidity: '보통', desc: '하와이 최성수기. 날씨 최고이지만 가격도 가장 비쌉니다.', warnings: ['성수기 숙박·항공 조기 예약 필수', '허리케인 시즌(6~11월) 기상 확인'] },
    '가을': { high: 30, low: 23, precip: '보통', humidity: '보통', desc: '성수기가 끝나며 가격이 내려가지만 여전히 아름다운 날씨.', warnings: ['허리케인 시즌 기상 확인', '9월 알로하 페스티벌 교통 혼잡'] },
    '겨울': { high: 26, low: 18, precip: '많음', humidity: '높음', desc: '마우이는 고래 관찰 시즌(12~4월). 비가 잦지만 여전히 온화합니다.', warnings: ['12~4월 성수기 가격 다시 상승', '일부 북쪽 해변 파도 강함'] },
  },
  '런던': {
    '봄': { high: 15, low: 7, precip: '보통', humidity: '보통', desc: '공원에 꽃이 피는 아름다운 계절이지만 변덕스러운 날씨 유의.', warnings: ['갑작스러운 비 대비 우산 필수', '봄 관광 성수기 시작'] },
    '여름': { high: 23, low: 14, precip: '적음', humidity: '낮음', desc: '런던 최고 여행 시즌. 일조 시간이 길어 밤 9시까지 밝습니다.', warnings: ['노팅힐 카니발(8월) 소매치기 주의', '성수기 숙박 조기 예약'] },
    '가을': { high: 14, low: 8, precip: '많음', humidity: '높음', desc: '낙엽 아름다운 계절이지만 흐리고 비 오는 날이 많아집니다.', warnings: ['레이어드 옷차림 필수', '일찍 어두워짐 주의'] },
    '겨울': { high: 8, low: 3, precip: '보통', humidity: '높음', desc: '흐리고 춥지만 크리스마스 분위기와 쇼핑 시즌이 매력적입니다.', warnings: ['두꺼운 방한복 필수', '일조 시간 매우 짧음 (오후 4시에 어두워짐)'] },
  },
  '뉴욕': {
    '봄': { high: 18, low: 9, precip: '보통', humidity: '보통', desc: '센트럴파크에 꽃이 피는 뉴욕 최고 시즌 중 하나입니다.', warnings: ['4~5월 갑작스러운 비·냉기 대비', '성수기 시작, 숙박 예약 권장'] },
    '여름': { high: 30, low: 22, precip: '보통', humidity: '높음', desc: '무덥고 습하지만 야외 이벤트·공연이 가장 많은 시즌입니다.', warnings: ['열사병 주의', '도심 이동 시 지하철 냉방 강함, 겉옷 필수'] },
    '가을': { high: 18, low: 10, precip: '보통', humidity: '보통', desc: '센트럴파크 단풍이 절경. 뉴욕에서 가장 쾌적한 여행 시즌.', warnings: ['10~11월 일교차 큼', '추수감사절 연휴 호텔 가격 급등'] },
    '겨울': { high: 5, low: -2, precip: '보통', humidity: '낮음', desc: '눈 덮인 센트럴파크와 타임스퀘어 연말 분위기가 압도적입니다.', warnings: ['폭설 시 항공 결항 빈번, 여행보험 필수', '체감온도 매우 낮음 (-10°C 이하 가능)'] },
  },
  '두바이': {
    '봄': { high: 35, low: 22, precip: '거의 없음', humidity: '낮음', desc: '3~4월은 두바이 최적 시즌. 덥지만 견딜 만하고 야외 활동 가능합니다.', warnings: ['자외선 지수 매우 높음', '라마단 기간 공공 음식 섭취 주의'] },
    '여름': { high: 45, low: 30, precip: '없음', humidity: '낮음', desc: '낮 기온 42~48°C로 야외 활동 거의 불가. 쇼핑몰 투어 중심으로 계획.', warnings: ['야외 활동 이른 아침(7~10시)·야간만 가능', '일사병 극주의'] },
    '가을': { high: 38, low: 26, precip: '거의 없음', humidity: '낮음', desc: '9~10월까지 여전히 더움. 11월부터 급격히 쾌적해집니다.', warnings: ['10월까지 극더위 주의', '11월 두바이 에어쇼·이벤트 성수기'] },
    '겨울': { high: 24, low: 14, precip: '가끔', humidity: '낮음', desc: '두바이 최고 여행 시즌. 최고 기온 24°C, 쾌적하고 건조합니다.', warnings: ['두바이 쇼핑 페스티벌(12~2월) 인파·숙박 가격 상승', '밤 기온 낮음, 얇은 겉옷 준비'] },
  },
};

const defaultWeather = {
  봄: { high: 22, low: 14, precip: '보통', humidity: '보통', desc: '여행하기 좋은 봄 날씨입니다.', warnings: ['자외선 차단제 챙기기', '얇은 겉옷 준비'] },
  여름: { high: 30, low: 22, precip: '많음', humidity: '높음', desc: '무덥고 습한 여름입니다.', warnings: ['열사병 주의', '선블록 필수', '우비 준비'] },
  가을: { high: 20, low: 12, precip: '적음', humidity: '보통', desc: '맑고 건조한 여행 최적기입니다.', warnings: ['일교차 대비 겉옷 필수'] },
  겨울: { high: 8, low: 0, precip: '보통', humidity: '낮음', desc: '추운 겨울이지만 독특한 매력의 여행이 가능합니다.', warnings: ['두꺼운 방한복 필수'] },
};

// --- Spots by destination ---
const getSpots = (destination: string) => [
  { name: `${destination} 구시가지 & 문화거리`, type: '역사/문화', description: '현지 문화와 역사를 한눈에 볼 수 있는 핵심 관광지', tip: '오전 일찍 방문하면 한산하게 즐길 수 있습니다', companionFit: ['couple', 'small_group', 'large_group', 'family_all', 'family_elderly', 'family_young_kids'] as CompanionType[] },
  { name: `${destination} 중앙 마켓 & 야시장`, type: '쇼핑/미식', description: '현지 음식과 특산품을 체험할 수 있는 활기찬 시장', tip: '오후 4시 이후 방문 시 가장 활기차며 가격 흥정 가능', companionFit: ['couple', 'small_group', 'large_group', 'family_all', 'family_young_kids'] as CompanionType[] },
  { name: `${destination} 유명 박물관`, type: '박물관/전시', description: '지역 역사와 예술을 체험하는 문화 공간', tip: '무료 입장일을 확인하면 절약 가능', companionFit: ['family_elderly', 'family_all', 'couple', 'small_group'] as CompanionType[] },
  { name: `${destination} 자연공원 & 뷰포인트`, type: '자연/경치', description: '탁 트인 전망과 자연을 즐길 수 있는 명소', tip: '일출·일몰 시간에 방문하면 최고의 경치를 감상할 수 있습니다', companionFit: ['couple', 'small_group', 'large_group', 'family_all', 'family_elderly', 'family_young_kids'] as CompanionType[] },
  { name: `${destination} 전통 사원 & 종교 문화지`, type: '종교/문화', description: '지역 전통 신앙과 건축미를 느낄 수 있는 장소', tip: '복장 규정 확인 (어깨·무릎 가리기), 조용한 태도 유지', companionFit: ['family_elderly', 'family_all', 'couple', 'small_group'] as CompanionType[] },
  { name: `${destination} 테마파크 & 어트랙션`, type: '테마파크/놀이', description: '온 가족이 함께 즐길 수 있는 엔터테인먼트 공간', tip: '온라인 사전 예매 시 15-30% 할인 가능', companionFit: ['family_young_kids', 'family_all', 'large_group'] as CompanionType[] },
  { name: `${destination} 로컬 카페 & 감성 골목`, type: '카페/감성', description: '현지인이 즐겨 찾는 인스타그래머블 카페와 골목', tip: '이른 아침 방문 시 웨이팅 없이 조용히 즐길 수 있습니다', companionFit: ['couple', 'small_group'] as CompanionType[] },
];

// --- Routes ---
const getRoutes = (destination: string) => [
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
      { day: 5, title: '근교 2 (역사/문화)', spots: ['UNESCO 유산지', '전통 마을', '체험 프로그램'], meals: '현지 전통 음식 체험', accommodation: '근교 숙소 1박' },
      { day: 6, title: '현지 생활 체험', spots: ['로컬 시장 쇼핑', '쿠킹 클래스 or 체험', '스파·마사지'], meals: '직접 요리 or 로컬 식당', accommodation: '메인 숙소 복귀' },
      { day: 7, title: '쇼핑 & 정리', spots: ['주요 쇼핑 센터', '기념품 쇼핑', '마지막 맛집 방문'], meals: '맛집 2곳 집중 탐방', accommodation: '전일 동일' },
      { day: 8, title: '귀국', spots: ['아침 자유 시간', '공항 이동'], meals: '조식 후 출국', accommodation: '체크아웃' },
    ],
  },
];

// --- City+Season outfit style profiles ---
interface OutfitStyle {
  styleKeyword: string;
  maleDesc: string;
  femaleDesc: string;
  maleLooks: string[];
  femaleLooks: string[];
  kidsNote: string;
  seniorNote: string;
}

const cityOutfitStyles: Record<string, Partial<Record<string, OutfitStyle>>> = {
  '도쿄': {
    '봄': {
      styleKeyword: '오모테산도 소프트 캐주얼 × 하라주쿠 플로럴',
      maleDesc: '벚꽃 시즌 도쿄 남성 패션 키워드는 "클린 & 레이어드". 크림·베이지·연그레이 무채색 기반에 트렌치코트 하나로 완성합니다. 오모테산도·시부야에서 보이는 스타일은 슬림핏 치노에 화이트 셔츠+봄 블레이저로, 캐주얼하면서도 깔끔합니다.',
      femaleDesc: '봄 도쿄의 여성 스타일은 하나미(꽃놀이) 분위기와 딱 맞는 연분홍·라벤더·아이보리 파스텔 팔레트가 주를 이룹니다. 플로럴 프린트 원피스+얇은 트렌치코트, 또는 니트+미디스커트 조합이 오모테산도·하라주쿠 거리를 가득 채웁니다.',
      maleLooks: ['[룩 1] 크림 린넨 셔츠 + 베이지 치노 팬츠 + 네이비 트렌치코트 + 화이트 스니커즈', '[룩 2] 연그레이 오버사이즈 맨투맨 + 슬림 슬랙스 + 카키 봄 블루종 + 로퍼', '[룩 3] 스트라이프 셔츠 + 와이드 데님 + 캔버스 토트백 + 앵클 부츠'],
      femaleLooks: ['[룩 1] 연분홍 플로럴 원피스 + 아이보리 트렌치코트 + 베이지 메리제인 플랫슈즈 + 미니 크로스백', '[룩 2] 라벤더 니트 + 화이트 플리츠 미디스커트 + 얇은 가디건 + 화이트 스니커즈', '[룩 3] 크림 블라우스 + 와이드 팬츠 + 봄 스카프 + 로퍼 + 토트백'],
      kidsNote: '미끄럼 방지 운동화 필수. 벚꽃 시즌 야외 활동이 많으므로 레이어드로 체온 조절 가능하게 준비하세요.',
      seniorNote: '도보 이동이 많으므로 충분한 쿠션의 편한 운동화가 가장 중요합니다. 트렌치코트 하나로 일교차를 완벽히 대비할 수 있습니다.',
    },
    '여름': {
      styleKeyword: '시부야 서머 미니멀 × 유카타 축제 룩',
      maleDesc: '도쿄 여름은 "최소주의 + 기능성"이 핵심입니다. 화이트 린넨 셔츠에 쇼츠, UV 차단 기능성 아우터 조합이 현지 직장인들 사이에서도 대세입니다. 마츠리(여름 축제) 참가 시 유카타(기모노 여름 버전) 대여를 적극 추천합니다.',
      femaleDesc: '도쿄 여름 여성 패션은 무더위 속 개성 있는 감성을 잃지 않습니다. 원피스+챙넓은 모자+선글라스+버킷백의 "서머 걸 룩"이 하라주쿠에 넘칩니다. 실내 에어컨이 강하므로 얇은 가디건 or 짧은 재킷은 필수 아이템입니다.',
      maleLooks: ['[룩 1] 화이트 린넨 반팔 셔츠 + 카키 쇼츠 + 슬리퍼 or 샌들 + 크로스백 + UV차단 팔토시', '[룩 2] 스트라이프 반팔 티 + 치노 쇼츠 + 캔버스 운동화 + 챙넓은 버킷햇', '[룩 3] (축제용) 네이비 유카타 + 나막신(게타) ← 아사쿠사 근처 대여 가능'],
      femaleLooks: ['[룩 1] 플로럴 미니 원피스 + 비치 샌들 + 챙넓은 밀짚모자 + 선글라스 + 래피아 버킷백', '[룩 2] 슬리브리스 블라우스 + 린넨 쇼트팬츠 + 뮬 + 자외선 차단 얇은 가디건', '[룩 3] (축제용) 핑크·블루 플로럴 유카타 + 게타 ← 아사쿠사·우에노 근처 대여'],
      kidsNote: '통기성 좋은 소재 필수. 유아용 선글라스·모자·UPF 수영복을 챙기세요.',
      seniorNote: '자외선이 매우 강합니다. 챙넓은 모자와 UV 차단 아우터가 필수입니다. 체감온도가 35도 이상이므로 낮 12~15시 야외 이동은 자제하세요.',
    },
    '가을': {
      styleKeyword: '시부야 어스톤 레이어드 × 오모테산도 어텀 시크',
      maleDesc: '도쿄 가을 남성 패션의 핵심 컬러는 카멜·모카·올리브·버건디 등 어스톤. 니트+블레이저+슬랙스의 "스마트 캐주얼"이 직장인들 사이 주류이며, 거리에는 오버사이즈 코트+스니커즈 조합의 스트리트 룩도 많이 보입니다.',
      femaleDesc: '오모테산도의 가을은 미디 스커트+롱부츠+트렌치코트로 대표됩니다. 머스터드·버건디·올리브 등 가을 컬러를 활용한 레이어드 룩이 거리를 가득 채웁니다. 버킨백 or 토트백에 머플러 하나면 완성.',
      maleLooks: ['[룩 1] 카멜 니트 + 슬림 슬랙스 + 카키 봄 블레이저 + 로퍼 + 토트백', '[룩 2] 올리브 오버사이즈 재킷 + 와이드 데님 + 화이트 티 + 스니커즈', '[룩 3] 버건디 터틀넥 + 카멜 트렌치코트 + 블랙 슬랙스 + 앵클 부츠'],
      femaleLooks: ['[룩 1] 머스터드 니트 + 브라운 미디 플리츠 스커트 + 카멜 트렌치코트 + 앵클 부츠 + 토트백', '[룩 2] 올리브 오버사이즈 맨투맨 + 블랙 스키니 + 스웨이드 로퍼 + 머플러', '[룩 3] 체크 블레이저 + 크림 블라우스 + 브라운 미디 스커트 + 브라운 부츠'],
      kidsNote: '긴팔 티셔츠+조거 팬츠+얇은 점퍼 레이어드. 운동화는 발목 지지 있는 것으로 준비하세요.',
      seniorNote: '레이어드를 통해 쉽게 체온 조절이 가능합니다. 편한 쿠션 운동화와 가벼운 트렌치코트나 니트 가디건이면 충분합니다.',
    },
    '겨울': {
      styleKeyword: '신주쿠 어반 위터 × 롱코트 & 레이어드',
      maleDesc: '도쿄 겨울 남성 패션은 크게 두 갈래 — 슬림한 울 롱코트에 터틀넥을 레이어드한 "시티 스타일"과, 노스페이스·아크테릭스 등 아웃도어 브랜드를 활용한 "캐주얼 다운" 스타일입니다. 히트텍(유니클로 발열 내의) 착용은 현지인 기본 상식.',
      femaleDesc: '도쿄 겨울 여성 패션의 주인공은 롱 패딩 or 퍼 코트입니다. 니트 원피스+두꺼운 타이츠+롱 부츠 조합이 시부야·하라주쿠 거리를 가득 채웁니다. 비니나 이어머프 착용도 흔한 겨울 패션 요소입니다.',
      maleLooks: ['[룩 1] 히트텍 + 터틀넥 니트 + 울 롱코트 + 슬랙스 + 첼시 부츠', '[룩 2] 플리스 집업 + 다운 패딩 점퍼 + 와이드 데님 + 스니커즈 + 비니', '[룩 3] 체크 셔츠(내의) + 무거운 니트 + 카멜 더플코트 + 울 머플러 + 로퍼'],
      femaleLooks: ['[룩 1] 히트텍 + 니트 롱 원피스 + 두꺼운 불투명 타이츠 + 롱 부츠 + 퍼 코트', '[룩 2] 터틀넥 니트 + 기모 레깅스 + 롱 패딩(무릎 아래) + 부츠 + 비니', '[룩 3] 울 블레이저 + 체크 롱스커트 + 두꺼운 타이츠 + 앵클 부츠 + 머플러'],
      kidsNote: '기모 내의(상하)가 필수입니다. 방한 패딩과 발목까지 오는 방한 부츠, 장갑·귀마개를 챙기세요.',
      seniorNote: '히트텍 이중 착용을 권장합니다. 방풍 기능 있는 롱코트와 미끄럼 방지 밑창의 방한 부츠가 중요합니다.',
    },
  },
  '방콕': {
    '봄': {
      styleKeyword: '트로피컬 UV 프로텍션 × 송크란 방수 룩',
      maleDesc: '4월 방콕 평균 기온 35~36°C. "최소한의 옷, 최대한의 쾌적함"이 핵심입니다. 린넨 or 통기성 기능성 소재 반팔에 쇼츠 조합이 기본. 송크란 물 축제 참가 시 방수팩과 여벌 옷이 필수입니다.',
      femaleDesc: '방콕 봄 여성 스타일은 태국 현지 감성인 "트로피컬 보헤미안"을 참고하면 좋습니다. 흘러내리는 린넨 원피스, 비치 팬츠, 비비드 컬러 탑이 인기입니다. 사원(왓포·왓아룬) 방문 시 어깨·무릎 가리는 의상 필수.',
      maleLooks: ['[룩 1] 화이트 린넨 반팔 셔츠(오픈 칼라) + 베이지 쇼츠 + 슬리퍼 + 챙넓은 모자', '[룩 2] 기능성 UV차단 반팔 + 카고 쇼츠 + 샌들 + 크로스백 (사원 방문용 얇은 긴바지 별도)', '[룩 3] (송크란용) 화이트 반팔 + 수영복 쇼츠 + 슬리퍼 + 방수팩 필수'],
      femaleLooks: ['[룩 1] 비비드 컬러 린넨 슬리브리스 원피스 + 비치 샌들 + 라피아 햇 + 선글라스', '[룩 2] 크롭탑 + 비치 팬츠 + 자외선 차단 집업(사원 방문용) + 뮬', '[룩 3] (사원 방문용) 플로위 미디 원피스(어깨 가림) + 평굽 샌들 — 짧은 옷은 입구에서 천 빌릴 수 있음'],
      kidsNote: '통기성 최우선. UPF 자외선 차단 의류와 모자가 필수입니다. 편한 샌들과 여벌 옷을 충분히 챙기세요.',
      seniorNote: '열사병이 위험한 날씨입니다. 자외선 차단 얇은 긴팔 아우터와 챙넓은 모자, 그리고 냉각 스카프나 휴대용 선풍기를 챙기세요.',
    },
    '여름': {
      styleKeyword: '방콕 우기 실용 룩 — 방수 & 빠른 건조',
      maleDesc: '방콕 우기(5~10월)는 스콜이 매일 찾아옵니다. "스콜 후 빨리 마르는" 기능성 소재가 핵심. 반팔+쇼츠에 접이식 우의(판초)나 소형 우산이 세트입니다. 실내 에어컨이 강하므로 얇은 긴소매 하나는 가방에 넣어두세요.',
      femaleDesc: '우기 방콕의 여성 스타일도 기능성 우선. 빠른 건조 소재의 원피스+방수 샌들 or 방수 스니커즈 조합이 현지 여성들 사이 흔합니다. 발이 젖어도 불편하지 않은 방수 샌들이 핵심 아이템입니다.',
      maleLooks: ['[룩 1] 속건 반팔 티 + 카고 쇼츠 + 방수 샌들 + 경량 접이식 우의(판초)', '[룩 2] 린넨 반팔 + 면 쇼츠 + 크로스백(방수 처리된 것) + 슬리퍼 + 우산', '[룩 3] 긴소매 기능성 셔츠(에어컨 대비) + 쇼츠 + 스니커즈(방수 처리)'],
      femaleLooks: ['[룩 1] 속건 원피스 + 방수 샌들 + 작은 우산 + 방수 크로스백', '[룩 2] 비치 팬츠 + 슬리브리스 + 방수 슬리퍼 + 우의', '[룩 3] 린넨 셔츠 + 쇼츠 + 방수 슬리퍼 + 에어컨 대비 얇은 가디건'],
      kidsNote: '우기에는 방수 샌들이 필수입니다. 여벌 옷을 충분히 챙기고, 모기 기피제 스프레이도 준비하세요.',
      seniorNote: '우기라도 기온은 높습니다. 자외선 차단 + 방수 기능을 동시에 갖춘 가벼운 아우터를 추천합니다.',
    },
    '가을': {
      styleKeyword: '우기 후반 → 건기 초입 전환기 스타일',
      maleDesc: '10~11월 방콕은 우기 후반으로 비가 서서히 줄어드는 시기. 여름 룩에서 점점 건기 룩으로 전환됩니다. 기본 반팔+쇼츠에 접이식 우의는 계속 휴대하세요.',
      femaleDesc: '11월 로이 끄라통 축제 기간에는 태국 전통 의상(차크리 드레스·태국 실크 사롱)을 입고 참여하는 외국인 여성도 많습니다. 현지 시장에서 저렴하게 구매 가능합니다.',
      maleLooks: ['[룩 1] 반팔 기능성 셔츠 + 카고 쇼츠 + 슬리퍼 + 방수 크로스백', '[룩 2] 줄무늬 반팔 + 면 쇼츠 + 스니커즈 + 얇은 방수 재킷', '[룩 3] 린넨 셔츠 + 면 롱팬츠(사원 방문용) + 슬리퍼'],
      femaleLooks: ['[룩 1] 플로럴 원피스 + 방수 샌들 + 밀짚 모자 + 선글라스', '[룩 2] 크롭탑 + 와이드 면 팬츠 + 비치 샌들 (얇은 가디건 추가)', '[룩 3] (로이끄라통용) 태국 전통 실크 사롱 or 롱 원피스 + 금 액세서리'],
      kidsNote: '가을에도 여전히 더우므로 통기성 있는 옷 위주로 준비하세요.',
      seniorNote: '11월 들어 아침저녁이 선선해지지만 낮에는 여전히 더울 수 있습니다. 얇은 겉옷 하나를 가방에 넣어 두세요.',
    },
    '겨울': {
      styleKeyword: '방콕 황금 시즌 — 건기 열대 캐주얼',
      maleDesc: '12~2월은 방콕 최고 여행 시즌. 아침 기온이 22°C까지 내려가지만 낮에는 30°C 이상. 반팔+쇼츠만으로도 충분하지만, 아침 일찍 야외 사원 방문 시 얇은 긴팔 하나를 들고 나가면 좋습니다.',
      femaleDesc: '방콕 겨울 건기 여성 패션은 "열대 리조트 스타일" 그 자체. 밝은 컬러의 린넨 원피스·마맥시 드레스·크로프 탑에 비치 샌들 조합이 현지 SNS를 가득 채웁니다.',
      maleLooks: ['[룩 1] 화이트 린넨 반팔 셔츠 + 베이지 쇼츠 + 샌들 + 라피아 햇', '[룩 2] 스트라이프 폴로 + 카키 쇼츠 + 스니커즈 + 크로스백', '[룩 3] 코코넛 프린트 반팔 + 면 쇼츠 + 슬리퍼 (아침용 얇은 긴팔 추가)'],
      femaleLooks: ['[룩 1] 비비드 컬러 마맥시 드레스 + 비치 샌들 + 선글라스 + 밀짚 모자', '[룩 2] 화이트 크롭탑 + 비치 팬츠 + 뮬 + 라피아 버킷백', '[룩 3] 플로럴 린넨 원피스 + 슬리퍼 (사원 방문용 얇은 가디건 추가)'],
      kidsNote: '건기라 맑고 더운 날이 많습니다. 통기성 옷과 자외선 차단 모자, 선크림을 챙기세요.',
      seniorNote: '건기는 방콕 여행 최적기지만 낮 자외선이 강합니다. 얇은 긴소매 자외선 차단 아우터와 챙넓은 모자를 준비하세요.',
    },
  },
  '파리': {
    '봄': {
      styleKeyword: '파리지앵 프렌치 시크 × 봄 마레 룩',
      maleDesc: '파리 봄의 남성 스타일은 과하지 않으면서 세련된 "소박한 럭셔리"입니다. 테일러드 트렌치코트+슬랙스+로퍼의 조합이 파리 남성의 기본기이며, 줄무늬 브레통 셔츠도 봄 파리의 상징적인 아이템입니다.',
      femaleDesc: '봄 파리의 여성 패션은 "아무렇게나 입은 것 같지만 완벽한" 스타일입니다. 얇은 스카프·발레 플랫슈즈·화이트 셔츠가 파리지엔의 봄 공식입니다. 트렌치코트는 파리 봄의 필수 아이템.',
      maleLooks: ['[룩 1] 브레통 스트라이프 니트 + 네이비 슬랙스 + 카멜 트렌치코트 + 로퍼 + 가죽 토트백', '[룩 2] 화이트 옥스포드 셔츠 + 베이지 치노 + 봄 블레이저 + 화이트 스니커즈', '[룩 3] 머스터드 가디건 + 그레이 슬랙스 + 더비 슈즈 + 가벼운 머플러'],
      femaleLooks: ['[룩 1] 화이트 셔츠 + 미디 스커트 + 발레 플랫슈즈 + 얇은 스카프 + 바구니 백', '[룩 2] 카멜 트렌치코트 + 줄무늬 티 + 스키니 진 + 화이트 스니커즈 + 베레모', '[룩 3] 블루 블라우스 + 플로럴 미디 스커트 + 스트랩 샌들 + 구조적인 토트백'],
      kidsNote: '파리의 봄 날씨는 변덕스럽습니다. 레이어드하기 쉬운 조합으로 준비하세요.',
      seniorNote: '파리는 보행이 많은 도시입니다. 충분한 쿠션의 편한 가죽 슈즈 or 스니커즈가 핵심. 트렌치코트 하나로 일교차를 해결하세요.',
    },
    '여름': {
      styleKeyword: '파리 여름 클래식 — 에레강스 스트리트',
      maleDesc: '파리 여름의 남성 스타일은 지중해풍 "카주아 엘레강스"입니다. 아마 리넨 셔츠+치노+로퍼 조합이 기본이며, 선글라스와 가죽 벨트가 완성을 만듭니다. 반바지 착용 시에도 슬랙스 쇼츠+로퍼로 격을 유지합니다.',
      femaleDesc: '파리 여름 여성 패션 = "미니멀+프렌치 카주얼". 줄무늬 마린 탑+비치 팬츠+발레 플랫슈즈 또는 플로럴 원피스+바구니 백+샌들 조합이 파리지엔 서머 룩의 정석.',
      maleLooks: ['[룩 1] 화이트 린넨 셔츠 + 베이지 슬랙스 쇼츠 + 로퍼 + 스트로 햇 + 선글라스', '[룩 2] 줄무늬 마린 티 + 네이비 치노 + 화이트 스니커즈 + 미니 크로스백', '[룩 3] 파스텔 린넨 셔츠(오픈 칼라) + 크림 쇼츠 + 에스파드리유 + 선글라스'],
      femaleLooks: ['[룩 1] 플로럴 미디 원피스 + 스트랩 샌들 + 밀짚 바구니 백 + 실크 스카프', '[룩 2] 줄무늬 마린 탑 + 화이트 린넨 팬츠 + 발레 플랫슈즈 + 선글라스', '[룩 3] 화이트 사이드리스 블라우스 + 블루 와이드 팬츠 + 에스파드리유 + 바구니 클러치'],
      kidsNote: '자외선이 생각보다 강합니다. 모자와 선크림을 잊지 마세요.',
      seniorNote: '파리 여름은 실내 에어컨이 거의 없어 오히려 덥습니다. 가벼운 린넨 소재를 선택하고, 그늘 많은 골목을 이용하세요.',
    },
    '가을': {
      styleKeyword: '파리 오텀 시크 — 마레 & 생제르맹 어스톤',
      maleDesc: '가을은 파리 패션의 절정기입니다. 어스톤(버건디·머스터드·올리브) 팔레트로 구성한 레이어드 룩이 마레·생제르맹 거리를 장악합니다. 울 코트+터틀넥+슬랙스+첼시 부츠가 파리 남성의 가을 정석.',
      femaleDesc: '"파리지앵의 가을 쇼핑은 트렌치코트부터 시작." 버건디·카멜·오크르 컬러 팔레트를 중심으로, 스카프와 앵클 부츠로 프렌치 가을 룩을 완성합니다.',
      maleLooks: ['[룩 1] 버건디 터틀넥 + 카멜 울 코트 + 그레이 슬랙스 + 첼시 부츠', '[룩 2] 올리브 필드 재킷 + 화이트 셔츠 + 네이비 치노 + 스웨이드 로퍼 + 머플러', '[룩 3] 체크 패턴 오버코트 + 블랙 터틀넥 니트 + 슬랙스 + 더비 슈즈'],
      femaleLooks: ['[룩 1] 카멜 트렌치코트 + 버건디 니트 + 블랙 미디 스커트 + 앵클 부츠 + 실크 스카프', '[룩 2] 머스터드 가디건 + 화이트 블라우스 + 브라운 와이드 팬츠 + 로퍼 + 구조적 토트백', '[룩 3] 체크 블레이저 + 크림 블라우스 + 올리브 미디 스커트 + 스웨이드 힐'],
      kidsNote: '파리 가을은 비가 잦습니다. 방수 재킷이나 우비를 꼭 챙기세요.',
      seniorNote: '비가 자주 오므로 미끄럼 방지 밑창의 편한 워킹화를 준비하세요. 우산은 필수품입니다.',
    },
    '겨울': {
      styleKeyword: '파리 위터 엘레강스 — 크리스마스 마켓 룩',
      maleDesc: '파리 겨울 남성 패션은 두꺼운 울 코트+스카프의 "파리지앵 위터 엘레강스"입니다. 다크 컬러(네이비·그레이·블랙) 위주에 버건디 머플러나 체크 스카프로 포인트를 줍니다.',
      femaleDesc: '크리스마스 마켓 시즌의 파리 여성 스타일은 "따뜻하면서도 우아하게". 롱 울 코트+롱 부츠+터틀넥 니트 조합이 기본. 실크 스카프·장갑·비니로 마무리합니다.',
      maleLooks: ['[룩 1] 두꺼운 울 오버코트 + 터틀넥 니트 + 슬랙스 + 가죽 첼시 부츠 + 캐시미어 머플러', '[룩 2] 네이비 파카 + 체크 스카프 + 두꺼운 울 팬츠 + 방한 부츠 + 비니', '[룩 3] 그레이 울 코트 + 블랙 터틀넥 + 블랙 슬랙스 + 더비 슈즈 + 장갑'],
      femaleLooks: ['[룩 1] 카멜 울 롱코트 + 베이지 터틀넥 니트 + 블랙 타이츠 + 롱 부츠 + 체크 머플러', '[룩 2] 블랙 패딩 + 버건디 니트 + 스키니 + 앵클 부츠 + 울 비니 + 장갑', '[룩 3] 체크 롱코트 + 화이트 블라우스 + 와이드 팬츠 + 힐 부츠 + 실크 스카프'],
      kidsNote: '파리 겨울은 체감온도가 낮습니다. 기모 내의+패딩+방한 장갑·모자를 꼭 챙기세요.',
      seniorNote: '파리 겨울은 흐리고 습합니다. 방풍 기능 있는 두꺼운 코트와 미끄럼 방지 방한 부츠를 준비하세요.',
    },
  },
};

// 기본 시즌별 스타일 (미지정 도시)
const defaultOutfitStyles: Record<string, OutfitStyle> = {
  '봄': {
    styleKeyword: '봄 여행 레이어드 캐주얼',
    maleDesc: `봄 여행의 남성 패션 키워드는 "레이어드 & 경량". 기온이 오르내리므로 가볍게 입었다 걸쳤다 할 수 있는 레이어드 구성이 핵심입니다. 면 티셔츠+얇은 재킷+치노 팬츠 조합으로 아침저녁 일교차에 대비하세요.`,
    femaleDesc: `봄 여행의 여성 패션은 "가볍고 화사하게". 플로럴 블라우스나 파스텔 니트에 트렌치코트 하나를 걸치면 아침저녁 쌀쌀함도 해결됩니다.`,
    maleLooks: ['[룩 1] 화이트 면 티셔츠 + 치노 팬츠 + 얇은 봄 재킷 + 스니커즈', '[룩 2] 스트라이프 셔츠 + 와이드 데님 + 가디건 + 로퍼', '[룩 3] 가벼운 트렌치코트 + 롤넥 니트 + 슬랙스 + 더비 슈즈'],
    femaleLooks: ['[룩 1] 플로럴 블라우스 + 카디건 + 와이드 팬츠 + 플랫슈즈', '[룩 2] 파스텔 니트 + 미디 스커트 + 트렌치코트 + 스니커즈', '[룩 3] 스트라이프 원피스 + 얇은 가디건 + 로퍼 + 크로스백'],
    kidsNote: '레이어드가 가능한 후드집업과 편한 운동화를 준비하세요.',
    seniorNote: '편한 쿠션 운동화와 가벼운 트렌치코트 or 가디건이 핵심입니다.',
  },
  '여름': {
    styleKeyword: '서머 열대 캐주얼 — 통기성 & 자외선 차단',
    maleDesc: `무더운 여름 여행의 남성 스타일은 "기능성 우선". 통기성 좋은 린넨·기능성 소재 반팔에 쇼츠 조합이 기본. 자외선 차단을 위한 챙넓은 모자와 선글라스는 필수입니다.`,
    femaleDesc: `여름 여행의 여성 패션은 "시원하게, 하지만 센스 있게". 원피스+샌들+밀짚 모자의 조합이 어디서나 잘 어울립니다. 실내 에어컨에 대비한 얇은 가디건도 꼭 챙기세요.`,
    maleLooks: ['[룩 1] 린넨 반팔 셔츠 + 쇼츠 + 샌들 + 챙넓은 모자', '[룩 2] 기능성 UV 반팔 + 카고 쇼츠 + 스니커즈 + 크로스백', '[룩 3] 스트라이프 반팔 폴로 + 면 쇼츠 + 슬리퍼 + 버킷햇'],
    femaleLooks: ['[룩 1] 플로럴 원피스 + 비치 샌들 + 밀짚 모자 + 선글라스', '[룩 2] 린넨 크롭탑 + 비치 팬츠 + 슬리퍼 + 라피아 버킷백', '[룩 3] 슬리브리스 블라우스 + 쇼트팬츠 + 뮬 + 얇은 가디건(에어컨 대비)'],
    kidsNote: '통기성 좋은 소재와 자외선 차단 모자, UPF 수영복을 챙기세요.',
    seniorNote: '자외선과 열사병에 주의하세요. 챙넓은 모자·자외선 차단 가디건·쿠션 샌들을 준비하세요.',
  },
  '가을': {
    styleKeyword: '어텀 어스톤 레이어드',
    maleDesc: `가을 여행의 남성 패션은 카멜·버건디·올리브 어스톤 팔레트 기반 레이어드 룩입니다. 니트+재킷+슬랙스 조합으로 관광과 식사 어디서든 세련되게 연출하세요.`,
    femaleDesc: `가을 여행의 여성 패션은 "로맨틱 어텀 레이어드". 머스터드·버건디·올리브 컬러 니트에 미디 스커트나 와이드 팬츠, 그리고 트렌치코트 or 재킷 레이어드.`,
    maleLooks: ['[룩 1] 카멜 니트 + 슬랙스 + 얇은 재킷 + 앵클 부츠', '[룩 2] 오버사이즈 플리스 + 와이드 데님 + 스니커즈 + 머플러', '[룩 3] 체크 셔츠 + 트렌치코트 + 치노 팬츠 + 로퍼'],
    femaleLooks: ['[룩 1] 버건디 니트 + 미디 스커트 + 앵클 부츠 + 트렌치코트', '[룩 2] 머스터드 가디건 + 와이드 팬츠 + 로퍼 + 머플러', '[룩 3] 체크 블레이저 + 크림 블라우스 + 올리브 스커트 + 스웨이드 힐'],
    kidsNote: '긴팔+조거 팬츠+얇은 점퍼 레이어드. 편한 운동화를 준비하세요.',
    seniorNote: '레이어드 착용으로 체온 조절이 쉽습니다. 편한 쿠션 운동화가 핵심입니다.',
  },
  '겨울': {
    styleKeyword: '위터 보온 레이어드 — 방한 완전 무장',
    maleDesc: `겨울 여행의 남성 패션은 "보온 최우선 레이어드". 히트텍 내의 → 두꺼운 니트 → 방풍 패딩 or 울 코트의 3레이어를 기본으로 준비하세요. 방한 부츠와 장갑·머플러·비니도 필수입니다.`,
    femaleDesc: `겨울 여행의 여성 패션은 "따뜻하면서도 스타일리시하게". 기모 내의 → 니트 원피스 or 스웨터+두꺼운 타이츠 → 롱 패딩 or 울 코트의 레이어드가 기본. 보온 부츠는 발목까지 오는 것으로 준비하세요.`,
    maleLooks: ['[룩 1] 히트텍 + 터틀넥 니트 + 울 롱코트 + 슬랙스 + 방한 부츠 + 머플러', '[룩 2] 플리스 집업 + 롱 패딩 + 와이드 데님 + 스니커즈(방한용) + 비니', '[룩 3] 체크 셔츠(내의) + 두꺼운 니트 + 더블 코트 + 울 팬츠 + 더비 슈즈 + 장갑'],
    femaleLooks: ['[룩 1] 히트텍 + 니트 원피스 + 불투명 두꺼운 타이츠 + 롱 패딩 + 롱 부츠', '[룩 2] 기모 내의 + 터틀넥 니트 + 울 미디 스커트 + 두꺼운 레깅스 + 앵클 부츠 + 퍼 코트', '[룩 3] 롱 패딩(무릎 아래) + 폴라 니트 + 기모 레깅스 + 어그 부츠 + 비니'],
    kidsNote: '기모 내의(상하) 필수. 방한 패딩과 발목 방한 부츠, 장갑·귀마개를 챙기세요.',
    seniorNote: '기모 이중 착용과 방풍 방한 아우터, 미끄럼 방지 방한 부츠가 필수입니다.',
  },
};

const getOutfits = (destination: string, season: string): OutfitItem[] => {
  const cityProfiles = cityOutfitStyles[destination];
  const style: OutfitStyle = (cityProfiles && cityProfiles[season]) || defaultOutfitStyles[season] || defaultOutfitStyles['봄'];

  const naverQuery = (gender: string) => encodeURIComponent(`${destination} ${season} ${gender} 여행 옷차림 코디`);
  const pinterestQuery = (gender: string) => encodeURIComponent(`${destination} ${season} ${gender} travel OOTD fashion`);

  return [
    {
      gender: 'male',
      ageGroup: '성인 남성',
      description: style.maleDesc,
      keyItems: style.maleLooks,
      searchUrl: `https://search.naver.com/search.naver?query=${naverQuery('남성')}`,
      referenceUrl: `https://www.pinterest.co.kr/search/pins/?q=${pinterestQuery('men')}`,
    },
    {
      gender: 'female',
      ageGroup: '성인 여성',
      description: style.femaleDesc,
      keyItems: style.femaleLooks,
      searchUrl: `https://search.naver.com/search.naver?query=${naverQuery('여성')}`,
      referenceUrl: `https://www.pinterest.co.kr/search/pins/?q=${pinterestQuery('women')}`,
    },
    {
      gender: 'all',
      ageGroup: '어린이 / 유아',
      description: `어린이는 활동량이 많으므로 편안하고 통기성 좋은 소재가 우선입니다. ${style.kidsNote}`,
      keyItems: season === '여름'
        ? ['[필수] 통기성 면 반팔·반바지 세트', '[필수] UPF 자외선 차단 모자', '[필수] UV 차단 수영복 (해변/수영장 방문 시)', '[필수] 발이 편한 샌들 or 방수 운동화', '[보조] 소형 선풍기 or 냉각 수건']
        : season === '겨울'
        ? ['[필수] 기모 내의 상하 세트', '[필수] 방한 패딩 점퍼 (어린이용)', '[필수] 발목까지 오는 방한 부츠', '[필수] 방한 장갑 & 귀마개 or 털 모자', '[보조] 두꺼운 양말 2켤레 이상']
        : ['[필수] 레이어드 가능한 긴팔+얇은 점퍼', '[필수] 편한 쿠션 운동화', '[필수] 자외선 차단 모자', '[보조] 얇은 가디건 (실내 에어컨 대비)', '[보조] 무릎 패드 (야외 활동 많은 경우)'],
      searchUrl: `https://search.naver.com/search.naver?query=${naverQuery('아동')}`,
      referenceUrl: `https://www.pinterest.co.kr/search/pins/?q=${pinterestQuery('kids')}`,
    },
    {
      gender: 'all',
      ageGroup: '시니어 (60대+)',
      description: `체온 조절 능력이 낮아지는 시니어는 편안함과 안전이 패션보다 먼저입니다. ${style.seniorNote}`,
      keyItems: season === '여름'
        ? ['[필수] 자외선 차단 얇은 긴팔 아우터 (UPF50+)', '[필수] 챙넓은 모자 (햇빛 완전 차단용)', '[필수] 쿠션 충분한 워킹 샌들 or 운동화', '[필수] 냉각 스카프 or 휴대용 선풍기', '[보조] 압박 스타킹 (장시간 이동 시)']
        : season === '겨울'
        ? ['[필수] 기모 내의 (이중 착용 권장)', '[필수] 방풍+방한 롱코트 or 패딩', '[필수] 미끄럼 방지 밑창 방한 부츠', '[필수] 장갑 & 귀마개 & 머플러', '[보조] 핫팩 (핸드워머)']
        : ['[필수] 쿠션 충분한 편한 워킹화 (새 신발 금지)', '[필수] 레이어드 가능한 가디건 or 얇은 재킷', '[필수] 모자 or 양산 (자외선 차단)', '[보조] 압박 스타킹 (장시간 보행 시)', '[보조] 소형 접이식 우산'],
      searchUrl: `https://search.naver.com/search.naver?query=${naverQuery('시니어')}`,
      referenceUrl: `https://www.pinterest.co.kr/search/pins/?q=${pinterestQuery('senior')}`,
    },
  ];
};

// 단일 도시 결과 생성 (내부용)
const generateCityResult = (
  dest: string,
  country: string,
  monthNum: number,
  season: string,
): TravelResult => {
  const cityInfo = getCityInfo(dest, country);
  const weatherSource = (weatherMap[dest] || {})[season] || defaultWeather[season as keyof typeof defaultWeather];
  const cityData = getCityData(dest, monthNum);

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
    spots: getSpots(dest),
    routes: getRoutes(dest),
    restaurants: cityData.restaurants,
    accommodations: cityData.accommodations,
    outfits: getOutfits(dest, season),
    festivalsAndWarnings: cityData.festivals,
  };
};

// 하위 호환용 (단일 도시 첫 번째 결과)
export const generateMockResult = (params: SearchParams): TravelResult => {
  const monthNum = getMonthNum(params);
  const season = getMonthSeason(monthNum);
  const primary = params.destinationCities[0] || '';
  return generateCityResult(primary, params.destinationCountry, monthNum, season);
};

// 멀티시티: 선택된 모든 도시의 결과 배열 반환
export const generateAllResults = (params: SearchParams): TravelResult[] => {
  const monthNum = getMonthNum(params);
  const season = getMonthSeason(monthNum);
  return params.destinationCities.map((city) =>
    generateCityResult(city, params.destinationCountry, monthNum, season)
  );
};
