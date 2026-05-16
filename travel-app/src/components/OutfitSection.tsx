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
const genderTag: Record<string, string> = {
  male: 'bg-blue-100 text-blue-800',
  female: 'bg-pink-100 text-pink-800',
  all: 'bg-green-100 text-green-800',
};

const seasonEmoji: Record<string, string> = { '봄': '🌸', '여름': '☀️', '가을': '🍂', '겨울': '❄️' };
const seasonColor: Record<string, string> = {
  '봄': 'bg-pink-100 text-pink-700',
  '여름': 'bg-orange-100 text-orange-700',
  '가을': 'bg-amber-100 text-amber-700',
  '겨울': 'bg-blue-100 text-blue-700',
};

// Detect if an item is a "look" (complete outfit combo) vs a simple item
const isLook = (item: string) => item.startsWith('[룩') || item.startsWith('[필수]') || item.startsWith('[보조]');

export default function OutfitSection({ outfits, destination, season }: Props) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-1">
        <span className="text-2xl">👗</span>
        <h2 className="text-xl font-bold text-gray-800">옷차림 분석</h2>
        <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${seasonColor[season] || 'bg-purple-100 text-purple-700'}`}>
          {seasonEmoji[season] || '🌍'} {destination} {season}
        </span>
      </div>
      <p className="text-gray-500 text-sm -mt-3">
        {destination} {season} 현지 거리 패션 트렌드를 분석한 성별·연령대별 스타일 가이드입니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {outfits.map((outfit, i) => (
          <div key={i} className={`rounded-2xl border ${genderBg[outfit.gender]} overflow-hidden shadow-sm`}>
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${genderColor[outfit.gender]} p-4 text-white`}>
              <div className="flex items-start gap-3">
                <span className="text-3xl mt-0.5">{genderIcon[outfit.gender]}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-lg leading-tight">{outfit.ageGroup}</div>
                  <div className="text-white/80 text-xs mt-0.5">{destination} {season} 스타일 분석</div>
                </div>
              </div>
            </div>

            {/* Style Analysis */}
            <div className="p-4 space-y-4">
              {/* Style description — main content */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
                  <span>✦</span> 스타일 분석
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{outfit.description}</p>
              </div>

              {/* Outfit looks / key items */}
              <div>
                {isLook(outfit.keyItems[0]) && outfit.keyItems[0].startsWith('[룩') ? (
                  <>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2.5 uppercase tracking-wide">
                      <span>✦</span> 추천 코디 조합
                    </div>
                    <div className="space-y-2">
                      {outfit.keyItems.map((look, j) => {
                        // Extract label and content: "[룩 1] content"
                        const bracket = look.match(/^\[([^\]]+)\]\s*/);
                        const label = bracket ? bracket[1] : `코디 ${j + 1}`;
                        const content = bracket ? look.slice(bracket[0].length) : look;
                        return (
                          <div key={j} className="flex items-start gap-2 bg-white/70 rounded-xl px-3 py-2.5 border border-white">
                            <span className={`flex-shrink-0 text-xs font-bold px-1.5 py-0.5 rounded-md mt-0.5 ${genderTag[outfit.gender]}`}>
                              {label}
                            </span>
                            <span className="text-sm text-gray-700 leading-snug">{content}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2.5 uppercase tracking-wide">
                      <span>✦</span> 필수 아이템
                    </div>
                    <div className="space-y-1.5">
                      {outfit.keyItems.map((item, j) => {
                        const bracket = item.match(/^\[([^\]]+)\]\s*/);
                        const label = bracket ? bracket[1] : null;
                        const content = bracket ? item.slice(bracket[0].length) : item;
                        const isRequired = label === '필수';
                        return (
                          <div key={j} className="flex items-start gap-2 bg-white/70 rounded-xl px-3 py-2 border border-white">
                            {label && (
                              <span className={`flex-shrink-0 text-xs font-bold px-1.5 py-0.5 rounded-md mt-0.5 ${isRequired ? genderTag[outfit.gender] : 'bg-gray-100 text-gray-500'}`}>
                                {label}
                              </span>
                            )}
                            {!label && <span className="flex-shrink-0 text-gray-400 mt-0.5">•</span>}
                            <span className="text-sm text-gray-700 leading-snug">{content}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              {/* Reference links — secondary */}
              <div className="pt-1 border-t border-black/5">
                <div className="text-xs text-gray-400 mb-1.5">참고 자료</div>
                <div className="flex gap-2 flex-wrap">
                  <a
                    href={outfit.searchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-gray-500 bg-white border border-gray-200 hover:border-gray-300 hover:text-gray-700 transition-all"
                  >
                    <span>🔍</span> 네이버 검색
                  </a>
                  {outfit.referenceUrl && (
                    <a
                      href={outfit.referenceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs text-gray-500 bg-white border border-gray-200 hover:border-gray-300 hover:text-gray-700 transition-all"
                    >
                      <span>📌</span> Pinterest OOTD
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 패킹 팁 */}
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
