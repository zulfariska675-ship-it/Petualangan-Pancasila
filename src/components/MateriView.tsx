import React, { useState, useEffect } from 'react';
import { PlayerProfile } from '../types';
import { SILA_MATERI } from '../data/pancasilaData';
import { ASSETS } from '../assets';
import { playClickSound, playSuccessSound, playErrorSound, speakTextIndonesian, stopSpeaking } from '../utils/audio';
import { Volume2, Square, CheckCircle2, Sparkles, HelpCircle, ChevronRight, Home, School, Building2, Film, Play, X, Image as ImageIcon, ZoomIn, Download, Eye, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface PosterSilaInfo {
  number: number;
  title: string;
  themeColor: string;
  badgeBg: string;
  borderColor: string;
  lightBg: string;
  quoteBg: string;
  teksPoster: string;
  deskripsiIlustrasi: string;
  slogan: string;
  viewBox: string;
  aspectRatio: string;
  modalCoords: { left: string; top: string; width: string; height: string };
}

const POSTER_SILA_METADATA: Record<number, PosterSilaInfo> = {
  1: {
    number: 1,
    title: 'Ketuhanan Yang Maha Esa',
    themeColor: 'from-rose-600 to-red-500',
    badgeBg: 'bg-red-600 text-white',
    borderColor: 'border-red-300',
    lightBg: 'bg-red-50/70',
    quoteBg: 'bg-red-100/80 border-red-200 text-red-950',
    teksPoster: 'Beribadah sesuai ajaran agama, menghormati pemeluk agama lain, dan selalu berbuat baik.',
    deskripsiIlustrasi: 'Anak beribadah dengan khusyuk di atas sajadah serta senantiasa menghargai teman yang berbeda keyakinan.',
    slogan: 'Mulai dari hal kecil, dari diri sendiri dan lingkungan sekitar! ❤️',
    viewBox: '18 320 330 520',
    aspectRatio: '330 / 520',
    modalCoords: { left: '1.8%', top: '20.8%', width: '32.2%', height: '33.8%' }
  },
  2: {
    number: 2,
    title: 'Kemanusiaan yang Adil dan Beradab',
    themeColor: 'from-amber-600 to-orange-500',
    badgeBg: 'bg-amber-600 text-white',
    borderColor: 'border-amber-300',
    lightBg: 'bg-amber-50/70',
    quoteBg: 'bg-amber-100/80 border-amber-200 text-amber-950',
    teksPoster: 'Menolong teman yang kesulitan, menghargai orang lain, bersikap sopan dan tidak membeda-bedakan.',
    deskripsiIlustrasi: 'Anak laki-laki dengan penuh empati menolong teman perempuan yang terjatuh agar bisa berdiri lagi.',
    slogan: 'Pancasila dalam Tindakan, Indonesia Makin Kuat!',
    viewBox: '348 320 330 520',
    aspectRatio: '330 / 520',
    modalCoords: { left: '34.0%', top: '20.8%', width: '32.2%', height: '33.8%' }
  },
  3: {
    number: 3,
    title: 'Persatuan Indonesia',
    themeColor: 'from-emerald-600 to-teal-500',
    badgeBg: 'bg-emerald-600 text-white',
    borderColor: 'border-emerald-300',
    lightBg: 'bg-emerald-50/70',
    quoteBg: 'bg-emerald-100/80 border-emerald-200 text-emerald-950',
    teksPoster: 'Menjaga persatuan dan kesatuan, menghormati perbedaan, serta bekerja sama demi Indonesia yang lebih baik.',
    deskripsiIlustrasi: 'Empat anak Indonesia beragam baju adat dan seragam bergandengan tangan rukun di bawah Sang Merah Putih.',
    slogan: 'Bersatu Kita Teguh, Bercerai Kita Runtuh!',
    viewBox: '678 320 330 520',
    aspectRatio: '330 / 520',
    modalCoords: { left: '66.2%', top: '20.8%', width: '32.2%', height: '33.8%' }
  },
  4: {
    number: 4,
    title: 'Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan Perwakilan',
    themeColor: 'from-blue-600 to-sky-500',
    badgeBg: 'bg-blue-600 text-white',
    borderColor: 'border-blue-300',
    lightBg: 'bg-blue-50/70',
    quoteBg: 'bg-blue-100/80 border-blue-200 text-blue-950',
    teksPoster: 'Mendengarkan pendapat orang lain, bermusyawarah untuk mencari jalan terbaik, dan menghargai hasil keputusan bersama.',
    deskripsiIlustrasi: 'Anak-anak belajar dan berdiskusi bersama, saling mendengarkan dan menghargai gagasan teman.',
    slogan: 'Musyawarah untuk Mufakat!',
    viewBox: '18 845 490 490',
    aspectRatio: '490 / 490',
    modalCoords: { left: '1.8%', top: '55.0%', width: '47.8%', height: '31.9%' }
  },
  5: {
    number: 5,
    title: 'Keadilan Sosial bagi Seluruh Rakyat Indonesia',
    themeColor: 'from-purple-600 to-violet-500',
    badgeBg: 'bg-purple-600 text-white',
    borderColor: 'border-purple-300',
    lightBg: 'bg-purple-50/70',
    quoteBg: 'bg-purple-100/80 border-purple-200 text-purple-950',
    teksPoster: 'Berbagi kepada yang membutuhkan, bersikap adil, dan peduli terhadap lingkungan sekitar.',
    deskripsiIlustrasi: 'Dua anak saling bekerja sama membagikan kotak bantuan bagi sesama yang membutuhkan.',
    slogan: 'Aku Bisa! Peduli dan Berbagi untuk Sesama!',
    viewBox: '516 845 490 490',
    aspectRatio: '490 / 490',
    modalCoords: { left: '50.4%', top: '55.0%', width: '47.8%', height: '31.9%' }
  }
};

interface MateriViewProps {
  profile: PlayerProfile;
  initialSilaId?: number;
  onUpdateProfile: (updated: Partial<PlayerProfile>) => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const MateriView: React.FC<MateriViewProps> = ({
  profile,
  initialSilaId = 1,
  onUpdateProfile
}) => {
  const [selectedSila, setSelectedSila] = useState<number>(initialSilaId);
  const [activeTab, setActiveTab] = useState<'semua' | 'rumah' | 'sekolah' | 'masyarakat'>('semua');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showVideo, setShowVideo] = useState<boolean>(true);
  const [selectedReflectionAnswer, setSelectedReflectionAnswer] = useState<number | null>(null);
  const [reflectionSubmitted, setReflectionSubmitted] = useState<boolean>(false);
  const [showFullPoster, setShowFullPoster] = useState<boolean>(false);

  const sila = SILA_MATERI.find((s) => s.number === selectedSila) || SILA_MATERI[0];
  const posterData = POSTER_SILA_METADATA[selectedSila] || POSTER_SILA_METADATA[1];

  const [shuffledReflection, setShuffledReflection] = useState(() => 
    shuffleArray(sila.refleksi.pilihan)
  );

  useEffect(() => {
    setShuffledReflection(shuffleArray(sila.refleksi.pilihan));
    setSelectedReflectionAnswer(null);
    setReflectionSubmitted(false);
  }, [selectedSila]);

  const handleSelectSila = (num: number) => {
    stopSpeaking();
    setIsSpeaking(false);
    playClickSound(profile.soundEnabled);
    setSelectedSila(num);
  };

  const handleSpeak = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      speakTextIndonesian(text);
      // fallback auto-stop state after duration estimate
      const words = text.split(' ').length;
      const durationMs = Math.max(2000, words * 400);
      setTimeout(() => {
        setIsSpeaking(false);
      }, durationMs);
    }
  };

  const isReflectionCompleted = profile.completedReflections.includes(sila.number);

  const handleAnswerReflection = (index: number) => {
    if (reflectionSubmitted) return;
    setSelectedReflectionAnswer(index);
    setReflectionSubmitted(true);

    const isCorrect = shuffledReflection[index].benar;
    if (isCorrect) {
      playSuccessSound(profile.soundEnabled);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
      if (!isReflectionCompleted) {
        onUpdateProfile({
          points: profile.points + 25,
          stars: profile.stars + 1,
          completedReflections: [...profile.completedReflections, sila.number]
        });
      }
    } else {
      playErrorSound(profile.soundEnabled);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Video Pembelajaran Nilai-Nilai Pancasila */}
      <div className="flex flex-col gap-4 bg-white/95 backdrop-blur-md p-6 rounded-3xl border-2 border-amber-200/90 shadow-md relative overflow-hidden">
        {/* Harmonious Bendera Merah Putih Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                Modul Pembelajaran Interaktif
              </span>
              <span className="text-[10px] bg-red-100 text-red-700 font-bold px-2 py-0.5 rounded-full border border-red-300 flex items-center gap-1">
                <Film className="w-3 h-3" />
                <span>Video Edukasi</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 font-heading">
              Lima Sila Pancasila
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Pahami bunyi, makna simbol, serta tonton video edukasi interaktif mengenai penerapan nilai-nilai Pancasila dalam kehidupan sehari-hari anak Indonesia.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            {/* Toggle Video Button */}
            <button
              onClick={() => {
                playClickSound(profile.soundEnabled);
                setShowVideo((prev) => !prev);
              }}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                showVideo
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 hover:bg-amber-200'
                  : 'bg-red-600 text-white hover:bg-red-700 border border-red-700'
              }`}
            >
              <Film className="w-4 h-4" />
              <span>{showVideo ? 'Tutup Video' : 'Tonton Video'}</span>
            </button>

            {/* Poster Edukasi Button */}
            <button
              onClick={() => {
                playClickSound(profile.soundEnabled);
                setShowFullPoster(true);
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 hover:from-amber-600 hover:to-yellow-600 border border-amber-400"
            >
              <ImageIcon className="w-4 h-4 text-slate-900" />
              <span>Poster 5 Sila</span>
            </button>

            {/* Garuda Emblem mini badge */}
            <div className="hidden sm:flex items-center gap-3 bg-amber-50/80 px-3.5 py-2 rounded-2xl border border-amber-200 shadow-2xs">
              <img
                src={ASSETS.garudaShield}
                alt="Perisai Garuda Pancasila"
                referrerPolicy="no-referrer"
                className="w-9 h-9 object-contain"
              />
              <div className="text-left">
                <span className="text-[11px] font-bold text-slate-800 block">Garuda Pancasila</span>
                <span className="text-[10px] text-red-700 font-bold">Dasar Negara Kita</span>
              </div>
            </div>
          </div>
        </div>

        {/* Embedded Video Pembelajaran Player Section */}
        {showVideo && (
          <div className="pt-4 border-t border-amber-200/80 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 font-heading">
                    Video Pembelajaran: Penerapan Nilai-Nilai Pancasila
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Saksikan animasi edukasi seru untuk mengamalkan sila ke-1 sampai ke-5 di rumah, sekolah, dan masyarakat
                  </p>
                </div>
              </div>

              <span className="px-2.5 py-0.5 bg-red-50 text-red-700 rounded-lg text-[10px] font-bold border border-red-200">
                Pancasila dalam Kehidupan Sehari-hari
              </span>
            </div>

            {/* 16:9 Responsive Video Iframe Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg border-2 border-amber-300 bg-slate-900">
              <iframe
                src="https://www.youtube.com/embed/QSaLPqXbG3Y?rel=0"
                title="Video Pembelajaran Penerapan Nilai-Nilai Pancasila"
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>

      {/* Sila Selector Tabs (Horizontal row of 5 buttons with White Box Background) */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-3.5 sm:p-4 border-2 border-amber-200/90 shadow-md grid grid-cols-2 sm:grid-cols-5 gap-2.5 relative">
        {SILA_MATERI.map((item) => {
          const isActive = item.number === selectedSila;
          const isDone = profile.completedReflections.includes(item.number);
          return (
            <button
              key={item.number}
              onClick={() => handleSelectSila(item.number)}
              className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between relative cursor-pointer ${
                isActive
                  ? 'bg-red-600 text-white border-red-700 shadow-md scale-102 ring-2 ring-amber-300'
                  : 'bg-amber-50/50 text-slate-800 border-amber-200/80 hover:border-amber-400 hover:bg-amber-100/70 shadow-2xs'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-2xl">{item.lambang}</span>
                {isDone && (
                  <CheckCircle2 className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-emerald-600'}`} />
                )}
              </div>
              <div className="mt-2">
                <span className={`text-[10px] font-bold block uppercase tracking-wider ${isActive ? 'text-amber-200' : 'text-slate-500'}`}>
                  Sila Ke-{item.number}
                </span>
                <span className="text-xs font-bold line-clamp-1">
                  {item.lambangDeskripsi.split(' ')[0]} {item.lambangDeskripsi.split(' ')[1]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Sila Detail Card (Transparent Glassmorphic so Background Poster Shines Through) */}
      <div className="bg-white/50 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-white/70 shadow-lg space-y-6 relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1.5 before:bg-gradient-to-r before:from-red-600 before:via-white before:to-red-600 before:z-10">
        {/* Banner with Sila Symbol, Text, and Voice Button */}
        <div className={`p-6 rounded-3xl bg-gradient-to-br ${sila.warnaTema} opacity-90 backdrop-blur-md text-white shadow-md relative overflow-hidden border border-white/30`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-4xl sm:text-5xl shadow-xs shrink-0 border border-white/30">
                {sila.lambang}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/25 text-white">
                    Sila Ke-{sila.number}
                  </span>
                  <span className="text-xs text-white/80">
                    Simbol: {sila.lambangDeskripsi}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight font-heading">
                  "{sila.bunyi}"
                </h2>
              </div>
            </div>

            {/* Read Aloud Button for elementary students */}
            <button
              onClick={() => handleSpeak(`${sila.bunyi}. ${sila.penjelasan}`)}
              className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-800 rounded-xl font-bold text-xs shadow-xs hover:bg-amber-100 transition-colors shrink-0"
              title="Dengarkan bacaan materi"
            >
              {isSpeaking ? (
                <>
                  <Square className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                  <span>Hentikan Suara</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-red-600" />
                  <span>Dengarkan Suara</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Poster Edukasi Penerapan Nilai Sila Ke-{selectedSila} */}
        <div className={`rounded-3xl p-5 sm:p-6 border-2 transition-all shadow-md backdrop-blur-md ${posterData.lightBg} ${posterData.borderColor} relative overflow-hidden space-y-4`}>
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/70">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-red-600 text-white font-bold text-[10px] sm:text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Poster Edukasi Pancasila</span>
              </span>
              <span className={`font-bold text-xs px-2.5 py-1 rounded-full border shadow-2xs ${posterData.badgeBg}`}>
                Sila Ke-{selectedSila}
              </span>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => handleSpeak(`${posterData.title}. Dalam poster disebutkan: ${posterData.teksPoster}. Slogan: ${posterData.slogan}`)}
                className="px-3 py-1.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 border border-slate-200 text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="Dengarkan narasi pesan poster"
              >
                <Volume2 className="w-3.5 h-3.5 text-red-600" />
                <span className="hidden sm:inline">Dengarkan Pesan</span>
              </button>

              <button
                onClick={() => {
                  playClickSound(profile.soundEnabled);
                  setShowFullPoster(true);
                }}
                className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer border border-amber-400"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>Lihat Poster Lengkap 5 Sila</span>
              </button>
            </div>
          </div>

          {/* Grid: Visual Illustration (Left) + Sila Poster Text (Right) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            {/* Visual Panel from Poster (SVG crop matching exact panel) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div
                onClick={() => {
                  playClickSound(profile.soundEnabled);
                  setShowFullPoster(true);
                }}
                className="group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-white hover:shadow-2xl transition-all duration-300 w-full max-w-[280px] ring-2 ring-black/5 hover:ring-amber-400"
                title="Klik untuk melihat poster utuh"
              >
                <svg
                  viewBox={posterData.viewBox}
                  className="w-full h-auto block transform group-hover:scale-103 transition-transform duration-300"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <image href="/assets/aistudio/image_af0934f2.png" width="1024" height="1536" />
                </svg>

                <div className="absolute inset-0 bg-slate-950/0 group-hover:bg-slate-950/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/95 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <ZoomIn className="w-3.5 h-3.5 text-red-600" />
                    Buka Poster Penuh
                  </span>
                </div>

                <div className="px-3 py-1.5 bg-white/95 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-700">
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3 text-red-600" />
                    Panel Sila Ke-{selectedSila}
                  </span>
                  <span className="text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
                    Klik untuk Perbesar
                  </span>
                </div>
              </div>
            </div>

            {/* Explanation & Application Details adapted to this Sila */}
            <div className="md:col-span-7 space-y-3">
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Pesan Penerapan pada Poster
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading leading-snug">
                  {posterData.title}
                </h3>
              </div>

              {/* Core Text Quote from Poster */}
              <div className={`p-4 rounded-2xl border ${posterData.quoteBg} shadow-2xs space-y-1`}>
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide opacity-80">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Tindakan Nyata Sila Ke-{selectedSila}:</span>
                </div>
                <p className="text-sm sm:text-base font-bold italic leading-relaxed">
                  "{posterData.teksPoster}"
                </p>
              </div>

              {/* Illustrated Action Description */}
              <div className="p-3.5 rounded-xl bg-white/85 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-2xs">
                <span className="font-bold text-slate-900 block mb-1">Makna Gambar Ilustrasi:</span>
                {posterData.deskripsiIlustrasi}
              </div>

              {/* Slogan Banner */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100/90 text-amber-950 font-extrabold text-xs border border-amber-300 shadow-2xs">
                  <span>{posterData.slogan}</span>
                </span>

                <a
                  href="/assets/aistudio/image_af0934f2.png"
                  download="Poster_Penerapan_Nilai_Pancasila.png"
                  className="inline-flex items-center gap-1.5 text-xs text-red-700 font-bold hover:text-red-800 hover:underline cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Poster HD</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation & Symbol Meaning */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-amber-50/50 backdrop-blur-xs border border-amber-200/80">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-1.5 font-heading">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Penjelasan Sederhana</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {sila.penjelasan}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/50 backdrop-blur-xs border border-white/70">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-1.5 font-heading">
              <span className="text-base">{sila.lambang}</span>
              <span>Makna Lambang Simbol</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {sila.maknaSimbol}
            </p>
          </div>
        </div>

        {/* Filter Tab for Examples */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/50 pb-3">
            <h3 className="text-lg font-bold text-slate-800 font-heading">
              Contoh Penerapan Sehari-hari
            </h3>
            <div className="flex items-center gap-1 bg-white/40 backdrop-blur-xs p-1 rounded-xl border border-white/60">
              <button
                onClick={() => setActiveTab('semua')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'semua' ? 'bg-white/95 text-slate-900 shadow-xs' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Semua Lingkungan
              </button>
              <button
                onClick={() => setActiveTab('rumah')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'rumah' ? 'bg-white/95 text-slate-900 shadow-xs' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Di Rumah
              </button>
              <button
                onClick={() => setActiveTab('sekolah')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'sekolah' ? 'bg-white/95 text-slate-900 shadow-xs' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Di Sekolah
              </button>
              <button
                onClick={() => setActiveTab('masyarakat')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  activeTab === 'masyarakat' ? 'bg-white/95 text-slate-900 shadow-xs' : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Di Masyarakat
              </button>
            </div>
          </div>

          {/* 3 Categories of Real-Life Examples */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Di Rumah */}
            {(activeTab === 'semua' || activeTab === 'rumah') && (
              <div className="p-4 rounded-2xl bg-amber-50/50 backdrop-blur-xs border border-amber-200/80 space-y-3">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Home className="w-4 h-4 text-amber-600" />
                  <span>Di Lingkungan Rumah</span>
                </div>
                <div className="space-y-2.5">
                  {sila.penerapanRumah.map((ex, idx) => (
                    <div key={idx} className="p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-white/80 shadow-2xs">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                        <span>{ex.icon}</span>
                        <span>{ex.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {ex.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Di Sekolah */}
            {(activeTab === 'semua' || activeTab === 'sekolah') && (
              <div className="p-4 rounded-2xl bg-rose-50/50 backdrop-blur-xs border border-rose-200/80 space-y-3">
                <div className="flex items-center gap-2 text-rose-900 font-bold text-sm">
                  <School className="w-4 h-4 text-rose-600" />
                  <span>Di Lingkungan Sekolah</span>
                </div>
                <div className="space-y-2.5">
                  {sila.penerapanSekolah.map((ex, idx) => (
                    <div key={idx} className="p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-white/80 shadow-2xs">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                        <span>{ex.icon}</span>
                        <span>{ex.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {ex.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Di Masyarakat */}
            {(activeTab === 'semua' || activeTab === 'masyarakat') && (
              <div className="p-4 rounded-2xl bg-emerald-50/50 backdrop-blur-xs border border-emerald-200/80 space-y-3">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  <span>Di Lingkungan Masyarakat</span>
                </div>
                <div className="space-y-2.5">
                  {sila.penerapanMasyarakat.map((ex, idx) => (
                    <div key={idx} className="p-3 bg-white/70 backdrop-blur-xs rounded-xl border border-white/80 shadow-2xs">
                      <div className="flex items-center gap-2 font-bold text-xs text-slate-800">
                        <span>{ex.icon}</span>
                        <span>{ex.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                        {ex.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Reflection Question */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white/50 backdrop-blur-md border-2 border-amber-300/80 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                ?
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 font-heading">
                  Pertanyaan Refleksi Siswa
                </h4>
                <span className="text-[11px] text-amber-900 font-medium">
                  {isReflectionCompleted ? 'Sudah diselesaikan (+25 Poin diraih)' : 'Jawab dengan tepat untuk mendapatkan +25 Poin & +1 Bintang!'}
                </span>
              </div>
            </div>
            {isReflectionCompleted && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Selesai
              </span>
            )}
          </div>

          <p className="text-xs sm:text-sm font-semibold text-slate-800 bg-white/70 backdrop-blur-xs p-3.5 rounded-xl border border-amber-200/80">
            {sila.refleksi.pertanyaan}
          </p>

          <div className="space-y-2">
            {shuffledReflection.map((pil, idx) => {
              const isSelected = selectedReflectionAnswer === idx;
              let btnStyle = 'bg-white/60 backdrop-blur-xs border-white/80 hover:bg-white/85 text-slate-700';

              if (reflectionSubmitted) {
                if (pil.benar) {
                  btnStyle = 'bg-emerald-500/80 backdrop-blur-xs border-emerald-600 text-white font-bold';
                } else if (isSelected && !pil.benar) {
                  btnStyle = 'bg-rose-500/80 backdrop-blur-xs border-rose-600 text-white font-bold';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={reflectionSubmitted}
                  onClick={() => handleAnswerReflection(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs sm:text-sm flex items-start gap-3 cursor-pointer ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-white/80 flex items-center justify-center text-xs font-bold text-slate-800 shrink-0 mt-0.5 shadow-2xs">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex-1">
                    <span>{pil.teks}</span>
                    {reflectionSubmitted && (isSelected || pil.benar) && (
                      <p className={`text-[11px] mt-1.5 pt-1.5 border-t ${pil.benar ? 'border-emerald-300 text-emerald-100' : 'border-rose-300 text-rose-100'}`}>
                        {pil.penjelasan}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Interactive Full Poster Modal */}
      {showFullPoster && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl border-2 border-amber-300 overflow-hidden my-auto">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shadow-xs border border-white/30">
                  🇮🇩
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-extrabold font-heading text-white">
                    Poster Penerapan Nilai-Nilai Pancasila
                  </h3>
                  <p className="text-xs text-white/90">
                    Pancasila bukan hanya dihafal, tapi juga diterapkan dalam kehidupan sehari-hari!
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="/assets/aistudio/image_af0934f2.png"
                  download="Poster_Penerapan_Nilai_Pancasila.png"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold border border-white/30 transition-colors"
                  title="Unduh berkas poster"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh</span>
                </a>
                <button
                  onClick={() => setShowFullPoster(false)}
                  className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/30"
                  title="Tutup Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Sila Quick Switcher Tabs inside Modal */}
            <div className="px-4 py-2.5 bg-amber-50/80 border-b border-amber-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-bold text-slate-700">Pilih Sila untuk Dilihat:</span>
              <div className="flex items-center gap-1.5 overflow-x-auto py-0.5">
                {[1, 2, 3, 4, 5].map((num) => {
                  const isActive = selectedSila === num;
                  const item = SILA_MATERI.find((s) => s.number === num);
                  return (
                    <button
                      key={num}
                      onClick={() => handleSelectSila(num)}
                      className={`px-3 py-1 rounded-xl font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-red-600 text-white shadow-xs ring-2 ring-amber-300'
                          : 'bg-white text-slate-700 border border-slate-200 hover:bg-amber-100'
                      }`}
                    >
                      <span>{item?.lambang}</span>
                      <span>Sila {num}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Poster Scrollable Container */}
            <div className="overflow-y-auto p-4 sm:p-6 bg-slate-100 flex flex-col items-center">
              <div className="relative max-w-2xl w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white">
                <img
                  src="/assets/aistudio/image_af0934f2.png"
                  alt="Poster Penerapan Nilai-Nilai Pancasila"
                  className="w-full h-auto block"
                />

                {/* Interactive Clickable Hotspots overlay for all 5 Silas */}
                {[1, 2, 3, 4, 5].map((num) => {
                  const meta = POSTER_SILA_METADATA[num];
                  const isCurrent = selectedSila === num;
                  return (
                    <button
                      key={num}
                      onClick={() => {
                        handleSelectSila(num);
                        playSuccessSound(profile.soundEnabled);
                      }}
                      style={{
                        position: 'absolute',
                        left: meta.modalCoords.left,
                        top: meta.modalCoords.top,
                        width: meta.modalCoords.width,
                        height: meta.modalCoords.height
                      }}
                      className={`rounded-2xl transition-all cursor-pointer group flex flex-col justify-between p-2 text-left ${
                        isCurrent
                          ? 'ring-4 ring-red-500 bg-red-500/15 shadow-lg'
                          : 'hover:ring-4 hover:ring-amber-400 hover:bg-amber-400/20'
                      }`}
                      title={`Klik untuk memilih Sila Ke-${num}: ${meta.title}`}
                    >
                      <div className="flex items-center justify-between w-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-full shadow-md">
                          Pilih Sila {num}
                        </span>
                      </div>
                      {isCurrent && (
                        <div className="self-end bg-red-600 text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-md animate-pulse">
                          Sedang Aktif ⭐
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer with Active Sila Summary & Action */}
            <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left w-full sm:w-auto">
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="text-sm">{sila.lambang}</span>
                  <span>Sila Ke-{selectedSila}: {POSTER_SILA_METADATA[selectedSila].title}</span>
                </div>
                <p className="text-[11px] text-slate-600 italic line-clamp-1 max-w-xl">
                  "{POSTER_SILA_METADATA[selectedSila].teksPoster}"
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  onClick={() => setShowFullPoster(false)}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                >
                  Tutup & Lanjutkan Belajar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
