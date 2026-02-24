'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';

const DHIKR_LIST = [
  {
    id: 'subhanallah',
    arabic: 'سُبْحَانَ ٱللَّٰهِ',
    transliteration: 'SubhanAllah',
    meaning: 'Glory be to Allah',
    target: 33,
    color: 'gold',
  },
  {
    id: 'alhamdulillah',
    arabic: 'ٱلْحَمْدُ لِلَّٰهِ',
    transliteration: 'Alhamdulillah',
    meaning: 'All praise is due to Allah',
    target: 33,
    color: 'teal',
  },
  {
    id: 'allahuakbar',
    arabic: 'ٱللَّٰهُ أَكْبَرُ',
    transliteration: 'Allahu Akbar',
    meaning: 'Allah is the Greatest',
    target: 34,
    color: 'gold',
  },
  {
    id: 'lailaha',
    arabic: 'لَا إِلَٰهَ إِلَّا ٱللَّٰهُ',
    transliteration: 'La ilaha illAllah',
    meaning: 'There is no deity except Allah',
    target: 100,
    color: 'teal',
  },
  {
    id: 'istighfar',
    arabic: 'أَسْتَغْفِرُ ٱللَّٰهَ',
    transliteration: 'Astaghfirullah',
    meaning: 'I seek forgiveness from Allah',
    target: 100,
    color: 'gold',
  },
  {
    id: 'salawat',
    arabic: 'اللَّهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ وَآلِ مُحَمَّدٍ',
    transliteration: 'Allahumma salli ala Muhammad wa ali Muhammad',
    meaning: 'O Allah, send blessings upon Muhammad and the family of Muhammad',
    target: 100,
    color: 'teal',
  },
];

const STORAGE_KEY = 'ramadan-tasbeeh-2026';

function getStoredCounts(): Record<string, number> {
  if (typeof window === 'undefined') return {};
  try {
    const today = new Date().toISOString().slice(0, 10);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    if (parsed.date !== today) return {};
    return parsed.counts || {};
  } catch {
    return {};
  }
}

function saveCount(id: string, count: number) {
  if (typeof window === 'undefined') return;
  const today = new Date().toISOString().slice(0, 10);
  const existing = getStoredCounts();
  existing[id] = count;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, counts: existing }));
}

export default function TasbeehPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [mounted, setMounted] = useState(false);
  const [ripple, setRipple] = useState(false);
  const [completed, setCompleted] = useState(false);
  const tapRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
    setCounts(getStoredCounts());
  }, []);

  const dhikr = DHIKR_LIST[activeIndex];
  const count = counts[dhikr.id] || 0;
  const progress = Math.min((count / dhikr.target) * 100, 100);
  const isComplete = count >= dhikr.target;

  const handleTap = useCallback(() => {
    const newCount = count + 1;
    const newCounts = { ...counts, [dhikr.id]: newCount };
    setCounts(newCounts);
    saveCount(dhikr.id, newCount);

    setRipple(true);
    setTimeout(() => setRipple(false), 300);

    if (newCount === dhikr.target) {
      setCompleted(true);
      setTimeout(() => setCompleted(false), 2000);
    }
  }, [count, counts, dhikr]);

  const handleReset = () => {
    const newCounts = { ...counts, [dhikr.id]: 0 };
    setCounts(newCounts);
    saveCount(dhikr.id, 0);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? DHIKR_LIST.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === DHIKR_LIST.length - 1 ? 0 : prev + 1));
  };

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        handleTap();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      } else if (e.code === 'ArrowRight') {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleTap]);

  if (!mounted) return null;

  const totalToday = Object.values(counts).reduce((a, b) => a + b, 0);
  const accentClass = dhikr.color === 'gold' ? 'text-gold' : 'text-teal';
  const bgAccent = dhikr.color === 'gold' ? 'bg-gold' : 'bg-teal';
  const bgAccentSoft = dhikr.color === 'gold' ? 'bg-gold/15' : 'bg-teal/15';
  const ringAccent = dhikr.color === 'gold' ? 'ring-gold/30' : 'ring-teal/30';
  const glowClass = dhikr.color === 'gold' ? 'gold-glow' : 'teal-glow';

  return (
    <div className="flex min-h-screen flex-col pb-24">
      <Header />

      <div className="flex flex-1 flex-col items-center px-4">
        {/* Dhikr selector */}
        <div className="mb-6 flex w-full items-center justify-between">
          <button
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-text-secondary hover:text-text-primary transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="text-center">
            <p className="text-xs text-text-secondary">{activeIndex + 1} / {DHIKR_LIST.length}</p>
            <p className={`text-sm font-semibold ${accentClass}`}>{dhikr.transliteration}</p>
          </div>
          <button
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-text-secondary hover:text-text-primary transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Arabic text */}
        <div className="mb-2 text-center">
          <p className={`arabic-text text-3xl leading-loose ${accentClass}`}>
            {dhikr.arabic}
          </p>
          <p className="mt-1 text-xs text-text-secondary">{dhikr.meaning}</p>
        </div>

        {/* Circular progress + tap button */}
        <div className="relative my-6 flex items-center justify-center">
          {/* SVG ring */}
          <svg className="absolute" width="220" height="220" viewBox="0 0 220 220">
            <circle
              cx="110" cy="110" r="100"
              fill="none"
              stroke="currentColor"
              className="text-surface"
              strokeWidth="4"
            />
            <circle
              cx="110" cy="110" r="100"
              fill="none"
              stroke="currentColor"
              className={accentClass}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 100}`}
              strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
              style={{
                transition: 'stroke-dashoffset 0.3s ease',
                transform: 'rotate(-90deg)',
                transformOrigin: '50% 50%',
              }}
            />
          </svg>

          {/* Tap area */}
          <button
            ref={tapRef}
            onClick={handleTap}
            className={`relative flex h-44 w-44 flex-col items-center justify-center rounded-full transition-all duration-150 active:scale-95 ${
              isComplete ? `${bgAccentSoft} ring-2 ${ringAccent}` : 'bg-surface hover:bg-elevated'
            } ${ripple ? 'scale-95' : ''}`}
          >
            {/* Ripple effect */}
            {ripple && (
              <div
                className={`absolute inset-0 rounded-full ${bgAccent} animate-ping opacity-20`}
              />
            )}

            <span className={`text-5xl font-bold tabular-nums ${accentClass}`}>
              {count}
            </span>
            <span className="mt-1 text-xs text-text-secondary">
              / {dhikr.target}
            </span>

            {/* Completion check */}
            {completed && (
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/80 animate-in fade-in">
                <div className={`text-4xl ${accentClass}`}>✓</div>
              </div>
            )}
          </button>
        </div>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="flex items-center gap-2 rounded-xl bg-surface px-4 py-2 text-xs text-text-secondary hover:text-text-primary transition-colors"
        >
          <RotateCcw size={14} />
          Reset
        </button>

        {/* Daily total */}
        <div className={`glass-card ${glowClass} mt-6 w-full p-4`}>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">{"Today's Total"}</span>
            <span className={`text-xl font-bold ${accentClass}`}>{totalToday}</span>
          </div>
          <div className="mt-3 flex gap-1.5 flex-wrap">
            {DHIKR_LIST.map((d, i) => {
              const c = counts[d.id] || 0;
              const done = c >= d.target;
              return (
                <button
                  key={d.id}
                  onClick={() => setActiveIndex(i)}
                  className={`rounded-lg px-2 py-1 text-[10px] font-medium transition-all ${
                    i === activeIndex
                      ? `${bgAccentSoft} ${accentClass} ring-1 ${ringAccent}`
                      : done
                      ? 'bg-teal/10 text-teal'
                      : 'bg-surface text-text-secondary'
                  }`}
                >
                  {d.transliteration.split(' ')[0]} {done ? '✓' : `${c}`}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
