'use client';

import { useState, useEffect } from 'react';
import { Settings, MapPin, Calculator, Moon as MoonIcon, Bell } from 'lucide-react';
import Header from '@/components/Header';
import { getState, updateSettings } from '@/lib/storage';
import type { Settings as SettingsType } from '@/lib/storage';

const CALCULATION_METHODS = [
  { value: 0, label: 'Jafari / Shia Ithna-Ashari' },
  { value: 1, label: 'University of Islamic Sciences, Karachi' },
  { value: 2, label: 'Islamic Society of North America' },
  { value: 3, label: 'Muslim World League' },
  { value: 4, label: 'Umm Al-Qura University, Makkah' },
  { value: 5, label: 'Egyptian General Authority of Survey' },
  { value: 7, label: 'Institute of Geophysics, University of Tehran' },
  { value: 8, label: 'Gulf Region' },
  { value: 9, label: 'Kuwait' },
  { value: 10, label: 'Qatar' },
  { value: 11, label: 'Majlis Ugama Islam Singapura' },
  { value: 12, label: 'Union Organization Islamic de France' },
  { value: 13, label: 'Diyanet İşleri Başkanlığı, Turkey' },
  { value: 14, label: 'Spiritual Administration of Muslims of Russia' },
  { value: 15, label: 'Moonsighting Committee Worldwide' },
];

const POPULAR_CITIES = [
  { city: 'Durban', country: 'South Africa' },
  { city: 'Johannesburg', country: 'South Africa' },
  { city: 'Cape Town', country: 'South Africa' },
  { city: 'Makkah', country: 'Saudi Arabia' },
  { city: 'Madinah', country: 'Saudi Arabia' },
  { city: 'London', country: 'United Kingdom' },
  { city: 'Dubai', country: 'United Arab Emirates' },
  { city: 'Istanbul', country: 'Turkey' },
  { city: 'Kuala Lumpur', country: 'Malaysia' },
  { city: 'Jakarta', country: 'Indonesia' },
];

export default function SettingsPage() {
  const [settings, setSettings] = useState<SettingsType>({
    city: 'Durban',
    country: 'South Africa',
    method: 3,
    darkMode: true,
    notifications: false,
  });
  const [mounted, setMounted] = useState(false);
  const [customCity, setCustomCity] = useState('');
  const [customCountry, setCustomCountry] = useState('');

  useEffect(() => {
    setMounted(true);
    const state = getState();
    setSettings(state.settings);
  }, []);

  const handleCitySelect = (city: string, country: string) => {
    const updated = updateSettings({ city, country });
    setSettings(updated);
    // Clear cache to refetch prayer times
    localStorage.removeItem('ramadan-prayer-times-cache');
  };

  const handleMethodChange = (method: number) => {
    const updated = updateSettings({ method });
    setSettings(updated);
    localStorage.removeItem('ramadan-prayer-times-cache');
  };

  const handleCustomCity = () => {
    if (customCity && customCountry) {
      handleCitySelect(customCity, customCountry);
      setCustomCity('');
      setCustomCountry('');
    }
  };

  if (!mounted) return null;

  return (
    <div className="flex min-h-screen flex-col pb-24">
      <Header />

      <div className="px-4 space-y-4">
        {/* City selection */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} className="text-gold" />
            <h2 className="text-sm font-semibold text-text-primary">City</h2>
          </div>
          <p className="text-xs text-text-secondary mb-3">
            Current: <span className="text-gold font-medium">{settings.city}, {settings.country}</span>
          </p>
          <div className="flex flex-wrap gap-2 mb-3">
            {POPULAR_CITIES.map(({ city, country }) => (
              <button
                key={`${city}-${country}`}
                onClick={() => handleCitySelect(city, country)}
                className={`rounded-lg px-3 py-1.5 text-xs transition-all ${
                  settings.city === city && settings.country === country
                    ? 'bg-gold/15 text-gold ring-1 ring-gold/30'
                    : 'bg-background text-text-secondary hover:text-text-primary'
                }`}
              >
                {city}
              </button>
            ))}
          </div>
          {/* Custom city */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="City"
              value={customCity}
              onChange={(e) => setCustomCity(e.target.value)}
              className="w-1/3 rounded-lg bg-background px-2.5 py-2 text-xs text-text-primary placeholder:text-text-secondary/50 outline-none ring-1 ring-border focus:ring-gold/50"
            />
            <input
              type="text"
              placeholder="Country"
              value={customCountry}
              onChange={(e) => setCustomCountry(e.target.value)}
              className="w-1/3 rounded-lg bg-background px-2.5 py-2 text-xs text-text-primary placeholder:text-text-secondary/50 outline-none ring-1 ring-border focus:ring-gold/50"
            />
            <button
              onClick={handleCustomCity}
              className="rounded-lg bg-gold/15 px-3 py-2 text-xs font-medium text-gold hover:bg-gold/25 transition-all"
            >
              Set
            </button>
          </div>
        </div>

        {/* Calculation method */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calculator size={18} className="text-teal" />
            <h2 className="text-sm font-semibold text-text-primary">Calculation Method</h2>
          </div>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2">
            {CALCULATION_METHODS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => handleMethodChange(value)}
                className={`w-full rounded-lg px-3 py-2 text-left text-xs transition-all ${
                  settings.method === value
                    ? 'bg-teal/15 text-teal ring-1 ring-teal/30'
                    : 'bg-background text-text-secondary hover:text-text-primary'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-3">
            <Settings size={18} className="text-gold" />
            <h2 className="text-sm font-semibold text-text-primary">Preferences</h2>
          </div>
          <div className="space-y-3">
            {/* Dark mode is always on for this design */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MoonIcon size={16} className="text-text-secondary" />
                <span className="text-sm text-text-primary">Dark Mode</span>
              </div>
              <div className="flex h-6 w-11 items-center rounded-full bg-gold/20 px-0.5">
                <div className="h-5 w-5 rounded-full bg-gold shadow-sm translate-x-5 transition-transform" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell size={16} className="text-text-secondary" />
                <span className="text-sm text-text-primary">Notifications</span>
              </div>
              <button
                onClick={() => {
                  const updated = updateSettings({ notifications: !settings.notifications });
                  setSettings(updated);
                }}
                className={`flex h-6 w-11 items-center rounded-full px-0.5 transition-colors ${
                  settings.notifications ? 'bg-teal/20' : 'bg-border'
                }`}
              >
                <div
                  className={`h-5 w-5 rounded-full shadow-sm transition-all ${
                    settings.notifications ? 'bg-teal translate-x-5' : 'bg-text-secondary translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* App info */}
        <div className="glass-card p-4 text-center">
          <p className="text-xs text-text-secondary">
            Ramadan Companion 2026
          </p>
          <p className="mt-1 text-[10px] text-text-secondary/60">
            Prayer times via Aladhan API
          </p>
        </div>
      </div>
    </div>
  );
}
