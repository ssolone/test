import type { FestivalEvent, Restaurant, Accommodation } from '../types';
import { cityFestivalMap, countryFestivalMap } from './festivalData';

export interface CityData {
  festivals: FestivalEvent[];
  restaurants: Restaurant[];
  accommodations: Accommodation[];
}

const ALL: import('../types').CompanionType[] = ['family_elderly', 'family_young_kids', 'family_all', 'couple', 'small_group', 'large_group'];
const ADULT: import('../types').CompanionType[] = ['couple', 'small_group', 'large_group', 'family_elderly', 'family_all'];
const COUPLE: import('../types').CompanionType[] = ['couple', 'small_group'];
const FAMILY: import('../types').CompanionType[] = ['family_young_kids', 'family_all', 'large_group'];
const ELDERLY: import('../types').CompanionType[] = ['family_elderly', 'family_all'];
const GROUP: import('../types').CompanionType[] = ['small_group', 'large_group', 'family_all'];

export const cityDataMap: Record<string, CityData> = {

  // ───────── 도쿄 ─────────
  '도쿄': {
    festivals: [
      { name: '벚꽃 시즌 (하나미)', period: '3월 말 ~ 4월 초', months: [3,4], description: '우에노공원·메구로강·신주쿠교엔 등 도쿄 전역이 벚꽃으로 물듭니다. 현지인과 관광객이 한꺼번에 몰려 숙소·교통 모두 극성수기입니다.', type: 'festival', impact: 'positive', tip: '항공권·숙소는 최소 3개월 전 예약. 평일 이른 아침(7시 이전)에 명소를 먼저 둘러보세요.' },
      { name: '골든위크 (황금연휴)', period: '4월 29일 ~ 5월 5일', months: [4,5], description: '일본 최대 연휴 기간으로 관광지·신칸센·숙소 모두 2배 이상 가격이 오르고 극도로 혼잡합니다. 일부 레스토랑·상점도 예약이 꽉 찹니다.', type: 'holiday', impact: 'avoid', tip: '이 기간을 피하거나, 피할 수 없다면 6개월 전 예약이 필수입니다.' },
      { name: '스미다강 불꽃놀이 대회', period: '7월 마지막 토요일', months: [7], description: '도쿄 최대 불꽃놀이 축제로 약 2만 발의 불꽃이 스미다강 상공을 수놓습니다. 인파가 100만 명을 넘어 이동에 2~3시간이 걸릴 수 있습니다.', type: 'festival', impact: 'positive', tip: '유카타(여름 기모노) 입고 저녁 5시 이전에 자리 잡으세요. 아사쿠사 골목 식당에서 저녁 해결 후 이동 추천.' },
      { name: '오봉 연휴', period: '8월 13~16일', months: [8], description: '일본 귀성 시즌으로 도심 관광지는 오히려 한산해지지만, 신칸센·고속도로는 극혼잡입니다. 일부 가족 레스토랑·상점 휴무.', type: 'holiday', impact: 'caution', tip: '도심 관광은 오히려 여유롭지만, 장거리 이동 티켓은 2개월 전 예매 필수.' },
      { name: '도쿄 마라톤', period: '3월 첫째 일요일', months: [3], description: '세계 6대 메이저 마라톤 중 하나로 도심 곳곳이 통제됩니다. 긴자·아사쿠사·시나가와 구간 도로가 오전 내내 폐쇄됩니다.', type: 'event', impact: 'caution', tip: '이동 경로를 미리 확인하고, 지하철 중심으로 다니세요.' },
      { name: '연말연시 (오쇼가쓰)', period: '12월 31일 ~ 1월 3일', months: [12,1], description: '대부분의 상점·식당이 휴업하며, 신사에서 새해 참배(하쓰모데) 인파가 몰립니다. 메이지신궁에는 3일간 300만 명이 방문합니다.', type: 'holiday', impact: 'caution', tip: '편의점·패밀리레스토랑은 영업. 31일 자정 메이지신궁 카운트다운은 특별한 경험이지만 방한 준비 철저히.' },
    ],
    restaurants: [
      { name: '츠키지 시장 주변 초밥집', cuisine: '스시 (오마카세·회전초밥)', priceRange: '₩₩~₩₩₩₩', description: '신 츠키지 시장 인근에 줄 서서 먹는 신선한 스시 가게들이 즐비합니다. 다이와스시, 스시 다이 등이 유명하며 이른 아침부터 줄을 섭니다.', companionFit: ADULT },
      { name: '신주쿠 가부키초 라멘 골목', cuisine: '라멘', priceRange: '₩~₩₩', description: '이치란, 후겐도, 도쿄 라멘 스트리트 등 스타일별 라멘 전문점이 밀집. 24시간 운영 가게도 많아 야식으로도 제격입니다.', companionFit: ALL },
      { name: '아키하바라·아사쿠사 이자카야', cuisine: '이자카야 (일본식 주점)', priceRange: '₩₩~₩₩₩', description: '퇴근 후 현지 직장인들과 어깨를 나란히 하며 즐기는 야키토리·오뎅·사케. 아사쿠사 홉피 거리가 특히 유명합니다.', companionFit: ADULT },
      { name: '긴자·마루노우치 고급 레스토랑', cuisine: '일식 파인다이닝·프렌치', priceRange: '₩₩₩₩~₩₩₩₩₩', description: '미슐랭 스타 레스토랑이 밀집한 지역. 스키야바시 지로, 도쿄 카이세키 등 예약은 수개월 전 필수입니다.', companionFit: COUPLE },
      { name: '하라주쿠·오모테산도 카페·브런치', cuisine: '카페·브런치', priceRange: '₩₩', description: '빌즈(Bills) 리코타팬케이크, 오모테산도 힐즈 카페 등 인스타 명소가 즐비합니다. 패션과 음식을 함께 즐길 수 있습니다.', companionFit: COUPLE },
      { name: '아메요코 시장 길거리 음식', cuisine: '길거리 음식·포장마차', priceRange: '₩', description: '우에노 아메요코 시장의 해산물 꼬치, 과일 등 다양한 먹거리. 현지인 장보는 모습과 함께 저렴하게 맛볼 수 있는 공간입니다.', companionFit: ALL },
    ],
    accommodations: [
      { name: '파크 하얏트 도쿄 (신주쿠)', type: '5성급 럭셔리', priceRange: '₩₩₩₩₩', description: '영화 〈사랑도 통역이 되나요?〉의 배경. 52~55층에서 후지산 뷰를 즐길 수 있습니다. 수영장·스파 완비.', companionFit: COUPLE, bookingUrl: 'https://www.hyatt.com/ko-KR/hotel/japan/park-hyatt-tokyo/tyoph', distanceToStation: '신주쿠역 도보 12분 또는 셔틀', reviewScore: 4.7, reviewCount: '5,200건+' },
      { name: '도쿄 스테이션 호텔', type: '5성급 클래식', priceRange: '₩₩₩₩₩', description: '1915년 개업한 역사적 건물 안에 자리한 호텔. 마루노우치 뷰 객실에서 도쿄역 붉은 벽돌 지붕을 감상할 수 있습니다.', companionFit: COUPLE, bookingUrl: 'https://www.thetokyostationhotel.jp/ko/', distanceToStation: '도쿄역 직결 (도보 1분)', reviewScore: 4.8, reviewCount: '4,100건+' },
      { name: '더 프린스 파크 타워 도쿄', type: '4성급 패밀리', priceRange: '₩₩₩₩', description: '도쿄 타워 바로 옆에 위치. 어린이 메뉴·수영장·넓은 객실로 가족 여행에 최적화. 시오도메·롯폰기 접근성 우수.', companionFit: FAMILY, bookingUrl: 'https://www.booking.com/hotel/jp/the-prince-park-tower-tokyo.ko.html', distanceToStation: '아카바네바시역 도보 7분', amenities: ['어린이 메뉴 제공', '실내 수영장', '유아 침대 무료', '전자레인지 (요청 시)', '유아 어메니티 세트', '트윈+엑스트라베드 구성 가능'], kidsScore: 5, reviewScore: 4.4, reviewCount: '2,800건+' },
      { name: '아사쿠사 게스트하우스 (카가미야)', type: '게스트하우스·료칸', priceRange: '₩₩', description: '전통 목조 건물을 개조한 아사쿠사 게스트하우스. 센소지 도보 5분, 공용 공간에서 각국 여행자와 교류 가능.', companionFit: ['couple', 'small_group'], bookingUrl: 'https://www.booking.com/hotel/jp/kagamiya.ko.html', distanceToStation: '아사쿠사역 도보 5분', reviewScore: 4.2, reviewCount: '680건+' },
      { name: '시부야 스트림 엑셀 호텔 도큐', type: '4성급 비즈니스', priceRange: '₩₩₩', description: '시부야 스크램블 교차로 도보 2분. 쇼핑·나이트라이프의 중심으로 젊은 여행자에게 인기. 체크인 후 바로 시부야 탐방 가능.', companionFit: ['couple', 'small_group', 'large_group'], bookingUrl: 'https://www.booking.com/hotel/jp/shibuya-stream-excel-tokyu.ko.html', distanceToStation: '시부야역 직결 (도보 2분)', reviewScore: 4.3, reviewCount: '3,100건+' },
    ],
  },

  // ───────── 오사카 ─────────
  '오사카': {
    festivals: [
      { name: '벚꽃 시즌', period: '3월 말 ~ 4월 초', months: [3,4], description: '오사카성 공원·나카노시마·마루야마 공원의 벚꽃이 절경입니다. 오사카성 해자 주변 600그루 벚나무가 동시에 개화하는 시기가 하이라이트입니다.', type: 'festival', impact: 'positive', tip: '오사카성 야간 조명(라이트업)은 저녁 6~10시. 혼잡을 피해 주중 방문 권장.' },
      { name: '텐진 마츠리', period: '7월 24~25일', months: [7], description: '일본 3대 축제 중 하나. 1,000년 이상의 역사를 가진 오사카 텐만구 신사 축제로, 25일 저녁 선상 행렬과 불꽃놀이가 절정입니다.', type: 'festival', impact: 'positive', tip: '요도가와 강변 좌석은 오후 1시 이전 선점 필요. 유카타 차림으로 참여하면 더욱 특별합니다.' },
      { name: '골든위크', period: '4월 29일 ~ 5월 5일', months: [4,5], description: '유니버설 스튜디오 재팬(USJ) 대기 시간 4~5시간, 숙소 요금 2배 이상. 도톤보리·구로몬 시장 극혼잡.', type: 'holiday', impact: 'avoid', tip: 'USJ 익스프레스 패스는 6개월 전 예매. 골든위크 전후 1~2주가 가성비 최적입니다.' },
      { name: '오사카 루미나리에', period: '12월 상순 ~중순', months: [12], description: '한신 대지진 희생자 추모 이벤트로 시작된 도심 일루미네이션 축제. 고베와 함께 관서 지방 겨울 대표 행사입니다.', type: 'festival', impact: 'positive', tip: '주말 저녁은 극혼잡. 평일 오후 6시 이후 방문 추천.' },
      { name: '할로윈 도톤보리', period: '10월 31일', months: [10], description: '도톤보리·미나미 일대에 코스프레 인파가 몰립니다. 사실상 오사카 최대 거리 파티로, 일부 도로가 보행자 전용으로 통제됩니다.', type: 'event', impact: 'positive', tip: '코스튬 없어도 구경 재미 충분. 인파 통제로 이동 시간 2배 예상.' },
    ],
    restaurants: [
      { name: '도톤보리 타코야키 & 오코노미야키', cuisine: '오사카 소울푸드', priceRange: '₩~₩₩', description: '크레메리아·아미자 타코야키, 미즈노·킨류 오코노미야키 등 오사카 원조 가게들이 도톤보리에 밀집. "구이다오레(먹다가 쓰러진다)" 오사카 문화를 경험하세요.', companionFit: ALL },
      { name: '쿠로몬 이치바 시장', cuisine: '신선 해산물·시장 음식', priceRange: '₩~₩₩', description: '"오사카의 부엌"으로 불리는 재래시장. 즉석 굴·참치회·꼬치 등을 시장 안에서 바로 먹을 수 있습니다.', companionFit: ALL },
      { name: '신세카이 쿠시카츠 골목', cuisine: '쿠시카츠 (꼬치 튀김)', priceRange: '₩₩', description: '다루마·야에가키 등 100년 전통 쿠시카츠 집. "소스 두 번 찍기 금지" 규칙이 재미있습니다. 신세카이 통천각 근처에 밀집.', companionFit: ALL },
      { name: '우메다·키타 파인다이닝', cuisine: '프렌치·이탈리안·카이세키', priceRange: '₩₩₩₩~₩₩₩₩₩', description: '허비스 엔트·그랑 프론트 오사카 내 고급 레스토랑 밀집. 미슐랭 2~3스타 가게도 다수 위치합니다.', companionFit: COUPLE },
      { name: '나카자키초 카페 & 크레이프', cuisine: '카페·디저트', priceRange: '₩₩', description: '오사카의 "브루클린"이라 불리는 나카자키초. 개성 있는 독립 카페와 빈티지 숍이 가득한 감성 골목.', companionFit: COUPLE },
    ],
    accommodations: [
      { name: 'W 오사카', type: '5성급 디자인 호텔', priceRange: '₩₩₩₩₩', description: '안도 다다오 설계로 미니멀하고 현대적인 감각. 도심 미도스지 대로 바로 앞에 위치. 루프탑 바에서 오사카 야경이 환상적입니다.', companionFit: COUPLE, bookingUrl: 'https://www.marriott.com/hotels/travel/osamc-w-osaka/', distanceToStation: '신사이바시역 도보 3분', reviewScore: 4.6, reviewCount: '2,900건+' },
      { name: '콘래드 오사카', type: '5성급 럭셔리', priceRange: '₩₩₩₩₩', description: '나카노시마 페스티벌 타워 40층 이상에 위치. 도시 파노라마 뷰가 압도적이며 미슐랭 레스토랑 입점.', companionFit: COUPLE, bookingUrl: 'https://www.hilton.com/ko/hotels/osacihi-conrad-osaka/', distanceToStation: '히고바시역 도보 5분', reviewScore: 4.8, reviewCount: '3,400건+' },
      { name: '크로스 호텔 오사카', type: '3성급 트렌디', priceRange: '₩₩₩', description: '난바·도톤보리 도보 5분. 디자인 감각이 뛰어나고 가성비 좋아 젊은 여행자에게 인기. 루프탑 바 운영.', companionFit: ['couple', 'small_group'], bookingUrl: 'https://www.booking.com/hotel/jp/cross-osaka.ko.html', distanceToStation: '닛폰바시역 도보 4분', reviewScore: 4.2, reviewCount: '5,600건+' },
      { name: '오사카 엑셀 호텔 도큐 (난바)', type: '4성급 패밀리', priceRange: '₩₩₩', description: '난바역 직결. 어린이 환영 정책, 유아용 어메니티 제공. 도톤보리·덴덴타운 도보권으로 가족 여행에 편리.', companionFit: FAMILY, bookingUrl: 'https://www.booking.com/hotel/jp/namba-excel-hotel-tokyu.ko.html', distanceToStation: '난바역 직결 (도보 1분)', amenities: ['유아 어메니티 세트', '유아 침대 무료', '전자레인지 (요청 시)', '어린이 메뉴', '유모차 보관 가능'], kidsScore: 4, reviewScore: 4.3, reviewCount: '4,100건+' },
    ],
  },

  // ───────── 교토 ─────────
  '교토': {
    festivals: [
      { name: '기온 마츠리', period: '7월 한 달간 (메인: 17일·24일)', months: [7], description: '1,100년 역사를 자랑하는 일본 최대 축제. 화려하게 장식된 야마호코 수레 34대가 교토 시내를 누빕니다. 7월 16일 전야제 요이야마가 특히 인기.', type: 'festival', impact: 'positive', tip: '요이야마(7/16) 인파가 가장 많음. 17일 야마호코 순행은 오전 9~11시가 촬영 최적.' },
      { name: '벚꽃 시즌', period: '3월 말 ~ 4월 초', months: [3,4], description: '마루야마 공원·기요미즈데라·아라시야마·철학의 길 등 교토 전역 벚꽃 명소가 절정을 이룹니다. 전국에서 인파가 몰려 숙소 요금이 평소의 3배까지 오릅니다.', type: 'festival', impact: 'positive', tip: '숙소는 최소 4~6개월 전 예약 필수. 기요미즈데라 야간 라이트업 입장권은 1개월 전부터 온라인 예매.' },
      { name: '단풍 시즌', period: '11월 중순 ~ 12월 초', months: [11,12], description: '아라시야마·도후쿠지·에이칸도의 단풍이 절정. 교토의 단풍은 일본 최고 수준으로 손꼽히며, 단풍 시즌 숙소도 벚꽃 시즌 못지않게 가격이 치솟습니다.', type: 'festival', impact: 'positive', tip: '도후쿠지 홍교(다리) 뷰는 오전 8시 이전 방문 시 비교적 한산. 야간 라이트업은 사전 예약 필수.' },
      { name: '아오이 마츠리', period: '5월 15일', months: [5], description: '헤이안 시대 복장을 한 500명 행렬이 교토 시내를 걷는 우아한 축제. 과도한 인파 없이 교토 전통문화를 생생히 볼 수 있습니다.', type: 'festival', impact: 'positive', tip: '가미가모 신사 ~ 시모가모 신사 ~ 교토 고쇼 경로. 오전 10시 30분 출발, 무료 관람 가능.' },
      { name: '골든위크 & 단오 연휴', period: '4월 29일 ~ 5월 5일', months: [4,5], description: '교토 대표 관광지(아라시야마·기요미즈데라·후시미이나리)가 극혼잡. 아라시야마 대나무 숲은 이동이 어려울 정도로 인파가 몰립니다.', type: 'holiday', impact: 'caution', tip: '새벽 6~7시에 유명 명소 먼저 방문 후 오전 일찍 마무리하는 전략이 효과적.' },
    ],
    restaurants: [
      { name: '니시키 시장 (교토의 부엌)', cuisine: '교토 전통 반찬·두부·절임', priceRange: '₩~₩₩', description: '"교토의 부엌" 니시키 시장. 유바(두부 껍질)·쓰케모노(절임)·京野菜 등 교토 특산 식재료와 먹거리를 바로 맛볼 수 있습니다.', companionFit: ALL },
      { name: '기온 카이세키 (전통 코스 요리)', cuisine: '카이세키 (교토 전통 요리)', priceRange: '₩₩₩₩~₩₩₩₩₩', description: '기온 거리의 역사 깊은 요정·료정에서 즐기는 교토 카이세키. 계절 식재료로 만든 예술적인 코스 요리를 다다미방에서 경험합니다.', companionFit: COUPLE },
      { name: '아라시야마 두부 요리', cuisine: '유도후 (두부 전골)', priceRange: '₩₩₩', description: '아라시야마 덴류지 근처 유도후 전문점에서 교토산 두부 전골 코스 식사. 창밖 정원 뷰와 함께하는 고요한 식사 경험.', companionFit: ELDERLY },
      { name: '기온 마치야 카페', cuisine: '마차·일본 디저트 카페', priceRange: '₩₩', description: '교토 기온 사거리 인근 마치야(町家, 전통 목조 상가) 개조 카페. 마차 소프트아이스크림, 와라비모찌 파르페 등 교토 스타일 디저트.', companionFit: COUPLE },
    ],
    accommodations: [
      { name: '아만쥬앙 교토', type: '5성급 부티크 료칸', priceRange: '₩₩₩₩₩', description: '교토 고쇼 내 역사적 건물을 복원한 럭셔리 료칸. 전통 다도·꽃꽂이 체험, 전용 가이드 투어 포함. 1박 150만원 이상이지만 일생에 한 번 경험.', companionFit: COUPLE, bookingUrl: 'https://www.aman.com/resorts/amanjaku', distanceToStation: '교토역 차로 10분', reviewScore: 4.9, reviewCount: '610건+' },
      { name: '호시노야 교토', type: '5성급 료칸 (전용 보트 입장)', priceRange: '₩₩₩₩₩', description: '오이강 배를 타고만 접근 가능한 비경 료칸. 노천 온천·계절 가이세키·대나무 숲 뷰. 세계적으로 인정받은 숙소입니다.', companionFit: COUPLE, bookingUrl: 'https://hoshinoresorts.com/ko/hotels/hoshinoyakyoto/', distanceToStation: '아라시야마역 보트 10분', reviewScore: 4.8, reviewCount: '890건+' },
      { name: '기온 후나야 (마치야 통째 대여)', type: '전통 마치야 숙소', priceRange: '₩₩₩₩', description: '기온 골목 전통 목조 타운하우스(마치야) 1채를 통째로 빌리는 숙소. 최대 6인 가능, 주방·전자레인지 완비.', companionFit: GROUP, bookingUrl: 'https://www.booking.com/hotel/jp/gion-funaya.ko.html', distanceToStation: '기온시조역 도보 8분', amenities: ['주방 완비 (전자레인지·인덕션·냉장고)', '세탁기', '유아 침대 협의 가능'], kidsScore: 3, reviewScore: 4.5, reviewCount: '340건+' },
      { name: '더 사우전드 교토', type: '4성급 도심 호텔', priceRange: '₩₩₩', description: '교토역 도보 5분. 간결한 일본 미학 인테리어, 대형 욕조 보유 객실 다수. 교토 주요 관광지 버스·지하철 이용이 편리합니다.', companionFit: ALL, bookingUrl: 'https://www.booking.com/hotel/jp/the-thousand-kyoto.ko.html', distanceToStation: '교토역 도보 5분', amenities: ['전자레인지 (요청 시)', '유아 침대 제공'], reviewScore: 4.4, reviewCount: '2,200건+' },
    ],
  },

  // ───────── 방콕 ─────────
  '방콕': {
    festivals: [
      { name: '송크란 (태국 물 축제)', period: '4월 13~15일', months: [4], description: '태국 최대 명절로 거리 전체에서 물 싸움이 벌어집니다. 카오산로드·실롬·아속 교차로가 가장 격렬합니다. 외국인도 완전히 참여 가능한 국민 축제입니다.', type: 'festival', impact: 'positive', tip: '방수팩·방수 케이스는 필수. 중요 물품은 호텔 보관. 흰 옷은 피하세요.' },
      { name: '로이 끄라통 (빛의 축제)', period: '11월 보름달 날', months: [11], description: '연꽃 모양 등불을 강이나 연못에 띄우는 아름다운 축제. 짜오프라야강 유람선 위에서 등불 띄우기 체험이 최고입니다.', type: 'festival', impact: 'positive', tip: '왕궁 앞 강변, 아시아티크 선착장에서 관람 추천. 치앙마이 이펑 축제와 같은 날이라 치앙마이가 더 장관입니다.' },
      { name: '우기 스콜 시즌', period: '5월 ~ 10월', months: [5,6,7,8,9,10], description: '매일 오후 2~5시 강한 스콜이 20~40분 내립니다. 교통 체증이 평소의 3배 이상 심해지고, 일부 저지대 골목이 침수됩니다.', type: 'warning', impact: 'caution', tip: '오전에 야외 관광, 오후는 실내(쇼핑몰·사원 내부)로 일정 조정. 슬리퍼보다 방수 샌들 권장.' },
      { name: '태국 국왕 생일·국경일', period: '12월 5일 (故 푸미폰 국왕 생일·아버지의 날)', months: [12], description: '왕궁 주변 도로 통제, 대규모 기념행사. 태국은 왕실에 대한 경의가 국법으로 의무화되어 있습니다.', type: 'holiday', impact: 'caution', tip: '왕실 관련 발언·사진에 절대 주의. 왕실 모독죄(레세마제스테)는 외국인도 처벌 대상입니다.' },
      { name: '방콕 패션 위크 & 아트 이벤트', period: '10~11월', months: [10,11], description: '건기 초입으로 날씨가 좋아지며 갤러리, 패션쇼, 음식 페스티벌 등 문화 행사가 집중됩니다.', type: 'event', impact: 'positive', tip: '방콕 아트 비엔날레 개최 연도(짝수해)에는 방콕 전역에서 설치 미술 관람 가능.' },
    ],
    restaurants: [
      { name: '짜뚜짝 주말시장 & 야시장 음식', cuisine: '태국 길거리 음식', priceRange: '₩', description: '세계 최대 규모 짜뚜짝 주말시장 내 팟타이·쏨땀·망고 카오니아우 등 태국 먹거리 집합. 주말(토·일)만 운영합니다.', companionFit: ALL },
      { name: '야오와랏 차이나타운 씨푸드', cuisine: '태국식 중화 씨푸드', priceRange: '₩₩~₩₩₩', description: '방콕 차이나타운 야오와랏 로드의 게 요리·새우 요리 전문 노천 식당. 현지인과 관광객이 뒤섞인 왁자지껄한 분위기가 매력입니다.', companionFit: ALL },
      { name: '루프탑 바 (오쿠라·르부아)', cuisine: '태국 퓨전·인터내셔널', priceRange: '₩₩₩₩', description: '르부아 앳 스테이트 타워의 시로코(영화 행오버2 촬영지)·오쿠라 프레스티지 루프탑. 방콕 야경을 360도 감상하며 칵테일 한 잔.', companionFit: COUPLE },
      { name: '수쿰빗 에카마이·통로 맛집 골목', cuisine: '태국 현지 식당·카페', priceRange: '₩₩', description: '방콕 현지 중산층이 즐겨 찾는 에카마이·통로 지역. 카오만카이, 마사만 커리, 로컬 카페 등이 밀집해 있습니다.', companionFit: COUPLE },
      { name: '카오산로드 레스토랑', cuisine: '태국·인터내셔널 배낭여행자 식당', priceRange: '₩~₩₩', description: '배낭여행자 성지 카오산로드의 저렴한 팟타이·똠얌꿍·망고쉐이크. 맥주도 매우 저렴합니다.', companionFit: ['small_group', 'large_group'] },
    ],
    accommodations: [
      { name: '만다린 오리엔탈 방콕', type: '5성급 역사적 럭셔리', priceRange: '₩₩₩₩₩', description: '1876년 개업한 아시아 최고 호텔 중 하나. 짜오프라야강 리버뷰 스위트, 전용 선착장, 타이쿠킹 클래스 포함.', companionFit: COUPLE, bookingUrl: 'https://www.mandarinoriental.com/ko/bangkok/chao-phraya-river', distanceToStation: '사톤 선착장 도보 3분 (BTS 사판탁신역)', reviewScore: 4.9, reviewCount: '8,400건+' },
      { name: '카펠라 방콕', type: '5성급 리버사이드 리조트', priceRange: '₩₩₩₩₩', description: '짜오프라야강 변의 프라이빗 리조트형 호텔. 전 객실 리버뷰, 수영장 빌라 보유. 조용한 고급 휴양을 원하는 커플에게 최적.', companionFit: COUPLE, bookingUrl: 'https://www.capellahotels.com/en/capella-bangkok', distanceToStation: '왕궁 선착장 도보 5분', reviewScore: 4.8, reviewCount: '1,200건+' },
      { name: '아마리 수쿰빗 방콕', type: '4성급 패밀리', priceRange: '₩₩₩', description: 'BTS 나나역 직결. 키즈 클럽·가족 수영장·어린이 메뉴 보유. 쇼핑몰(터미널 21) 도보 5분으로 가족 이동이 편리합니다.', companionFit: FAMILY, bookingUrl: 'https://www.booking.com/hotel/th/amari-sukhumvit-bangkok.ko.html', distanceToStation: 'BTS 나나역 직결', amenities: ['키즈 클럽 (만 4세~12세)', '어린이 전용 수영장 레인', '어린이 메뉴', '전자레인지', '유아 침대 무료', '유모차 대여 가능'], kidsScore: 5, reviewScore: 4.3, reviewCount: '6,800건+' },
      { name: '더 스탠다드 방콕 마하나콘', type: '4성급 트렌디', priceRange: '₩₩₩', description: '방콕에서 가장 힙한 호텔 중 하나. 루프탑 바·수영장·감각적인 인테리어. 살라댕·실롬 지역 접근성 최고.', companionFit: ['couple', 'small_group'], bookingUrl: 'https://www.booking.com/hotel/th/the-standard-bangkok-mahanakhon.ko.html', distanceToStation: 'BTS 총논시역 도보 3분', reviewScore: 4.4, reviewCount: '3,100건+' },
    ],
  },

  // ───────── 파리 ─────────
  '파리': {
    festivals: [
      { name: '바스티유 데이 (프랑스 혁명 기념일)', period: '7월 14일', months: [7], description: '에펠탑 불꽃놀이와 샹젤리제 군사 퍼레이드. 프랑스 최대 국경일로 에펠탑 주변에는 오후부터 수십만 명이 모입니다.', type: 'festival', impact: 'positive', tip: '트로카데로 광장이 불꽃놀이 최고 명당. 오후 3시 이전 도착 추천. 소매치기 극주의.' },
      { name: '파리 패션 위크', period: '3월 초·10월 초 (연 2회)', months: [3,10], description: '프레타포르테(봄·여름: 10월, 가을·겨울: 3월). 도심 교통 혼잡, 특급 호텔·레스토랑 예약 어려움. 거리 패션 구경은 무료.', type: 'event', impact: 'caution', tip: '상젤리제·마레 지구에서 거리 스트리트 패션 촬영 가능. 유명 부티크 임시 폐쇄 확인.' },
      { name: '8월 바캉스 시즌', period: '8월 (특히 1~3주)', months: [8], description: '파리지앵 대부분이 휴가를 떠나 빵집·식당·미용실 등 현지 상점 상당수가 휴업합니다. 관광 명소는 열리지만 진짜 현지 느낌은 줄어듭니다.', type: 'warning', impact: 'caution', tip: '방문 전 구글맵으로 영업 여부 확인 필수. 관광지 위주 식당은 영업하지만 질이 떨어질 수 있습니다.' },
      { name: '크리스마스 마켓', period: '11월 말 ~ 12월 24일', months: [11,12], description: '샹젤리제·생제르맹·튈르리 정원 등 파리 전역에서 크리스마스 마켓이 열립니다. 뱅쇼(뜨거운 와인)와 크레페를 즐기며 유럽 겨울 낭만을 만끽하세요.', type: 'festival', impact: 'positive', tip: '스트라스부르 당일치기(TGV 2시간)와 조합하면 유럽 최고 크리스마스 여행.' },
      { name: '파리 뮤직 페스티벌 (Fête de la Musique)', period: '6월 21일', months: [6], description: '프랑스 전역에서 거리 음악 공연이 무료로 펼쳐집니다. 파리에서만 수천 개의 공연이 열리며, 밤새 음악과 축제 분위기가 이어집니다.', type: 'festival', impact: 'positive', tip: '마레 지구·몽마르트르·생제르맹 일대가 특히 활기찹니다. 돗자리 챙겨 광장에서 즐기세요.' },
    ],
    restaurants: [
      { name: '르 꽁뜨와 뒤 를레 (마레)', cuisine: '프렌치 비스트로', priceRange: '₩₩₩', description: '예약 없이 가는 파리 비스트로의 교과서. 스테이크 타르타르·쉐프 추천 일일 메뉴(플라 뒤 주르)가 일품입니다. 현지인·관광객 모두 즐겨 찾습니다.', companionFit: ADULT },
      { name: '팔레 루아얄 & 샹젤리제 카페', cuisine: '파리 클래식 카페', priceRange: '₩₩₩', description: '레 되 마고·카페 드 플로르(생제르맹)는 헤밍웨이·피카소가 단골이었던 파리 문학 카페. 에스프레소 한 잔과 크루아상으로 파리 오전 시작.', companionFit: COUPLE },
      { name: '뤼 드 무프타르 마켓 & 프로마주리', cuisine: '치즈·와인·샤퀴트리', priceRange: '₩₩', description: '파리 5구 무프타르 거리의 치즈 전문점과 샤퀴트리(육가공) 가게. 피크닉 재료를 사서 뤽상부르 공원에서 먹는 것이 파리 로컬 경험 최고봉.', companionFit: COUPLE },
      { name: '오봉마르쉐 주변 레스토랑', cuisine: '현대 프렌치·인터내셔널', priceRange: '₩₩₩₩', description: '7구 고급 주거지역의 현대적 프렌치 레스토랑. 미슐랭 플레이트급 가게들이 줄지어 있으며, 가격 대비 높은 수준을 자랑합니다.', companionFit: COUPLE },
      { name: '르 마르쉐 다리오나 (바스티유 시장)', cuisine: '프랑스 재래시장 음식', priceRange: '₩~₩₩', description: '목·일요일 아침 바스티유 광장의 유기농 시장. 신선한 굴, 치즈, 갓 구운 바게트로 파리 현지인들의 아침 시장 문화를 체험할 수 있습니다.', companionFit: ALL },
    ],
    accommodations: [
      { name: '르 뷔르고 리브 고슈 (생제르맹)', type: '5성급 팰리스 호텔', priceRange: '₩₩₩₩₩', description: '루이 16세 시대 저택을 개조한 궁전급 호텔. 생제르맹 데프레 성당 맞은편, 최고급 레스토랑 입점.', companionFit: COUPLE, bookingUrl: 'https://www.leburgrivegauche.com', distanceToStation: '생제르맹 데프레역 도보 2분', reviewScore: 4.7, reviewCount: '890건+' },
      { name: '호텔 에디션 파리 (오페라)', type: '5성급 디자인', priceRange: '₩₩₩₩₩', description: '갤러리 라파예트·오페라 가르니에 도보 2분. 루프탑 레스토랑에서 파리 전망. 모던 디자인과 클래식 파리의 조화.', companionFit: COUPLE, bookingUrl: 'https://www.marriott.com/hotels/travel/parep-the-paris-edition/', distanceToStation: '오페라역 도보 3분', reviewScore: 4.6, reviewCount: '1,500건+' },
      { name: '이비스 파리 마레 바스티유', type: '3성급 체인', priceRange: '₩₩', description: '마레 지구 중심부, 가성비 좋은 체인 호텔. 짐 맡기고 바로 마레 골목 탐방 가능. 조식 포함 패키지 선택 추천.', companionFit: ['small_group', 'large_group'], bookingUrl: 'https://all.accor.com/hotel/7444/index.ko.shtml', distanceToStation: '바스티유역 도보 4분', reviewScore: 4.1, reviewCount: '4,200건+' },
      { name: '아파트호텔 (몽마르트르·마레)', type: '아파트형 숙소', priceRange: '₩₩₩', description: '4인 이상 가족에게 최적. 주방·전자레인지·세탁기 완비로 유아식 조리 가능. 현지 마켓 장보기 체험 포함.', companionFit: GROUP, bookingUrl: 'https://www.airbnb.co.kr/rooms/paris', amenities: ['주방 완비 (전자레인지·냉장고·인덕션)', '세탁기', '유아 침대 협의 가능', '편의점·약국 도보 5분'], kidsScore: 4, reviewScore: 4.4, reviewCount: '다수' },
    ],
  },

  // ───────── 발리 ─────────
  '발리': {
    festivals: [
      { name: '뇨피 (발리 침묵의 날)', period: '힌두 새해 (3월경, 매년 날짜 변동)', months: [3], description: '발리 전도 24시간 완전 정지. 공항 폐쇄, 호텔 밖 외출 금지, 불·소리·이동 전면 금지. 세계 유일 자연 회복의 날입니다.', type: 'holiday', impact: 'avoid', tip: '이 날은 호텔 방에서만 보내야 합니다. 반드시 전후로 일정 조정하거나, 발리 최고 비경 중 하나로 받아들이세요.' },
      { name: '갈룽안 & 쿠닝안', period: '힌두력 기준 210일 주기', months: [1,2,3,4,5,6,7,8,9,10,11,12], description: '발리 힌두교 최대 명절. 길가마다 펜조르(대나무 장식)가 세워지고, 전통 의상을 입은 현지인들이 사원에서 기도합니다. 여행자가 발리 문화를 가장 깊이 경험할 수 있는 시기입니다.', type: 'festival', impact: 'positive', tip: '사원 방문 시 전통 스카프(사롱) 착용 필수 (입구에서 무료 대여 가능). 의례 중인 사원은 내부 입장 불가.' },
      { name: '발리 아트 & 문화 페스티벌', period: '6월 중순 ~ 7월 중순', months: [6,7], description: '덴파사르에서 한 달간 발리 전통 예술 공연·전시·무용이 펼쳐집니다. 케착 댄스·레공 댄스 등 정통 공연 관람 가능.', type: 'festival', impact: 'positive', tip: '울루와투 사원 절벽 위 케착 댄스(일몰 공연)와 함께 즐기면 발리 문화 최고의 경험.' },
      { name: '우기 (스콜 시즌)', period: '11월 ~ 3월', months: [11,12,1,2,3], description: '매일 오후 강한 스콜이 1~2시간 내립니다. 서핑 파도는 높아지고, 홍수로 일부 도로가 일시 침수됩니다.', type: 'warning', impact: 'caution', tip: '오전에 라이스 테라스·사원 방문, 오후는 스파·쇼핑으로 대체. 방수 샌들 필수.' },
    ],
    restaurants: [
      { name: '세마라 우붓 스파 & 레스토랑', cuisine: '발리니즈 전통 요리', priceRange: '₩₩₩', description: '우붓 논밭 뷰 레스토랑에서 즐기는 나시 찬푸르(발리식 혼합밥)·바비 굴링(새끼 돼지 통구이). 발리에서 반드시 먹어야 할 음식입니다.', companionFit: ALL },
      { name: '짐바란 씨푸드 비치 레스토랑', cuisine: '해산물 BBQ', priceRange: '₩₩₩', description: '짐바란 해변에 줄지어 선 씨푸드 BBQ 레스토랑. 새우·랍스터·생선을 숯불에 구워 일몰 뷰와 함께 즐깁니다. 꼭 먹어봐야 할 발리 경험.', companionFit: ALL },
      { name: '우붓 왈룽 민약 (local warungs)', cuisine: '인도네시아 가정식 와룽', priceRange: '₩', description: '우붓 논밭 길가의 소박한 현지 식당(와룽). 1만 원 이하로 나시고렝·미고렝·삿테이를 배불리 먹을 수 있습니다.', companionFit: ALL },
      { name: '스미냑 비치 클럽 (포테이토 헤드·쿠데타)', cuisine: '인터내셔널·칵테일', priceRange: '₩₩₩₩', description: '스미냑 해변의 럭셔리 비치 클럽. 수영장에서 일몰 보며 칵테일. 포테이토 헤드 비치 클럽이 가장 유명합니다.', companionFit: COUPLE },
    ],
    accommodations: [
      { name: '포시즌스 발리 아트 우붓', type: '5성급 빌라 리조트', priceRange: '₩₩₩₩₩', description: '우붓 논밭 속 독립 빌라 74개. 전용 수영장·전통 발리 의식 체험·스파 포함. 세계 최고 리조트로 꾸준히 선정됩니다.', companionFit: COUPLE, bookingUrl: 'https://www.fourseasons.com/ubud/', reviewScore: 4.9, reviewCount: '2,100건+' },
      { name: '알라야 우붓', type: '4성급 부티크', priceRange: '₩₩₩', description: '우붓 중심부 위치, 논밭 뷰 인피니티 풀. 자전거 무료 대여·쿠킹클래스 포함. 가성비 좋은 우붓 중급 호텔의 대표주자.', companionFit: ['couple', 'small_group'], bookingUrl: 'https://www.booking.com/hotel/id/alaya-resort-ubud.ko.html', distanceToStation: '우붓 왕궁 도보 5분', reviewScore: 4.5, reviewCount: '3,200건+' },
      { name: '프라이빗 풀빌라 (스미냑·짱구)', type: '풀빌라 (에어비앤비)', priceRange: '₩₩₩', description: '4인 이상 가족은 전용 수영장 풀빌라 1채 임대가 호텔보다 저렴합니다. 주방·전자레인지 완비로 유아식 조리 가능. 보모(baby sitter) 연결 서비스 제공 숙소도 많음.', companionFit: GROUP, bookingUrl: 'https://www.airbnb.co.kr/rooms/bali-seminyak', amenities: ['전용 수영장 (수심 주의 확인 필수)', '주방 (전자레인지·냉장고)', '베이비시터 연결 가능 (별도 비용)', '세탁기'], kidsScore: 4, reviewScore: 4.6, reviewCount: '다수' },
      { name: '더블식스 럭셔리 호텔 (스미냑)', type: '5성급 비치프론트', priceRange: '₩₩₩₩', description: '스미냑 해변 바로 앞 5성 호텔. 모든 객실 오션뷰·전용 라운지 포함. 짐바란·쿠타 접근성 우수.', companionFit: COUPLE, bookingUrl: 'https://www.booking.com/hotel/id/double-six-luxury-hotel-seminyak.ko.html', distanceToStation: '스미냑 해변 도보 1분', reviewScore: 4.5, reviewCount: '4,700건+' },
    ],
  },

  // ───────── 다낭 ─────────
  '다낭': {
    festivals: [
      { name: '다낭 국제 불꽃놀이 대회 (DIFF)', period: '4월 말 ~ 6월 (격년 개최)', months: [4,5,6], description: '한강 상공에서 세계 각국 팀이 불꽃을 쏘는 아시아 최대 불꽃놀이 축제. 주말 밤마다 한강 다리 주변에 수십만 명이 몰립니다.', type: 'festival', impact: 'positive', tip: '용교(dragon bridge) 부근이 최고 명당. 공연 전날부터 숙소 예약 필수. 주최 연도(짝수해) 확인.' },
      { name: '음력 보름 호이안 등불 축제', period: '매월 음력 14일 (호이안 당일치기)', months: [1,2,3,4,5,6,7,8,9,10,11,12], description: '호이안(다낭 차로 30분)에서 매달 보름날 등불 축제가 열립니다. 투본강에 종이 등불을 띄우고 구시가지 가게들이 전통 등으로만 조명합니다.', type: 'festival', impact: 'positive', tip: '15,000동(약 900원)에 등불을 사서 강에 띄워보세요. 오후 6시 이후 구시가지 진입 추천.' },
      { name: '우기 태풍 시즌', period: '9월 ~ 12월', months: [9,10,11,12], description: '베트남 중부 우기로 태풍이 자주 찾아옵니다. 특히 10~11월 집중 강우로 홍수 및 해변 활동 불가 기간이 있습니다.', type: 'warning', impact: 'caution', tip: '여행 1주 전부터 태풍 경로를 반드시 확인. 여행자보험 필수 가입.' },
      { name: '베트남 독립기념일', period: '9월 2일', months: [9], description: '베트남 최대 국경일. 한강 주변 불꽃놀이와 행렬이 열립니다. 일부 관광지·상점이 휴무합니다.', type: 'holiday', impact: 'positive', tip: '밤 한강 주변에서 무료 불꽃놀이 관람 가능. 호텔 루프탑이나 한강 유람선 예약 추천.' },
    ],
    restaurants: [
      { name: '미꽝 (Mì Quảng) 전문점', cuisine: '다낭 향토 음식', priceRange: '₩', description: '다낭 대표 음식 미꽝(강황 면 요리). 현지 식당에서 2만~3만 동(1,200~1,800원)에 먹을 수 있습니다. 밥처럼 물기 없는 면에 새우·돼지고기·땅콩을 얹어 먹습니다.', companionFit: ALL },
      { name: '반미 프엉 (Bánh Mì Phượng)', cuisine: '반미 샌드위치', priceRange: '₩', description: '호이안의 전설적인 반미 집. 앤서니 부르댕이 "세계 최고의 샌드위치"라 극찬한 곳. 호이안 당일치기 시 필수 방문지입니다.', companionFit: ALL },
      { name: '한 시장 (Chợ Hàn) 먹거리', cuisine: '베트남 시장 음식', priceRange: '₩', description: '다낭 한 시장 2층 푸드코트. 반쎄오(베트남식 전), 넴루이(레몬그라스 돼지고기), 쏘이(찹쌀밥) 등 다양한 현지 음식을 저렴하게 맛볼 수 있습니다.', companionFit: ALL },
      { name: '한강변 씨푸드 레스토랑', cuisine: '신선 해산물', priceRange: '₩₩~₩₩₩', description: '다낭 한강변에 줄지어 선 씨푸드 레스토랑. 킹크랩·새우·오징어를 kg당 가격으로 주문. 한국보다 훨씬 저렴하게 신선한 해산물을 즐길 수 있습니다.', companionFit: ALL },
    ],
    accommodations: [
      { name: '인터컨티넨탈 다낭 선 페닌슐라', type: '5성급 리조트', priceRange: '₩₩₩₩₩', description: '선 월드 손트라 내 절벽 위 럭셔리 리조트. 전 세계 50대 호텔 선정. 케이블카로만 접근 가능하며 프라이빗 비치 보유.', companionFit: COUPLE, bookingUrl: 'https://www.ihg.com/intercontinental/hotels/kr/ko/da-nang/danis/hoteldetail', reviewScore: 4.8, reviewCount: '2,300건+' },
      { name: '빈펄 리조트 & 스파 다낭', type: '5성급 패밀리 올인클루시브', priceRange: '₩₩₩₩', description: '미케 비치 바로 앞. 워터파크·키즈클럽·레스토랑 5개 포함. 아이들이 하루 종일 즐길 수 있는 올인클루시브 리조트.', companionFit: FAMILY, bookingUrl: 'https://vinpearl.com/ko/hotels-resorts/vinpearl-resort-spa-da-nang', distanceToStation: '다낭 시내 차로 15분', amenities: ['워터파크 무료', '키즈 클럽 (만 3~12세)', '어린이 수영장', '키즈 메뉴', '유모차 대여', '유아 침대 무료', '전자레인지', '수유실'], kidsScore: 5, reviewScore: 4.4, reviewCount: '5,600건+' },
      { name: '알라카르트 다낭 비치', type: '4성급 비치프론트', priceRange: '₩₩₩', description: '미케 비치 직접 접근. 가성비 좋은 4성급으로 수영장·루프탑 바 보유. 커플·소규모 그룹에 인기.', companionFit: ['couple', 'small_group'], bookingUrl: 'https://www.booking.com/hotel/vn/a-la-carte-da-nang-beach.ko.html', distanceToStation: '미케 비치 도보 1분', reviewScore: 4.2, reviewCount: '7,400건+' },
    ],
  },

  // ───────── 싱가포르 ─────────
  '싱가포르': {
    festivals: [
      { name: '중국 설날 (차이니즈 뉴이어)', period: '1~2월 (음력, 매년 날짜 변동)', months: [1,2], description: '차이나타운과 오차드로드 전체가 화려한 붉은 장식으로 뒤덮입니다. 리버 홍바오 이벤트·용춤·불꽃놀이. 이틀간의 공휴일에 일부 상점·식당 휴무.', type: 'festival', impact: 'positive', tip: '차이나타운 조기 방문 추천. 야간 빛 축제는 차이나타운 스트리트에서 관람.' },
      { name: '싱가포르 그랑프리 (F1)', period: '9월 셋째 주말', months: [9], description: '세계 유일 야간 스트리트 F1 레이스. 마리나베이 서킷 주변 도로 통제와 숙박 요금 2~3배 폭등. 티켓 없어도 도심 여러 곳에서 엔진 소리 들립니다.', type: 'event', impact: 'caution', tip: '관람 계획 없다면 이 주를 피하거나 2~3개월 전 숙소 예약 필수.' },
      { name: '디파발리 (빛의 축제)', period: '10~11월', months: [10,11], description: '리틀 인디아가 수천 개의 전통 등불로 아름답게 빛납니다. 힌두교 최대 명절로 화려한 의상과 인도 음식 페스티벌이 함께합니다.', type: 'festival', impact: 'positive', tip: '리틀 인디아 야간 방문 추천. 무스타파 센터에서 쇼핑+음식 체험.' },
      { name: '싱가포르 나이트 페스티벌', period: '8월 셋째~넷째 주말', months: [8], description: '브라스 바사 지역에서 야간 예술 설치·퍼포먼스가 무료로 펼쳐집니다. 현지인이 가장 즐기는 여름 아트 페스티벌.', type: 'festival', impact: 'positive', tip: '오후 7시~자정 운영. 싱가포르 국립미술관·시빅 디스트릭트 중심으로 진행.' },
    ],
    restaurants: [
      { name: '맥스웰 푸드 센터', cuisine: '싱가포르 호커 음식', priceRange: '₩', description: '"천하일미" 티안 티안 치킨 라이스(하이난 치킨 라이스)가 있는 호커 센터. 차이나타운 바로 옆. 현지인들의 점심 성지입니다.', companionFit: ALL },
      { name: '라우 파 삿 (Lau Pa Sat)', cuisine: '호커·싱가포르 혼합 음식', priceRange: '₩~₩₩', description: '19세기 주철 건물의 역사적 호커 센터. 저녁 6시 이후 사테 골목이 열려 꼬치구이와 시원한 타이거 맥주를 즐길 수 있습니다.', companionFit: ALL },
      { name: '뉴턴 푸드 센터', cuisine: '씨푸드·로컬 음식', priceRange: '₩₩', description: '영화 〈크레이지 리치 아시안〉에 등장한 호커 센터. 칠리 크랩·블랙 페퍼 크랩·오타(생선 케이크)가 인기. 관광객 대상 바가지 주의.', companionFit: ALL },
      { name: '세라비 (CÉ LA VI) 루프탑 바', cuisine: '모던 아시안·칵테일', priceRange: '₩₩₩₩', description: '마리나베이 샌즈 57층 루프탑 바&레스토랑. 싱가포르 스카이라인 360도 파노라마 뷰. 입장 시 복장 규정(스마트 캐주얼) 있습니다.', companionFit: COUPLE },
    ],
    accommodations: [
      { name: '마리나베이 샌즈', type: '5성급 아이콘 호텔', priceRange: '₩₩₩₩₩', description: '57층 인피니티 풀·카지노·쇼핑몰 직결. 싱가포르 스카이라인의 상징. 아이들이 인상을 받을 만한 스케일.', companionFit: COUPLE, bookingUrl: 'https://www.marinabaysands.com/ko', distanceToStation: '베이프론트역 직결', reviewScore: 4.7, reviewCount: '31,000건+' },
      { name: '카펠라 싱가포르 (센토사)', type: '5성급 리조트', priceRange: '₩₩₩₩₩', description: '센토사 섬의 럭셔리 리조트. 전용 비치·스파·수영장 완비. 조용하고 프라이빗한 분위기를 원하는 커플·허니무너에게 최적.', companionFit: COUPLE, bookingUrl: 'https://www.capellahotels.com/en/capella-singapore', reviewScore: 4.9, reviewCount: '1,800건+' },
      { name: '하드록 호텔 싱가포르 (센토사)', type: '4성급 패밀리', priceRange: '₩₩₩₩', description: '유니버설 스튜디오·워터파크 도보 거리. 록 음악 테마의 밝고 활기찬 분위기로 아이들이 좋아합니다.', companionFit: FAMILY, bookingUrl: 'https://www.booking.com/hotel/sg/hard-rock-hotel-singapore.ko.html', distanceToStation: '리조트 월드 센토사역 도보 5분', amenities: ['키즈 어메니티 세트', '아이들 전용 수영장 레인', '어린이 메뉴', '전자레인지 (요청 시)', '유아 침대 무료', '워터파크 패키지 추가 가능'], kidsScore: 5, reviewScore: 4.4, reviewCount: '5,900건+' },
    ],
  },

  // ───────── 하와이 ─────────
  '하와이': {
    festivals: [
      { name: '알로하 페스티벌', period: '9월 (하와이주 전역)', months: [9], description: '하와이 최대 문화 축제로 훌라댄스·폴리네시아 전통 공연·퍼레이드가 오아후에서 빅아일랜드까지 열립니다.', type: 'festival', impact: 'positive', tip: '호놀룰루 알로하 퍼레이드(와이키키 칼라카우아 대로)는 무료 관람. 레이 만들기 체험 참여 추천.' },
      { name: '허니문·신혼여행 성수기', period: '12월 ~ 4월', months: [12,1,2,3,4], description: '고래 관찰 시즌(12~4월)으로 혹등고래 투어가 인기. 날씨가 가장 좋은 시기로 숙소·항공 요금 최고가.', type: 'event', impact: 'caution', tip: '항공·숙소 최소 3개월 전 예약. 고래 관찰 투어는 마우이 라하이나 출발이 가장 유명.' },
      { name: '허리케인 시즌', period: '6월 ~ 11월', months: [6,7,8,9,10,11], description: '하와이 허리케인 시즌으로, 실제 직격은 드물지만 트로피컬 스톰으로 일부 해변이 폐쇄되거나 물이 흐려질 수 있습니다.', type: 'warning', impact: 'caution', tip: '여행자 보험 가입 권장. 출발 1주 전 날씨 예보 확인.' },
      { name: '호놀룰루 마라톤', period: '12월 둘째 일요일', months: [12], description: '세계 5대 마라톤 중 하나. 2만 5천 명 이상 참가. 와이키키~카할라 일대 도로가 오전 내 통제됩니다.', type: 'event', impact: 'caution', tip: '대회 참가(사전 온라인 등록)도 가능. 관람은 알라모아나·카피올라니 공원에서.' },
    ],
    restaurants: [
      { name: '와이키키 로컬 플레이트 런치', cuisine: '하와이 플레이트 런치', priceRange: '₩₩', description: '하와이 소울푸드 플레이트 런치(칼루아 피그·마카로니 샐러드·라이스). L&L 하와이언 바비큐 체인이 대표적. 14~16달러에 든든한 한 끼.', companionFit: ALL },
      { name: '포케 전문점', cuisine: '포케 볼', priceRange: '₩₩', description: '하와이 원조 포케(참치·연어 날생선 샐러드). 고노스·피시 익스프레스·마카나 포케 등이 유명. 와이키키 인근에서 쉽게 찾을 수 있습니다.', companionFit: ALL },
      { name: '노스쇼어 쉬림프 트럭', cuisine: '갈릭 쉬림프', priceRange: '₩₩', description: '오아후 노스쇼어 카메하메하 하이웨이변 푸드 트럭. 지오반니스·로미스 갈릭 쉬림프가 원조. 서핑 구경 후 점심으로 완벽합니다.', companionFit: ALL },
      { name: '알라모아나 마켓 & 헬루메리아 다이닝', cuisine: '하와이 퓨전', priceRange: '₩₩₩', description: '알라모아나 쇼핑센터 내 다양한 레스토랑. 더 카운터(버거)·아이스 팰리스(빙수) 등 다양한 선택지. 쇼핑 후 식사 가능.', companionFit: ALL },
    ],
    accommodations: [
      { name: '모아나 서프라이더 웨스틴 (와이키키)', type: '5성급 역사적 호텔', priceRange: '₩₩₩₩₩', description: '1901년 개업한 하와이 최초의 럭셔리 호텔. 와이키키 비치 정면, 역사적 식민지풍 건물과 오션뷰 객실.', companionFit: COUPLE, bookingUrl: 'https://www.marriott.com/hotels/travel/hnlmo-moana-surfrider-a-westin-resort-and-spa-waikiki-beach/', distanceToStation: '와이키키 비치 직결', reviewScore: 4.7, reviewCount: '9,200건+' },
      { name: '포시즌스 마우이 앳 와일레아', type: '5성급 리조트', priceRange: '₩₩₩₩₩', description: '마우이 최고급 리조트. 3개의 수영장·스노클링 비치·세계급 스파. 고래 관찰 시즌 발코니에서 혹등고래 목격 가능.', companionFit: COUPLE, bookingUrl: 'https://www.fourseasons.com/maui/', reviewScore: 4.9, reviewCount: '3,400건+' },
      { name: '힐튼 하와이언 빌리지 (와이키키)', type: '4성급 패밀리 리조트', priceRange: '₩₩₩₩', description: '5개 타워·6개 수영장·해변 직접 접근. 매주 금요일 무료 불꽃놀이. 와이키키 최대 패밀리 리조트.', companionFit: FAMILY, bookingUrl: 'https://www.hilton.com/ko/hotels/hnlhwhh-hilton-hawaiian-village-waikiki-beach-resort/', distanceToStation: '와이키키 해변 도보 1분', amenities: ['6개 수영장 (어린이 풀 포함)', '키즈 클럽 (루아우 활동)', '매주 금요일 불꽃놀이', '전자레인지 (요청 시)', '유아 침대 무료', '어린이 메뉴'], kidsScore: 5, reviewScore: 4.3, reviewCount: '18,000건+' },
    ],
  },

  // ───────── 런던 ─────────
  '런던': {
    festivals: [
      { name: '노팅힐 카니발', period: '8월 마지막 주 일요일~월요일', months: [8], description: '유럽 최대 거리 축제. 카리브해 문화 퍼레이드·삼바·라이브 음악으로 200만 명이 몰립니다. 노팅힐 일대가 완전 축제 구역으로 변합니다.', type: 'festival', impact: 'positive', tip: '소매치기 극주의. 짐은 최소화하고 핸드폰은 주머니 깊숙이 보관.' },
      { name: '왕실 행사 (국왕 생일 퍼레이드 등)', period: '6월 (트루핑 더 컬러)', months: [6], description: '버킹엄 궁전에서 국왕 생일 기념 군악대 퍼레이드. 말몰~버킹엄 궁전 구간 도로 통제. 런던 최대 왕실 의식입니다.', type: 'event', impact: 'positive', tip: '퍼레이드 루트 주변 자리는 오전 8시 이전 선점 필요. 버킹엄 궁전 발코니 왕실 등장은 낮 12시 30분경.' },
      { name: '위블던 테니스 대회', period: '6월 말 ~ 7월 초', months: [6,7], description: '세계 최대 테니스 대회. 위블던 지역 교통 혼잡과 숙박 요금 급등. 센터코트 티켓은 추첨제로 당첨 어려움.', type: 'event', impact: 'caution', tip: '딸기&크림(12파운드)은 위블던의 전통. 아우터 코트 일반석은 당일 구매 가능(오전 6시부터 줄서기).' },
      { name: '가이 포크스 나이트 (본파이어 나이트)', period: '11월 5일', months: [11], description: '전국에서 불꽃놀이가 터지는 영국 전통 축제. 런던은 배터시 파크·알렉산드라 팰리스 불꽃놀이가 가장 유명합니다.', type: 'festival', impact: 'positive', tip: '무료 공공 불꽃놀이가 런던 전역에서 열립니다. 두꺼운 방한복 필수.' },
    ],
    restaurants: [
      { name: '버러 마켓 (Borough Market)', cuisine: '영국·세계 각국 음식', priceRange: '₩₩~₩₩₩', description: '1,000년 역사의 런던 최대 푸드 마켓. 영국 최고급 치즈·빵·해산물부터 에티오피아 음식까지. 목~토요일 운영. 스코틀랜드산 훈제연어 샌드위치가 특히 인기.', companionFit: ALL },
      { name: '피시 & 칩스 (The Golden Hind 등)', cuisine: '영국 전통 피시&칩스', priceRange: '₩₩', description: '1914년 개업한 골든 하인드(마리본), 록&솔플레이스(코벤트가든) 등 전통 피시&칩스 전문점. 영국 소울푸드를 진짜로 맛보려면 관광지 외 현지 가게 방문.', companionFit: ALL },
      { name: '소호·차이나타운 레스토랑 거리', cuisine: '중식·동남아·세계 요리', priceRange: '₩₩~₩₩₩', description: '런던 소호 제라드 스트리트 차이나타운. 딤섬·페킹덕·홍콩식 BBQ가 런던 최저가로 제공됩니다. 설날 시즌 특히 활기.', companionFit: ALL },
      { name: '르 가브로슈 (미슐랭 2스타)', cuisine: '클래식 프렌치', priceRange: '₩₩₩₩₩', description: '런던 메이페어의 전설적인 프렌치 레스토랑. 1982년 영국 최초로 미슐랭 3스타 획득. 특별한 날 런던 최고의 만찬.', companionFit: COUPLE },
    ],
    accommodations: [
      { name: '더 새보이 (코벤트가든)', type: '5성급 팰리스 호텔', priceRange: '₩₩₩₩₩', description: '1889년 개업. 처칠·모네·비틀즈가 머문 런던 최고 아이콘 호텔. 템스강 뷰·버틀러 서비스·애프터눈 티.', companionFit: COUPLE, bookingUrl: 'https://www.fairmont.com/savoy-london/', distanceToStation: '코벤트가든역 도보 5분', reviewScore: 4.8, reviewCount: '5,600건+' },
      { name: '시티즌M 런던 (뱅크사이드)', type: '3성급 스마트 호텔', priceRange: '₩₩₩', description: '테이트 모던·버러 마켓 도보 5분. 스마트 기기로 체크인·객실 조명 조절. 혁신적이고 가성비 좋은 디자인 호텔.', companionFit: ['couple', 'small_group'], bookingUrl: 'https://www.citizenm.com/destinations/london/london-bankside-hotel', distanceToStation: '사우스워크역 도보 5분', reviewScore: 4.5, reviewCount: '12,400건+' },
      { name: '해크니·쇼어디치 에어비앤비 아파트', type: '아파트형 숙소', priceRange: '₩₩₩', description: '런던 동부 힙스터 지역의 아파트 렌탈. 4인 이상 그룹에 저렴하고 런던 로컬 라이프 경험 가능. 주방 완비.', companionFit: GROUP, bookingUrl: 'https://www.airbnb.co.kr/london-england-gb/stays', amenities: ['주방 완비 (전자레인지·냉장고)', '세탁기', '유아 침대 협의 가능'], kidsScore: 3, reviewScore: 4.3, reviewCount: '다수' },
    ],
  },

  // ───────── 뉴욕 ─────────
  '뉴욕': {
    festivals: [
      { name: '타임스퀘어 새해 볼 드롭', period: '12월 31일 자정', months: [12], description: '전 세계 생중계되는 새해 카운트다운. 오후 6시부터 100만 명이 모이고 음식·화장실 이용이 극도로 어렵습니다.', type: 'festival', impact: 'positive', tip: '오후 3시 이전 자리 잡기 필수. 방한복+기저귀(장시간 대기) 각오 필요. 호텔 파티 티켓 구매가 더 편리할 수 있습니다.' },
      { name: '메이시스 추수감사절 퍼레이드', period: '11월 넷째 목요일', months: [11], description: '초대형 캐릭터 풍선·마칭밴드·산타클로스가 센트럴파크웨스트를 행진합니다. 미국 최대 퍼레이드 중 하나.', type: 'festival', impact: 'positive', tip: '브로드웨이~77번가 구간이 최적 관람 위치. 새벽 6시부터 자리 잡는 현지인들이 많습니다.' },
      { name: 'NYC 프라이드 (퍼레이드)', period: '6월 마지막 일요일', months: [6], description: '세계 최대 프라이드 퍼레이드 중 하나. 5번가에서 그리니치빌리지까지 수백만 명이 함께합니다. 6월 전체가 프라이드 먼스로 다양한 행사가 열립니다.', type: 'festival', impact: 'positive', tip: '5번가 중반(42~23번가)이 가장 화려한 구간. 편한 신발 필수.' },
      { name: '허리케인 & 겨울 폭설', period: '8~9월(허리케인), 12~2월(폭설)', months: [8,9,12,1,2], description: '허리케인 시즌에는 뉴욕이 직격받을 수 있으며(허리케인 샌디 사례), 겨울 폭설 시 지하철 지연·항공 결항이 빈번합니다.', type: 'warning', impact: 'caution', tip: '겨울 여행 시 항공 취소 대비 여행보험 필수. 폭설 예보 시 야외 일정 실내로 대체 계획 수립.' },
    ],
    restaurants: [
      { name: '첼시 마켓', cuisine: '다국적 음식 마켓', priceRange: '₩₩', description: '옛 과자 공장을 개조한 푸드 마켓. 랍스터 롤·어묵 국수·멕시칸 타코까지 다양한 맛집이 공존합니다. 하이라인 파크와 연계 방문 추천.', companionFit: ALL },
      { name: '피터 루거 스테이크하우스 (브루클린)', cuisine: '아메리칸 스테이크', priceRange: '₩₩₩₩', description: '1887년 개업, 뉴욕 최고의 드라이에이징 포터하우스 스테이크. 예약은 수주 전 필수이며 현금만 받습니다.', companionFit: ADULT },
      { name: '이스트 빌리지 딤섬·차이나타운', cuisine: '중국 딤섬', priceRange: '₩~₩₩', description: '맨해튼 차이나타운 다이몬 파티(Nom Wah Tea Parlor, 1920년 개업) 딤섬. 탄력 있는 하가우·샤오마이를 뉴욕 최저가로.', companionFit: ALL },
      { name: '르 베르나댕 (미슐랭 3스타)', cuisine: '프렌치 씨푸드 파인다이닝', priceRange: '₩₩₩₩₩', description: '미슐랭 3스타를 30년째 유지하는 뉴욕 최고 씨푸드 레스토랑. 예약은 2개월 전 필수.', companionFit: COUPLE },
    ],
    accommodations: [
      { name: '더 마크 호텔 (어퍼 이스트사이드)', type: '5성급 럭셔리', priceRange: '₩₩₩₩₩', description: '메트로폴리탄 미술관 도보 1분. 장 조지 레스토랑 입점. 셀러브리티 단골 호텔로 차분하고 고급스러운 분위기.', companionFit: COUPLE, bookingUrl: 'https://www.themarkhotel.com', distanceToStation: '77번가역 도보 5분', reviewScore: 4.8, reviewCount: '2,100건+' },
      { name: '더 스탠다드 하이라인', type: '4성급 트렌디', priceRange: '₩₩₩₩', description: '하이라인 파크 위에 걸쳐 있는 독특한 구조. 미트패킹 디스트릭트의 중심으로 루프탑 바·비어가든 인기.', companionFit: ['couple', 'small_group'], bookingUrl: 'https://www.standardhotels.com/new-york/properties/high-line', distanceToStation: '14번가-8번가역 도보 5분', reviewScore: 4.4, reviewCount: '4,700건+' },
      { name: '뉴욕 마리오트 마퀴스 (타임스퀘어)', type: '4성급 대형 호텔', priceRange: '₩₩₩', description: '타임스퀘어 한복판. 관광 접근성 최고. 가족·단체에 적합한 넓은 객실과 회전 레스토랑(45층 뷰).', companionFit: ALL, bookingUrl: 'https://www.marriott.com/hotels/travel/nycmq-new-york-marriott-marquis/', distanceToStation: '타임스퀘어-42번가역 도보 2분', amenities: ['전자레인지 (요청 시)', '유아 침대 무료', '수유실 (1층 안내)', '어린이 메뉴'], kidsScore: 4, reviewScore: 4.2, reviewCount: '22,000건+' },
    ],
  },

  // ───────── 두바이 ─────────
  '두바이': {
    festivals: [
      { name: '두바이 쇼핑 페스티벌 (DSF)', period: '12월 중순 ~ 2월 초', months: [12,1,2], description: '세계 최대 쇼핑 축제. 두바이 전역에서 할인·경품·콘서트가 펼쳐집니다. 국내외 관광객이 대거 몰려 호텔 요금이 상승합니다.', type: 'festival', impact: 'positive', tip: '글로벌 빌리지(10월~4월) 동시 방문으로 세계 각국 문화 체험. 쇼핑몰 라플(추첨) 이벤트 참여 추천.' },
      { name: '라마단 (금식월)', period: '이슬람력 기준 (매년 날짜 10~11일씩 앞당겨짐)', months: [1,2,3,4,5,6,7,8,9,10,11,12], description: '해 뜰 때부터 해 질 때까지 금식. 낮에 공공장소에서 음식·음료 섭취 금지. 일부 레스토랑 낮에 커튼 쳐놓고 운영. 업무 시간 단축.', type: 'holiday', impact: 'caution', tip: '비무슬림 관광객은 쇼핑몰·호텔 내 식사는 가능. 이프타르(일몰 후 만찬) 뷔페 체험은 라마단 때만 가능한 특별한 경험.' },
      { name: '두바이 여름 극더위', period: '6월 ~ 9월', months: [6,7,8,9], description: '낮 최고기온 42~48°C. 야외 활동이 사실상 불가능하며 대부분 실내 쇼핑몰에서 시간을 보냅니다. 에어컨 비용으로 숙박비가 오히려 저렴해집니다.', type: 'warning', impact: 'caution', tip: '사막 사파리·워터파크 등 야외 활동은 이른 아침(7~10시) 또는 야간으로 예약.' },
      { name: '두바이 엑스포 & 글로벌 빌리지', period: '10월 ~ 4월', months: [10,11,12,1,2,3,4], description: '두바이 글로벌 빌리지에서 90여 개국 전시 파빌리온·공연·음식이 한 곳에 모입니다. 두바이 최고의 가족 엔터테인먼트 명소.', type: 'festival', impact: 'positive', tip: '주말 저녁은 매우 혼잡. 평일 저녁 방문 권장. 입장권 온라인 사전 구매 시 할인.' },
    ],
    restaurants: [
      { name: '두바이 프레임 & 올드수크 레스토랑', cuisine: '에미라티 전통 음식', priceRange: '₩₩₩', description: '알 파나르·바이트 알 카이마 등 두바이 전통 에미라티 식당. 루지나(발효 버터 밥), 마치부스(쌀 요리), 루구(얇은 빵)이 대표 메뉴.', companionFit: ALL },
      { name: '부르즈 칼리파 AT.mosphere (122층)', cuisine: '모던 유러피안 파인다이닝', priceRange: '₩₩₩₩₩', description: '세계에서 가장 높은 레스토랑(해발 422m). 두바이 전경을 내려다보며 즐기는 코스 요리. 예약은 최소 1~2개월 전 필수.', companionFit: COUPLE },
      { name: '골드 수크·스파이스 수크 주변 식당', cuisine: '인도·파키스탄·레바논 음식', priceRange: '₩~₩₩', description: '데이라 지역 금 시장 주변 남아시아 이민자 식당가. 비리야니·케밥·후무스를 두바이 최저가로. 현지 노동자들이 즐겨 찾습니다.', companionFit: ALL },
      { name: '미디어 시티·JBR 비치 레스토랑', cuisine: '인터내셔널·씨푸드', priceRange: '₩₩₩₩', description: '주메이라 비치 레지던스(JBR) 더 워크의 야외 레스토랑. 해변 뷰와 함께하는 브런치·씨푸드 저녁 식사.', companionFit: COUPLE },
    ],
    accommodations: [
      { name: '버즈 알 아랍 (범선 호텔)', type: '7성급 초럭셔리', priceRange: '₩₩₩₩₩', description: '세계에서 가장 호화로운 호텔. 최소 1박 200만원 이상. 헬기 이착륙·전용 롤스로이스·집사 서비스. 투어 패키지로 내부 견학 가능.', companionFit: COUPLE, bookingUrl: 'https://www.jumeirah.com/en/hotels-resorts/dubai/burj-al-arab', distanceToStation: '주메이라 비치 전용 셔틀', reviewScore: 4.8, reviewCount: '6,800건+' },
      { name: '아틀란티스 더 팜 (팜 아일랜드)', type: '5성급 패밀리 리조트', priceRange: '₩₩₩₩₩', description: '팜 주메이라 최대 리조트. 아쿠아 어드벤처 워터파크(유료)·아쿠아리움·프라이빗 비치·17개 레스토랑. 아이들이 최고라고 평가하는 두바이 패밀리 1위 숙소.', companionFit: FAMILY, bookingUrl: 'https://www.atlantis.com/dubai/atlantis-the-palm', distanceToStation: '팜 모노레일 아틀란티스역 직결', amenities: ['워터파크 아쿠아벤처 (투숙객 무료)', '키즈 클럽 (앰버서더 래그룬)', '어린이 수영장', '유아 침대 무료', '어린이 메뉴 (5개 레스토랑)', '전자레인지', '유모차 대여'], kidsScore: 5, reviewScore: 4.5, reviewCount: '14,200건+' },
      { name: '주메이라 비치 호텔', type: '5성급 비치프론트', priceRange: '₩₩₩₩', description: '버즈 알 아랍 바로 옆. 전 객실 오션뷰. 워터파크(와일드 와디)·다이빙 센터·어린이 클럽 포함. 가족 전체가 만족하는 올인클루시브형 숙소.', companionFit: FAMILY, bookingUrl: 'https://www.jumeirah.com/en/hotels-resorts/dubai/jumeirah-beach-hotel', distanceToStation: '주메이라 비치 직결', amenities: ['와일드 와디 워터파크 무료', '어린이 클럽 (5~12세)', '베이비시팅 서비스 (별도)', '어린이 메뉴', '전자레인지', '유아 침대 무료'], kidsScore: 5, reviewScore: 4.6, reviewCount: '9,300건+' },
    ],
  },

};

// 도시 데이터 조회 (시즌 필터 포함)
export function getCityData(city: string, monthNum: number, country?: string): CityData {
  const data = cityDataMap[city];

  if (!data) {
    return getDefaultCityData(city, monthNum, country);
  }

  // 해당 월에 관련된 이벤트만 필터링 (months 미지정 시 항상 표시)
  const filteredFestivals = data.festivals.filter(
    (f) => !f.months || f.months.includes(monthNum)
  );

  return {
    ...data,
    festivals: filteredFestivals.length > 0 ? filteredFestivals : data.festivals.slice(0, 3),
  };
}

function getDefaultCityData(city: string, monthNum: number, country?: string): CityData {
  // Try city-specific festival data first, then country fallback
  const cityFestivals = cityFestivalMap[city];
  const countryFestivals = country ? countryFestivalMap[country] : undefined;
  const allFestivals = cityFestivals || countryFestivals;

  let festivals: FestivalEvent[];
  if (allFestivals && allFestivals.length > 0) {
    const filtered = allFestivals.filter((f) => !f.months || f.months.includes(monthNum));
    festivals = filtered.length > 0 ? filtered : allFestivals.slice(0, 3);
  } else {
    festivals = [
      { name: `${city} 현지 공휴일`, period: '방문 전 확인', months: undefined, description: `${city}의 공휴일에는 일부 관광지·식당이 예고 없이 문을 닫을 수 있습니다. 외교부 해외안전여행 앱에서 현지 공휴일을 확인하세요.`, type: 'warning', impact: 'caution', tip: '구글 검색 "[도시명] public holidays [연도]"로 미리 확인하세요.' },
    ];
  }

  return {
    festivals,
    restaurants: [
      { name: `${city} 현지 재래시장`, cuisine: '현지 전통 음식', priceRange: '₩~₩₩', description: `${city} 현지 시장에서 가장 신선하고 저렴한 현지 음식을 맛볼 수 있습니다. 현지인이 많이 찾는 노점이 진짜 맛집입니다.`, companionFit: ALL },
      { name: `${city} 구시가지 레스토랑`, cuisine: '현지 전통식', priceRange: '₩₩', description: '구시가지·역사 지구 주변에 모인 전통 음식점에서 현지 문화를 느끼며 식사할 수 있습니다.', companionFit: ALL },
    ],
    accommodations: [
      { name: `${city} 도심 호텔`, type: '4성급 비즈니스 호텔', priceRange: '₩₩₩', description: `${city} 중심부 접근성이 좋은 호텔. 주요 관광지와 대중교통 이용이 편리한 위치를 우선 선택하세요.`, companionFit: ALL, bookingUrl: 'https://www.booking.com' },
    ],
  };
}
