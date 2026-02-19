export interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  [key: string]: string;
}

export interface DayTimings {
  timings: PrayerTimes;
  date: {
    readable: string;
    hijri: {
      day: string;
      month: { en: string; ar: string; number: number };
      year: string;
    };
    gregorian: {
      day: string;
      month: { en: string; number: number };
      year: string;
    };
  };
}

const CACHE_KEY = 'ramadan-prayer-times-cache';

export async function fetchPrayerTimes(
  city: string = 'Durban',
  country: string = 'South Africa',
  method: number = 3
): Promise<DayTimings[]> {
  // Check cache first
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp, cacheCity } = JSON.parse(cached);
        const hoursSinceCached = (Date.now() - timestamp) / (1000 * 60 * 60);
        if (hoursSinceCached < 24 && cacheCity === city) {
          return data;
        }
      }
    } catch { /* ignore cache errors */ }
  }

  // Fetch both Feb and March 2026 for full Ramadan coverage
  const results: DayTimings[] = [];

  for (const month of [2, 3]) {
    try {
      const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}&month=${month}&year=2026`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const json = await res.json();
      if (json.data) {
        results.push(...json.data);
      }
    } catch (err) {
      console.error(`Failed to fetch prayer times for month ${month}:`, err);
    }
  }

  // Cache results
  if (typeof window !== 'undefined' && results.length > 0) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({
        data: results,
        timestamp: Date.now(),
        cacheCity: city,
      }));
    } catch { /* ignore storage errors */ }
  }

  return results;
}

export function getTodayTimings(allTimings: DayTimings[]): DayTimings | null {
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1; // 1-indexed

  return allTimings.find((t) => {
    const gDay = parseInt(t.date.gregorian.day);
    const gMonth = t.date.gregorian.month.number;
    return gDay === day && gMonth === month;
  }) || null;
}

export function getRamadanDay(): number {
  const now = new Date();
  const start = new Date('2026-02-19T00:00:00+02:00');
  const diffMs = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(1, Math.min(30, diffDays + 1));
}

export function parseTime(timeStr: string): Date {
  // Prayer times come as "HH:MM (SAST)" or "HH:MM"
  const clean = timeStr.replace(/\s*\(.*\)/, '').trim();
  const [hours, minutes] = clean.split(':').map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
}

export function getTimeUntil(targetTime: Date): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  let diff = targetTime.getTime() - now.getTime();
  if (diff < 0) diff += 24 * 60 * 60 * 1000; // next day
  
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return { hours, minutes, seconds };
}

export function isBeforeFajr(fajrTime: string): boolean {
  const now = new Date();
  const fajr = parseTime(fajrTime);
  return now < fajr;
}

export function isAfterMaghrib(maghribTime: string): boolean {
  const now = new Date();
  const maghrib = parseTime(maghribTime);
  return now >= maghrib;
}
