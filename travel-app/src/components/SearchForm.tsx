import { useState, useMemo } from 'react';
import type { SearchParams, CompanionType } from '../types';
import { destinations, koreanAirports, multiCityRecommendations } from '../data/destinations';

// 현재 날짜 기준 (2026년 5월)
const NOW_YEAR = 2026;
const NOW_MONTH = 5; // 5월

const YEARS = ['2026', '2027', '2028', '2029', '2030'];
const ALL_MONTHS = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];

const companionOptions: { value: CompanionType; label: string; icon: string; desc: string }[] = [
  { value: 'family_elderly', label: '어르신 포함 가족', icon: '👴', desc: '고령 연령대 포함' },
  { value: 'family_young_kids', label: '유소아 포함 가족', icon: '👶', desc: '영·유아·초등 포함' },
  { value: 'family_all', label: '전 세대 가족', icon: '👨‍👩‍👧‍👦', desc: '어르신 + 아이 모두' },
  { value: 'couple', label: '연인 / 부부', icon: '💑', desc: '2인 여행' },
  { value: 'small_group', label: '소규모 그룹', icon: '👫', desc: '친구·지인 2~4명' },
  { value: 'large_group', label: '대규모 그룹', icon: '👥', desc: '5명 이상 단체' },
];

interface Props {
  onSearch: (params: SearchParams) => void;
  isLoading: boolean;
}

export default function SearchForm({ onSearch, isLoading }: Props) {
  const [dateType, setDateType] = useState<'exact' | 'month'>('exact');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('2026');
  const [companion, setCompanion] = useState<CompanionType | ''>('');
  const [departureCity, setDepartureCity] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [showMultiSuggest, setShowMultiSuggest] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // 선택 연도에 따라 표시할 월 목록 계산
  const availableMonths = useMemo(() => {
    if (year === String(NOW_YEAR)) {
      return ALL_MONTHS.slice(NOW_MONTH - 1); // 현재 월 이후만
    }
    return ALL_MONTHS;
  }, [year]);

  // 국가 변경 시 월 reset 검증
  const handleYearChange = (y: string) => {
    setYear(y);
    // 선택된 월이 새 연도에서 사용 불가하면 초기화
    if (y === String(NOW_YEAR) && month) {
      const mIdx = ALL_MONTHS.indexOf(month) + 1;
      if (mIdx < NOW_MONTH) setMonth('');
    }
  };

  const availableCities = destinations.find((d) => d.country === selectedCountry)?.cities || [];
  const multiSuggestions = multiCityRecommendations[selectedCountry] || [];

  // 해당 도시에 항공편이 있는지 확인
  const hasFlightWarning = useMemo(() => {
    if (!departureCity || selectedCities.length === 0) return false;
    const airport = koreanAirports.find((a) => a.city === departureCity);
    if (!airport || airport.destinations === 'ALL') return false;
    return selectedCities.some((city) => !(airport.destinations as string[]).includes(city));
  }, [departureCity, selectedCities]);

  const flightWarningCities = useMemo(() => {
    if (!departureCity) return [];
    const airport = koreanAirports.find((a) => a.city === departureCity);
    if (!airport || airport.destinations === 'ALL') return [];
    return selectedCities.filter((city) => !(airport.destinations as string[]).includes(city));
  }, [departureCity, selectedCities]);

  const toggleCity = (city: string) => {
    setSelectedCities((prev) => {
      if (prev.includes(city)) return prev.filter((c) => c !== city);
      if (prev.length >= 3) return prev; // 최대 3개
      return [...prev, city];
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (dateType === 'exact') {
      if (!startDate) e.startDate = '출발일을 선택해주세요';
      if (!endDate) e.endDate = '귀국일을 선택해주세요';
      if (startDate && endDate && endDate < startDate) e.endDate = '귀국일은 출발일 이후여야 합니다';
    } else {
      if (!month) e.month = '여행 월을 선택해주세요';
    }
    if (!companion) e.companion = '동행 유형을 선택해주세요';
    if (!departureCity) e.departureCity = '출발 도시를 선택해주세요';
    if (!selectedCountry) e.selectedCountry = '여행 국가를 선택해주세요';
    if (selectedCities.length === 0) e.destinationCities = '여행 도시를 1개 이상 선택해주세요';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const monthNum = dateType === 'month' ? String(ALL_MONTHS.indexOf(month) + 1) : undefined;
    onSearch({
      dateType,
      startDate: dateType === 'exact' ? startDate : undefined,
      endDate: dateType === 'exact' ? endDate : undefined,
      month: monthNum,
      year,
      companion: companion as CompanionType,
      departureCity,
      destinationCities: selectedCities,
      destinationCountry: selectedCountry,
    });
  };

  // 날짜 input min값
  const today = `${NOW_YEAR}-0${NOW_MONTH}-01`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 text-8xl">✈️</div>
          <div className="absolute top-5 right-32 text-6xl">🗺️</div>
          <div className="absolute bottom-10 left-1/3 text-7xl">🏖️</div>
          <div className="absolute bottom-5 right-20 text-5xl">🗼</div>
        </div>
        <div className="relative max-w-5xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-4">
            <span>✨</span> AI 기반 스마트 여행 플래너
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            나만의 완벽한 여행,<br />
            <span className="text-yellow-300">지금 바로 계획하세요</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            여행 일정·동행 유형·출발지를 입력하면 맞춤 코스, 날씨 분석, 옷차림 추천까지 한 번에 알려드립니다
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-5xl mx-auto px-4 -mt-8 pb-16">
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="p-8 space-y-8">

            {/* ① 여행 일정 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-700 text-sm font-bold">1</span>
                여행 일정
              </h2>
              <div className="flex gap-3 mb-4">
                <button type="button" onClick={() => setDateType('exact')}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${dateType === 'exact' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  📅 정확한 날짜 선택
                </button>
                <button type="button" onClick={() => setDateType('month')}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${dateType === 'month' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                  📆 월만 선택 (미정)
                </button>
              </div>

              {dateType === 'exact' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">출발일</label>
                    <input type="date" value={startDate} min={today}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${errors.startDate ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
                    {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">귀국일</label>
                    <input type="date" value={endDate} min={startDate || today}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${errors.endDate ? 'border-red-400 bg-red-50' : 'border-gray-200'}`} />
                    {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">여행 예정 연도</label>
                    <select value={year} onChange={(e) => handleYearChange(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800">
                      {YEARS.map((y) => <option key={y} value={y}>{y}년</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">여행 예정 월</label>
                    <select value={month} onChange={(e) => setMonth(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${errors.month ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>
                      <option value="">월 선택</option>
                      {availableMonths.map((m) => <option key={m} value={m}>{m}</option>)}
                    </select>
                    {errors.month && <p className="text-red-500 text-xs mt-1">{errors.month}</p>}
                  </div>
                </div>
              )}
            </section>

            <hr className="border-gray-100" />

            {/* ② 동행 유형 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold">2</span>
                함께 여행하는 멤버
              </h2>
              {errors.companion && <p className="text-red-500 text-sm mb-3">{errors.companion}</p>}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {companionOptions.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => setCompanion(opt.value)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${companion === opt.value ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-gray-200 hover:border-indigo-200'}`}>
                    <span className="text-2xl flex-shrink-0">{opt.icon}</span>
                    <div>
                      <div className={`text-sm font-semibold ${companion === opt.value ? 'text-indigo-700' : 'text-gray-800'}`}>{opt.label}</div>
                      <div className="text-xs text-gray-500">{opt.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <hr className="border-gray-100" />

            {/* ③ 출발지 & 목적지 */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-bold">3</span>
                출발지 & 목적지
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* 출발 도시 (국제공항 있는 곳만) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    출발 도시
                    <span className="ml-1.5 text-xs text-gray-400">(국제공항 보유 도시)</span>
                  </label>
                  <select value={departureCity} onChange={(e) => setDepartureCity(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 ${errors.departureCity ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>
                    <option value="">출발 도시 선택</option>
                    {koreanAirports.map((a) => (
                      <option key={a.city} value={a.city}>
                        {a.city} — {a.airportName}{a.note ? ` (${a.note})` : ''}
                      </option>
                    ))}
                  </select>
                  {errors.departureCity && <p className="text-red-500 text-xs mt-1">{errors.departureCity}</p>}
                  {departureCity && departureCity !== '인천' && (
                    <p className="text-xs text-amber-600 mt-1.5 flex items-start gap-1">
                      <span>⚠️</span>
                      {koreanAirports.find(a => a.city === departureCity)?.city !== '인천'
                        ? `인천 외 출발 시 일부 목적지는 직항이 없을 수 있습니다.`
                        : ''}
                    </p>
                  )}
                </div>

                {/* 여행 국가 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">여행 국가</label>
                  <select value={selectedCountry}
                    onChange={(e) => { setSelectedCountry(e.target.value); setSelectedCities([]); setShowMultiSuggest(false); }}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 ${errors.selectedCountry ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}>
                    <option value="">국가 선택</option>
                    {destinations.map((d) => <option key={d.country} value={d.country}>{d.country}</option>)}
                  </select>
                  {errors.selectedCountry && <p className="text-red-500 text-xs mt-1">{errors.selectedCountry}</p>}
                </div>
              </div>

              {/* 항공편 경고 */}
              {hasFlightWarning && (
                <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
                  <span className="font-semibold">⚠️ 직항 미확인:</span> {departureCity} 출발 기준 <strong>{flightWarningCities.join(', ')}</strong>는 직항편이 없거나 경유가 필요할 수 있습니다. 인천 출발을 권장합니다.
                </div>
              )}

              {/* 여행 도시 선택 (멀티 가능) */}
              {selectedCountry && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      여행 도시
                      <span className="ml-1.5 text-xs text-gray-400">최대 3개 선택 가능</span>
                    </label>
                    {selectedCities.length >= 2 && (
                      <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
                        ✈️ 멀티시티 여행
                      </span>
                    )}
                  </div>

                  {/* 추천 멀티시티 조합 */}
                  {multiSuggestions.length > 0 && (
                    <div className="mb-3">
                      <button type="button" onClick={() => setShowMultiSuggest(!showMultiSuggest)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1">
                        {showMultiSuggest ? '▲' : '▼'} 추천 멀티시티 조합 보기
                      </button>
                      {showMultiSuggest && (
                        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {multiSuggestions.map((s) => (
                            <button key={s.label} type="button"
                              onClick={() => { setSelectedCities(s.cities); setShowMultiSuggest(false); }}
                              className="text-left p-3 rounded-xl border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-all">
                              <div className="font-semibold text-sm text-blue-800">{s.label}</div>
                              <div className="text-xs text-blue-600 mt-0.5">{s.description}</div>
                              <div className="text-xs text-gray-500 mt-0.5">🚆 {s.transport}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 선택된 도시 태그 */}
                  {selectedCities.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {selectedCities.map((c, i) => (
                        <span key={c} className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white text-sm rounded-full font-medium">
                          <span className="text-xs opacity-70">{i + 1}</span> {c}
                          <button type="button" onClick={() => toggleCity(c)} className="ml-0.5 hover:opacity-70">×</button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* 도시 칩 */}
                  <div className="flex flex-wrap gap-2">
                    {availableCities.map((city) => {
                      const isSelected = selectedCities.includes(city);
                      const isDisabled = !isSelected && selectedCities.length >= 3;
                      return (
                        <button key={city} type="button"
                          onClick={() => !isDisabled && toggleCity(city)}
                          disabled={isDisabled}
                          className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                            isSelected
                              ? 'border-purple-500 bg-purple-50 text-purple-700'
                              : isDisabled
                              ? 'border-gray-100 text-gray-300 cursor-not-allowed'
                              : 'border-gray-200 text-gray-600 hover:border-purple-300'
                          }`}>
                          {city}
                        </button>
                      );
                    })}
                  </div>
                  {errors.destinationCities && <p className="text-red-500 text-sm mt-2">{errors.destinationCities}</p>}
                </div>
              )}
            </section>
          </div>

          {/* Submit */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <button type="submit" disabled={isLoading}
              className="w-full py-4 px-8 bg-white text-blue-700 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3">
              {isLoading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  여행 정보 불러오는 중...
                </>
              ) : (
                <>
                  <span className="text-2xl">🔍</span>
                  {selectedCities.length > 1
                    ? `${selectedCities.join(' + ')} 멀티시티 검색`
                    : '여행 정보 검색하기'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
