'use client';

import { useState, useEffect } from 'react';
import { Sunrise, Sunset } from 'lucide-react';
import { parseTime, getTimeUntil } from '@/lib/prayer-times';

interface CountdownTimerProps {
  fajrTime: string;
  maghribTime: string;
}

export default function CountdownTimer({ fajrTime, maghribTime }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isFasting, setIsFasting] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      const now = new Date();
      const fajr = parseTime(fajrTime);
      const maghrib = parseTime(maghribTime);

      if (now < fajr) {
        // Before Fajr — countdown to Sehri ending (Fajr)
        setIsFasting(false);
        setTimeLeft(getTimeUntil(fajr));
      } else if (now < maghrib) {
        // Between Fajr and Maghrib — fasting, countdown to Iftar
        setIsFasting(true);
        setTimeLeft(getTimeUntil(maghrib));
      } else {
        // After Maghrib — countdown to next Fajr (tomorrow's sehri)
        setIsFasting(false);
        const tomorrowFajr = new Date(fajr);
        tomorrowFajr.setDate(tomorrowFajr.getDate() + 1);
        setTimeLeft(getTimeUntil(tomorrowFajr));
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [fajrTime, maghribTime]);

  if (!mounted) {
    return (
      <div className="glass-card gold-glow mx-4 p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-48 animate-pulse rounded bg-elevated" />
          <div className="h-16 w-64 animate-pulse rounded bg-elevated" />
        </div>
      </div>
    );
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  return (
    <div className="glass-card gold-glow mx-4 overflow-hidden p-6">
      {/* Gradient accent on top */}
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="flex flex-col items-center gap-4">
        {/* Label */}
        <div className="flex items-center gap-2">
          {isFasting ? (
            <Sunset size={18} className="text-gold" />
          ) : (
            <Sunrise size={18} className="text-teal" />
          )}
          <span className={`text-sm font-medium ${isFasting ? 'text-gold' : 'text-teal'}`}>
            {isFasting ? 'Time until Iftar' : 'Time until Sehri ends'}
          </span>
        </div>

        {/* Timer */}
        <div className="flex items-baseline gap-1">
          <div className="flex items-baseline gap-1">
            <span className="countdown-glow text-5xl font-bold tabular-nums text-gold">
              {pad(timeLeft.hours)}
            </span>
            <span className="text-2xl font-light text-gold/50 animate-gentle-pulse">:</span>
            <span className="countdown-glow text-5xl font-bold tabular-nums text-gold">
              {pad(timeLeft.minutes)}
            </span>
            <span className="text-2xl font-light text-gold/50 animate-gentle-pulse">:</span>
            <span className="countdown-glow text-5xl font-bold tabular-nums text-gold">
              {pad(timeLeft.seconds)}
            </span>
          </div>
        </div>

        {/* Sub labels */}
        <div className="flex gap-8 text-xs text-text-secondary">
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </div>

        {/* Prayer times quick ref */}
        <div className="mt-2 flex w-full justify-between rounded-xl bg-background/50 px-4 py-3">
          <div className="flex flex-col items-center gap-1">
            <Sunrise size={14} className="text-teal" />
            <span className="text-[10px] text-text-secondary">Sehri ends</span>
            <span className="text-xs font-semibold text-text-primary">{fajrTime.replace(/\s*\(.*\)/, '')}</span>
          </div>
          <div className="h-8 w-px bg-border" />
          <div className="flex flex-col items-center gap-1">
            <Sunset size={14} className="text-gold" />
            <span className="text-[10px] text-text-secondary">Iftar</span>
            <span className="text-xs font-semibold text-text-primary">{maghribTime.replace(/\s*\(.*\)/, '')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
