import { useState } from 'react';
import type { TravelResult, SearchParams } from '../types';
import BasicInfoSection from './BasicInfoSection';
import FestivalsSection from './FestivalsSection';
import SpotsSection from './SpotsSection';
import RestaurantAccommodationSection from './RestaurantAccommodationSection';
import OutfitSection from './OutfitSection';

interface Props {
  results: TravelResult[];
  params: SearchParams;
  onBack: () => void;
}

type TabId = 'overview' | 'spots' | 'food' | 'outfit' | 'events';

const contentTabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'overview', label: '개요', icon: '📋' },
  { id: 'events', label: '행사·축제', icon: '🎉' },
  { id: 'spots', label: '추천 코스', icon: '🗺️' },
  { id: 'food', label: '식당·숙박', icon: '🍽️' },
  { id: 'outfit', label: '옷차림', icon: '👗' },
];

export default function ResultsPage({ results, params, onBack }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [activeCityIdx, setActiveCityIdx] = useState(0);

  const isMultiCity = results.length > 1;
  const result = results[activeCityIdx] ?? results[0];
  const { basicInfo, spots, routes, restaurants, accommodations, outfits, festivalsAndWarnings } = result;

  const headerLabel = isMultiCity
    ? params.destinationCities.join(' + ')
    : `${basicInfo.destination}, ${basicInfo.country}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-3 py-3">
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
            >
              ← 새로 검색
            </button>
            <div className="flex-1 h-px bg-gray-200" />
            <div className="text-sm font-semibold text-gray-700 truncate max-w-xs">
              {headerLabel}
            </div>
          </div>

          {/* 멀티시티 도시 선택 탭 */}
          {isMultiCity && (
            <div className="flex gap-1.5 pb-2 overflow-x-auto scrollbar-none">
              {results.map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveCityIdx(idx)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all border ${
                    activeCityIdx === idx
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <span>{idx + 1}</span>
                  {r.basicInfo.destination}
                </button>
              ))}
            </div>
          )}

          {/* 콘텐츠 탭 */}
          <div className="flex gap-0.5 overflow-x-auto pb-px scrollbar-none">
            {contentTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {tab.id === 'events' && festivalsAndWarnings.length > 0 && (
                  <span className="ml-0.5 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs rounded-full">
                    {festivalsAndWarnings.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        {activeTab === 'overview' && (
          <BasicInfoSection basicInfo={basicInfo} params={params} />
        )}
        {activeTab === 'events' && (
          <FestivalsSection events={festivalsAndWarnings} />
        )}
        {activeTab === 'spots' && (
          <SpotsSection
            spots={spots}
            routes={routes}
            companion={params.companion}
            destination={basicInfo.destination}
          />
        )}
        {activeTab === 'food' && (
          <RestaurantAccommodationSection
            restaurants={restaurants}
            accommodations={accommodations}
            companion={params.companion}
          />
        )}
        {activeTab === 'outfit' && (
          <OutfitSection
            outfits={outfits}
            destination={basicInfo.destination}
            season={basicInfo.weather.season}
          />
        )}
      </div>
    </div>
  );
}
