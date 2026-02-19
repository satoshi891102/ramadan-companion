'use client';

import { useState, useEffect } from 'react';
import { Flame, BookOpen, CheckCircle } from 'lucide-react';
import { getState } from '@/lib/storage';
import { getRamadanDay } from '@/lib/prayer-times';

export default function QuickStats() {
  const [stats, setStats] = useState({ daysFasted: 0, juzRead: 0, streak: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const state = getState();
    const ramadanDay = getRamadanDay();

    // Calculate streak
    let streak = 0;
    for (let d = ramadanDay; d >= 1; d--) {
      if (state.daysFasted.includes(d)) {
        streak++;
      } else {
        break;
      }
    }

    setStats({
      daysFasted: state.daysFasted.length,
      juzRead: state.completedJuz.length,
      streak,
    });
  }, []);

  if (!mounted) return null;

  const items = [
    { icon: CheckCircle, label: 'Days Fasted', value: stats.daysFasted, color: 'text-teal', bg: 'bg-teal/10' },
    { icon: BookOpen, label: 'Juz Read', value: stats.juzRead, color: 'text-gold', bg: 'bg-gold/10' },
    { icon: Flame, label: 'Streak', value: stats.streak, color: 'text-gold', bg: 'bg-gold/10' },
  ];

  return (
    <div className="mx-4 grid grid-cols-3 gap-2">
      {items.map(({ icon: Icon, label, value, color, bg }) => (
        <div key={label} className="glass-card flex flex-col items-center gap-1.5 p-3">
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${bg}`}>
            <Icon size={16} className={color} />
          </div>
          <span className="text-xl font-bold text-text-primary">{value}</span>
          <span className="text-[10px] text-text-secondary">{label}</span>
        </div>
      ))}
    </div>
  );
}
