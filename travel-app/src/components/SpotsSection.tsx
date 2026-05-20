import { useState } from 'react';
import type { Spot, TripRoute, CompanionType } from '../types';
import { companionLabels } from '../data/mockResults';

interface Props {
  spots: Spot[];
  routes: TripRoute[];
  companion: CompanionType;
  destination: string;
}

const typeColors: Record<string, string> = {
  '역사/문화': 'bg-purple-100 text-purple-700',
  '쇼핑/미식': 'bg-pink-100 text-pink-700',
  '박물관/전시': 'bg-blue-100 text-blue-700',
  '자연/경치': 'bg-green-100 text-green-700',
  '종교/문화': 'bg-orange-100 text-orange-700',
  '테마파크/놀이': 'bg-yellow-100 text-yellow-700',
  '카페/감성': 'bg-rose-100 text-rose-700',
};

const durationIcons: Record<string, string> = { short: '⚡', medium: '🗓️', long: '🌏' };
const durationColors: Record<string, string> = {
  short: 'border-blue-400 bg-blue-50',
  medium: 'border-indigo-400 bg-indigo-50',
  long: 'border-purple-400 bg-purple-50',
};
const durationTabColors: Record<string, string> = {
  short: 'bg-blue-600 text-white',
  medium: 'bg-indigo-600 text-white',
  long: 'bg-purple-600 text-white',
};
const durationInactiveColors: Record<string, string> = {
  short: 'text-blue-600 border-blue-200 hover:bg-blue-50',
  medium: 'text-indigo-600 border-indigo-200 hover:bg-indigo-50',
  long: 'text-purple-600 border-purple-200 hover:bg-purple-50',
};

const isYoungKidsCompanion = (c: CompanionType) =>
  c === 'family_young_kids' || c === 'family_all';

export default function SpotsSection({ spots, routes, companion, destination }: Props) {
  const [activeRoute, setActiveRoute] = useState<string>('short');
  const currentRoute = routes.find((r) => r.duration === activeRoute) || routes[0];
  const showKidsBadge = isYoungKidsCompanion(companion);

  return (
    <div className="space-y-6">
      {/* 추천 스폿 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">📍</span>
          <h2 className="text-xl font-bold text-gray-800">추천 스폿</h2>
          <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">{companionLabels[companion]} 맞춤</span>
        </div>
        {showKidsBadge && (
          <div className="mb-3 flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-700">
            <span>🍼</span>
            <span>유소아 동반 스팟에는 <strong>🍼 아이 포인트</strong>가 표시됩니다. 유아차·수유 편의·신장 제한 등 미리 확인하세요.</span>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {spots.map((spot, i) => (
            <div key={i} className={`bg-white rounded-xl border shadow-sm p-4 hover:shadow-md transition-shadow ${showKidsBadge && spot.childFriendly ? 'border-amber-200' : 'border-gray-100'}`}>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-gray-800 text-sm">{spot.name}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[spot.type] || 'bg-gray-100 text-gray-600'}`}>{spot.type}</span>
                    {showKidsBadge && spot.childFriendly && (
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">🍼 유아 적합</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-xs mt-1 leading-relaxed">{spot.description}</p>
                  <div className="mt-2 bg-amber-50 rounded-lg px-2.5 py-1.5 text-xs text-amber-700">
                    <span className="font-medium">💡</span> {spot.tip}
                  </div>
                  {showKidsBadge && spot.childNote && (
                    <div className="mt-1.5 bg-orange-50 border border-orange-100 rounded-lg px-2.5 py-1.5 text-xs text-orange-700">
                      <span className="font-medium">🍼 아이 포인트:</span> {spot.childNote}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 추천 코스 */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl">🗺️</span>
          <h2 className="text-xl font-bold text-gray-800">추천 여행 코스</h2>
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {routes.map((r) => (
            <button
              key={r.duration}
              onClick={() => setActiveRoute(r.duration)}
              className={`px-4 py-2.5 rounded-xl text-sm font-semibold border-2 transition-all ${
                activeRoute === r.duration
                  ? durationTabColors[r.duration]
                  : `border-2 bg-white ${durationInactiveColors[r.duration]}`
              }`}
            >
              {durationIcons[r.duration]} {r.durationLabel}
            </button>
          ))}
        </div>

        {currentRoute && (
          <div className={`rounded-2xl border-2 ${durationColors[currentRoute.duration]} overflow-hidden`}>
            <div className="p-4 border-b border-white/50">
              <div className="font-bold text-gray-800 text-lg">{currentRoute.highlight}</div>
              <div className="text-gray-500 text-sm mt-0.5">{destination} · {currentRoute.days}일 일정 · {companionLabels[companion]} 추천</div>
            </div>
            <div className="divide-y divide-white/50">
              {currentRoute.route.map((day) => (
                <div key={day.day} className="p-4 bg-white/50 hover:bg-white/70 transition-colors">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center text-xs font-bold">
                      D{day.day}
                    </div>
                    <div className="font-semibold text-gray-800">{day.title}</div>
                  </div>
                  <div className="ml-11 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {day.spots.map((s, i) => (
                        <span key={i} className="px-2.5 py-1 bg-white rounded-lg text-xs font-medium text-gray-700 border border-gray-200 shadow-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                      <span>🍽️ {day.meals}</span>
                      <span>🏨 {day.accommodation}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
