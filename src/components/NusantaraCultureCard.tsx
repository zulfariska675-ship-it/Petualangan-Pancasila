import React, { useState } from 'react';
import { NUSANTARA_CULTURE_REGIONS } from '../data/pancasilaData';
import { RegionalCultureZone } from '../types';
import { playClickSound, playSuccessSound } from '../utils/audio';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { 
  Compass, 
  Sparkles, 
  Volume2, 
  HelpCircle, 
  CheckCircle2, 
  Heart, 
  MapPin, 
  Music, 
  Home, 
  ShieldCheck,
  ChevronRight,
  Info
} from 'lucide-react';

interface NusantaraCultureCardProps {
  soundEnabled?: boolean;
}

const TRIVIA_QUESTIONS = [
  {
    pertanyaan: 'Rumah adat dengan atap melengkung runcing seperti tanduk kerbau (Gonjong) berasal dari pulau...',
    opsi: ['Sumatra (Rumah Gadang)', 'Jawa (Rumah Joglo)', 'Papua (Rumah Honai)'],
    jawabanBenar: 0,
    penjelasan: 'Tepat sekali! Rumah Gadang berasal dari Sumatra Barat dan atapnya menyerupai tanduk kerbau.'
  },
  {
    pertanyaan: 'Tradisi gotong royong serempak membersihkan desa di Jawa dinamakan...',
    opsi: ['Siri\' na Pacce', 'Gugur Gunung', 'Bakar Batu'],
    jawabanBenar: 1,
    penjelasan: 'Hebat! Gugur Gunung adalah tradisi gotong royong khas masyarakat Jawa untuk kepentingan bersama.'
  },
  {
    pertanyaan: 'Alat musik tradisional petik dari daun pohon lontar khas Pulau Rote (Nusa Tenggara Timur) adalah...',
    opsi: ['Angklung', 'Sasando', 'Tifa'],
    jawabanBenar: 1,
    penjelasan: 'Pintar! Sasando memiliki wadah resonansi indah dari daun lontar asli NTT.'
  },
  {
    pertanyaan: 'Rumah panggung kayu ulin panjang di Kalimantan yang bisa dihuni puluhan keluarga rukun adalah...',
    opsi: ['Rumah Betang', 'Rumah Kebaya', 'Bale Banjar'],
    jawabanBenar: 0,
    penjelasan: 'Luar biasa! Rumah Betang Dayak melambangkan kerukunan hidup bersama dalam persatuan.'
  },
  {
    pertanyaan: 'Upacara kebersamaan memasak bersama di lubang batu panas di Papua dinamakan...',
    opsi: ['Alang Tulung', 'Bakar Batu', 'Ngayah'],
    jawabanBenar: 1,
    penjelasan: 'Benar sekali! Tradisi Bakar Batu adalah lambang perdamaian dan rasa syukur persaudaraan di Papua.'
  }
];

export const NusantaraCultureCard: React.FC<NusantaraCultureCardProps> = ({ soundEnabled = true }) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('sumatra');
  const [activeTab, setActiveTab] = useState<'eksplorasi' | 'kuis'>('eksplorasi');
  const [greetingPlayed, setGreetingPlayed] = useState<boolean>(false);

  // Trivia state
  const [triviaIndex, setTriviaIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);

  const currentRegion = NUSANTARA_CULTURE_REGIONS.find((r) => r.id === selectedRegionId) || NUSANTARA_CULTURE_REGIONS[0];
  const currentTrivia = TRIVIA_QUESTIONS[triviaIndex];

  const handleSelectRegion = (id: string) => {
    playClickSound(soundEnabled);
    setSelectedRegionId(id);
    setGreetingPlayed(false);
  };

  const handlePlayGreeting = () => {
    playSuccessSound(soundEnabled);
    setGreetingPlayed(true);
    confetti({ particleCount: 25, spread: 60, origin: { y: 0.7 } });
  };

  const handleAnswerQuiz = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);

    if (idx === currentTrivia.jawabanBenar) {
      playSuccessSound(soundEnabled);
      setQuizScore((prev) => prev + 10);
      confetti({ particleCount: 40, spread: 70, origin: { y: 0.6 } });
    } else {
      playClickSound(soundEnabled);
    }
  };

  const handleNextQuiz = () => {
    playClickSound(soundEnabled);
    setSelectedAnswer(null);
    setTriviaIndex((prev) => (prev + 1) % TRIVIA_QUESTIONS.length);
  };

  return (
    <section className="bg-white/94 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-2 border-amber-300/90 shadow-md space-y-6 relative overflow-hidden">
      {/* Harmonious Bendera Merah Putih Top Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />
      <div className="absolute top-1.5 left-0 right-0 h-1 bg-white border-b border-amber-200" />

      {/* Decorative Traditional Batik SVG background watermark */}
      <div className="absolute top-0 right-0 w-72 h-72 opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-red-900">
          <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M50 5 Q65 35 95 50 Q65 65 50 95 Q35 65 5 50 Q35 35 50 5 Z" />
        </svg>
      </div>

      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-amber-200">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold border border-amber-300">
            <span>🇮🇩</span>
            <span>Jelajah Budaya 38 Provinsi Nusantara</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 font-heading">
            Pojok Budaya & Sahabat Nusantara
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl">
            Kenali keindahan rumah adat, pakaian daerah, alat musik tradisional, dan tradisi gotong royong luhur dari Sabang sampai Merauke!
          </p>
        </div>

        {/* Tab switcher: Eksplorasi vs Kuis Budaya */}
        <div className="flex items-center gap-1 bg-amber-100/80 p-1 rounded-2xl border border-amber-300 shrink-0">
          <button
            onClick={() => {
              playClickSound(soundEnabled);
              setActiveTab('eksplorasi');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'eksplorasi'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Jelajah Daerah</span>
          </button>

          <button
            onClick={() => {
              playClickSound(soundEnabled);
              setActiveTab('kuis');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'kuis'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'text-amber-900 hover:bg-amber-200/60'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kuis Budaya</span>
          </button>
        </div>
      </div>

      {activeTab === 'eksplorasi' ? (
        <div className="space-y-6">
          {/* Island Zone Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {NUSANTARA_CULTURE_REGIONS.map((region) => {
              const isSelected = region.id === currentRegion.id;
              return (
                <button
                  key={region.id}
                  onClick={() => handleSelectRegion(region.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md scale-102 ring-2 ring-yellow-300'
                      : 'bg-white border border-amber-200 text-slate-700 hover:border-amber-400 hover:bg-amber-50/60'
                  }`}
                >
                  <span className="text-base">{region.icon}</span>
                  <span>{region.islandName}</span>
                </button>
              );
            })}
          </div>

          {/* Active Cultural Details Card with Framer Motion */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRegion.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.28 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-300 shadow-sm space-y-6"
            >
              {/* Region Title & Slogan */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-300 flex items-center justify-center text-3xl shadow-xs">
                    {currentRegion.icon}
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-red-600 uppercase tracking-wider block">
                      Zona Kebudayaan · {currentRegion.islandName}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                      {currentRegion.title}
                    </h3>
                  </div>
                </div>

                {/* Sapaan Ramah Khas Daerah Interactive Button */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayGreeting}
                    className="px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-500 hover:to-yellow-500 text-slate-900 font-extrabold text-xs shadow-xs transition-transform hover:scale-103 active:scale-97 flex items-center gap-2 cursor-pointer"
                    title="Dengarkan Sapaan Khas"
                  >
                    <Volume2 className="w-4 h-4 text-red-700" />
                    <span>Sapaan: “{currentRegion.salamKhas}”</span>
                  </button>
                </div>
              </div>

              {greetingPlayed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl text-xs text-emerald-900 flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    Sahabat di {currentRegion.islandName} menyapamu dengan penuh kehangatan: <strong>“{currentRegion.salamKhas}”</strong>! Mari jalin persaudaraan sebangsa dan setanah air.
                  </span>
                </motion.div>
              )}

              {/* 4 Cultural Highlights Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* 1. Rumah Adat */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                      <span className="text-lg">{currentRegion.rumahAdat.icon}</span>
                      <span>Rumah Adat</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 font-heading mt-1">
                      {currentRegion.rumahAdat.nama}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {currentRegion.rumahAdat.filosofi}
                    </p>
                  </div>
                  <span className="text-[10px] text-amber-700 font-bold block pt-2 border-t border-amber-200/60">
                    Nilai: Gotong Royong Kokoh
                  </span>
                </div>

                {/* 2. Pakaian Adat */}
                <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wider">
                      <span className="text-lg">👘</span>
                      <span>Pakaian Adat</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 font-heading mt-1">
                      {currentRegion.pakaianAdat.nama}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {currentRegion.pakaianAdat.deskripsi}
                    </p>
                  </div>
                  <span className="text-[10px] text-rose-700 font-bold block pt-2 border-t border-rose-200/60">
                    Kesenian: {currentRegion.tarianTradisional.slice(0, 30)}...
                  </span>
                </div>

                {/* 3. Alat Musik Tradisional */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                      <span className="text-lg">{currentRegion.alatMusik.icon}</span>
                      <span>Alat Musik Tradisional</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 font-heading mt-1">
                      {currentRegion.alatMusik.nama}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {currentRegion.alatMusik.caraMain}
                    </p>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold block pt-2 border-t border-emerald-200/60">
                    Irama: Harmoni Nusantara
                  </span>
                </div>

                {/* 4. Tradisi Gotong Royong */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-1.5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-indigo-900 font-bold text-xs uppercase tracking-wider">
                      <span className="text-lg">🤝</span>
                      <span>Gotong Royong Daerah</span>
                    </div>
                    <h4 className="text-sm font-extrabold text-slate-900 font-heading mt-1">
                      Tradisi {currentRegion.tradisiGotongRoyong.nama}
                    </h4>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {currentRegion.tradisiGotongRoyong.penjelasan}
                    </p>
                  </div>
                  <span className="text-[10px] text-indigo-700 font-bold block pt-2 border-t border-indigo-200/60">
                    {currentRegion.kaitanPancasila.slice(0, 35)}...
                  </span>
                </div>
              </div>

              {/* Cultural Fun Fact Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-100/90 to-yellow-100/90 border border-amber-300 flex items-start gap-3">
                <span className="text-2xl shrink-0">💡</span>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-950 font-heading">
                    Tahukah Kamu Sahabat Pancasila?
                  </span>
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    {currentRegion.funFact}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Kuis Budaya Nusantara Mode */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-300 shadow-sm space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
                  Tebak Budaya Nusantara #{triviaIndex + 1}
                </h3>
                <span className="text-xs text-slate-500">Uji wawasan kekayaan daerah Indonesia</span>
              </div>
            </div>

            <div className="px-3 py-1 bg-amber-100 rounded-xl border border-amber-300 text-xs font-bold text-amber-900">
              Skor Kuis: {quizScore} Poin
            </div>
          </div>

          <p className="text-sm sm:text-base font-bold text-slate-800 bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
            {currentTrivia.pertanyaan}
          </p>

          <div className="space-y-2.5">
            {currentTrivia.opsi.map((opsi, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentTrivia.jawabanBenar;

              let btnStyle = 'bg-slate-50 border-slate-200 hover:border-amber-300 hover:bg-amber-50/40 text-slate-800';

              if (selectedAnswer !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold ring-2 ring-emerald-300';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-900';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswerQuiz(idx)}
                  className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-amber-200 flex items-center justify-center text-xs font-extrabold text-amber-900 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opsi}</span>
                  </div>
                  {selectedAnswer !== null && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <p className="text-xs text-amber-900 leading-relaxed">
                {currentTrivia.penjelasan}
              </p>
              <button
                onClick={handleNextQuiz}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
              >
                <span>Soal Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
};
