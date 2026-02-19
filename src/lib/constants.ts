// Ramadan 2026 dates
export const RAMADAN_START = new Date('2026-02-19T00:00:00+02:00'); // 1 Ramadan 1447
export const RAMADAN_END = new Date('2026-03-21T00:00:00+02:00'); // 30 days

export const DEFAULT_CITY = 'Durban';
export const DEFAULT_COUNTRY = 'South Africa';
export const DEFAULT_METHOD = 3; // Muslim World League

// Juz names in Arabic
export const JUZ_NAMES: { number: number; arabic: string; transliteration: string }[] = [
  { number: 1, arabic: 'آلم', transliteration: 'Alif Lam Meem' },
  { number: 2, arabic: 'سَيَقُولُ', transliteration: 'Sayaqool' },
  { number: 3, arabic: 'تِلْكَ الرُّسُلُ', transliteration: 'Tilkal Rusul' },
  { number: 4, arabic: 'لَنْ تَنَالُوا', transliteration: 'Lan Tanaloo' },
  { number: 5, arabic: 'وَالْمُحْصَنَاتُ', transliteration: 'Wal Muhsanat' },
  { number: 6, arabic: 'لَا يُحِبُّ اللَّهُ', transliteration: 'La Yuhibbullah' },
  { number: 7, arabic: 'وَإِذَا سَمِعُوا', transliteration: 'Wa Iza Sami\'oo' },
  { number: 8, arabic: 'وَلَوْ أَنَّنَا', transliteration: 'Wa Lau Annana' },
  { number: 9, arabic: 'قَالَ الْمَلَأُ', transliteration: 'Qalal Malau' },
  { number: 10, arabic: 'وَاعْلَمُوا', transliteration: 'Wa A\'lamoo' },
  { number: 11, arabic: 'يَعْتَذِرُونَ', transliteration: 'Ya\'taziroon' },
  { number: 12, arabic: 'وَمَا مِنْ دَابَّةٍ', transliteration: 'Wa Ma Min Dabbah' },
  { number: 13, arabic: 'وَمَا أُبَرِّئُ', transliteration: 'Wa Ma Ubarri\'u' },
  { number: 14, arabic: 'رُبَمَا', transliteration: 'Rubama' },
  { number: 15, arabic: 'سُبْحَانَ الَّذِي', transliteration: 'Subhanallazi' },
  { number: 16, arabic: 'قَالَ أَلَمْ', transliteration: 'Qal Alam' },
  { number: 17, arabic: 'اقْتَرَبَ', transliteration: 'Iqtaraba' },
  { number: 18, arabic: 'قَدْ أَفْلَحَ', transliteration: 'Qad Aflaha' },
  { number: 19, arabic: 'وَقَالَ الَّذِينَ', transliteration: 'Wa Qalallazina' },
  { number: 20, arabic: 'أَمَّنْ خَلَقَ', transliteration: 'Amman Khalaq' },
  { number: 21, arabic: 'اتْلُ مَا أُوحِيَ', transliteration: 'Utlu Ma Oohiya' },
  { number: 22, arabic: 'وَمَنْ يَقْنُتْ', transliteration: 'Wa Man Yaqnut' },
  { number: 23, arabic: 'وَمَا لِيَ', transliteration: 'Wa Mali' },
  { number: 24, arabic: 'فَمَنْ أَظْلَمُ', transliteration: 'Faman Azlamu' },
  { number: 25, arabic: 'إِلَيْهِ يُرَدُّ', transliteration: 'Ilaihi Yuraddu' },
  { number: 26, arabic: 'حم', transliteration: 'Ha Meem' },
  { number: 27, arabic: 'قَالَ فَمَا خَطْبُكُمْ', transliteration: 'Qala Fama Khatbukum' },
  { number: 28, arabic: 'قَدْ سَمِعَ اللَّهُ', transliteration: 'Qad Sami Allahu' },
  { number: 29, arabic: 'تَبَارَكَ الَّذِي', transliteration: 'Tabarakallazi' },
  { number: 30, arabic: 'عَمَّ', transliteration: 'Amma' },
];

// Duas collection
export const DUAS = {
  iftar: {
    title: 'Dua for Breaking Fast (Iftar)',
    arabic: 'اللَّهُمَّ إِنِّي لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ',
    transliteration: 'Allahumma inni laka sumtu wa bika aamantu wa ala rizqika aftartu',
    translation: 'O Allah! I fasted for You and I believe in You and I break my fast with Your sustenance.',
  },
  sehri: {
    title: 'Dua for Sehri (Pre-Dawn Meal)',
    arabic: 'وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ',
    transliteration: 'Wa bisawmi ghadin nawaytu min shahri ramadan',
    translation: 'I intend to keep the fast for tomorrow in the month of Ramadan.',
  },
  laylatul_qadr: {
    title: 'Dua for Laylatul Qadr',
    arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',
    transliteration: 'Allahumma innaka Afuwwun tuhibbul afwa fa\'fu anni',
    translation: 'O Allah, You are the One who pardons greatly, and loves to pardon, so pardon me.',
  },
  first_third: {
    title: 'Dua for the First Third of the Night',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ رَحْمَتَكَ',
    transliteration: 'Allahumma inni as\'aluka rahmataka',
    translation: 'O Allah, I ask You for Your mercy.',
  },
  second_third: {
    title: 'Dua for the Middle Third of the Night',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مَغْفِرَتَكَ',
    transliteration: 'Allahumma inni as\'aluka maghfirataka',
    translation: 'O Allah, I ask You for Your forgiveness.',
  },
  last_third: {
    title: 'Dua for the Last Third of the Night',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ النَّارِ',
    transliteration: 'Allahumma inni a\'oodhu bika minan naar',
    translation: 'O Allah, I seek refuge in You from the Fire.',
  },
  opening_fast: {
    title: 'Dua When Starting the Fast',
    arabic: 'نَوَيْتُ أَنْ أَصُومَ غَدًا مِنْ شَهْرِ رَمَضَانَ الْمُبَارَكِ فَتَقَبَّلْ مِنِّي إِنَّكَ أَنْتَ السَّمِيعُ الْعَلِيمُ',
    transliteration: 'Nawaytu an asuma ghadan min shahri ramadanal mubaraki fataqabbal minni innaka antas sami ul aleem',
    translation: 'I intend to fast tomorrow in the blessed month of Ramadan. Accept it from me, for You are the All-Hearing, All-Knowing.',
  },
  quran_completion: {
    title: 'Dua upon Completing the Quran',
    arabic: 'اللَّهُمَّ ارْحَمْنِي بِالْقُرْآنِ وَاجْعَلْهُ لِي إِمَامًا وَنُورًا وَهُدًى وَرَحْمَةً',
    transliteration: 'Allahummar hamni bil Quran waj\'alhu li imaaman wa nuuran wa hudan wa rahmah',
    translation: 'O Allah, have mercy on me through the Quran, make it for me a guide, a light, a source of guidance and mercy.',
  },
};

export const DEFAULT_GOALS = [
  { id: 'quran', title: 'Complete the Quran', target: 30, current: 0, unit: 'Juz' },
  { id: 'taraweeh', title: 'Pray Taraweeh Daily', target: 30, current: 0, unit: 'days' },
  { id: 'sadaqah', title: 'Give Sadaqah Weekly', target: 4, current: 0, unit: 'weeks' },
  { id: 'book', title: 'Read an Islamic Book', target: 100, current: 0, unit: 'pages' },
];
