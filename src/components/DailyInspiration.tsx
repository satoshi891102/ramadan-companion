'use client';

import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { getRamadanDay } from '@/lib/prayer-times';

const DAILY_INSPIRATIONS = [
  { arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ', translation: 'O you who believe, fasting is prescribed for you as it was prescribed for those before you, that you may attain taqwa.', source: 'Surah Al-Baqarah 2:183' },
  { arabic: 'مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ', translation: 'Whoever fasts Ramadan out of faith and seeking reward, his past sins will be forgiven.', source: 'Sahih al-Bukhari 38' },
  { arabic: 'إِذَا جَاءَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الْجَنَّةِ وَغُلِّقَتْ أَبْوَابُ النَّارِ وَصُفِّدَتِ الشَّيَاطِينُ', translation: 'When Ramadan begins, the gates of Paradise are opened, the gates of Hell are closed, and the devils are chained.', source: 'Sahih al-Bukhari 1899' },
  { arabic: 'الصِّيَامُ جُنَّةٌ فَلَا يَرْفُثْ وَلَا يَجْهَلْ', translation: 'Fasting is a shield. So the one who fasts should avoid obscene speech and ignorant behavior.', source: 'Sahih al-Bukhari 1904' },
  { arabic: 'لِلصَّائِمِ فَرْحَتَانِ فَرْحَةٌ عِنْدَ فِطْرِهِ وَفَرْحَةٌ عِنْدَ لِقَاءِ رَبِّهِ', translation: 'The fasting person has two moments of joy: when he breaks his fast and when he meets his Lord.', source: 'Sahih al-Bukhari 1904' },
  { arabic: 'مَنْ قَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ', translation: 'Whoever stands in prayer during Ramadan out of faith and seeking reward, his past sins will be forgiven.', source: 'Sahih al-Bukhari 37' },
  { arabic: 'إِنَّ فِي الْجَنَّةِ بَابًا يُقَالُ لَهُ الرَّيَّانُ يَدْخُلُ مِنْهُ الصَّائِمُونَ', translation: 'There is a gate in Paradise called Ar-Rayyan, through which those who fast will enter.', source: 'Sahih al-Bukhari 1896' },
  { arabic: 'كُلُّ عَمَلِ ابْنِ آدَمَ يُضَاعَفُ الْحَسَنَةُ عَشْرُ أَمْثَالِهَا إِلَى سَبْعِمِائَةِ ضِعْفٍ إِلَّا الصَّوْمَ فَإِنَّهُ لِي وَأَنَا أَجْزِي بِهِ', translation: 'Every deed of the son of Adam is multiplied ten to seven hundred times, except fasting — it is for Me and I shall reward it.', source: 'Sahih Muslim 1151' },
  { arabic: 'تَسَحَّرُوا فَإِنَّ فِي السَّحُورِ بَرَكَةً', translation: 'Take suhoor, for indeed there is blessing in suhoor.', source: 'Sahih al-Bukhari 1923' },
  { arabic: 'مَنْ فَطَّرَ صَائِمًا كَانَ لَهُ مِثْلُ أَجْرِهِ غَيْرَ أَنَّهُ لَا يَنْقُصُ مِنْ أَجْرِ الصَّائِمِ شَيْئًا', translation: 'Whoever provides food for a fasting person to break his fast will have a reward like his, without diminishing the reward of the fasting person.', source: 'Sunan al-Tirmidhi 807' },
  { arabic: 'عُمْرَةٌ فِي رَمَضَانَ تَعْدِلُ حَجَّةً', translation: 'Umrah in Ramadan is equal to Hajj (in reward).', source: 'Sahih al-Bukhari 1863' },
  { arabic: 'شَهْرُ رَمَضَانَ الَّذِي أُنزِلَ فِيهِ الْقُرْآنُ هُدًى لِّلنَّاسِ', translation: 'The month of Ramadan in which the Quran was revealed, a guidance for the people.', source: 'Surah Al-Baqarah 2:185' },
  { arabic: 'إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ • وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ • لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ', translation: 'Indeed, We sent it down during the Night of Power. And what can make you know what is the Night of Power? The Night of Power is better than a thousand months.', source: 'Surah Al-Qadr 97:1-3' },
  { arabic: 'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي', translation: 'O Allah, You are pardoning and You love pardon, so pardon me.', source: 'Sunan al-Tirmidhi 3513' },
  { arabic: 'ثَلَاثَةٌ لَا تُرَدُّ دَعْوَتُهُمْ الصَّائِمُ حَتَّى يُفْطِرَ', translation: 'Three prayers are not rejected: the prayer of the fasting person until he breaks his fast.', source: 'Sunan al-Tirmidhi 3598' },
  { arabic: 'أَفْضَلُ الصَّدَقَةِ صَدَقَةٌ فِي رَمَضَانَ', translation: 'The best charity is charity given in Ramadan.', source: 'Sunan al-Tirmidhi 663' },
  { arabic: 'كَانَ رَسُولُ اللَّهِ أَجْوَدَ النَّاسِ وَكَانَ أَجْوَدَ مَا يَكُونُ فِي رَمَضَانَ', translation: 'The Messenger of Allah was the most generous of people, and he was most generous during Ramadan.', source: 'Sahih al-Bukhari 6' },
  { arabic: 'مَنْ لَمْ يَدَعْ قَوْلَ الزُّورِ وَالْعَمَلَ بِهِ فَلَيْسَ لِلَّهِ حَاجَةٌ فِي أَنْ يَدَعَ طَعَامَهُ وَشَرَابَهُ', translation: 'Whoever does not give up false speech and acting upon it, Allah has no need of his giving up his food and drink.', source: 'Sahih al-Bukhari 1903' },
  { arabic: 'إِذَا كَانَتْ لَيْلَةُ الْقَدْرِ نَزَلَتِ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا', translation: 'On the Night of Power, the angels and the Spirit descend therein.', source: 'Surah Al-Qadr 97:4' },
  { arabic: 'اللَّهُمَّ بَلِّغْنَا رَمَضَانَ', translation: 'O Allah, let us reach Ramadan.', source: 'Common Dua of the Salaf' },
  { arabic: 'وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ', translation: 'And when My servants ask you about Me — indeed I am near. I respond to the invocation of the supplicant when he calls upon Me.', source: 'Surah Al-Baqarah 2:186' },
  { arabic: 'الصَّبْرُ نِصْفُ الْإِيمَانِ وَالصِّيَامُ نِصْفُ الصَّبْرِ', translation: 'Patience is half of faith, and fasting is half of patience.', source: 'Narration from Imam al-Ghazali, Ihya Ulum al-Din' },
  { arabic: 'رَمَضَانُ لَا يُعَوَّضُ وَلَا يُعَوَّضُ عَنْهُ', translation: 'Ramadan cannot be replaced, and nothing can replace it.', source: 'Saying of the Scholars' },
  { arabic: 'اغْتَنِمْ خَمْسًا قَبْلَ خَمْسٍ شَبَابَكَ قَبْلَ هَرَمِكَ', translation: 'Take advantage of five before five: your youth before your old age.', source: 'Sahih — Al-Hakim, Mustadrak 7846' },
  { arabic: 'أَقْرَبُ مَا يَكُونُ الْعَبْدُ مِنْ رَبِّهِ وَهُوَ سَاجِدٌ', translation: 'The closest a servant is to his Lord is when he is in prostration.', source: 'Sahih Muslim 482' },
  { arabic: 'مَنْ قَامَ لَيْلَةَ الْقَدْرِ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ', translation: 'Whoever stands in prayer on the Night of Power out of faith and seeking reward, his past sins will be forgiven.', source: 'Sahih al-Bukhari 1901' },
  { arabic: 'إِنَّ اللَّهَ وَمَلَائِكَتَهُ يُصَلُّونَ عَلَى النَّبِيِّ', translation: 'Indeed, Allah and His angels send blessings upon the Prophet.', source: 'Surah Al-Ahzab 33:56' },
  { arabic: 'وَالصَّائِمُونَ وَالصَّائِمَاتُ أَعَدَّ اللَّهُ لَهُم مَّغْفِرَةً وَأَجْرًا عَظِيمًا', translation: 'The fasting men and fasting women — Allah has prepared for them forgiveness and a great reward.', source: 'Surah Al-Ahzab 33:35' },
  { arabic: 'ادْعُوا اللَّهَ وَأَنتُم مُوقِنُونَ بِالْإِجَابَةِ', translation: 'Call upon Allah while being certain of being answered.', source: 'Sunan al-Tirmidhi 3479' },
  { arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ', translation: 'The best of you are those who learn the Quran and teach it.', source: 'Sahih al-Bukhari 5027' },
];

export default function DailyInspiration() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const day = getRamadanDay();
  const inspiration = DAILY_INSPIRATIONS[(day - 1) % DAILY_INSPIRATIONS.length];

  return (
    <div className="glass-card mx-4 overflow-hidden p-4">
      <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent" />
      <div className="flex items-center gap-2 mb-3">
        <Sparkles size={14} className="text-teal" />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-teal">Day {day} Inspiration</span>
      </div>
      <p className="arabic-text text-lg leading-[2.2] text-gold mb-3">{inspiration.arabic}</p>
      <div className="islamic-pattern-border mb-3" />
      <p className="text-sm text-text-primary leading-relaxed mb-2">{inspiration.translation}</p>
      <p className="text-[10px] text-text-secondary">— {inspiration.source}</p>
    </div>
  );
}
