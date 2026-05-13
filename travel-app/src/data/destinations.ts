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

export const koreanCities = [
  '서울', '부산', '인천', '대구', '대전', '광주', '울산', '수원', '제주',
  '청주', '전주', '창원', '성남', '고양', '용인', '춘천', '강릉',
];
