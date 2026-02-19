'use client';

import { useState } from 'react';
import { HandHeart, Moon, Sparkles, Sun, Clock } from 'lucide-react';
import Header from '@/components/Header';
import { DUAS } from '@/lib/constants';
import { getRamadanDay } from '@/lib/prayer-times';

type DuaCategory = 'essential' | 'night' | 'special';

const categories: { id: DuaCategory; label: string; icon: typeof HandHeart }[] = [
  { id: 'essential', label: 'Essential', icon: HandHeart },
  { id: 'night', label: 'Night Thirds', icon: Moon },
  { id: 'special', label: 'Special', icon: Sparkles },
];

interface DuaCardProps {
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  icon: typeof HandHeart;
  highlight?: boolean;
}

function DuaCard({ title, arabic, transliteration, translation, icon: Icon, highlight }: DuaCardProps) {
  return (
    <div className={`glass-card overflow-hidden p-4 ${highlight ? 'gold-glow ring-1 ring-gold/20' : ''}`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${highlight ? 'bg-gold/15' : 'bg-teal/10'}`}>
          <Icon size={16} className={highlight ? 'text-gold' : 'text-teal'} />
        </div>
        <h3 className="text-sm font-semibold text-text-primary">{title}</h3>
      </div>
      
      <div className="space-y-3">
        <p className="arabic-text text-xl leading-loose text-gold">{arabic}</p>
        <div className="islamic-pattern-border" />
        <p className="text-xs italic text-teal">{transliteration}</p>
        <p className="text-sm text-text-secondary leading-relaxed">{translation}</p>
      </div>
    </div>
  );
}

export default function DuasPage() {
  const [activeCategory, setActiveCategory] = useState<DuaCategory>('essential');
  const ramadanDay = getRamadanDay();
  const isLastTenNights = ramadanDay >= 21;

  const essentialDuas = [
    { ...DUAS.iftar, icon: Sun },
    { ...DUAS.sehri, icon: Clock },
    { ...DUAS.opening_fast, icon: HandHeart },
    { ...DUAS.quran_completion, icon: Sparkles },
  ];

  const nightDuas = [
    { ...DUAS.first_third, icon: Moon },
    { ...DUAS.second_third, icon: Moon },
    { ...DUAS.last_third, icon: Moon },
  ];

  const specialDuas = [
    { ...DUAS.laylatul_qadr, icon: Sparkles },
  ];

  return (
    <div className="flex min-h-screen flex-col pb-24">
      <Header />

      <div className="px-4">
        {/* Last 10 nights banner */}
        {isLastTenNights && (
          <div className="glass-card gold-glow mb-4 overflow-hidden p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-gold" />
              <span className="text-sm font-bold text-gold">Last 10 Nights of Ramadan</span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              These are the most blessed nights of Ramadan. Seek Laylatul Qadr — a night better than a thousand months.
              Increase your worship, dua, and recitation of the Quran.
            </p>
            <div className="mt-3 flex gap-2">
              {[21, 23, 25, 27, 29].map((night) => (
                <div
                  key={night}
                  className={`flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold ${
                    ramadanDay === night
                      ? 'bg-gold/20 text-gold ring-1 ring-gold/40'
                      : 'bg-background text-text-secondary'
                  }`}
                >
                  {night}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category tabs */}
        <div className="mb-4 flex gap-2">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                activeCategory === id
                  ? 'bg-gold/15 text-gold ring-1 ring-gold/30'
                  : 'bg-surface text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Duas list */}
        <div className="space-y-3">
          {activeCategory === 'essential' &&
            essentialDuas.map((dua) => (
              <DuaCard key={dua.title} {...dua} />
            ))}
          {activeCategory === 'night' &&
            nightDuas.map((dua) => (
              <DuaCard key={dua.title} {...dua} />
            ))}
          {activeCategory === 'special' && (
            <>
              {specialDuas.map((dua) => (
                <DuaCard key={dua.title} {...dua} highlight />
              ))}
              <div className="glass-card p-4">
                <h3 className="text-sm font-semibold text-text-primary mb-2">About Laylatul Qadr</h3>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Laylatul Qadr (The Night of Power) is better than a thousand months of worship. 
                  It falls on one of the odd nights in the last 10 nights of Ramadan (21st, 23rd, 25th, 27th, or 29th).
                  The Prophet (peace be upon him) used to strive harder in worship during these nights.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
