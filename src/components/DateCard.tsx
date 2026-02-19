'use client';

import { Calendar } from 'lucide-react';
import { getRamadanDay } from '@/lib/prayer-times';
import type { DayTimings } from '@/lib/prayer-times';

interface DateCardProps {
  todayTimings: DayTimings | null;
}

export default function DateCard({ todayTimings }: DateCardProps) {
  const ramadanDay = getRamadanDay();
  const hijriDate = todayTimings?.date?.hijri;
  const gregorianDate = todayTimings?.date?.gregorian;

  return (
    <div className="glass-card mx-4 p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
            <Calendar size={20} className="text-gold" />
          </div>
          <div>
            <p className="text-lg font-bold text-text-primary">
              {hijriDate ? `${hijriDate.day} ${hijriDate.month.en} ${hijriDate.year}` : `Ramadan 1447`}
            </p>
            <p className="text-xs text-text-secondary">
              {gregorianDate
                ? `${gregorianDate.day} ${gregorianDate.month.en} ${gregorianDate.year}`
                : new Date().toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-2xl font-bold text-gold">{ramadanDay}</span>
          <span className="text-[10px] text-text-secondary">of 30</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3">
        <div className="flex justify-between text-[10px] text-text-secondary mb-1">
          <span>Day {ramadanDay}</span>
          <span>{Math.round((ramadanDay / 30) * 100)}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold to-teal transition-all duration-500"
            style={{ width: `${(ramadanDay / 30) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
