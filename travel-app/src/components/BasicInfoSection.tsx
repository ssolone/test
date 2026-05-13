import type { BasicInfo, SearchParams } from '../types';
import { companionLabels } from '../data/mockResults';

interface Props {
  basicInfo: BasicInfo;
  params: SearchParams;
}

const MONTH_NAMES = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

function formatDateRange(params: SearchParams) {
  if (params.dateType === 'exact' && params.startDate && params.endDate) {
    const start = new Date(params.startDate);
    const end = new Date(params.endDate);
    const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return `${params.startDate} ~ ${params.endDate} (${days}일간)`;
  }
  if (params.dateType === 'month' && params.month) {
    return `${params.year}년 ${MONTH_NAMES[parseInt(params.month) - 1]} 예정`;
  }
  return '일정 미정';
}

function TimeDiffBadge({ hours }: { hours: number }) {
  if (hours === 0) return <span className="text-green-600 font-semibold">시차 없음 (동일)</span>;
  const abs = Math.abs(hours);
  const dir = hours > 0 ? '앞' : '뒤';
  return <span className="font-semibold text-gray-800">{`한국보다 ${abs}시간 ${dir}`}</span>;
}

export default function BasicInfoSection({ basicInfo, params }: Props) {
  const { weather } = basicInfo;
  const seasonEmoji: Record<string, string> = { '봄': '🌸', '여름': '☀️', '가을': '🍂', '겨울': '❄️' };

  return (
    <div className="space-y-4">
      {/* Destination Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <div className="text-blue-200 text-sm font-medium mb-1">{basicInfo.country}</div>
            <h2 className="text-3xl font-bold mb-1">{basicInfo.destination}</h2>
            <div className="text-blue-100 text-sm">{formatDateRange(params)} · {companionLabels[params.companion]}</div>
          </div>
          <div className="text-6xl">{seasonEmoji[weather.season] || '🌍'}</div>
        </div>

        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">{basicInfo.distanceKm.toLocaleString()}<span className="text-sm font-normal ml-1">km</span></div>
            <div className="text-blue-200 text-xs mt-0.5">서울 기준 거리</div>
          </div>
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <div className="text-2xl font-bold">{basicInfo.flightHours}<span className="text-sm font-normal ml-1">시간</span></div>
            <div className="text-blue-200 text-xs mt-0.5">비행 소요 시간</div>
          </div>
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <div className="text-lg font-bold">{basicInfo.timeDifferenceHours === 0 ? '±0h' : `${basicInfo.timeDifferenceHours > 0 ? '+' : ''}${basicInfo.timeDifferenceHours}h`}</div>
            <div className="text-blue-200 text-xs mt-0.5">시차 (한국 기준)</div>
          </div>
          <div className="bg-white/15 rounded-xl p-3 text-center">
            <div className="text-lg font-bold">{weather.avgTempHigh}°/{weather.avgTempLow}°</div>
            <div className="text-blue-200 text-xs mt-0.5">평균 기온 (최고/최저)</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 날씨 정보 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-xl">{seasonEmoji[weather.season]}</span>
            {weather.season} 날씨 정보
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">{weather.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 rounded-xl p-3">
              <div className="text-xs text-gray-500 mb-0.5">강수량</div>
              <div className="font-semibold text-gray-800">{weather.precipitation}</div>
            </div>
            <div className="bg-orange-50 rounded-xl p-3">
              <div className="text-xs text-gray-500 mb-0.5">습도</div>
              <div className="font-semibold text-gray-800">{weather.humidity}</div>
            </div>
          </div>

          {weather.warnings.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <div className="text-amber-700 font-semibold text-sm mb-2 flex items-center gap-1">
                <span>⚠️</span> 날씨 주의사항
              </div>
              <ul className="space-y-1">
                {weather.warnings.map((w, i) => (
                  <li key={i} className="text-amber-800 text-xs flex items-start gap-1.5">
                    <span className="mt-0.5 flex-shrink-0">•</span>{w}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 기본 여행 정보 */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-xl">📋</span>
            기본 여행 정보
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm">출발 도시</span>
              <span className="font-medium text-gray-800">{params.departureCity}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm">시차</span>
              <TimeDiffBadge hours={basicInfo.timeDifferenceHours} />
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm">통화</span>
              <span className="font-medium text-gray-800">{basicInfo.currency}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-50">
              <span className="text-gray-500 text-sm">언어</span>
              <span className="font-medium text-gray-800">{basicInfo.language}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-500 text-sm">추천 여행 시기</span>
              <span className="font-medium text-green-700">{basicInfo.bestSeason}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
