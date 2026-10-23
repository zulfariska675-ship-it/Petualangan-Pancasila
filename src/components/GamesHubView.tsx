import React, { useState, useEffect, useRef } from 'react';
import { PlayerProfile, PuzzleSymbol } from '../types';
import { 
  SIKAP_GAMES, 
  PAIR_MATCH_DATA, 
  PUZZLE_DATA, 
  MISI_KEBAIKAN_DATA, 
  BENAR_SALAH_DATA, 
  RODA_TANTANGAN_DATA 
} from '../data/pancasilaData';
import { 
  playClickSound, 
  playSuccessSound, 
  playErrorSound, 
  playWheelTickSound, 
  playFanfareSound,
  startBgm,
  isBgmPlaying
} from '../utils/audio';
import { syncStudentGameProgress } from '../utils/storage';
import { GameMusicBar } from './GameMusicBar';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  HelpCircle, 
  RotateCw, 
  Award, 
  Star, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Compass, 
  HeartHandshake, 
  ThumbsUp, 
  ThumbsDown,
  ArrowRight,
  RefreshCw,
  Music,
} from 'lucide-react';

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

type GameMode = 'hub' | 'sikap' | 'pasang' | 'puzzle' | 'misi' | 'benarsalah' | 'roda';

interface GamesHubViewProps {
  profile: PlayerProfile;
  isBgmOn?: boolean;
  onToggleBgm?: () => void;
  onUpdateProfile: (updated: Partial<PlayerProfile>) => void;
}

export const GamesHubView: React.FC<GamesHubViewProps> = ({
  profile,
  isBgmOn = false,
  onToggleBgm,
  onUpdateProfile
}) => {
  const [activeGame, setActiveGame] = useState<GameMode>('hub');
  const [syncToastMessage, setSyncToastMessage] = useState<string | null>(null);

  const getGameTitle = (mode: GameMode): string => {
    switch (mode) {
      case 'sikap': return 'Game 1: Pilih Sikap yang Tepat';
      case 'pasang': return 'Game 2: Pasangkan Nilai & Contoh';
      case 'puzzle': return 'Game 3: Susun Puzzle Lambang';
      case 'misi': return 'Game 4: Misi Kebaikan Karakter';
      case 'benarsalah': return 'Game 5: Kuis Benar atau Salah';
      case 'roda': return 'Game 6: Roda Tantangan Pancasila';
      default: return 'Permainan Pancasila';
    }
  };

  const handleSelectGame = (mode: GameMode) => {
    playClickSound(profile.soundEnabled);
    if (profile.soundEnabled && !isBgmPlaying()) {
      startBgm();
    }
    setActiveGame(mode);

    // Otomatis catat bahwa siswa mulai memainkan game ini
    const gameName = getGameTitle(mode);
    syncStudentGameProgress(profile, gameName, 'Mulai memainkan permainan');
    setSyncToastMessage(`Data belajar ${profile.name} disinkronkan ke Portal Guru`);
    setTimeout(() => setSyncToastMessage(null), 3000);
  };

  const handleBackToHub = () => {
    playClickSound(profile.soundEnabled);
    setActiveGame('hub');
  };

  const addReward = (pts: number, stars: number = 0) => {
    const updatedPoints = profile.points + pts;
    const updatedStars = profile.stars + stars;
    const updatedCount = profile.gamesPlayedCount + 1;

    onUpdateProfile({
      points: updatedPoints,
      stars: updatedStars,
      gamesPlayedCount: updatedCount
    });

    // Otomatis perbarui data rekapitulasi siswa ke penyimpanan lokal & Portal Guru
    const gameName = getGameTitle(activeGame);
    syncStudentGameProgress(
      {
        ...profile,
        points: updatedPoints,
        stars: updatedStars,
        gamesPlayedCount: updatedCount
      },
      gameName,
      `Berhasil raih +${pts} Poin${stars > 0 ? `, +${stars} Bintang` : ''}`
    );

    setSyncToastMessage(`Data ${profile.name} otomatis diperbarui di Portal Guru (+${pts} Poin)!`);
    setTimeout(() => setSyncToastMessage(null), 3500);
  };

  return (
    <div className="space-y-6 pb-12 relative">
      {/* Auto-Sync Toast Notification */}
      {syncToastMessage && (
        <div className="sticky top-20 z-30 mx-auto max-w-md bg-emerald-700/95 text-white px-4 py-2.5 rounded-2xl shadow-lg border border-emerald-400 backdrop-blur-md flex items-center justify-between gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
            <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
            <span>{syncToastMessage}</span>
          </div>
          <span className="text-[10px] text-emerald-200 uppercase tracking-wider font-bold">Auto-Sync</span>
        </div>
      )}

      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
              Wahana Permainan Edukatif
            </span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full border border-emerald-300">
              🟢 Rekap Siswa Auto-Update
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 font-heading mt-1">
            {activeGame === 'hub' ? 'Arena Game Pancasila' : 'Permainan Interaktif'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Uji pemahaman nilai Pancasila melalui beragam permainan interaktif yang seru, edukatif, dan diiringi musik ceria!
          </p>
        </div>

        {activeGame !== 'hub' ? (
          <div className="flex flex-wrap items-center gap-2">
            <GameMusicBar compact soundEnabled={profile.soundEnabled} />
            <button
              onClick={handleBackToHub}
              className="px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5"
            >
              <span>Kembali ke Menu Game</span>
            </button>
          </div>
        ) : (
          <div className="hidden sm:block">
            <GameMusicBar compact soundEnabled={profile.soundEnabled} />
          </div>
        )}
      </div>

      {/* Main Hub Music Player Pavilion */}
      {activeGame === 'hub' && (
        <GameMusicBar soundEnabled={profile.soundEnabled} />
      )}

      {/* Main Hub or Selected Sub-Game */}
      {activeGame === 'hub' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Game A: Pilih Sikap */}
          <div
            onClick={() => handleSelectGame('sikap')}
            className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl mb-4">
                🎯
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                Game 1
              </span>
              <h3 className="text-lg font-bold mt-2 font-heading group-hover:text-yellow-200 transition-colors">
                Pilih Sikap yang Tepat
              </h3>
              <p className="text-xs text-white/90 mt-1 leading-relaxed">
                Hadapi situasi sehari-hari dan pilihlah tindakan terbaik yang sesuai dengan pengamalan sila Pancasila.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-yellow-200">
              <span>Mainkan Sekarang</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Game B: Pasangkan Nilai */}
          <div
            onClick={() => handleSelectGame('pasang')}
            className="p-6 rounded-3xl bg-gradient-to-br from-rose-500 to-red-600 text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl mb-4">
                🔗
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                Game 2
              </span>
              <h3 className="text-lg font-bold mt-2 font-heading group-hover:text-yellow-200 transition-colors">
                Pasangkan Nilai & Contoh
              </h3>
              <p className="text-xs text-white/90 mt-1 leading-relaxed">
                Cocokkan lambang dan bunyi sila Pancasila dengan contoh nyata tindakan terpuji di kehidupan nyata.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-yellow-200">
              <span>Mainkan Sekarang</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Game C: Susun Puzzle Lambang */}
          <div
            onClick={() => handleSelectGame('puzzle')}
            className="p-6 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl mb-4">
                🧩
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                Game 3
              </span>
              <h3 className="text-lg font-bold mt-2 font-heading group-hover:text-yellow-200 transition-colors">
                Susun Puzzle Lambang
              </h3>
              <p className="text-xs text-white/90 mt-1 leading-relaxed">
                Tantangan menyusun potongan simbol kelima sila secara berurutan pada Perisai Garuda Pancasila.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-yellow-200">
              <span>Mainkan Sekarang</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Game D: Misi Kebaikan */}
          <div
            onClick={() => handleSelectGame('misi')}
            className="p-6 rounded-3xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl mb-4">
                🦸
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                Game 4
              </span>
              <h3 className="text-lg font-bold mt-2 font-heading group-hover:text-yellow-200 transition-colors">
                Misi Kebaikan Karakter
              </h3>
              <p className="text-xs text-white/90 mt-1 leading-relaxed">
                Bantu teman-teman dan warga mengatasi berbagai masalah dengan adil, gotong royong, dan cinta damai.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-yellow-200">
              <span>Mainkan Sekarang</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Game E: Benar atau Salah */}
          <div
            onClick={() => handleSelectGame('benarsalah')}
            className="p-6 rounded-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl mb-4">
                ⚡
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                Game 5
              </span>
              <h3 className="text-lg font-bold mt-2 font-heading group-hover:text-yellow-200 transition-colors">
                Kuis Benar atau Salah
              </h3>
              <p className="text-xs text-white/90 mt-1 leading-relaxed">
                Tentukan apakah pernyataan perilaku sesuai atau melanggar nilai-nilai luhur Pancasila.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-yellow-200">
              <span>Mainkan Sekarang</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Game F: Roda Tantangan Pancasila */}
          <div
            onClick={() => handleSelectGame('roda')}
            className="p-6 rounded-3xl bg-gradient-to-br from-yellow-500 to-amber-600 text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 group flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl mb-4">
                🎡
              </div>
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/20 text-white">
                Game 6
              </span>
              <h3 className="text-lg font-bold mt-2 font-heading group-hover:text-yellow-200 transition-colors">
                Roda Tantangan Pancasila
              </h3>
              <p className="text-xs text-white/90 mt-1 leading-relaxed">
                Putar roda keberuntungan dan selesaikan misi kejutan cepat untuk memenangkan koin bintang!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-yellow-200">
              <span>Mainkan Sekarang</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      )}

      {/* GAME 1: PILIH SIKAP */}
      {activeGame === 'sikap' && (
        <GamePilihSikap profile={profile} onReward={addReward} />
      )}

      {/* GAME 2: PASANGKAN NILAI */}
      {activeGame === 'pasang' && (
        <GamePasangkanNilai profile={profile} onReward={addReward} />
      )}

      {/* GAME 3: PUZZLE LAMBANG */}
      {activeGame === 'puzzle' && (
        <GamePuzzleLambang profile={profile} onReward={addReward} />
      )}

      {/* GAME 4: MISI KEBAIKAN */}
      {activeGame === 'misi' && (
        <GameMisiKebaikan profile={profile} onReward={addReward} />
      )}

      {/* GAME 5: BENAR ATAU SALAH */}
      {activeGame === 'benarsalah' && (
        <GameBenarSalah profile={profile} onReward={addReward} />
      )}

      {/* GAME 6: RODA TANTANGAN */}
      {activeGame === 'roda' && (
        <GameRodaTantangan profile={profile} onReward={addReward} />
      )}
    </div>
  );
};

/* -------------------------------------------------------------
 * SUB-GAME 1: PILIH SIKAP YANG TEPAT
 * ------------------------------------------------------------- */
function GamePilihSikap({
  profile,
  onReward
}: {
  profile: PlayerProfile;
  onReward: (pts: number, stars: number) => void;
}) {
  const [index, setIndex] = useState<number>(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const current = SIKAP_GAMES[index];
  const [shuffledPilihan, setShuffledPilihan] = useState(() => shuffleArray(current.pilihan));

  useEffect(() => {
    setShuffledPilihan(shuffleArray(current.pilihan));
    setSelected(null);
    setSubmitted(false);
  }, [index]);

  const handleSelect = (idx: number) => {
    if (submitted) return;
    playClickSound(profile.soundEnabled);
    setSelected(idx);
    setSubmitted(true);

    const isCorrect = shuffledPilihan[idx].benar;
    if (isCorrect) {
      playSuccessSound(profile.soundEnabled);
      setScore((s) => s + 20);
      onReward(20, 1);
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    } else {
      playErrorSound(profile.soundEnabled);
    }
  };

  const handleNext = () => {
    playClickSound(profile.soundEnabled);
    if (index + 1 < SIKAP_GAMES.length) {
      setIndex((i) => i + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      // Finished all
      playFanfareSound(profile.soundEnabled);
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
      setSubmitted(true);
    }
  };

  const isFinished = index === SIKAP_GAMES.length - 1 && submitted && selected !== null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Kasus {index + 1} dari {SIKAP_GAMES.length}
        </span>
        <span className="text-xs font-bold text-red-600">
          Skor: {score} Poin
        </span>
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Situasi Nyata:
        </span>
        <p className="text-base font-semibold text-slate-800 bg-amber-50/50 p-4 rounded-2xl border border-amber-200 leading-relaxed">
          "{current.situasi}"
        </p>
      </div>

      <div className="space-y-2.5">
        <span className="text-xs font-bold text-slate-700 block">
          Pilihan Sikapmu:
        </span>
        {shuffledPilihan.map((pil, idx) => {
          let style = 'bg-white border-slate-200 hover:border-amber-400 text-slate-700';
          if (submitted) {
            if (pil.benar) {
              style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-300';
            } else if (selected === idx && !pil.benar) {
              style = 'bg-rose-50 border-rose-400 text-rose-900';
            }
          }

          return (
            <button
              key={idx}
              disabled={submitted}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 ${style}`}
            >
              <span className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-900 shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <div className="flex-1">
                <span>{pil.teks}</span>
                {submitted && (selected === idx || pil.benar) && (
                  <p className={`text-[11px] mt-1.5 pt-1.5 border-t ${pil.benar ? 'border-emerald-200 text-emerald-700' : 'border-rose-200 text-rose-700'}`}>
                    {pil.alasan}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className="pt-2 flex justify-end">
          {index + 1 < SIKAP_GAMES.length ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Kasus Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-center w-full p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <span className="text-2xl block mb-1">🎉</span>
              <h4 className="text-sm font-bold text-emerald-900">
                Hebat! Kamu telah menyelesaikan semua situasi sikap!
              </h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                Total skor yang kamu raih: {score} poin.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------
 * SUB-GAME 2: PASANGKAN NILAI DAN CONTOH
 * ------------------------------------------------------------- */
function GamePasangkanNilai({
  profile,
  onReward
}: {
  profile: PlayerProfile;
  onReward: (pts: number, stars: number) => void;
}) {
  const [selectedSila, setSelectedSila] = useState<string | null>(null);
  const [selectedBehavior, setSelectedBehavior] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [attempts, setAttempts] = useState<number>(0);

  // Shuffle behavior cards
  const [shuffledBehaviors, setShuffledBehaviors] = useState<typeof PAIR_MATCH_DATA>([]);

  useEffect(() => {
    const copy = [...PAIR_MATCH_DATA].sort(() => Math.random() - 0.5);
    setShuffledBehaviors(copy);
  }, []);

  const handleSilaClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    playClickSound(profile.soundEnabled);
    setSelectedSila(id);
    if (selectedBehavior) {
      checkMatch(id, selectedBehavior);
    }
  };

  const handleBehaviorClick = (id: string) => {
    if (matchedIds.includes(id)) return;
    playClickSound(profile.soundEnabled);
    setSelectedBehavior(id);
    if (selectedSila) {
      checkMatch(selectedSila, id);
    }
  };

  const checkMatch = (silaId: string, behId: string) => {
    setAttempts((a) => a + 1);
    if (silaId === behId) {
      playSuccessSound(profile.soundEnabled);
      const newMatches = [...matchedIds, silaId];
      setMatchedIds(newMatches);
      setSelectedSila(null);
      setSelectedBehavior(null);
      onReward(25, 0);

      if (newMatches.length === PAIR_MATCH_DATA.length) {
        playFanfareSound(profile.soundEnabled);
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        onReward(50, 2);
      }
    } else {
      playErrorSound(profile.soundEnabled);
      setTimeout(() => {
        setSelectedSila(null);
        setSelectedBehavior(null);
      }, 700);
    }
  };

  const isCompleted = matchedIds.length === PAIR_MATCH_DATA.length;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 font-heading">
            Cocokkan Sila dan Perilaku Nyata
          </h3>
          <p className="text-xs text-slate-500">
            Klik satu kartu Sila di sebelah kiri, lalu klik kartu perilaku yang sesuai di sebelah kanan!
          </p>
        </div>
        <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
          Cocok: {matchedIds.length} / {PAIR_MATCH_DATA.length}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Sila Badges */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Kolom Sila Pancasila:
          </span>
          {PAIR_MATCH_DATA.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedSila === item.id;

            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => handleSilaClick(item.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-80 cursor-default'
                    : isSelected
                    ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400'
                    : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.symbol}</span>
                  <span className="text-xs sm:text-sm font-bold">{item.silaTitle}</span>
                </div>
                {isMatched && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
              </button>
            );
          })}
        </div>

        {/* Right Column: Perilaku Nyata */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Kolom Perilaku Sehari-hari:
          </span>
          {shuffledBehaviors.map((item) => {
            const isMatched = matchedIds.includes(item.id);
            const isSelected = selectedBehavior === item.id;

            return (
              <button
                key={item.id}
                disabled={isMatched}
                onClick={() => handleBehaviorClick(item.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition-all text-xs leading-relaxed ${
                  isMatched
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 opacity-80 cursor-default line-through'
                    : isSelected
                    ? 'bg-amber-100 border-amber-500 text-amber-950 font-bold ring-2 ring-amber-400'
                    : 'bg-white border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-slate-700'
                }`}
              >
                <span>{item.perilaku}</span>
              </button>
            );
          })}
        </div>
      </div>

      {isCompleted && (
        <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
          <Sparkles className="w-6 h-6 text-emerald-600 mx-auto" />
          <h4 className="text-sm font-bold text-emerald-900 font-heading">
            Selesai dengan Sempurna!
          </h4>
          <p className="text-xs text-emerald-700">
            Kamu telah berhasil mencocokkan kelima sila dengan perilaku yang tepat! (+50 Poin)
          </p>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------
 * SUB-GAME 3: PUZZLE LAMBANG PANCASILA
 * ------------------------------------------------------------- */
function GamePuzzleLambang({
  profile,
  onReward
}: {
  profile: PlayerProfile;
  onReward: (pts: number, stars: number) => void;
}) {
  // Players arrange the 5 symbols in correct order from Sila 1 to 5
  const [slots, setSlots] = useState<(PuzzleSymbol | null)[]>([null, null, null, null, null]);
  const [availablePieces, setAvailablePieces] = useState<PuzzleSymbol[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    // Shuffle pieces initially
    const shuffled = [...PUZZLE_DATA].sort(() => Math.random() - 0.5);
    setAvailablePieces(shuffled);
  }, []);

  const handlePlacePiece = (piece: PuzzleSymbol, targetIndex: number) => {
    playClickSound(profile.soundEnabled);
    if (piece.silaNumber === targetIndex + 1) {
      // Correct placement!
      playSuccessSound(profile.soundEnabled);
      const newSlots = [...slots];
      newSlots[targetIndex] = piece;
      setSlots(newSlots);
      setAvailablePieces(availablePieces.filter((p) => p.silaNumber !== piece.silaNumber));
      onReward(20, 0);

      // Check if all filled
      if (newSlots.every((s) => s !== null)) {
        setIsCompleted(true);
        playFanfareSound(profile.soundEnabled);
        confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
        onReward(60, 2);
      }
    } else {
      // Wrong position
      playErrorSound(profile.soundEnabled);
    }
  };

  const handleResetPuzzle = () => {
    playClickSound(profile.soundEnabled);
    setSlots([null, null, null, null, null]);
    setAvailablePieces([...PUZZLE_DATA].sort(() => Math.random() - 0.5));
    setIsCompleted(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 font-heading">
            Susun Perisai Lambang Pancasila
          </h3>
          <p className="text-xs text-slate-500">
            Letakkan simbol yang tepat pada slot Sila ke-1 sampai Sila ke-5 secara berurutan!
          </p>
        </div>
        <button
          onClick={handleResetPuzzle}
          className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
          title="Ulangi Puzzle"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Target Slots for Sila 1 to 5 */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Perisai Sila (Slot 1 sampai 5):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {slots.map((placed, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border-2 flex flex-col items-center justify-center text-center min-h-[140px] transition-all ${
                placed
                  ? 'bg-amber-50 border-amber-400 shadow-2xs'
                  : 'bg-slate-50 border-dashed border-slate-300'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                Sila Ke-{idx + 1}
              </span>
              {placed ? (
                <div className="space-y-1">
                  <span className="text-3xl block">{placed.symbol}</span>
                  <span className="text-xs font-bold text-slate-800 block">
                    {placed.name}
                  </span>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-xl text-slate-300 block mb-1">?</span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    Pilih simbol di bawah
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available Symbol Tiles */}
      {!isCompleted && availablePieces.length > 0 && (
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-slate-700 block">
            Pilih Simbol dan Klik Slot yang Sesuai:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {availablePieces.map((piece) => (
              <div
                key={piece.silaNumber}
                className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{piece.symbol}</span>
                  <div>
                    <h5 className="text-xs font-bold text-slate-800">{piece.name}</h5>
                    <p className="text-[10px] text-slate-500 leading-snug">{piece.clue}</p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between gap-1">
                  <span className="text-[10px] text-slate-500 font-semibold">Letakkan di:</span>
                  <div className="flex items-center gap-1">
                    {[0, 1, 2, 3, 4].map((slotIdx) => (
                      <button
                        key={slotIdx}
                        disabled={slots[slotIdx] !== null}
                        onClick={() => handlePlacePiece(piece, slotIdx)}
                        className={`w-6 h-6 rounded-md text-[10px] font-bold border transition-colors ${
                          slots[slotIdx] !== null
                            ? 'bg-slate-100 text-slate-300 border-slate-200 cursor-not-allowed'
                            : 'bg-white hover:bg-red-600 hover:text-white text-slate-700 border-amber-300'
                        }`}
                        title={`Letakkan di Sila ${slotIdx + 1}`}
                      >
                        {slotIdx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isCompleted && (
        <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
          <span className="text-4xl block">🛡️</span>
          <h4 className="text-base font-bold text-emerald-950 font-heading">
            Luar Biasa! Perisai Garuda Pancasila Tersusun Rapi!
          </h4>
          <p className="text-xs text-emerald-800 max-w-md mx-auto">
            Urutan lambang dari Sila 1 (Bintang), Sila 2 (Rantai), Sila 3 (Pohon Beringin), Sila 4 (Kepala Banteng), hingga Sila 5 (Padi dan Kapas) telah tepat!
          </p>
          <button
            onClick={handleResetPuzzle}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
          >
            Mainkan Lagi
          </button>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------
 * SUB-GAME 4: MISI KEBAIKAN
 * ------------------------------------------------------------- */
function GameMisiKebaikan({
  profile,
  onReward
}: {
  profile: PlayerProfile;
  onReward: (pts: number, stars: number) => void;
}) {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedSolusi, setSelectedSolusi] = useState<number | null>(null);

  const misi = MISI_KEBAIKAN_DATA[currentIdx];
  const [shuffledSolusi, setShuffledSolusi] = useState(() => shuffleArray(misi.solusi));

  useEffect(() => {
    setShuffledSolusi(shuffleArray(misi.solusi));
    setSelectedSolusi(null);
  }, [currentIdx]);

  const handlePilihSolusi = (idx: number) => {
    if (selectedSolusi !== null) return;
    playClickSound(profile.soundEnabled);
    setSelectedSolusi(idx);

    const sol = shuffledSolusi[idx];
    if (sol.rekomendasi) {
      playSuccessSound(profile.soundEnabled);
      onReward(sol.poin, 1);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } else {
      playErrorSound(profile.soundEnabled);
      onReward(sol.poin, 0);
    }
  };

  const handleNextMisi = () => {
    playClickSound(profile.soundEnabled);
    setSelectedSolusi(null);
    setCurrentIdx((prev) => (prev + 1) % MISI_KEBAIKAN_DATA.length);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
          Misi {currentIdx + 1} dari {MISI_KEBAIKAN_DATA.length}
        </span>
        <span className="text-xs text-slate-500 font-medium">
          Lokasi: {misi.lokasi}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-5 h-5 text-red-500" />
          <h3 className="text-lg font-bold text-slate-800 font-heading">
            {misi.judul}
          </h3>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/60 p-4 rounded-2xl border border-amber-200">
          {misi.kisah}
        </p>
      </div>

      <div className="space-y-2.5">
        <span className="text-xs font-bold text-slate-700 block">
          Pilihan Bantuan yang Kamu Berikan:
        </span>
        {shuffledSolusi.map((sol, idx) => {
          let style = 'bg-white border-slate-200 hover:border-amber-400 text-slate-700';

          if (selectedSolusi !== null) {
            if (sol.rekomendasi) {
              style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-300';
            } else if (selectedSolusi === idx && !sol.rekomendasi) {
              style = 'bg-rose-50 border-rose-400 text-rose-900';
            }
          }

          return (
            <button
              key={idx}
              disabled={selectedSolusi !== null}
              onClick={() => handlePilihSolusi(idx)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm ${style}`}
            >
              <div className="font-semibold leading-snug">{sol.opsi}</div>
              {selectedSolusi !== null && (selectedSolusi === idx || sol.rekomendasi) && (
                <div className={`mt-2 pt-2 border-t text-[11px] ${sol.rekomendasi ? 'border-emerald-200 text-emerald-700' : 'border-rose-200 text-rose-700'}`}>
                  <strong>Dampak:</strong> {sol.dampak}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedSolusi !== null && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleNextMisi}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <span>Misi Selanjutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------
 * SUB-GAME 5: BENAR ATAU SALAH
 * ------------------------------------------------------------- */
function GameBenarSalah({
  profile,
  onReward
}: {
  profile: PlayerProfile;
  onReward: (pts: number, stars: number) => void;
}) {
  const [index, setIndex] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);

  const current = BENAR_SALAH_DATA[index];

  const handleAnswer = (choice: boolean) => {
    if (answered !== null) return;
    playClickSound(profile.soundEnabled);
    setAnswered(choice);

    const isCorrect = choice === current.jawabanBenar;
    if (isCorrect) {
      playSuccessSound(profile.soundEnabled);
      setScore((s) => s + 15);
      onReward(15, 0);
      confetti({ particleCount: 25, spread: 45, origin: { y: 0.6 } });
    } else {
      playErrorSound(profile.soundEnabled);
    }
  };

  const handleNext = () => {
    playClickSound(profile.soundEnabled);
    if (index + 1 < BENAR_SALAH_DATA.length) {
      setIndex((i) => i + 1);
      setAnswered(null);
    } else {
      playFanfareSound(profile.soundEnabled);
      confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
      onReward(40, 1);
    }
  };

  const isCompleted = index === BENAR_SALAH_DATA.length - 1 && answered !== null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs max-w-xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
          Pernyataan {index + 1} dari {BENAR_SALAH_DATA.length}
        </span>
        <span className="text-xs font-bold text-red-600">
          Skor: {score} Poin
        </span>
      </div>

      <div className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200 text-center space-y-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
          Apakah Sikap Ini Sesuai dengan Nilai Pancasila?
        </span>
        <p className="text-base sm:text-lg font-bold text-slate-800 leading-snug">
          "{current.pernyataan}"
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          disabled={answered !== null}
          onClick={() => handleAnswer(true)}
          className={`py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border-2 transition-all ${
            answered !== null
              ? current.jawabanBenar
                ? 'bg-emerald-500 text-white border-emerald-600 ring-2 ring-emerald-300'
                : 'bg-slate-100 text-slate-400 border-slate-200'
              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
          }`}
        >
          <ThumbsUp className="w-5 h-5" />
          <span>BENAR</span>
        </button>

        <button
          disabled={answered !== null}
          onClick={() => handleAnswer(false)}
          className={`py-4 px-6 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 border-2 transition-all ${
            answered !== null
              ? !current.jawabanBenar
                ? 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-300'
                : 'bg-slate-100 text-slate-400 border-slate-200'
              : 'bg-rose-50 hover:bg-rose-100 text-rose-800 border-rose-300'
          }`}
        >
          <ThumbsDown className="w-5 h-5" />
          <span>SALAH</span>
        </button>
      </div>

      {answered !== null && (
        <div
          className={`p-4 rounded-2xl border text-xs leading-relaxed ${
            answered === current.jawabanBenar
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <strong>{answered === current.jawabanBenar ? 'Tepat sekali!' : 'Belum tepat!'}</strong>{' '}
          {current.penjelasan}
        </div>
      )}

      {answered !== null && (
        <div className="pt-2 flex justify-end">
          {index + 1 < BENAR_SALAH_DATA.length ? (
            <button
              onClick={handleNext}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Lanjut</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-center w-full p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <h4 className="text-sm font-bold text-emerald-900 font-heading">
                Hebat! Selesai menjawab semua pernyataan!
              </h4>
              <p className="text-xs text-emerald-700 mt-0.5">
                Total skor yang kamu peroleh: {score} poin.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------
 * SUB-GAME 6: RODA TANTANGAN PANCASILA
 * ------------------------------------------------------------- */
function GameRodaTantangan({
  profile,
  onReward
}: {
  profile: PlayerProfile;
  onReward: (pts: number, stars: number) => void;
}) {
  const [spinning, setSpinning] = useState<boolean>(false);
  const [rotation, setRotation] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<typeof RODA_TANTANGAN_DATA[0] | null>(null);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const totalWedges = RODA_TANTANGAN_DATA.length;
  const wedgeAngle = (2 * Math.PI) / totalWedges;

  // Draw the spinning wheel canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const center = size / 2;
    const radius = center - 10;

    ctx.clearRect(0, 0, size, size);

    // Draw wedges
    RODA_TANTANGAN_DATA.forEach((wedge, i) => {
      const start = i * wedgeAngle;
      const end = start + wedgeAngle;

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, start, end);
      ctx.closePath();
      ctx.fillStyle = wedge.color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();

      // Label text
      ctx.save();
      ctx.translate(center, center);
      ctx.rotate(start + wedgeAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(wedge.title.split(':')[0], radius - 20, 4);
      ctx.restore();
    });

    // Center pin
    ctx.beginPath();
    ctx.arc(center, center, 22, 0, 2 * Math.PI);
    ctx.fillStyle = '#FFFFFF';
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#F59E0B';
    ctx.stroke();

    ctx.fillStyle = '#B45309';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⭐', center, center);
  }, []);

  const handleSpin = () => {
    if (spinning) return;
    playWheelTickSound(profile.soundEnabled);
    setSpinning(true);
    setSelectedItem(null);
    setSelectedQuizAnswer(null);
    setQuizSubmitted(false);

    // Pick random target wedge
    const targetIdx = Math.floor(Math.random() * totalWedges);
    const spins = 5 + Math.floor(Math.random() * 3); // 5 to 7 full revolutions
    const segmentDegree = 360 / totalWedges;
    // Align wheel so top indicator points to target
    const targetDegree = 360 * spins + (360 - targetIdx * segmentDegree - segmentDegree / 2);

    setRotation((prev) => prev + targetDegree);

    // Simulation of tick sound during spin
    const interval = setInterval(() => {
      playWheelTickSound(profile.soundEnabled);
    }, 180);

    setTimeout(() => {
      clearInterval(interval);
      setSpinning(false);
      const target = RODA_TANTANGAN_DATA[targetIdx];
      const correctAnswer = target.pilihan[target.kunci];
      const shuffled = shuffleArray(target.pilihan);
      const newKunci = shuffled.indexOf(correctAnswer);
      setSelectedItem({
        ...target,
        pilihan: shuffled,
        kunci: newKunci
      });
      playSuccessSound(profile.soundEnabled);
      confetti({ particleCount: 35, spread: 50, origin: { y: 0.6 } });
    }, 3200);
  };

  const handleAnswerQuiz = (idx: number) => {
    if (!selectedItem || quizSubmitted) return;
    playClickSound(profile.soundEnabled);
    setSelectedQuizAnswer(idx);
    setQuizSubmitted(true);

    if (idx === selectedItem.kunci) {
      playSuccessSound(profile.soundEnabled);
      onReward(30, 1);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } else {
      playErrorSound(profile.soundEnabled);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs max-w-xl mx-auto space-y-6 text-center">
      <div>
        <h3 className="text-xl font-bold text-slate-800 font-heading">
          Putar Roda Tantangan Pancasila
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Putar roda keberuntungan dan buktikan ketangkasanmu menjawab misi kejutan!
        </p>
      </div>

      {/* Spinning Wheel Canvas with pointer */}
      <div className="relative inline-block my-2">
        {/* Needle Pointer at Top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10 w-0 h-0 border-x-8 border-x-transparent border-t-16 border-t-red-600 drop-shadow-md" />

        <div
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? 'transform 3.2s cubic-bezier(0.15, 0.9, 0.25, 1)' : 'none'
          }}
          className="rounded-full shadow-lg border-4 border-amber-300"
        >
          <canvas ref={canvasRef} width={280} height={280} className="rounded-full" />
        </div>
      </div>

      {/* Spin Button */}
      <div>
        <button
          disabled={spinning}
          onClick={handleSpin}
          className={`px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all ${
            spinning
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white hover:scale-105 active:scale-95'
          }`}
        >
          {spinning ? 'Roda Sedang Berputar...' : '🎯 Putar Roda Tantangan!'}
        </button>
      </div>

      {/* Target Mission Card */}
      {selectedItem && (
        <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-left space-y-4 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between border-b border-amber-200 pb-2">
            <span className="text-xs font-bold text-amber-900">
              {selectedItem.title}
            </span>
            <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded-full">
              {selectedItem.tantangan}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-800">
            {selectedItem.pertanyaan}
          </p>

          <div className="space-y-2">
            {selectedItem.pilihan.map((pil, idx) => {
              let style = 'bg-white border-amber-200 hover:border-amber-400 text-slate-700';

              if (quizSubmitted) {
                if (idx === selectedItem.kunci) {
                  style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-2 ring-emerald-300';
                } else if (selectedQuizAnswer === idx) {
                  style = 'bg-rose-50 border-rose-400 text-rose-900';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={quizSubmitted}
                  onClick={() => handleAnswerQuiz(idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-all text-xs flex items-center gap-2.5 ${style}`}
                >
                  <span className="w-5 h-5 rounded-md bg-amber-100 flex items-center justify-center text-[10px] font-bold text-amber-900 shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{pil}</span>
                </button>
              );
            })}
          </div>

          {quizSubmitted && (
            <div className="p-3 bg-white rounded-xl border border-amber-200 text-[11px] text-slate-600">
              <strong>Pembahasan:</strong> {selectedItem.penjelasan}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
