import type { OutfitItem } from '../types';

interface Props {
  outfits: OutfitItem[];
  destination: string;
  season: string;
}

const genderIcon: Record<string, string> = { male: '👔', female: '👗', all: '👕' };
const genderColor: Record<string, string> = {
  male: 'from-blue-500 to-blue-700',
  female: 'from-pink-500 to-rose-600',
  all: 'from-green-500 to-teal-600',
};
const genderBg: Record<string, string> = {
  male: 'bg-blue-50 border-blue-200',
  female: 'bg-pink-50 border-pink-200',
  all: 'bg-green-50 border-green-200',
};
const genderBadge: Record<string, string> = {
  male: 'bg-blue-100 text-blue-700',
  female: 'bg-pink-100 text-pink-700',
  all: 'bg-green-100 text-green-700',
};

const seasonEmoji: Record<string, string> = { '봄': '🌸', '여름': '☀️', '가을': '🍂', '겨울': '❄️' };

export default function OutfitSection({ outfits, destination, season }: Props) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">👗</span>
        <h2 className="text-xl font-bold text-gray-800">옷차림 추천</h2>
        <span className="px-2.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
          {seasonEmoji[season]} {destination} {season}
        </span>
      </div>
      <p className="text-gray-500 text-sm">
        {destination} {season} 시즌 현지 날씨와 온라인 OOTD 트렌드를 분석한 성별·연령대별 추천 코디입니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outfits.map((outfit, i) => (
          <div key={i} className={`rounded-2xl border ${genderBg[outfit.gender]} overflow-hidden`}>
            {/* Header */}
            <div className={`bg-gradient-to-r ${genderColor[outfit.gender]} p-4 text-white`}>
              <div className="flex items-center gap-2">
                <span className="text-2xl">{genderIcon[outfit.gender]}</span>
                <div>
                  <div className="font-bold text-lg">{outfit.ageGroup}</div>
                  <div className="text-white/80 text-xs">{destination} {season} 추천 코디</div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-3">
              <p className="text-gray-600 text-sm leading-relaxed">{outfit.description}</p>

              {/* Key items */}
              <div>
                <div className="text-xs font-semibold text-gray-700 mb-2 flex items-center gap-1">
                  <span>✅</span> 필수 아이템
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {outfit.keyItems.map((item, j) => (
                    <span key={j} className={`px-2.5 py-1 rounded-lg text-xs font-medium border ${genderBg[outfit.gender]}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2 pt-1">
                <a
                  href={outfit.searchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border-2 ${genderBadge[outfit.gender]} border-current hover:opacity-80`}
                >
                  <span>🔍</span>
                  네이버에서 옷차림 검색하기
                  <span className="ml-auto text-xs opacity-60">→</span>
                </a>
                {outfit.referenceUrl && (
                  <a
                    href={outfit.referenceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:border-gray-300 transition-all"
                  >
                    <span>📌</span>
                    Pinterest OOTD 참고 이미지
                    <span className="ml-auto text-xs opacity-60">→</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 추가 팁 */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mt-2">
        <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-1.5">
          <span>💜</span> 여행 패킹 공통 팁
        </h4>
        <ul className="space-y-1.5 text-purple-700 text-sm">
          <li className="flex items-start gap-1.5"><span className="flex-shrink-0 mt-0.5">•</span>신발은 2~3일 이상 신어본 편한 신발만 챙기세요. 새 신발은 발에 무리를 줄 수 있습니다.</li>
          <li className="flex items-start gap-1.5"><span className="flex-shrink-0 mt-0.5">•</span>짐은 최소화하되 세탁이 쉬운 소재를 선택하면 장기 여행에 유리합니다.</li>
          <li className="flex items-start gap-1.5"><span className="flex-shrink-0 mt-0.5">•</span>종교 시설·고급 레스토랑 방문을 계획한다면 단정한 옷 한 벌을 별도로 준비하세요.</li>
          <li className="flex items-start gap-1.5"><span className="flex-shrink-0 mt-0.5">•</span>현지에서 쇼핑할 옷을 고려해 짐의 20~30% 여유 공간을 남겨두는 것을 추천합니다.</li>
        </ul>
      </div>
    </div>
  );
}
