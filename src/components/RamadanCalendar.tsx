'use client';

import { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { getState, toggleFasted } from '@/lib/storage';
import { getRamadanDay } from '@/lib/prayer-times';

export default function RamadanCalendar() {
  const [daysFasted, setDaysFasted] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const ramadanDay = getRamadanDay();

  useEffect(() => {
    setMounted(true);
    setDaysFasted(getState().daysFasted);
  }, []);

  const handleToggle = (day: number) => {
    if (day > ramadanDay) return; // can't mark future days
    const updated = toggleFasted(day);
    setDaysFasted(updated);
  };

  if (!mounted) return null;

  const fastedCount = daysFasted.length;
  const progressPercent = Math.round((fastedCount / 30) * 100);

  return (
    <div className="glass-card mx-4 p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-sm font-semibold text-text-primary">Ramadan Progress</h2>
          <p className="text-[10px] text-text-secondary">Day {ramadanDay} of 30 • {fastedCount} fasted</p>
        </div>
        <span className="text-lg font-bold text-gold">{progressPercent}%</span>
      </div>

      {/* Progress bar */}
      <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-background">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold to-teal transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 30-day grid */}
      <div className="grid grid-cols-10 gap-1.5">
        {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
          const isFasted = daysFasted.includes(day);
          const isToday = day === ramadanDay;
          const isFuture = day > ramadanDay;

          return (
            <button
              key={day}
              onClick={() => handleToggle(day)}
              disabled={isFuture}
              className={`relative flex h-8 w-full items-center justify-center rounded-lg text-[10px] font-semibold transition-all duration-200 ${
                isFasted
                  ? 'bg-gold/20 text-gold ring-1 ring-gold/30'
                  : isToday
                  ? 'bg-teal/15 text-teal ring-1 ring-teal/40 animate-gentle-pulse'
                  : isFuture
                  ? 'bg-background/30 text-text-secondary/30'
                  : 'bg-surface text-text-secondary hover:bg-elevated'
              }`}
            >
              {isFasted ? <Check size={12} /> : day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center gap-4 text-[9px] text-text-secondary">
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded bg-gold/20 ring-1 ring-gold/30" />
          <span>Fasted</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded bg-teal/15 ring-1 ring-teal/40" />
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2.5 w-2.5 rounded bg-surface" />
          <span>Tap to mark</span>
        </div>
      </div>
    </div>
  );
}
