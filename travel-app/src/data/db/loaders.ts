import type { FestivalEvent, Accommodation, CompanionType } from '../../types';
import festivalsDB from './festivals.json';
import accommodationsDB from './accommodations.json';

// ─── DB Schema Types ───────────────────────────────────────

export interface FestivalOccurrence {
  year: number;
  startDate: string;   // YYYY-MM-DD
  endDate: string;     // YYYY-MM-DD
  confirmed: boolean;
  note?: string;
}

export interface FestivalRecord {
  id: string;
  name: string;
  type: 'festival' | 'event' | 'holiday' | 'warning';
  impact: 'positive' | 'caution' | 'avoid';
  recurrence: 'annual' | 'oneoff' | 'seasonal';
  months: number[];
  occurrences: FestivalOccurrence[];
  description: string;
  tip: string;
  lastUpdated: string;
  sources: string[];
}

export interface CompanionProfile {
  score: number;     // 1–5
  fit: boolean;
  highlights: string[];
  tip: string;
}

export interface AccommodationRecord {
  id: string;
  name: string;
  type: string;
  priceRange: string;
  description: string;
  bookingUrl?: string;
  distanceToStation?: string;
  reviewScore?: number;
  reviewCount?: string;
  amenities: string[];
  companionProfiles: Partial<Record<CompanionType, CompanionProfile>>;
  lastUpdated: string;
  sources: string[];
}

interface DestinationFestivals {
  country: string;
  city: string;
  events: FestivalRecord[];
}

interface DestinationAccommodations {
  country: string;
  city: string;
  accommodations: AccommodationRecord[];
}

type FestivalsDB = { schemaVersion: number; lastUpdated: string; destinations: Record<string, DestinationFestivals> };
type AccommodationsDB = { schemaVersion: number; lastUpdated: string; destinations: Record<string, DestinationAccommodations> };

const festDB = festivalsDB as unknown as FestivalsDB;
const accDB = accommodationsDB as unknown as AccommodationsDB;

// ─── Festival Queries ───────────────────────────────────────

function occurrencePeriodLabel(occ: FestivalOccurrence): string {
  const suffix = occ.confirmed ? '' : ' (추정)';
  return occ.startDate === occ.endDate
    ? `${occ.startDate}${suffix}`
    : `${occ.startDate} ~ ${occ.endDate}${suffix}`;
}

function eventMatchesMonth(ev: FestivalRecord, year: number, monthNum: number): boolean {
  const yearOccs = ev.occurrences.filter((o) => o.year === year);
  if (yearOccs.length > 0) {
    return yearOccs.some((o) => {
      const s = parseInt(o.startDate.split('-')[1]);
      const e = parseInt(o.endDate.split('-')[1]);
      return monthNum >= s && monthNum <= e;
    });
  }
  return ev.months.includes(monthNum);
}

function toFestivalEvent(rec: FestivalRecord, year: number): FestivalEvent {
  const occ = rec.occurrences.find((o) => o.year === year);
  const period = occ
    ? occurrencePeriodLabel(occ)
    : rec.months.map((m) => `${m}월`).join('·');
  return { name: rec.name, period, description: rec.description, type: rec.type, impact: rec.impact, tip: rec.tip, months: rec.months };
}

export function getFestivalEventsByCity(city: string, year: number, monthNum: number): FestivalEvent[] {
  const dest = festDB.destinations[city];
  if (!dest) return [];
  const matched = dest.events.filter((e) => eventMatchesMonth(e, year, monthNum));
  const list = matched.length > 0 ? matched : dest.events.slice(0, 3);
  return list.map((e) => toFestivalEvent(e, year));
}

export function hasCityInFestivalsDB(city: string): boolean {
  return !!festDB.destinations[city];
}

// ─── Accommodation Queries ───────────────────────────────────

export function getAccommodationsByCity(city: string, companion: CompanionType): Accommodation[] {
  const dest = accDB.destinations[city];
  if (!dest) return [];

  return dest.accommodations
    .filter((r) => {
      const p = r.companionProfiles[companion];
      return p ? p.fit : false;
    })
    .sort((a, b) => {
      const ap = a.companionProfiles[companion];
      const bp = b.companionProfiles[companion];
      const aScore = (ap?.score ?? 0) * 10 + (a.reviewScore ?? 0);
      const bScore = (bp?.score ?? 0) * 10 + (b.reviewScore ?? 0);
      return bScore - aScore;
    })
    .map((r) => {
      const p = r.companionProfiles[companion];
      const description = p?.highlights?.length
        ? `${r.description} [${p.highlights.join(' · ')}]`
        : r.description;
      const companionFit = (
        Object.entries(r.companionProfiles) as [CompanionType, CompanionProfile][]
      ).filter(([, cp]) => cp.fit).map(([k]) => k);

      return {
        name: r.name,
        type: r.type,
        priceRange: r.priceRange,
        description,
        companionFit,
        bookingUrl: r.bookingUrl,
        distanceToStation: r.distanceToStation,
        amenities: r.amenities,
        kidsScore: r.companionProfiles['family_young_kids']?.score,
        reviewScore: r.reviewScore,
        reviewCount: r.reviewCount,
        companionNote: p?.tip || undefined,
      } as Accommodation & { companionNote?: string };
    });
}

export function hasCityInAccommodationsDB(city: string): boolean {
  return !!accDB.destinations[city];
}
