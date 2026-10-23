import React from 'react';
import { PlayerProfile, TabType } from '../types';
import { AVATARS, SILA_MATERI } from '../data/pancasilaData';
import { ASSETS } from '../assets';
import { playClickSound, playSuccessSound } from '../utils/audio';
import { 
  loadCustomHeroPhoto, 
  saveCustomHeroPhoto, 
  resetCustomHeroPhoto 
} from '../utils/storage';
import { NusantaraCultureCard } from './NusantaraCultureCard';
import { 
  Compass, 
  BookOpen, 
  Gamepad2, 
  CheckSquare, 
  Award, 
  Star, 
  ChevronRight, 
  Sparkles, 
  Heart, 
  ShieldCheck, 
  Users, 
  Volume2,
  Camera,
  Image as ImageIcon,
  RotateCcw,
  Check,
  X,
  UserPlus,
  GraduationCap,
  Trophy,
  Flame,
  Maximize2,
  ExternalLink,
  Film,
  Copy,
  BookmarkCheck,
  Library
} from 'lucide-react';

interface HomeViewProps {
  profile: PlayerProfile;
  customPhoto?: string | null;
  onUpdateCustomPhoto?: (dataUrl: string) => void;
  onNavigate: (tab: TabType, extra?: { silaId?: number; levelId?: number }) => void;
  onOpenCertificate: () => void;
  onOpenHelp: () => void;
  onCreateNewPlayer?: (name: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  profile,
  onNavigate,
  onOpenCertificate,
  onOpenHelp,
  onCreateNewPlayer
}) => {
  const [customHeroPhoto, setCustomHeroPhoto] = React.useState<string | null>(() => loadCustomHeroPhoto());
  const [showPhotoModal, setShowPhotoModal] = React.useState<boolean>(false);
  const [showPosterZoom, setShowPosterZoom] = React.useState<boolean>(false);
  const [showNewPlayerModal, setShowNewPlayerModal] = React.useState<boolean>(false);
  const [newPlayerName, setNewPlayerName] = React.useState<string>('');
  const [copiedCitation, setCopiedCitation] = React.useState<string | null>(null);
  const heroFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleCopyCitation = (text: string, id: string) => {
    try {
      navigator.clipboard.writeText(text);
      setCopiedCitation(id);
      setTimeout(() => setCopiedCitation(null), 2500);
    } catch (e) {
      console.warn('Failed to copy citation', e);
    }
  };

  const handleSelectPresetPhoto = (imgSrc: string) => {
    playSuccessSound(profile.soundEnabled);
    saveCustomHeroPhoto(imgSrc);
    setCustomHeroPhoto(imgSrc);
    setShowPhotoModal(false);
  };

  const handleUploadHeroFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          playSuccessSound(profile.soundEnabled);
          saveCustomHeroPhoto(result);
          setCustomHeroPhoto(result);
          setShowPhotoModal(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetHeroPhoto = () => {
    playClickSound(profile.soundEnabled);
    resetCustomHeroPhoto();
    setCustomHeroPhoto(null);
    setShowPhotoModal(false);
  };
  const currentAvatar = AVATARS.find((a) => a.id === profile.avatarId) || AVATARS[0];

  // Calculate overall learning progress
  const totalLevels = 5;
  const levelProgress = Math.min(100, Math.round((profile.completedLevels.length / totalLevels) * 50));
  const evaluasiProgress = profile.evaluasiBestScore ? Math.round((profile.evaluasiBestScore / 100) * 30) : 0;
  const reflectionProgress = Math.min(20, (profile.completedReflections.length / 5) * 20);
  const totalProgress = Math.min(100, levelProgress + evaluasiProgress + reflectionProgress);

  const nextLevel = profile.unlockedLevel <= 5 ? profile.unlockedLevel : 5;

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg border-2 border-red-400/40">
        {/* Harmonious Bendera Merah Putih Ribbons */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-700 via-red-600 to-red-700 shadow-xs z-20 pointer-events-none" />
        <div className="absolute top-2 left-0 right-0 h-1 bg-gradient-to-r from-white via-amber-100 to-white z-20 pointer-events-none shadow-2xs" />
        <div className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-white via-amber-100 to-white z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-700 via-red-600 to-red-700 z-20 pointer-events-none" />

        {/* Vivid Poster Nusantara Blend */}
        <div 
          className="absolute inset-0 bg-cover bg-top opacity-35 pointer-events-none mix-blend-overlay filter contrast-110 saturate-125"
          style={{ backgroundImage: `url(${ASSETS.posterNusantara})` }}
        />

        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="batik-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="4" fill="white" />
                <path d="M0 20 Q10 10 20 20 T40 20" stroke="white" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#batik-pattern)" />
          </svg>
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8 lg:p-10 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-amber-100 border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                <span>Game Edukatif Anak Bangsa Indonesia</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-950/40 backdrop-blur-sm text-[11px] font-bold text-yellow-200 border border-yellow-300/40">
                <span>🇮🇩 Merah Putih</span>
                <span>·</span>
                <span>🏛️ Sumatra</span>
                <span>·</span>
                <span>🛕 Jawa</span>
                <span>·</span>
                <span>⛩️ Bali</span>
                <span>·</span>
                <span>🏕️ Borneo</span>
                <span>·</span>
                <span>⛵ Sulawesi</span>
                <span>·</span>
                <span>🛖 Papua</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight font-heading">
              Petualangan <br />
              <span className="text-yellow-300">Pancasila</span> Ceria!
            </h1>

            <p className="text-white/90 text-sm sm:text-base leading-relaxed max-w-xl">
              Halo <strong className="text-yellow-200">{profile.name}</strong>! Mari menjelajah lima pulau kebaikan Nusantara, belajar nilai luhur Pancasila melalui cerita seru, rumah adat megah, permainan daerah asyik, dan petualangan mendidik!
            </p>

            {/* Sapaan Ramah Anak Nusantara Ticker */}
            <div className="p-2.5 rounded-2xl bg-black/25 backdrop-blur-xs border border-white/20 text-xs text-amber-100 flex items-center gap-2 max-w-lg shadow-inner">
              <span className="text-base shrink-0">👋</span>
              <span className="italic leading-snug">
                Sapaan Kawan Nusantara: <strong>“Horas! Sugeng Rawuh! Om Swastiastu! Tabe'! Amolongo!”</strong>
              </span>
            </div>

            {/* Quick Action CTA buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  playClickSound(profile.soundEnabled);
                  onNavigate('level-play', { levelId: nextLevel });
                }}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm sm:text-base rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-102 active:scale-98 flex items-center gap-2 group cursor-pointer"
              >
                <span>Mulai Bermain Level {nextLevel}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  playClickSound(profile.soundEnabled);
                  onNavigate('materi');
                }}
                className="px-5 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold text-sm sm:text-base rounded-2xl border border-white/30 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" />
                <span>Materi Pembelajaran</span>
              </button>

              <button
                onClick={() => {
                  playClickSound(profile.soundEnabled);
                  onNavigate('peringkat');
                }}
                className="px-5 py-3 bg-amber-400/20 hover:bg-amber-400/30 text-amber-100 hover:text-white font-semibold text-sm sm:text-base rounded-2xl border border-amber-300/40 backdrop-blur-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Trophy className="w-4 h-4 text-yellow-300" />
                <span>Peringkat</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration with Photo Changer */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md aspect-16/10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/40 bg-amber-100 group">
              <img
                src={customHeroPhoto || ASSETS.posterNusantara}
                alt="Poster Petualangan Pancasila: Garuda Pancasila, Peta Nusantara, dan Anak-anak Berbusana Adat"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 cursor-pointer"
                onClick={() => {
                  playClickSound(profile.soundEnabled);
                  setShowPosterZoom(true);
                }}
              />
              <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-md rounded-xl px-3 py-1.5 text-white text-[11px] flex items-center justify-between">
                <span>Bersatu dalam Keberagaman</span>
                <span className="font-bold text-amber-300">Bhinneka Tunggal Ika</span>
              </div>

              {/* Perbesar Poster Button */}
              <button
                type="button"
                onClick={() => {
                  playClickSound(profile.soundEnabled);
                  setShowPosterZoom(true);
                }}
                className="absolute top-2.5 left-2.5 bg-slate-900/80 hover:bg-amber-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl shadow-lg backdrop-blur-xs flex items-center gap-1 transition-all opacity-90 hover:opacity-100 cursor-pointer"
                title="Perbesar Poster Nusantara"
              >
                <Maximize2 className="w-3.5 h-3.5 text-yellow-300" />
                <span className="hidden sm:inline">Perbesar</span>
              </button>

              {/* Ubah Foto Button */}
              <button
                type="button"
                onClick={() => {
                  playClickSound(profile.soundEnabled);
                  setShowPhotoModal(true);
                }}
                className="absolute top-2.5 right-2.5 bg-slate-900/80 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-xs flex items-center gap-1.5 transition-all opacity-95 hover:opacity-100 cursor-pointer"
                title="Klik untuk memilih atau mengubah foto ilustrasi anak bangsa"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Ubah Tema</span>
              </button>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <button
                type="button"
                onClick={() => {
                  playClickSound(profile.soundEnabled);
                  setShowPosterZoom(true);
                }}
                className="text-[11px] text-yellow-200 hover:text-white font-bold flex items-center gap-1 underline underline-offset-2 cursor-pointer"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Buka Poster Resolusi Tinggi</span>
              </button>
              <span className="text-white/40">·</span>
              <button
                type="button"
                onClick={() => {
                  playClickSound(profile.soundEnabled);
                  setShowPhotoModal(true);
                }}
                className="text-[11px] text-white/90 hover:text-yellow-200 font-semibold flex items-center gap-1 underline underline-offset-2 cursor-pointer"
              >
                <ImageIcon className="w-3 h-3" />
                <span>Ganti Ilustrasi / Unggah Foto Sekolah</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Player Dashboard & Status Card */}
      <section className="bg-white/94 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-md border-2 border-amber-300/80 relative overflow-hidden">
        {/* Top subtle Merah Putih ribbon accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          {/* Avatar and Welcome */}
          <div className="flex items-center gap-4">
            <div 
              onClick={() => onNavigate('profil')}
              className={`w-16 h-16 rounded-2xl ${currentAvatar.avatarBg} flex items-center justify-center text-3xl shadow-xs border-2 cursor-pointer hover:scale-105 transition-transform`}
              title="Ganti Karakter di Profil"
            >
              <span>{currentAvatar.emoji}</span>
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold text-slate-800 font-heading">{profile.name}</h2>
                <span className="text-xs bg-amber-100 text-amber-800 font-semibold px-2.5 py-0.5 rounded-full border border-amber-300">
                  {currentAvatar.region}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound(profile.soundEnabled);
                    setShowNewPlayerModal(true);
                  }}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 hover:text-white bg-amber-50 hover:bg-amber-600 px-2.5 py-1 rounded-lg border border-amber-300 transition-colors cursor-pointer"
                  title="Masuk sebagai pemain baru dengan 0 poin & 0 bintang"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Pemain Baru</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {currentAvatar.description}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full md:w-64 space-y-1.5">
            <div className="flex justify-between items-center text-xs font-semibold">
              <span className="text-slate-600">Kemajuan Belajar</span>
              <span className="text-red-600 tabular-nums">{totalProgress}%</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-red-500 to-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${totalProgress}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-400 block text-right">
              {profile.completedLevels.length}/5 Level Tuntas
            </span>
          </div>
        </div>

        {/* 4 Stat Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6">
          <div className="p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center text-white shadow-xs">
              <Star className="w-5 h-5 fill-white" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">Total Bintang</span>
              <span className="text-lg font-bold text-slate-800 tabular-nums">{profile.stars}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500 flex items-center justify-center text-white shadow-xs">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">Total Poin</span>
              <span className="text-lg font-bold text-slate-800 tabular-nums">{profile.points}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-xs">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">Level Terbuka</span>
              <span className="text-lg font-bold text-slate-800 tabular-nums">Level {profile.unlockedLevel} / 5</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-50/80 border border-sky-200/80 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[11px] text-slate-500 block font-medium">Lencana Diraih</span>
              <span className="text-lg font-bold text-slate-800 tabular-nums">{profile.badges.length} / 6</span>
            </div>
          </div>
        </div>

        {/* Certificate banner if player is Duta Pancasila */}
        {profile.isDutaPancasila && (
          <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-300 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏆</span>
              <div>
                <h4 className="text-sm font-bold text-amber-900 font-heading">
                  Selamat! Kamu telah menjadi Duta Pancasila
                </h4>
                <p className="text-xs text-amber-700">
                  Kamu telah menuntaskan seluruh petualangan dan evaluasi nilai kebangsaan.
                </p>
              </div>
            </div>
            <button
              onClick={onOpenCertificate}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors shrink-0"
            >
              Lihat Sertifikat
            </button>
          </div>
        )}
      </section>

      {/* Pojok Budaya & Sahabat Nusantara Ceria */}
      <NusantaraCultureCard soundEnabled={profile.soundEnabled} />

      {/* Main Navigation Launchpad */}
      <section className="space-y-4">
        <div className="flex items-center justify-between bg-white/92 backdrop-blur-md p-4 sm:p-5 rounded-2xl border-2 border-amber-300/80 shadow-md relative overflow-hidden">
          {/* Harmonious Bendera Merah Putih Top Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300 mb-1">
              <span>🎮</span>
              <span>Wahana Belajar & Bermain</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 font-heading">
              Jelajahi Menu Utama
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
              Pilih aktivitas petualangan yang ingin kamu ikuti hari ini!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Card 1: Peta Petualangan */}
          <div
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onNavigate('peta');
            }}
            className="group p-5 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl">
                🗺️
              </div>
              <span className="text-[11px] font-bold bg-white/25 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Petualangan
              </span>
            </div>
            <h3 className="text-xl font-bold mt-4 font-heading group-hover:text-yellow-200 transition-colors">
              Peta Level Nusantara
            </h3>
            <p className="text-white/90 text-xs mt-1 leading-relaxed">
              Jelajahi 5 zona: Desa Kerukunan, Kota Empati, Pulau Persatuan, Balai Musyawarah, dan Negeri Keadilan!
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-yellow-200">
              <span>Buka Peta Petualangan</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Materi Pembelajaran */}
          <div
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onNavigate('materi');
            }}
            className="group p-5 bg-gradient-to-br from-red-500 to-rose-600 rounded-3xl text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl">
                📖
              </div>
              <span className="text-[11px] font-bold bg-white/25 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Edukasi
              </span>
            </div>
            <h3 className="text-xl font-bold mt-4 font-heading group-hover:text-yellow-200 transition-colors">
              Materi 5 Sila Pancasila
            </h3>
            <p className="text-white/90 text-xs mt-1 leading-relaxed">
              Pelajari bunyi, lambang, arti, dan contoh nyata di rumah, sekolah, dan lingkungan masyarakat.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-yellow-200">
              <span>Mulai Belajar</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Game Edukasi */}
          <div
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onNavigate('games');
            }}
            className="group p-5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl">
                🎮
              </div>
              <span className="text-[11px] font-bold bg-white/25 px-2.5 py-1 rounded-full uppercase tracking-wider">
                6 Permainan
              </span>
            </div>
            <h3 className="text-xl font-bold mt-4 font-heading group-hover:text-yellow-200 transition-colors">
              Arena Game Pancasila
            </h3>
            <p className="text-white/90 text-xs mt-1 leading-relaxed">
              Mainkan Pilih Sikap, Pasangkan Nilai, Puzzle Lambang, Misi Kebaikan, Benar/Salah, dan Roda Tantangan!
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-yellow-200">
              <span>Mainkan Semua Game</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Evaluasi */}
          <div
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onNavigate('evaluasi');
            }}
            className="group p-5 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-3xl text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl">
                ✍️
              </div>
              <span className="text-[11px] font-bold bg-white/25 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Ujian Pemahaman
              </span>
            </div>
            <h3 className="text-xl font-bold mt-4 font-heading group-hover:text-yellow-200 transition-colors">
              Evaluasi Interaktif
            </h3>
            <p className="text-white/90 text-xs mt-1 leading-relaxed">
              Uji pemahamanmu lewat 12 soal ceria sehari-hari. Raih skor 90-100 untuk mendapatkan 3 Bintang Emas!
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-yellow-200">
              <span>Mulai Evaluasi</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 5: Profil & Lencana */}
          <div
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onNavigate('profil');
            }}
            className="group p-5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl">
                🎖️
              </div>
              <span className="text-[11px] font-bold bg-white/25 px-2.5 py-1 rounded-full uppercase tracking-wider">
                Koleksi
              </span>
            </div>
            <h3 className="text-xl font-bold mt-4 font-heading group-hover:text-yellow-200 transition-colors">
              Profil & Galeri Lencana
            </h3>
            <p className="text-white/90 text-xs mt-1 leading-relaxed">
              Ganti karakter anak daerah, pantau pencapaian, dan cetak Sertifikat Resmi Duta Pancasila!
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-yellow-200">
              <span>Buka Profil</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 6: Papan Peringkat Juara Nusantara */}
          <div
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onNavigate('peringkat');
            }}
            className="group p-5 bg-gradient-to-br from-amber-500 via-yellow-500 to-orange-500 rounded-3xl text-slate-900 shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden ring-2 ring-yellow-300/60"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/40 backdrop-blur-xs flex items-center justify-center text-2xl shadow-2xs">
                🏆
              </div>
              <span className="text-[11px] font-extrabold bg-slate-900 text-yellow-300 px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                Live Firebase
              </span>
            </div>
            <h3 className="text-xl font-extrabold mt-4 font-heading group-hover:text-red-800 transition-colors">
              Papan Peringkat Siswa
            </h3>
            <p className="text-slate-800 text-xs mt-1 leading-relaxed font-medium">
              Lihat skor tertinggi kawan-kawan dari seluruh level. Raih podium teratas dan buktikan semangat juaramu!
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-extrabold text-red-700">
              <span>Buka Papan Peringkat</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 7: Portal Guru & Rekap Hasil Siswa */}
          <div
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onNavigate('guru');
            }}
            className="group p-5 bg-gradient-to-br from-amber-600 to-red-600 rounded-3xl text-white shadow-sm hover:shadow-md transition-all cursor-pointer hover:-translate-y-1 relative overflow-hidden ring-2 ring-amber-300/40"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl">
                👩‍🏫
              </div>
              <span className="text-[11px] font-bold bg-yellow-300 text-slate-900 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-xs">
                Khusus Guru
              </span>
            </div>
            <h3 className="text-xl font-bold mt-4 font-heading group-hover:text-yellow-200 transition-colors">
              Portal Guru & Rekap Hasil
            </h3>
            <p className="text-white/90 text-xs mt-1 leading-relaxed">
              Tautan khusus guru untuk menampung data siswa, integrasi Google Form, unduh CSV, dan cetak rekapitulasi nilai.
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-yellow-200">
              <span>Buka Portal Guru</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Creator Spotlight Showcase */}
      <section className="bg-gradient-to-r from-amber-50 via-white to-amber-50 rounded-3xl p-6 sm:p-7 border border-amber-300/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-amber-500 to-red-600 shadow-md flex items-center justify-center text-white border-2 border-amber-300">
              <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-amber-100" />
            </div>
            <span className="mt-1.5 text-[10px] text-amber-900 font-bold bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300/70">
              Pengembang Media
            </span>
          </div>
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider block font-heading">
              Media Pembelajaran Interaktif Siswa SD
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-800 font-heading">
              Karya: Riska Zulfa Luthfiyyah, S.Pd.
            </h3>
            <p className="text-xs text-slate-600 max-w-xl leading-relaxed">
              Dirancang khusus oleh pendidik bangsa untuk mendukung pembelajaran Pendidikan Pancasila jenjang Sekolah Dasar agar lebih kontekstual, inklusif, ceria, dan menginspirasi pengamalan nilai luhur bangsa.
            </p>
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-2 text-[11px] font-medium text-slate-500">
              <span className="inline-flex items-center gap-1 bg-amber-100/60 px-2 py-0.5 rounded-md text-amber-900 font-semibold">
                🎓 Pendidik Bangsa
              </span>
              <span className="inline-flex items-center gap-1 bg-red-100/60 px-2 py-0.5 rounded-md text-red-900 font-semibold">
                🇮🇩 Nilai-Nilai Pancasila
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            playClickSound(profile.soundEnabled);
            onNavigate('guru');
          }}
          className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors shrink-0 flex items-center gap-2"
        >
          <span>Akses Portal Guru</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </section>

      {/* 5 Sila Quick Explore Carousel / Grid */}
      <section className="bg-white/94 backdrop-blur-md rounded-3xl p-6 sm:p-7 shadow-md border-2 border-amber-300/80 space-y-4 relative overflow-hidden">
        {/* Top subtle Merah Putih ribbon accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-800 font-heading">
              Lima Butir Nilai Pancasila
            </h2>
            <p className="text-xs text-slate-500">
              Klik sila untuk langsung mempelajari penerapannya di kehidupan sehari-hari
            </p>
          </div>
          <button
            onClick={() => onNavigate('materi')}
            className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {SILA_MATERI.map((sila) => (
            <div
              key={sila.number}
              onClick={() => {
                playClickSound(profile.soundEnabled);
                onNavigate('materi', { silaId: sila.number });
              }}
              className="p-4 rounded-2xl bg-amber-50/50 hover:bg-amber-100/60 border border-amber-200/70 transition-all cursor-pointer hover:-translate-y-1 group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{sila.lambang}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white border border-amber-200 text-amber-900">
                    Sila {sila.number}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-red-600 transition-colors line-clamp-2">
                  {sila.bunyi}
                </h4>
              </div>
              <div className="mt-3 pt-2 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                <span>{sila.lambangDeskripsi.split(' ')[0]} {sila.lambangDeskripsi.split(' ')[1]}</span>
                <ChevronRight className="w-3.5 h-3.5 text-amber-600 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daftar Sumber & Rujukan Pembelajaran Section */}
      <section className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-amber-200/90 shadow-lg space-y-6 relative overflow-hidden">
        {/* Harmonious Bendera Merah Putih Ribbon on top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />
        <div className="absolute top-1.5 left-0 right-0 h-1 bg-white/80 border-b border-amber-200/50" />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] sm:text-xs font-bold text-red-600 uppercase tracking-wider bg-red-50 px-2.5 py-0.5 rounded-full border border-red-200 flex items-center gap-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-red-600" />
                <span>Pustaka & Akuntabilitas Akademik</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-heading">
              Daftar Sumber & Rujukan Pembelajaran
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Materi pembelajaran, modul interaktif, dan video edukasi dalam aplikasi Petualangan Pancasila ini berlandaskan pada kurikulum resmi serta karya sumber terbuka berkualitas:
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-amber-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 shrink-0 font-bold shadow-2xs">
            <Library className="w-4 h-4 text-amber-600" />
            <span>Kurikulum Merdeka SD</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Rujukan 1: Video Pembelajaran Karya Dio putra Pratama */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-red-50/70 to-rose-50/50 border border-red-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-2xs">
                  <Film className="w-3.5 h-3.5" />
                  <span>Media Video Pembelajaran</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Tahun 2022</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading leading-snug">
                  Penerapan Nilai-Nilai Pancasila
                </h3>
                <p className="text-xs font-bold text-red-700 mt-0.5">
                  Karya: Dio putra Pratama (2022)
                </p>
              </div>

              {/* Box Sitasi Standar */}
              <div className="p-3 bg-white/90 rounded-xl border border-red-200 text-xs text-slate-700 leading-relaxed font-mono text-[11px]">
                <p>
                  Dio putra Pratama. (2022). <em>Penerapan nilai-nilai Pancasila</em>. https://youtu.be/QSaLPqXbG3Y?si=VwTxt1Wwle6VaAPZ
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Video animasi edukatif yang menyajikan contoh konkret pengamalan nilai-nilai luhur Pancasila (Sila ke-1 sampai ke-5) dalam kehidupan sehari-hari anak Indonesia di rumah, sekolah, dan masyarakat.
              </p>
            </div>

            <div className="pt-2 border-t border-red-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <a
                  href="https://youtu.be/QSaLPqXbG3Y?si=VwTxt1Wwle6VaAPZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Tonton di YouTube</span>
                </a>

                <button
                  onClick={() => onNavigate('materi')}
                  className="px-3 py-1.5 bg-white hover:bg-red-50 text-red-700 border border-red-300 font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Buka di Modul</span>
                </button>
              </div>

              <button
                onClick={() =>
                  handleCopyCitation(
                    'Dio putra Pratama. (2022). Penerapan nilai-nilai Pancasila. https://youtu.be/QSaLPqXbG3Y?si=VwTxt1Wwle6VaAPZ',
                    'video'
                  )
                }
                className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white rounded-lg border border-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                title="Salin teks sitasi video"
              >
                {copiedCitation === 'video' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin Sitasi</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Rujukan 2: Buku Teks Kemendikbudristek */}
          <div className="rounded-2xl p-5 bg-gradient-to-br from-amber-50/70 to-yellow-50/50 border border-amber-200/80 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-600 text-white font-extrabold text-[10px] uppercase tracking-wider shadow-2xs">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Buku Teks Kurikulum Resmi</span>
                </span>
                <span className="text-[11px] font-semibold text-slate-500">Tahun 2023</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 font-heading leading-snug">
                  Pendidikan Pancasila untuk SD/MI Kelas VI
                </h3>
                <p className="text-xs font-bold text-amber-800 mt-0.5">
                  Lutfi, Mohamad Alwi, Listia, & Khristina Antariningsih (2023)
                </p>
              </div>

              {/* Box Sitasi Standar */}
              <div className="p-3 bg-white/90 rounded-xl border border-amber-200 text-xs text-slate-700 leading-relaxed font-mono text-[11px]">
                <p>
                  Lutfi, Mohamad Alwi, Listia, & Khristina Antariningsih. (2023). <em>Pendidikan Pancasila untuk SD/MI Kelas VI</em>. Jakarta: Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi.
                </p>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Buku referensi kurikulum nasional terbitan resmi Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi sebagai rujukan pemaknaan sila, lambang Garuda, serta butir profil pelajar Pancasila.
              </p>
            </div>

            <div className="pt-2 border-t border-amber-200/70 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-100 text-amber-900 rounded-lg text-[11px] font-bold border border-amber-300">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-700" />
                  <span>Kemendikbudristek</span>
                </span>

                <button
                  onClick={() => onNavigate('materi')}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Pelajari Materi</span>
                </button>
              </div>

              <button
                onClick={() =>
                  handleCopyCitation(
                    'Lutfi, Mohamad Alwi, Listia, & Khristina Antariningsih. (2023). Pendidikan Pancasila untuk SD/MI Kelas VI. Jakarta: Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi.',
                    'buku'
                  )
                }
                className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-white/80 hover:bg-white rounded-lg border border-slate-200 flex items-center gap-1 cursor-pointer transition-colors"
                title="Salin teks sitasi buku"
              >
                {copiedCitation === 'buku' ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Salin Sitasi</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Ubah Foto Beranda */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-amber-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-red-600" />
                <h3 className="text-lg font-bold text-slate-800 font-heading">
                  Ubah Foto / Gambar Beranda
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPhotoModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Pilih foto ilustrasi anak-anak Indonesia yang ingin ditampilkan pada sampul beranda, atau unggah foto kreasi/kegiatan kelas sendiri:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Option 1: Poster Resmi Nusantara (Recommended) */}
              <div
                onClick={() => handleSelectPresetPhoto(ASSETS.posterNusantara)}
                className="p-3 rounded-2xl border-2 border-red-500 bg-red-50/60 hover:bg-red-100/70 cursor-pointer transition-all space-y-2 group relative"
              >
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-extrabold shadow-xs">
                  Resmi
                </div>
                <div className="aspect-16/10 rounded-xl overflow-hidden border border-red-300">
                  <img
                    src={ASSETS.posterNusantara}
                    alt="Poster Resmi: Garuda, Peta & Anak Nusantara"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-800 block">Poster Nusantara</span>
                  <span className="text-[10px] text-red-600 font-bold">Garuda & Anak Bangsa</span>
                </div>
              </div>

              {/* Option 2: Tema Baru */}
              <div
                onClick={() => handleSelectPresetPhoto(ASSETS.heroKidsBaru)}
                className="p-3 rounded-2xl border-2 border-amber-300 bg-amber-50/50 hover:bg-amber-100 cursor-pointer transition-all space-y-2 group"
              >
                <div className="aspect-16/10 rounded-xl overflow-hidden border border-amber-300">
                  <img
                    src={ASSETS.heroKidsBaru}
                    alt="Tema Baru - Siswa & Perisai Garuda Emas"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-800 block">Tema Baru</span>
                  <span className="text-[10px] text-amber-800 font-bold">Perisai Garuda & Bendera</span>
                </div>
              </div>

              {/* Option 3: Klasik */}
              <div
                onClick={() => handleSelectPresetPhoto(ASSETS.heroKidsKlasik)}
                className="p-3 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-slate-50 hover:bg-amber-50/50 cursor-pointer transition-all space-y-2 group"
              >
                <div className="aspect-16/10 rounded-xl overflow-hidden border border-slate-200">
                  <img
                    src={ASSETS.heroKidsKlasik}
                    alt="Tema Klasik - Bhinneka Tunggal Ika"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold text-slate-800 block">Tema Klasik</span>
                  <span className="text-[10px] text-slate-500 font-medium">Bhinneka Tunggal Ika</span>
                </div>
              </div>
            </div>

            {/* Custom file upload & Reset */}
            <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <input
                ref={heroFileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUploadHeroFile}
              />
              <button
                type="button"
                onClick={() => heroFileInputRef.current?.click()}
                className="w-full sm:w-auto px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Camera className="w-4 h-4" />
                <span>Unggah Foto Sendiri</span>
              </button>

              <button
                type="button"
                onClick={handleResetHeroPhoto}
                className="w-full sm:w-auto px-3.5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Foto Bawaan</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Masuk Pemain Baru */}
      {showNewPlayerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-amber-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-1.5">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner text-2xl">
                🎮
              </div>
              <h3 className="text-xl font-bold text-slate-800 font-heading">
                Masuk Sebagai Pemain Baru
              </h3>
              <p className="text-xs text-slate-500">
                Pemain baru akan mulai dengan <strong className="text-amber-700 font-bold">0 Bintang</strong> dan <strong className="text-red-600 font-bold">0 Poin</strong>.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Nama Lengkap / Panggilan Siswa
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Siti Rahma / Andi"
                  value={newPlayerName}
                  onChange={(e) => setNewPlayerName(e.target.value)}
                  maxLength={30}
                  className="w-full px-4 py-2.5 rounded-xl border border-amber-300 font-semibold text-slate-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newPlayerName.trim()) {
                      if (onCreateNewPlayer) {
                        onCreateNewPlayer(newPlayerName.trim());
                      }
                      setShowNewPlayerModal(false);
                      setNewPlayerName('');
                    }
                  }}
                />
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/80 text-[11px] text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Kondisi Awal Pemain:</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-1">
                  <div className="bg-white/80 px-2 py-1 rounded-lg border border-amber-200">
                    ⭐ Bintang: <strong>0 Bintang</strong>
                  </div>
                  <div className="bg-white/80 px-2 py-1 rounded-lg border border-amber-200">
                    🏆 Poin: <strong>0 Poin</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                disabled={!newPlayerName.trim()}
                onClick={() => {
                  if (!newPlayerName.trim()) return;
                  playSuccessSound(profile.soundEnabled);
                  if (onCreateNewPlayer) {
                    onCreateNewPlayer(newPlayerName.trim());
                  }
                  setShowNewPlayerModal(false);
                  setNewPlayerName('');
                }}
                className="flex-1 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs rounded-xl shadow-xs disabled:opacity-50 transition-all cursor-pointer"
              >
                Mulai Petualangan Baru
              </button>
              <button
                onClick={() => {
                  setShowNewPlayerModal(false);
                  setNewPlayerName('');
                }}
                className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Perbesar Poster Resolusi Tinggi */}
      {showPosterZoom && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setShowPosterZoom(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Bendera Merah Putih */}
            <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white p-4 sm:p-5 flex items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-700 to-red-900" />
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white" />

              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl border border-white/30">
                  🇮🇩
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold font-heading text-white">
                    Poster Resmi Petualangan Pancasila & Nusantara
                  </h3>
                  <p className="text-xs text-amber-100">
                    Garuda Pancasila, Peta Kepulauan Nusantara, dan Anak-Anak Sahabat Budaya Daerah
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowPosterZoom(false)}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Poster High-Res Image Showcase */}
            <div className="p-3 sm:p-5 bg-gradient-to-b from-sky-50 via-amber-50 to-orange-50 max-h-[75vh] overflow-auto flex items-center justify-center">
              <img
                src={ASSETS.posterNusantara}
                alt="Poster Lengkap Petualangan Pancasila: Garuda Pancasila, Rumah Adat Nusantara, Peta Indonesia, dan Anak-Anak Berbusana Adat"
                className="w-full max-h-[70vh] object-contain rounded-2xl shadow-lg border-2 border-white"
              />
            </div>

            {/* Footer Unsur Budaya & Semboyan */}
            <div className="bg-white p-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <span className="font-bold text-red-700">🇮🇩 Nilai Luhur:</span>
                <span>Garuda Pancasila merangkul seluruh anak Nusantara dalam bingkai Bhinneka Tunggal Ika.</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="px-2.5 py-1 bg-amber-100 rounded-lg font-bold text-amber-900 text-[11px] border border-amber-300">
                  Merah Putih Jayalah Selamanya
                </span>
                <button
                  onClick={() => setShowPosterZoom(false)}
                  className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold cursor-pointer transition-colors"
                >
                  Tutup Poster
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
