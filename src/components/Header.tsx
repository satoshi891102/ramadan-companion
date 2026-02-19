'use client';

import { Moon } from 'lucide-react';

export default function Header() {
  return (
    <header className="relative overflow-hidden px-4 pb-4 pt-6">
      {/* Decorative stars */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[10%] top-[20%] h-1 w-1 rounded-full bg-gold/40" style={{ animation: 'twinkle 3s ease-in-out infinite' }} />
        <div className="absolute left-[30%] top-[40%] h-0.5 w-0.5 rounded-full bg-teal/40" style={{ animation: 'twinkle 4s ease-in-out infinite 1s' }} />
        <div className="absolute right-[20%] top-[25%] h-1 w-1 rounded-full bg-gold/30" style={{ animation: 'twinkle 3.5s ease-in-out infinite 0.5s' }} />
        <div className="absolute right-[35%] top-[50%] h-0.5 w-0.5 rounded-full bg-teal/30" style={{ animation: 'twinkle 5s ease-in-out infinite 2s' }} />
      </div>
      
      <div className="relative flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/10">
          <Moon size={22} className="text-gold" fill="currentColor" />
        </div>
        <div>
          <h1 className="text-gradient-gold text-lg font-bold tracking-tight">
            Ramadan Companion
          </h1>
          <p className="text-xs text-text-secondary">1447 AH</p>
        </div>
      </div>
    </header>
  );
}
