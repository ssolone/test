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
};

const priceLabel: Record<string, string> = {
  '₩': '저렴',
  '₩₩': '보통',
  '₩₩₩': '중고가',
  '₩₩₩₩': '고가',
  '₩₩₩₩₩': '프리미엄',
  '₩~₩₩': '저렴~보통',
};

export default function RestaurantAccommodationSection({ restaurants, accommodations, companion }: Props) {
  const [activeTab, setActiveTab] = useState<'restaurant' | 'accommodation'>('restaurant');

  const filteredRestaurants = restaurants.filter(
    (r) => r.companionFit.includes(companion) || r.companionFit.includes('couple' as CompanionType)
  );
  const filteredAccommodations = accommodations.filter(
    (a) => a.companionFit.includes(companion)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">🏨</span>
        <h2 className="text-xl font-bold text-gray-800">추천 식당 & 숙박</h2>
        <span className="px-2.5 py-0.5 bg-pink-100 text-pink-700 text-xs font-semibold rounded-full">{companionLabels[companion]} 맞춤</span>
      </div>

      {/* Tabs */}
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
          {filteredAccommodations.map((a, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-gray-800">{a.name}</h4>
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{a.type}</span>
                  </div>
                  <p className="text-gray-500 text-sm mt-1.5 leading-relaxed">{a.description}</p>
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
