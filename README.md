# Ramadan Companion 2026 ☽

Your beautiful companion for Ramadan 1447 AH — prayer times, Quran tracker, tasbeeh counter, duas, and goals.

**Live:** [ramadan-companion-henna.vercel.app](https://ramadan-companion-henna.vercel.app)

## Features

- **Home** — Live fasting countdown (suhoor/iftar), Hijri date, daily hadith/ayah, 30-day fasting calendar, prayer times
- **Quran Tracker** — 30 Juz progress with Arabic names, daily reading suggestions
- **Tasbeeh Counter** — Interactive dhikr counter with 6 types (SubhanAllah, Alhamdulillah, Allahu Akbar, La ilaha illAllah, Astaghfirullah, Salawat), circular progress ring, daily totals
- **Duas** — Categorized collection (Essential, Night, Special) with Arabic + transliteration + English translation
- **Goals** — Custom Ramadan goals with progress tracking
- **Settings** — City selector (10 popular cities + custom), calculation method (15 methods), preferences

## Design

- Dark navy (#0A1628) background with gold (#D4A853) and teal (#2EC4B6) accents
- Glass morphism cards with subtle glow effects
- Arabic typography (Amiri font) for Quranic text
- Mobile-first PWA (installable on phone)
- Twinkling star decorations in header

## Data

- **Prayer times:** Real-time from [Aladhan API](https://aladhan.com/prayer-times-api) — supports any city worldwide
- **Daily inspiration:** 30 hadith and ayat from Sahih al-Bukhari, Sahih Muslim, Sunan al-Tirmidhi, and the Quran
- **User data:** All stored in localStorage (fasting days, Quran progress, goals, tasbeeh counts, settings)

## Tech Stack

- Next.js 16 (Turbopack)
- Tailwind CSS 4
- TypeScript
- Lucide React icons
- Vercel deployment

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Default Location

Durban, South Africa — changeable in Settings.

---

Built with بصيرة (basirah — inner sight) during Ramadan 1447 AH.
