'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import CountdownTimer from '@/components/CountdownTimer';
import PrayerTimesCard from '@/components/PrayerTimesCard';
import DateCard from '@/components/DateCard';
import QuickStats from '@/components/QuickStats';
import { fetchPrayerTimes, getTodayTimings } from '@/lib/prayer-times';
import type { DayTimings, PrayerTimes } from '@/lib/prayer-times';
import { getState } from '@/lib/storage';

export default function HomePage() {
  const [todayTimings, setTodayTimings] = useState<DayTimings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const state = getState();
      const allTimings = await fetchPrayerTimes(
        state.settings.city,
        state.settings.country,
        state.settings.method
      );
      const today = getTodayTimings(allTimings);
      setTodayTimings(today);
      setLoading(false);
    }
    load();
  }, []);

  const timings: PrayerTimes = todayTimings?.timings || {
    Fajr: '04:42',
    Sunrise: '05:58',
    Dhuhr: '12:18',
    Asr: '15:48',
    Maghrib: '18:35',
    Isha: '19:51',
  };

  return (
    <div className="flex min-h-screen flex-col pb-24">
      <Header />
      <div className="flex flex-col gap-4">
        {loading ? (
          <div className="glass-card gold-glow mx-4 flex items-center justify-center p-12">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
              <span className="text-sm text-text-secondary">Loading prayer times...</span>
            </div>
          </div>
        ) : (
          <>
            <CountdownTimer fajrTime={timings.Fajr} maghribTime={timings.Maghrib} />
            <DateCard todayTimings={todayTimings} />
            <QuickStats />
            <PrayerTimesCard timings={timings} />
          </>
        )}
      </div>
    </div>
  );
}
