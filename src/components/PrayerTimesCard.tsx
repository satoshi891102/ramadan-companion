'use client';

import { Clock, Sun, Sunset, Moon, CloudSun, SunDim } from 'lucide-react';
import type { PrayerTimes } from '@/lib/prayer-times';

interface PrayerTimesCardProps {
  timings: PrayerTimes;
}

const prayerConfig = [
  { key: 'Fajr', label: 'Fajr', icon: SunDim, color: 'text-teal' },
  { key: 'Sunrise', label: 'Sunrise', icon: Sun, color: 'text-gold' },
  { key: 'Dhuhr', label: 'Dhuhr', icon: CloudSun, color: 'text-gold' },
  { key: 'Asr', label: 'Asr', icon: Sunset, color: 'text-gold' },
  { key: 'Maghrib', label: 'Maghrib', icon: Moon, color: 'text-teal' },
  { key: 'Isha', label: 'Isha', icon: Clock, color: 'text-teal' },
];

export default function PrayerTimesCard({ timings }: PrayerTimesCardProps) {
  // Determine current/next prayer
  const now = new Date();
  let currentPrayer = '';
  
  for (let i = prayerConfig.length - 1; i >= 0; i--) {
    const timeStr = timings[prayerConfig[i].key];
    if (timeStr) {
      const clean = timeStr.replace(/\s*\(.*\)/, '').trim();
      const [h, m] = clean.split(':').map(Number);
      const prayerDate = new Date();
      prayerDate.setHours(h, m, 0, 0);
      if (now >= prayerDate) {
        currentPrayer = prayerConfig[i].key;
        break;
      }
    }
  }

  return (
    <div className="glass-card mx-4 p-4">
      <h3 className="mb-3 text-sm font-semibold text-text-secondary">
        {"Today's Prayer Times"}
      </h3>
      <div className="grid grid-cols-3 gap-2">
        {prayerConfig.map(({ key, label, icon: Icon, color }) => {
          const time = timings[key]?.replace(/\s*\(.*\)/, '').trim() || '--:--';
          const isActive = key === currentPrayer;

          return (
            <div
              key={key}
              className={`flex flex-col items-center gap-1.5 rounded-xl p-3 transition-all ${
                isActive
                  ? 'bg-gold/10 ring-1 ring-gold/30'
                  : 'bg-background/40'
              }`}
            >
              <Icon size={16} className={isActive ? 'text-gold' : color} />
              <span className="text-[10px] font-medium text-text-secondary">{label}</span>
              <span className={`text-sm font-bold ${isActive ? 'text-gold' : 'text-text-primary'}`}>
                {time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
