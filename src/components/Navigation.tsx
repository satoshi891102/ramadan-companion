'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, HandHeart, Target, Repeat } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: 'Home' },
  { href: '/quran', icon: BookOpen, label: 'Quran' },
  { href: '/tasbeeh', icon: Repeat, label: 'Tasbeeh' },
  { href: '/duas', icon: HandHeart, label: 'Duas' },
  { href: '/goals', icon: Target, label: 'Goals' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/90 backdrop-blur-xl safe-bottom">
      <div className="mx-auto flex max-w-md items-center justify-around px-2 py-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition-all duration-200 ${
                isActive
                  ? 'text-gold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-gold' : ''}`}>
                {label}
              </span>
              {isActive && (
                <span className="absolute -bottom-0.5 h-0.5 w-6 rounded-full bg-gold" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
