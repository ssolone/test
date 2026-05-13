import { useState } from 'react';
import './index.css';
import SearchForm from './components/SearchForm';
import ResultsPage from './components/ResultsPage';
import { generateMockResult } from './data/mockResults';
import type { SearchParams, TravelResult } from './types';

type AppState = 'search' | 'loading' | 'results';

function App() {
  const [state, setState] = useState<AppState>('search');
  const [result, setResult] = useState<TravelResult | null>(null);
  const [params, setParams] = useState<SearchParams | null>(null);

  const handleSearch = (searchParams: SearchParams) => {
    setState('loading');
    setParams(searchParams);
    // Simulate async fetch
    setTimeout(() => {
      const data = generateMockResult(searchParams);
      setResult(data);
      setState('results');
    }, 1200);
  };

  const handleBack = () => {
    setState('search');
    setResult(null);
  };

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-blue-200 animate-ping" />
            <div className="absolute inset-2 rounded-full border-4 border-indigo-300 animate-ping" style={{ animationDelay: '0.3s' }} />
            <div className="absolute inset-0 flex items-center justify-center text-4xl animate-bounce">✈️</div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">여행 정보 분석 중...</h2>
          <p className="text-gray-500 text-sm">날씨·코스·옷차림·축제 정보를 불러오고 있습니다</p>
          <div className="mt-6 flex justify-center gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (state === 'results' && result && params) {
    return <ResultsPage result={result} params={params} onBack={handleBack} />;
  }

  return <SearchForm onSearch={handleSearch} isLoading={false} />;
}

export default App;
