import { useState } from 'react';
import type { Restaurant, Accommodation, CompanionType } from '../types';
import { companionLabels } from '../data/mockResults';

interface Props {
  restaurants: Restaurant[];
  accommodations: Accommodation[];
  companion: CompanionType;
}

const priceColor: Record<string, string> = {
  '₩': 'text-green-600',
  '₩₩': 'text-blue-600',
  '₩₩₩': 'text-orange-500',
  '₩₩₩₩': 'text-red-500',
  '₩₩₩₩₩': 'text-purple-600',
  '₩~₩₩': 'text-green-600',
  '₩₩~₩₩₩': 'text-blue-600',
  '₩₩₩₩~₩₩₩₩₩': 'text-purple-600',
};

const priceLabel: Record<string, string> = {
  '₩': '저렴',
  '₩₩': '보통',
  '₩₩₩': '중고가',
  '₩₩₩₩': '고가',
  '₩₩₩₩₩': '프리미엄',
  '₩~₩₩': '저렴~보통',
  '₩₩~₩₩₩': '보통~중고가',
  '₩₩₩₩~₩₩₩₩₩': '고가~프리미엄',
};

const isYoungKids = (c: CompanionType) =>
  c === 'family_young_kids' || c === 'family_all';

const kidsAmenityIcon: Record<string, string> = {
  '전자레인지': '📡',
  '전자레인지 (요청 시)': '📡',
  '전자레인지 (요청)': '📡',
  '유아 침대 무료': '🛏️',
  '유아 침대 협의 가능': '🛏️',
  '유아 침대 제공': '🛏️',
  '키즈 클럽': '🎠',
  '어린이 클럽': '🎠',
  '어린이 수영장': '🏊',
  '어린이 전용 수영장 레인': '🏊',
  '어린이 메뉴': '🍽️',
  '어린이 메뉴 제공': '🍽️',
  '키즈 메뉴': '🍽️',
  '유아 어메니티': '🧴',
  '유아 어메니티 세트': '🧴',
  '키즈 어메니티 세트': '🧴',
  '유모차 대여': '🛒',
  '유모차 대여 가능': '🛒',
  '유모차 보관 가능': '🛒',
  '수유실': '🤱',
  '워터파크 무료': '🎡',
  '워터파크 아쿠아벤처 (투숙객 무료)': '🎡',
  '와일드 와디 워터파크 무료': '🎡',
  '베이비시터 연결 가능 (별도 비용)': '👶',
  '베이비시팅 서비스 (별도)': '👶',
  '보모(baby sitter) 연결 서비스': '👶',
  '주방 완비 (전자레인지·냉장고)': '🍳',
  '주방 완비 (전자레인지·냉장고·인덕션)': '🍳',
  '주방 (전자레인지·냉장고)': '🍳',
  '세탁기': '🫧',
};

function getAmenityIcon(amenity: string): string {
  for (const key of Object.keys(kidsAmenityIcon)) {
    if (amenity.includes(key.split(' (')[0])) return kidsAmenityIcon[key] || '✓';
  }
  return '✓';
}

const KIDS_PRIORITY = ['전자레인지', '유아 침대', '키즈 클럽', '어린이 클럽', '어린이 메뉴', '키즈 메뉴', '워터파크', '수유실', '유아 어메니티', '베이비시터'];

function sortAmenities(amenities: string[], isKids: boolean): string[] {
  if (!isKids) return amenities;
  return [...amenities].sort((a, b) => {
    const aIdx = KIDS_PRIORITY.findIndex((k) => a.includes(k));
    const bIdx = KIDS_PRIORITY.findIndex((k) => b.includes(k));
    const aScore = aIdx === -1 ? 99 : aIdx;
    const bScore = bIdx === -1 ? 99 : bIdx;
    return aScore - bScore;
  });
}

function sortAccommodations(list: Accommodation[], isKids: boolean): Accommodation[] {
  if (!isKids) return list;
  return [...list].sort((a, b) => {
    const aScore = (a.kidsScore ?? 0) * 10 + (a.reviewScore ?? 0);
    const bScore = (b.kidsScore ?? 0) * 10 + (b.reviewScore ?? 0);
    return bScore - aScore;
  });
}

export default function RestaurantAccommodationSection({ restaurants, accommodations, companion }: Props) {
  const [activeTab, setActiveTab] = useState<'restaurant' | 'accommodation'>('restaurant');
  const kidsMode = isYoungKids(companion);

  const filteredRestaurants = restaurants.filter(
    (r) => r.companionFit.includes(companion) || r.companionFit.includes('couple' as CompanionType)
  );
  const filteredAccommodations = sortAccommodations(
    accommodations.filter((a) => a.companionFit.includes(companion)),
    kidsMode
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">🏨</span>
        <h2 className="text-xl font-bold text-gray-800">추천 식당 & 숙박</h2>
        <span className="px-2.5 py-0.5 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">{companionLabels[companion]} 맞춤</span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('restaurant')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
            activeTab === 'restaurant' ? 'bg-orange-500 border-orange-500 text-white' : 'bg-white border-orange-200 text-orange-600 hover:bg-orange-50'
          }`}
        >
          🍽️ 추천 식당
        </button>
        <button
          onClick={() => setActiveTab('accommodation')}
          className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
            activeTab === 'accommodation' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-blue-200 text-blue-600 hover:bg-blue-50'
          }`}
        >
          🏨 추천 숙박
        </button>
      </div>

      {activeTab === 'restaurant' && (
        <div className="space-y-3">
          {filteredRestaurants.map((r, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-gray-800">{r.name}</h4>
                    <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">{r.cuisine}</span>
                    {kidsMode && r.kidsMenu && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">🍽️ 아이 메뉴</span>
                    )}
                    {kidsMode && r.highChair && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">🪑 유아 의자</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{r.description}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-lg font-bold ${priceColor[r.priceRange] || 'text-gray-600'}`}>{r.priceRange}</div>
                  <div className="text-xs text-gray-400">{priceLabel[r.priceRange] || ''}</div>
                </div>
              </div>
              {r.mapUrl && (
                <a
                  href={r.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  🗺️ 지도에서 보기
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'accommodation' && (
        <div className="space-y-3">
          {kidsMode && (
            <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
              <span>🍼</span>
              <span>유소아 동반 적합도 순으로 정렬됩니다. <strong>전자레인지·유아 침대·키즈 클럽</strong> 여부를 꼭 확인하세요.</span>
            </div>
          )}
          {filteredAccommodations.map((a, i) => (
            <div key={i} className={`bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow ${kidsMode && (a.kidsScore ?? 0) >= 4 ? 'border-amber-200' : 'border-gray-100'}`}>
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-gray-800">{a.name}</h4>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{a.type}</span>
                    {kidsMode && (a.kidsScore ?? 0) >= 4 && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">
                        🍼 {'⭐'.repeat(a.kidsScore ?? 0)} 유소아 적합
                      </span>
                    )}
                  </div>

                  {/* 역 거리 + 평점 */}
                  <div className="flex flex-wrap gap-2 mt-1.5">
                    {a.distanceToStation && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 rounded-full text-xs text-gray-600">
                        🚇 {a.distanceToStation}
                      </span>
                    )}
                    {a.reviewScore && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-yellow-50 rounded-full text-xs text-yellow-700 font-medium">
                        ⭐ {a.reviewScore} {a.reviewCount && <span className="text-gray-400">({a.reviewCount})</span>}
                      </span>
                    )}
                  </div>

                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{a.description}</p>

                  {/* 편의시설 칩 */}
                  {a.amenities && a.amenities.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {sortAmenities(a.amenities, kidsMode).map((am, j) => {
                        const icon = getAmenityIcon(am);
                        const isKidsItem = KIDS_PRIORITY.some((k) => am.includes(k));
                        return (
                          <span
                            key={j}
                            className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                              kidsMode && isKidsItem
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {icon} {am}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`text-lg font-bold ${priceColor[a.priceRange] || 'text-gray-600'}`}>{a.priceRange}</div>
                  <div className="text-xs text-gray-400">{priceLabel[a.priceRange] || ''}</div>
                </div>
              </div>
              {a.bookingUrl && (
                <a
                  href={a.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sm bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  예약하기 →
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
