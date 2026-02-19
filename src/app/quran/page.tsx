'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Check, Star } from 'lucide-react';
import Header from '@/components/Header';
import { JUZ_NAMES } from '@/lib/constants';
import { getState, toggleJuz } from '@/lib/storage';
import { getRamadanDay } from '@/lib/prayer-times';

export default function QuranPage() {
  const [completedJuz, setCompletedJuz] = useState<number[]>([]);
  const [mounted, setMounted] = useState(false);
  const ramadanDay = getRamadanDay();

  useEffect(() => {
    setMounted(true);
    setCompletedJuz(getState().completedJuz);
  }, []);

  const handleToggle = (juzNumber: number) => {
    const updated = toggleJuz(juzNumber);
    setCompletedJuz(updated);
  };

  const completionPercent = Math.round((completedJuz.length / 30) * 100);

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col pb-24">
      <Header />

      <div className="px-4">
        {/* Progress section */}
        <div className="glass-card mb-4 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <BookOpen size={18} className="text-gold" />
              <h2 className="text-sm font-semibold text-text-primary">Quran Progress</h2>
            </div>
            <span className="text-2xl font-bold text-gold">{completionPercent}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-background">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold to-teal transition-all duration-500"
              style={{ width: `${completionPercent}%` }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] text-text-secondary">
            <span>{completedJuz.length} of 30 Juz completed</span>
            <span>{30 - completedJuz.length} remaining</span>
          </div>
        </div>

        {/* Suggested Juz */}
        {!completedJuz.includes(ramadanDay) && ramadanDay <= 30 && (
          <div className="glass-card-teal teal-glow mb-4 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star size={16} className="text-teal" />
              <span className="text-xs font-semibold text-teal">{"Today's Suggested Juz"}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-text-primary">
                  Juz {ramadanDay} — {JUZ_NAMES[ramadanDay - 1].transliteration}
                </p>
                <p className="arabic-text mt-1 text-lg text-gold">{JUZ_NAMES[ramadanDay - 1].arabic}</p>
              </div>
              <button
                onClick={() => handleToggle(ramadanDay)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal/20 text-teal transition-all hover:bg-teal/30"
              >
                <Check size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Juz Grid */}
        <div className="grid grid-cols-2 gap-2">
          {JUZ_NAMES.map((juz) => {
            const isCompleted = completedJuz.includes(juz.number);
            const isSuggested = juz.number === ramadanDay;

            return (
              <button
                key={juz.number}
                onClick={() => handleToggle(juz.number)}
                className={`relative overflow-hidden rounded-xl p-3 text-left transition-all duration-200 ${
                  isCompleted
                    ? 'bg-gold/15 ring-1 ring-gold/30'
                    : 'bg-surface hover:bg-elevated'
                } ${isSuggested && !isCompleted ? 'ring-1 ring-teal/30' : ''}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-background/50 text-xs font-bold text-text-secondary">
                    {juz.number}
                  </div>
                  {isCompleted && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/20">
                      <Check size={14} className="text-gold" />
                    </div>
                  )}
                </div>
                <p className="arabic-text mt-2 text-base text-text-primary">{juz.arabic}</p>
                <p className="mt-0.5 text-[10px] text-text-secondary">{juz.transliteration}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
