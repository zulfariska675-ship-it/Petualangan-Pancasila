import React, { useState } from 'react';
import { PlayerProfile, LevelData } from '../types';
import { LEVELS_DATA, REGIONAL_LEVEL_CULTURE } from '../data/pancasilaData';
import { ASSETS } from '../assets';
import { playClickSound } from '../utils/audio';
import { 
  Lock, 
  CheckCircle, 
  Star, 
  Award, 
  Compass, 
  ChevronRight, 
  Play, 
  ShieldCheck, 
  Sparkles,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PetaLevelViewProps {
  profile: PlayerProfile;
  onSelectLevel: (levelId: number) => void;
  onOpenCertificate: () => void;
}

export const PetaLevelView: React.FC<PetaLevelViewProps> = ({
  profile,
  onSelectLevel,
  onOpenCertificate
}) => {
  const [selectedLevel, setSelectedLevel] = useState<LevelData | null>(null);

  const isLevelUnlocked = (lvlId: number) => {
    if (lvlId === 1) return true;
    if (lvlId === 6) {
      // Pulau Pancasila unlocks when all 5 previous levels are completed
      return profile.completedLevels.length >= 5;
    }
    return profile.unlockedLevel >= lvlId;
  };

  const isLevelCompleted = (lvlId: number) => {
    return profile.completedLevels.includes(lvlId);
  };

  const handleNodeClick = (lvl: LevelData) => {
    playClickSound(profile.soundEnabled);
    setSelectedLevel(lvl);
  };

  const handleStartLevel = (lvlId: number) => {
    if (!isLevelUnlocked(lvlId)) return;
    playClickSound(profile.soundEnabled);
    setSelectedLevel(null);
    onSelectLevel(lvlId);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Ekspedisi Sabang sampai Merauke
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 font-heading">
            Peta Petualangan Nusantara
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Selesaikan setiap level secara bertahap untuk membuka lencana dan menuju Pulau Pancasila!
          </p>
        </div>

        {/* Total Badge counter */}
        <div className="flex items-center gap-3 bg-amber-50 px-4 py-2.5 rounded-2xl border border-amber-200 text-xs font-bold text-amber-900">
          <Award className="w-5 h-5 text-amber-600" />
          <div>
            <span>Lencana Dikumpulkan:</span>
            <span className="text-base text-red-600 ml-1.5 tabular-nums">
              {profile.badges.length} / 6
            </span>
          </div>
        </div>
      </div>

      {/* Illustrated Map Canvas Container */}
      <div className="relative rounded-3xl overflow-hidden shadow-md border-4 border-amber-300 bg-amber-900 min-h-[440px] sm:min-h-[520px]">
        {/* Harmonious Bendera Merah Putih Ribbon Borders */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 z-20 pointer-events-none" />
        <div className="absolute top-2 left-0 right-0 h-1 bg-gradient-to-r from-white via-amber-100 to-white z-20 pointer-events-none shadow-2xs" />
        <div className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-white via-amber-100 to-white z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 z-20 pointer-events-none" />

        {/* Map Background Image */}
        <img
          src={ASSETS.mapNusantara}
          alt="Peta Petualangan Nusantara"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-85"
        />

        {/* Soft overlay gradient to ensure high contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-slate-900/30 pointer-events-none" />

        {/* Connecting SVG Path between 5 levels + Level 6 */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <polyline
            points="18%,40% 34%,60% 50%,35% 68%,68% 84%,45%"
            fill="none"
            stroke="#FDE047"
            strokeWidth="5"
            strokeDasharray="8 8"
            className="animate-pulse opacity-90 drop-shadow-md"
          />
          {profile.completedLevels.length >= 5 && (
            <line
              x1="84%"
              y1="45%"
              x2="50%"
              y2="50%"
              stroke="#F59E0B"
              strokeWidth="4"
              strokeDasharray="6 6"
              className="drop-shadow-md"
            />
          )}
        </svg>

        {/* Level Checkpoint Nodes on Map */}
        {LEVELS_DATA.slice(0, 5).map((lvl) => {
          const unlocked = isLevelUnlocked(lvl.id);
          const completed = isLevelCompleted(lvl.id);
          const isCurrent = profile.unlockedLevel === lvl.id && !completed;

          return (
            <div
              key={lvl.id}
              style={{ left: `${lvl.coords.x}%`, top: `${lvl.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => handleNodeClick(lvl)}
                className={`group flex flex-col items-center focus-visible:outline-hidden transition-all duration-300 ${
                  unlocked ? 'cursor-pointer hover:scale-110' : 'cursor-pointer opacity-75'
                }`}
              >
              {/* Level Circle Pin */}
                <div className="relative">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center text-xl sm:text-2xl shadow-lg border-2 transition-transform ${
                      completed
                        ? 'bg-emerald-500 border-white text-white shadow-emerald-900/50'
                        : isCurrent
                        ? 'bg-amber-400 border-white text-slate-900 animate-bounce shadow-amber-900/50 ring-4 ring-yellow-300/60'
                        : unlocked
                        ? 'bg-white border-amber-400 text-slate-800'
                        : 'bg-slate-700 border-slate-500 text-slate-400'
                    }`}
                  >
                    {completed ? (
                      <CheckCircle className="w-7 h-7 text-white" />
                    ) : unlocked ? (
                      <span>{lvl.badgeReward.icon}</span>
                    ) : (
                      <Lock className="w-5 h-5 text-slate-300" />
                    )}
                  </div>

                  {/* Regional Icon badge on pin */}
                  <span className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-100 border-2 border-white shadow-xs flex items-center justify-center text-xs">
                    {REGIONAL_LEVEL_CULTURE[lvl.id]?.icon || '🇮🇩'}
                  </span>
                </div>

                {/* Level Tag Label */}
                <div className="mt-1 px-2.5 py-1 rounded-xl bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold border border-white/20 whitespace-nowrap shadow-md flex items-center gap-1 group-hover:bg-red-600 transition-colors">
                  <span>Level {lvl.id}</span>
                  {completed && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />}
                </div>

                {/* Island / Location caption with regional icon */}
                <span className="text-[10px] text-amber-200 font-semibold drop-shadow-md hidden sm:block">
                  {REGIONAL_LEVEL_CULTURE[lvl.id]?.icon} {lvl.name}
                </span>
              </button>
            </div>
          );
        })}

        {/* Level 6: Pulau Pancasila (Center) */}
        {(() => {
          const finalLevel = LEVELS_DATA[5];
          const allPrevCompleted = profile.completedLevels.length >= 5;
          const isDuta = profile.isDutaPancasila;

          return (
            <div
              style={{ left: '50%', top: '50%' }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
            >
              <button
                onClick={() => handleNodeClick(finalLevel)}
                className={`flex flex-col items-center transition-all ${
                  allPrevCompleted
                    ? 'cursor-pointer hover:scale-115'
                    : 'cursor-pointer opacity-80'
                }`}
              >
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center shadow-2xl border-3 transition-transform ${
                    isDuta
                      ? 'bg-gradient-to-br from-amber-400 via-yellow-300 to-amber-500 border-yellow-200 text-slate-900 ring-4 ring-yellow-400/80 animate-pulse'
                      : allPrevCompleted
                      ? 'bg-gradient-to-br from-red-600 to-amber-500 border-white text-white animate-bounce'
                      : 'bg-slate-800/90 border-slate-600 text-slate-400'
                  }`}
                >
                  {isDuta ? (
                    <span className="text-3xl sm:text-4xl">🏆</span>
                  ) : allPrevCompleted ? (
                    <Sparkles className="w-8 h-8 text-yellow-300" />
                  ) : (
                    <div className="flex flex-col items-center">
                      <Lock className="w-5 h-5 text-slate-300" />
                      <span className="text-[9px] font-bold text-slate-300">Final</span>
                    </div>
                  )}
                </div>

                <div className="mt-1 px-3 py-1 rounded-xl bg-amber-500 text-slate-900 font-extrabold text-[11px] sm:text-xs shadow-lg border border-yellow-200 whitespace-nowrap flex items-center gap-1">
                  <span>Pulau Pancasila</span>
                  {isDuta && <span>✨</span>}
                </div>
              </button>
            </div>
          );
        })()}

        {/* Map Legend / Quick Guide Overlay */}
        <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-slate-900/80 backdrop-blur-md rounded-2xl p-3 border border-white/20 text-white text-[11px] flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-500" />
            <span>Tuntas</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 animate-pulse" />
            <span>Bisa Dimainkan</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3.5 h-3.5 rounded-full bg-slate-600" />
            <span>Terkunci</span>
          </div>
        </div>
      </div>

      {/* Level Details Modal / Drawer with Framer Motion */}
      <AnimatePresence>
        {selectedLevel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedLevel(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-amber-300 relative"
            >
              <button
                onClick={() => setSelectedLevel(null)}
                className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, delay: 0.1 }}
                  className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-3xl border border-amber-300 shrink-0"
                >
                  {selectedLevel.badgeReward.icon}
                </motion.div>
                <div>
                  <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block">
                    {selectedLevel.id === 6 ? 'Puncak Petualangan' : `Level ${selectedLevel.id} · ${selectedLevel.islandName}`}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    {selectedLevel.name}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
                {selectedLevel.description}
              </p>

              {/* Badge reward preview */}
              <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-xl shadow-xs">
                  {selectedLevel.badgeReward.icon}
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">
                    Hadiah Lencana Kehormatan:
                  </span>
                  <h4 className="text-xs font-bold text-slate-800">
                    {selectedLevel.badgeReward.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {selectedLevel.badgeReward.description}
                  </p>
                </div>
              </div>

              {/* Unsur Warisan Budaya Daerah */}
              {(() => {
                const culture = REGIONAL_LEVEL_CULTURE[selectedLevel.id];
                if (!culture) return null;
                return (
                  <div className="mt-3 p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 via-yellow-50 to-orange-50 border border-amber-300 flex items-start gap-3">
                    <span className="text-2xl shrink-0 mt-0.5">{culture.icon}</span>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-1.5 font-extrabold text-amber-950 font-heading">
                        <span>Khas {culture.island}:</span>
                        <span className="text-red-700">{culture.rumahAdat}</span>
                      </div>
                      <p className="text-[11px] text-amber-900 leading-snug">
                        {culture.highlight}
                      </p>
                      <span className="text-[10px] text-amber-800 font-bold block pt-0.5">
                        Sapaan Khas: “{culture.greeting}”
                      </span>
                    </div>
                  </div>
                );
              })()}

              {/* Action buttons */}
              <div className="mt-6 flex items-center gap-3">
                {isLevelUnlocked(selectedLevel.id) ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStartLevel(selectedLevel.id)}
                    className="flex-1 py-3 px-5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>
                      {isLevelCompleted(selectedLevel.id) ? 'Mainkan Ulang Level' : 'Mulai Petualangan'}
                    </span>
                  </motion.button>
                ) : (
                  <div className="flex-1 py-3 px-5 rounded-2xl bg-slate-200 text-slate-500 font-bold text-xs text-center flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Selesaikan level sebelumnya terlebih dahulu untuk membuka level ini!</span>
                  </div>
                )}

                {selectedLevel.id === 6 && profile.isDutaPancasila && (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => {
                      setSelectedLevel(null);
                      onOpenCertificate();
                    }}
                    className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs cursor-pointer"
                  >
                    Cetak Sertifikat
                  </motion.button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Levels list grid summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {LEVELS_DATA.map((lvl) => {
          const unlocked = isLevelUnlocked(lvl.id);
          const completed = isLevelCompleted(lvl.id);
          const culture = REGIONAL_LEVEL_CULTURE[lvl.id];

          return (
            <motion.div
              key={lvl.id}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleNodeClick(lvl)}
              className={`p-4 rounded-2xl border transition-colors cursor-pointer flex items-center justify-between ${
                completed
                  ? 'bg-emerald-50/50 border-emerald-300 hover:bg-emerald-100/60'
                  : unlocked
                  ? 'bg-white border-amber-300 hover:bg-amber-50/60 shadow-2xs'
                  : 'bg-slate-50 border-slate-200 opacity-60'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                  completed ? 'bg-emerald-500 text-white' : unlocked ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-500'
                }`}>
                  {completed ? <CheckCircle className="w-5 h-5" /> : unlocked ? lvl.badgeReward.icon : <Lock className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Level {lvl.id}
                    </span>
                    <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded-md font-bold">
                      {culture?.icon} {culture?.island}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">{lvl.name}</h4>
                  <span className="text-[10px] text-slate-500 block">{culture?.rumahAdat}</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
