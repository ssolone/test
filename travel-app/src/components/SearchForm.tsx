import { useState } from 'react';
import type { SearchParams, CompanionType } from '../types';
import { destinations, koreanCities } from '../data/destinations';

const MONTHS = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
const YEARS = ['2025', '2026', '2027'];

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
  const [destinationCity, setDestinationCity] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableCities = destinations.find((d) => d.country === selectedCountry)?.cities || [];

  const validate = () => {
    const e: Record<string, string> = {};
    if (dateType === 'exact') {
      if (!startDate) e.startDate = '출발일을 선택해주세요';
      if (!endDate) e.endDate = '도착일을 선택해주세요';
      if (startDate && endDate && endDate < startDate) e.endDate = '도착일은 출발일 이후여야 합니다';
    } else {
      if (!month) e.month = '여행 월을 선택해주세요';
    }
    if (!companion) e.companion = '동행 유형을 선택해주세요';
    if (!departureCity) e.departureCity = '출발 도시를 선택해주세요';
    if (!selectedCountry) e.selectedCountry = '여행 국가를 선택해주세요';
    if (!destinationCity) e.destinationCity = '여행 도시를 선택해주세요';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSearch({
      dateType,
      startDate: dateType === 'exact' ? startDate : undefined,
      endDate: dateType === 'exact' ? endDate : undefined,
      month: dateType === 'month' ? String(MONTHS.indexOf(month) + 1) : undefined,
      year,
      companion: companion as CompanionType,
      departureCity,
      destinationCity,
      destinationCountry: selectedCountry,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Header */}
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

      {/* Search Card */}
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
                <button
                  type="button"
                  onClick={() => setDateType('exact')}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    dateType === 'exact'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  📅 정확한 날짜 선택
                </button>
                <button
                  type="button"
                  onClick={() => setDateType('month')}
                  className={`flex-1 py-3 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                    dateType === 'month'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 text-gray-600 hover:border-gray-300'
                  }`}
                >
                  📆 월만 선택 (미정)
                </button>
              </div>

              {dateType === 'exact' ? (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">출발일</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${errors.startDate ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                    />
                    {errors.startDate && <p className="text-red-500 text-xs mt-1">{errors.startDate}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">귀국일</label>
                    <input
                      type="date"
                      value={endDate}
                      min={startDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${errors.endDate ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                    />
                    {errors.endDate && <p className="text-red-500 text-xs mt-1">{errors.endDate}</p>}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">여행 예정 연도</label>
                    <select
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    >
                      {YEARS.map((y) => <option key={y} value={y}>{y}년</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">여행 예정 월</label>
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 ${errors.month ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                    >
                      <option value="">월 선택</option>
                      {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
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
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCompanion(opt.value)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all hover:shadow-md ${
                      companion === opt.value
                        ? 'border-indigo-500 bg-indigo-50 shadow-md'
                        : 'border-gray-200 hover:border-indigo-200'
                    }`}
                  >
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 출발 도시 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">출발 도시</label>
                  <select
                    value={departureCity}
                    onChange={(e) => setDepartureCity(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 ${errors.departureCity ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                  >
                    <option value="">출발 도시 선택</option>
                    {koreanCities.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.departureCity && <p className="text-red-500 text-xs mt-1">{errors.departureCity}</p>}
                </div>

                {/* 화살표 */}
                <div className="hidden md:flex items-end justify-center pb-3">
                  <div className="flex items-center gap-1 text-gray-400">
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                    <span className="text-xl">✈️</span>
                    <div className="w-8 h-0.5 bg-gray-300"></div>
                  </div>
                </div>

                {/* 여행 국가 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">여행 국가</label>
                  <select
                    value={selectedCountry}
                    onChange={(e) => { setSelectedCountry(e.target.value); setDestinationCity(''); }}
                    className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 ${errors.selectedCountry ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                  >
                    <option value="">국가 선택</option>
                    {destinations.map((d) => <option key={d.country} value={d.country}>{d.country}</option>)}
                  </select>
                  {errors.selectedCountry && <p className="text-red-500 text-xs mt-1">{errors.selectedCountry}</p>}
                </div>
              </div>

              {/* 여행 도시 (국가 선택 후 표시) */}
              {selectedCountry && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">여행 도시</label>
                  <div className="flex flex-wrap gap-2">
                    {availableCities.map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setDestinationCity(city)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border-2 transition-all ${
                          destinationCity === city
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-gray-200 text-gray-600 hover:border-purple-300'
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                  {errors.destinationCity && <p className="text-red-500 text-sm mt-2">{errors.destinationCity}</p>}
                </div>
              )}
            </section>
          </div>

          {/* Submit */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-8 bg-white text-blue-700 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all hover:bg-blue-50 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
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
                  여행 정보 검색하기
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
