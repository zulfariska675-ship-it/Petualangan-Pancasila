import React, { useState } from 'react';
import { PlayerProfile, LevelData } from '../types';
import { LEVELS_DATA, REGIONAL_LEVEL_CULTURE } from '../data/pancasilaData';
import { playSuccessSound, playErrorSound, playFanfareSound, playClickSound } from '../utils/audio';
import { syncStudentGameProgress } from '../utils/storage';
import { GameMusicBar } from './GameMusicBar';
import confetti from 'canvas-confetti';
import { CheckCircle2, ChevronRight, Award, Star, ArrowLeft, RefreshCw, Sparkles, Compass, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LevelAdventureViewProps {
  levelId: number;
  profile: PlayerProfile;
  onUpdateProfile: (updated: Partial<PlayerProfile>) => void;
  onBackToMap: () => void;
  onNextLevel?: (nextLevelId: number) => void;
  onOpenCertificate: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const LevelAdventureView: React.FC<LevelAdventureViewProps> = ({
  levelId,
  profile,
  onUpdateProfile,
  onBackToMap,
  onNextLevel,
  onOpenCertificate
}) => {
  const level = LEVELS_DATA.find((l) => l.id === levelId) || LEVELS_DATA[0];
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [isLevelCompleted, setIsLevelCompleted] = useState<boolean>(false);

  const currentChallenge = level.challenges[currentChallengeIndex];
  const totalChallenges = level.challenges.length;

  const [shuffledOptions, setShuffledOptions] = useState(() => 
    shuffleArray(currentChallenge.options)
  );

  React.useEffect(() => {
    setShuffledOptions(shuffleArray(currentChallenge.options));
    setSelectedOption(null);
    setFeedback(null);
  }, [currentChallengeIndex, levelId]);

  const handleSelectOption = (idx: number) => {
    if (feedback?.isCorrect) return; // already solved
    playClickSound(profile.soundEnabled);
    setSelectedOption(idx);
    const opt = shuffledOptions[idx];

    if (opt.correct) {
      playSuccessSound(profile.soundEnabled);
      setFeedback({
        isCorrect: true,
        text: opt.feedback
      });
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } else {
      playErrorSound(profile.soundEnabled);
      setFeedback({
        isCorrect: false,
        text: opt.feedback
      });
    }
  };

  const handleNextChallenge = () => {
    playClickSound(profile.soundEnabled);
    if (currentChallengeIndex + 1 < totalChallenges) {
      setCurrentChallengeIndex((prev) => prev + 1);
      setSelectedOption(null);
      setFeedback(null);
    } else {
      // Level completely finished!
      playFanfareSound(profile.soundEnabled);
      confetti({ particleCount: 100, spread: 90, origin: { y: 0.5 } });
      setIsLevelCompleted(true);

      const alreadyCompleted = profile.completedLevels.includes(level.id);
      const newCompleted = alreadyCompleted ? profile.completedLevels : [...profile.completedLevels, level.id];
      const newBadges = profile.badges.includes(level.badgeReward.id)
        ? profile.badges
        : [...profile.badges, level.badgeReward.id];
      const nextUnlocked = Math.max(profile.unlockedLevel, level.id + 1);

      const ptsEarned = alreadyCompleted ? 30 : 100;
      const starsEarned = alreadyCompleted ? 1 : 3;
      const isDuta = level.id === 6 || (newCompleted.length >= 5 && profile.isDutaPancasila);

      const updatedProfile: PlayerProfile = {
        ...profile,
        completedLevels: newCompleted,
        badges: newBadges,
        unlockedLevel: nextUnlocked,
        points: profile.points + ptsEarned,
        stars: profile.stars + starsEarned,
        isDutaPancasila: isDuta || profile.isDutaPancasila
      };

      onUpdateProfile({
        completedLevels: newCompleted,
        badges: newBadges,
        unlockedLevel: nextUnlocked,
        points: updatedProfile.points,
        stars: updatedProfile.stars,
        isDutaPancasila: updatedProfile.isDutaPancasila
      });

      // Otomatis sinkronisasi data siswa ke Portal Guru
      syncStudentGameProgress(
        updatedProfile,
        `Petualangan Level ${level.id}: ${level.locationTitle}`,
        `Tuntas semua tantangan · Lencana ${level.badgeReward.name} (+${ptsEarned} Poin)`
      );
    }
  };

  const handleRestartLevel = () => {
    playClickSound(profile.soundEnabled);
    setCurrentChallengeIndex(0);
    setShuffledOptions(shuffleArray(level.challenges[0].options));
    setSelectedOption(null);
    setFeedback(null);
    setIsLevelCompleted(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Top Navigation & Status */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-amber-200/80 shadow-xs">
        <button
          onClick={onBackToMap}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Peta</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            Tantangan {currentChallengeIndex + 1} dari {totalChallenges}
          </span>
          <div className="w-24 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-red-600 transition-all duration-300"
              style={{
                width: `${((currentChallengeIndex + (feedback?.isCorrect ? 1 : 0)) / totalChallenges) * 100}%`
              }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <GameMusicBar compact soundEnabled={profile.soundEnabled} />
          <button
            onClick={handleRestartLevel}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
            title="Mulai Ulang Level"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Challenge Card or Victory Screen with Framer Motion transitions */}
      <AnimatePresence mode="wait">
        {!isLevelCompleted ? (
          <motion.div
            key={`challenge-${level.id}-${currentChallengeIndex}`}
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.99 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-sm space-y-6"
          >
            {/* Header of the level */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl border border-amber-300">
                  {level.badgeReward.icon}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                    Level {level.id} · {level.locationTitle}
                  </span>
                  <h2 className="text-xl font-bold text-slate-900 font-heading">
                    {currentChallenge.title}
                  </h2>
                </div>
              </div>
              <div className="px-3 py-1 bg-amber-50 rounded-xl border border-amber-200 text-xs font-semibold text-amber-900 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Hadiah: {level.badgeReward.name}</span>
              </div>
            </div>

            {/* Regional Culture Exploration Bar */}
            {REGIONAL_LEVEL_CULTURE[level.id] && (
              <div className="flex flex-wrap items-center justify-between gap-2.5 p-3.5 bg-gradient-to-r from-amber-50 via-orange-50/50 to-amber-50 rounded-2xl border border-amber-200/90 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{REGIONAL_LEVEL_CULTURE[level.id].icon}</span>
                  <div>
                    <span className="font-extrabold text-amber-950 block">
                      Jelajah Budaya {REGIONAL_LEVEL_CULTURE[level.id].island}: {REGIONAL_LEVEL_CULTURE[level.id].rumahAdat}
                    </span>
                    <span className="text-[11px] text-amber-800">
                      Alat Musik Khas: {REGIONAL_LEVEL_CULTURE[level.id].alatMusik}
                    </span>
                  </div>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 rounded-xl border border-amber-200 text-xs font-bold text-amber-900 shadow-2xs">
                  <span>🌸 Sapaan Ramah:</span>
                  <span className="text-red-700 italic">"{REGIONAL_LEVEL_CULTURE[level.id].greeting}"</span>
                </div>
              </div>
            )}

            {/* Story Narrative Box with Character Dialog */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white shadow-2xs border border-amber-300 flex items-center justify-center text-3xl shrink-0">
                {currentChallenge.characterEmoji}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-900">
                  {currentChallenge.characterName} berkata:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{currentChallenge.narrative}"
                </p>
              </div>
            </div>

            {/* The Dilemma / Question */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-heading">
                <span className="text-red-600">●</span>
                <span>Pertanyaan & Pilihan Tindakanmu:</span>
              </div>
              <p className="text-sm sm:text-base font-semibold text-slate-800 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {currentChallenge.question}
              </p>
            </div>

            {/* Options List with motion feedback */}
            <div className="space-y-3">
              {shuffledOptions.map((option, idx) => {
                const isSelected = selectedOption === idx;
                let style = 'bg-white border-amber-200 hover:border-amber-400 text-slate-700 hover:bg-amber-50/40';

                if (feedback && isSelected) {
                  if (feedback.isCorrect) {
                    style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-400/50';
                  } else {
                    style = 'bg-rose-50 border-rose-400 text-rose-900';
                  }
                }

                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.01, x: 2 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-colors text-xs sm:text-sm flex items-start gap-3.5 cursor-pointer ${style}`}
                  >
                    <span className="w-7 h-7 rounded-xl bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-900 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="flex-1">
                      <span className="leading-snug">{option.text}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Feedback & Next Button */}
            <AnimatePresence>
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                    feedback.isCorrect
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {feedback.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <span className="text-xl">💡</span>
                    )}
                    <div>
                      <h4 className="text-xs font-bold font-heading">
                        {feedback.isCorrect ? 'Luar Biasa, Jawaban Tepat!' : 'Hampir Benar, Coba Perhatikan:'}
                      </h4>
                      <p className="text-xs mt-0.5 leading-relaxed">{feedback.text}</p>
                    </div>
                  </div>

                  {feedback.isCorrect && (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={handleNextChallenge}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      <span>
                        {currentChallengeIndex + 1 < totalChallenges ? 'Tantangan Berikutnya' : 'Selesaikan Misi!'}
                      </span>
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          /* Victory Screen with celebration animation */
          <motion.div
            key={`victory-${level.id}`}
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 240 }}
            className="bg-white rounded-3xl p-8 sm:p-10 border border-amber-300 shadow-xl text-center space-y-6"
          >
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.15 }}
              className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-yellow-300 flex items-center justify-center text-5xl shadow-lg border-4 border-white"
            >
              {level.badgeReward.icon}
            </motion.div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider block">
                Misi Selesai dengan Sempurna!
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                Selamat! Kamu Berhasil Menuntaskan {level.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                Kamu telah membuktikan penerapan nilai luhur Pancasila dengan sangat bijaksana dan penuh kasih sayang.
              </p>
            </div>

            {/* Reward Badges Tally with staggered feel */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200"
              >
                <span className="text-2xl block">🎖️</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-1 uppercase">Lencana Diraih</span>
                <span className="text-xs font-bold text-amber-900">{level.badgeReward.name}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32 }}
                className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200"
              >
                <span className="text-2xl block">⭐</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-1 uppercase">Bintang Tambahan</span>
                <span className="text-xs font-bold text-rose-900">+3 Bintang Emas</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200"
              >
                <span className="text-2xl block">🏆</span>
                <span className="text-[10px] text-slate-400 font-bold block mt-1 uppercase">Poin Tambahan</span>
                <span className="text-xs font-bold text-emerald-900">+100 Poin</span>
              </motion.div>
            </div>

            {/* Regional Cultural Tribute */}
            {REGIONAL_LEVEL_CULTURE[level.id] && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="max-w-lg mx-auto p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300/80 text-left space-y-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xl">{REGIONAL_LEVEL_CULTURE[level.id].icon}</span>
                  <span className="text-xs font-bold text-amber-950">
                    Salam Persaudaraan dari {REGIONAL_LEVEL_CULTURE[level.id].island}:
                  </span>
                </div>
                <p className="text-xs text-amber-900 leading-relaxed font-semibold">
                  "{REGIONAL_LEVEL_CULTURE[level.id].greeting}" — Nilai luhur di balik {REGIONAL_LEVEL_CULTURE[level.id].rumahAdat} senantiasa hidup saat kita saling mengasihi dan bersatu dalam Bhinneka Tunggal Ika!
                </p>
              </motion.div>
            )}

            {/* Duta Pancasila Announcement if Level 6 */}
            {level.id === 6 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, type: 'spring' }}
                className="p-5 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 border-2 border-yellow-400 max-w-md mx-auto space-y-3"
              >
                <Sparkles className="w-6 h-6 text-yellow-600 mx-auto" />
                <h3 className="text-base font-extrabold text-amber-950 font-heading">
                  Selamat! Kamu telah menjadi Duta Pancasila.
                </h3>
                <p className="text-xs text-amber-800">
                  Sertifikat digital resmi atas nama kamu siap untuk dilihat dan dicetak!
                </p>
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={onOpenCertificate}
                  className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Buka & Cetak Sertifikat Digital
                </motion.button>
              </motion.div>
            )}

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              {/* If next level is available, give direct jump to next level */}
              {level.id < 6 && (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    playClickSound(profile.soundEnabled);
                    if (onNextLevel) {
                      onNextLevel(level.id + 1);
                    } else {
                      onBackToMap();
                    }
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>Lanjut ke Level {level.id + 1}</span>
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              )}

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={onBackToMap}
                className={`px-6 py-3 font-bold text-sm rounded-2xl shadow-xs transition-all flex items-center gap-2 cursor-pointer ${
                  level.id < 6
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-red-600 hover:bg-red-700 text-white shadow-md'
                }`}
              >
                <span>Kembali ke Peta Petualangan</span>
                {level.id >= 6 && <ChevronRight className="w-4 h-4" />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleRestartLevel}
                className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-2xl transition-all cursor-pointer"
              >
                Mainkan Ulang Level
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
