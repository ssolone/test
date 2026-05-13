import type { FestivalEvent } from '../types';

interface Props {
  events: FestivalEvent[];
}

const impactConfig = {
  positive: { bg: 'bg-green-50', border: 'border-green-200', badge: 'bg-green-100 text-green-700', icon: '🎉', label: '추천' },
  caution: { bg: 'bg-amber-50', border: 'border-amber-200', badge: 'bg-amber-100 text-amber-700', icon: '⚠️', label: '주의' },
  avoid: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-100 text-red-700', icon: '🚫', label: '회피 권장' },
};

const typeLabel: Record<string, string> = {
  festival: '축제',
  event: '행사',
  holiday: '공휴일',
  warning: '주의사항',
};

export default function FestivalsSection({ events }: Props) {
  const positives = events.filter((e) => e.impact === 'positive');
  const cautions = events.filter((e) => e.impact === 'caution' || e.impact === 'avoid');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">🗓️</span>
        <h2 className="text-xl font-bold text-gray-800">행사·축제 & 주의사항</h2>
      </div>
      <p className="text-gray-500 text-sm">해당 시즌에 열리는 주요 이벤트와 여행 시 피해야 할 기간을 확인하세요.</p>

      {positives.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-1.5">
            <span>🎊</span> 이 시기 추천 축제 & 이벤트
          </h3>
          <div className="space-y-3">
            {positives.map((event, i) => {
              const cfg = impactConfig[event.impact];
              return (
                <div key={i} className={`rounded-xl border ${cfg.border} ${cfg.bg} p-4`}>
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{cfg.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{event.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">📅 {event.period} · <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium ${cfg.badge}`}>{typeLabel[event.type]}</span></div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${cfg.badge}`}>{cfg.label}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">{event.description}</p>
                  <div className="mt-2 bg-white/70 rounded-lg px-3 py-2 text-sm text-gray-700">
                    <span className="font-medium">💡 TIP:</span> {event.tip}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {cautions.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-700 mb-3 flex items-center gap-1.5 mt-4">
            <span>⚠️</span> 주의 & 회피 권장 기간
          </h3>
          <div className="space-y-3">
            {cautions.map((event, i) => {
              const cfg = impactConfig[event.impact];
              return (
                <div key={i} className={`rounded-xl border ${cfg.border} ${cfg.bg} p-4`}>
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{cfg.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-800">{event.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5">📅 {event.period} · <span className={`inline-block px-1.5 py-0.5 rounded text-xs font-medium ${cfg.badge}`}>{typeLabel[event.type]}</span></div>
                      </div>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${cfg.badge}`}>{cfg.label}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">{event.description}</p>
                  <div className="mt-2 bg-white/70 rounded-lg px-3 py-2 text-sm text-gray-700">
                    <span className="font-medium">💡 TIP:</span> {event.tip}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
