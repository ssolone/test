export type CompanionType =
  | 'family_elderly'
  | 'family_young_kids'
  | 'family_all'
  | 'couple'
  | 'small_group'
  | 'large_group';

export type TripDuration = 'short' | 'medium' | 'long';

export interface SearchParams {
  dateType: 'exact' | 'month';
  startDate?: string;
  endDate?: string;
  month?: string;
  year?: string;
  companion: CompanionType;
  departureCity: string;
  destinationCity: string;
  destinationCountry: string;
}

export interface WeatherInfo {
  season: string;
  avgTempHigh: number;
  avgTempLow: number;
  precipitation: string;
  humidity: string;
  description: string;
  warnings: string[];
}

export interface BasicInfo {
  destination: string;
  country: string;
  weather: WeatherInfo;
  distanceKm: number;
  flightHours: number;
  timeDifferenceHours: number;
  currency: string;
  language: string;
  bestSeason: string;
}

export interface Spot {
  name: string;
  type: string;
  description: string;
  tip: string;
  companionFit: CompanionType[];
}

export interface RouteDay {
  day: number;
  title: string;
  spots: string[];
  meals: string;
  accommodation: string;
}

export interface TripRoute {
  duration: TripDuration;
  durationLabel: string;
  days: number;
  highlight: string;
  route: RouteDay[];
}

export interface Restaurant {
  name: string;
  cuisine: string;
  priceRange: string;
  description: string;
  companionFit: CompanionType[];
  mapUrl?: string;
}

export interface Accommodation {
  name: string;
  type: string;
  priceRange: string;
  description: string;
  companionFit: CompanionType[];
  bookingUrl?: string;
}

export interface OutfitItem {
  gender: 'male' | 'female' | 'all';
  ageGroup: string;
  description: string;
  keyItems: string[];
  searchUrl: string;
  referenceUrl?: string;
}

export interface FestivalEvent {
  name: string;
  period: string;
  description: string;
  type: 'festival' | 'event' | 'holiday' | 'warning';
  impact: 'positive' | 'caution' | 'avoid';
  tip: string;
  months?: number[]; // 해당 이벤트가 발생하는 월 (1~12)
}

export interface TravelResult {
  basicInfo: BasicInfo;
  spots: Spot[];
  routes: TripRoute[];
  restaurants: Restaurant[];
  accommodations: Accommodation[];
  outfits: OutfitItem[];
  festivalsAndWarnings: FestivalEvent[];
}
