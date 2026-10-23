import React, { useState } from 'react';
import { PlayerProfile, TabType } from '../types';
import { EVALUASI_QUESTIONS } from '../data/pancasilaData';
import { playClickSound, playSuccessSound, playErrorSound, playFanfareSound } from '../utils/audio';
import { syncStudentGameProgress } from '../utils/storage';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  XCircle, 
  Star, 
  ChevronRight, 
  RefreshCw, 
  BookOpen, 
  Award, 
  Sparkles,
  HelpCircle,
  AlertCircle
} from 'lucide-react';

interface EvaluasiViewProps {
  profile: PlayerProfile;
  onUpdateProfile: (updated: Partial<PlayerProfile>) => void;
  onNavigateToMateri: (silaId: number) => void;
  onNavigateToGuru?: () => void;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface PreparedQuestion {
  id: number;
  tipe: 'pilihan-ganda' | 'benar-salah';
  silaTerkait: number;
  pertanyaan: string;
  opsi: string[];
  kunciIndex: number;
  pembahasan: string;
}

function prepareShuffledQuestions(): PreparedQuestion[] {
  return EVALUASI_QUESTIONS.map((q) => {
    const items = q.opsi.map((text, idx) => ({
      text,
      isCorrect: idx === q.kunciIndex
    }));
    const shuffled = shuffleArray(items);
    const newKunciIndex = shuffled.findIndex((item) => item.isCorrect);
    return {
      ...q,
      opsi: shuffled.map((item) => item.text),
      kunciIndex: newKunciIndex >= 0 ? newKunciIndex : 0
    };
  });
}

export const EvaluasiView: React.FC<EvaluasiViewProps> = ({
  profile,
  onUpdateProfile,
  onNavigateToMateri,
  onNavigateToGuru
}) => {
  const [questions, setQuestions] = useState<PreparedQuestion[]>(() => prepareShuffledQuestions());
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>(
    new Array(EVALUASI_QUESTIONS.length).fill(null)
  );
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = questions[currentIndex];
  const selectedAnswer = userAnswers[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (showExplanation) return;
    playClickSound(profile.soundEnabled);
    const newAnswers = [...userAnswers];
    newAnswers[currentIndex] = idx;
    setUserAnswers(newAnswers);
    setShowExplanation(true);

    const isCorrect = idx === currentQ.kunciIndex;
    if (isCorrect) {
      playSuccessSound(profile.soundEnabled);
    } else {
      playErrorSound(profile.soundEnabled);
    }
  };

  const handleNext = () => {
    playClickSound(profile.soundEnabled);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
      setShowExplanation(userAnswers[currentIndex + 1] !== null);
    } else {
      // Calculate final score
      let correctCount = 0;
      userAnswers.forEach((ans, idx) => {
        if (ans === questions[idx].kunciIndex) {
          correctCount++;
        }
      });
      const score = Math.round((correctCount / questions.length) * 100);

      // Determine stars:
      // 90 to 100: 3 stars
      // 70 to 89: 2 stars
      // Below 70: 1 star
      let starsEarned = 1;
      if (score >= 90) starsEarned = 3;
      else if (score >= 70) starsEarned = 2;

      playFanfareSound(profile.soundEnabled);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
      setIsFinished(true);

      const bestScore = Math.max(profile.evaluasiBestScore || 0, score);
      const bestStars = Math.max(profile.evaluasiStars || 0, starsEarned);
      const newAttempts = profile.evaluasiAttempts + 1;
      const updatedPts = profile.points + score;
      const updatedStars = profile.stars + starsEarned;

      const updatedProfile: PlayerProfile = {
        ...profile,
        evaluasiBestScore: bestScore,
        evaluasiStars: bestStars,
        evaluasiAttempts: newAttempts,
        points: updatedPts,
        stars: updatedStars
      };

      onUpdateProfile({
        evaluasiBestScore: bestScore,
        evaluasiStars: bestStars,
        evaluasiAttempts: newAttempts,
        points: updatedPts,
        stars: updatedStars
      });

      // Otomatis sinkronisasi skor evaluasi siswa ke Database Firebase Firestore Guru
      syncStudentGameProgress(
        updatedProfile,
        'Evaluasi 12 Soal Nilai Pancasila',
        `Skor Evaluasi: ${score}/100 (${starsEarned} Bintang Emas)`
      );
    }
  };

  const handleRestart = () => {
    playClickSound(profile.soundEnabled);
    setQuestions(prepareShuffledQuestions());
    setCurrentIndex(0);
    setUserAnswers(new Array(EVALUASI_QUESTIONS.length).fill(null));
    setShowExplanation(false);
    setIsFinished(false);
  };

  // Identify mistaken topics
  const mistakenSilaSet = new Set<number>();
  userAnswers.forEach((ans, idx) => {
    if (ans !== questions[idx].kunciIndex) {
      mistakenSilaSet.add(questions[idx].silaTerkait);
    }
  });
  const mistakenSilas = Array.from(mistakenSilaSet).sort();

  // Final summary stats
  const correctTotal = userAnswers.filter(
    (ans, idx) => ans === questions[idx].kunciIndex
  ).length;
  const finalScore = Math.round((correctTotal / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Uji Pemahaman Komprehensif
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 font-heading">
            Evaluasi Pemahaman Pancasila
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            12 soal interaktif pilihan ganda dan benar-salah untuk mengukur pemahaman lima sila.
          </p>
        </div>

        {profile.evaluasiBestScore !== null && (
          <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200 text-xs font-bold text-amber-900">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Skor Terbaik: {profile.evaluasiBestScore}/100</span>
          </div>
        )}
      </div>

      {!isFinished ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
          {/* Question Stepper & Progress */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-red-100 text-red-700">
                Soal {currentIndex + 1} dari {EVALUASI_QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Sila Terkait: Sila ke-{currentQ.silaTerkait}
              </span>
            </div>

            {/* Stepper bubbles */}
            <div className="flex items-center gap-1 overflow-x-auto py-1">
              {EVALUASI_QUESTIONS.map((_, i) => {
                const answered = userAnswers[i] !== null;
                const isCurrent = currentIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => {
                      if (userAnswers[i] !== null) {
                        setCurrentIndex(i);
                        setShowExplanation(true);
                      }
                    }}
                    className={`w-6 h-6 rounded-full text-[10px] font-bold transition-all ${
                      isCurrent
                        ? 'bg-red-600 text-white ring-2 ring-red-300'
                        : answered
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question Card */}
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 border border-amber-200">
              <p className="text-sm sm:text-base font-bold text-slate-800 leading-relaxed">
                {currentQ.pertanyaan}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentQ.opsi.map((opsi, idx) => {
                const isSelected = selectedAnswer === idx;
                let style = 'bg-white border-slate-200 hover:border-amber-400 text-slate-700 hover:bg-amber-50/40';

                if (showExplanation) {
                  if (idx === currentQ.kunciIndex) {
                    style = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-300';
                  } else if (isSelected && idx !== currentQ.kunciIndex) {
                    style = 'bg-rose-50 border-rose-400 text-rose-900';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all text-xs sm:text-sm flex items-start gap-3.5 ${style}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-xs font-bold text-amber-900 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-snug">{opsi}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation Callout */}
          {showExplanation && (
            <div className="space-y-4 pt-2 animate-in fade-in duration-200">
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed ${
                  selectedAnswer === currentQ.kunciIndex
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                    : 'bg-rose-50 border-rose-300 text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1 font-heading">
                  {selectedAnswer === currentQ.kunciIndex ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Jawaban Kamu Benar!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>Jawaban Belum Tepat!</span>
                    </>
                  )}
                </div>
                <p>
                  <strong>Pembahasan:</strong> {currentQ.pembahasan}
                </p>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2"
                >
                  <span>
                    {currentIndex + 1 < EVALUASI_QUESTIONS.length
                      ? 'Soal Berikutnya'
                      : 'Lihat Hasil Akhir Evaluasi'}
                  </span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Evaluation Results Screen */
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-amber-300 shadow-md text-center space-y-6">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-400 flex items-center justify-center text-4xl shadow-md border-4 border-white">
            {finalScore >= 90 ? '🏆' : finalScore >= 70 ? '🎖️' : '📚'}
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
              Hasil Evaluasi Pemahaman
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              Skor Akhir: {finalScore} / 100
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Kamu berhasil menjawab dengan benar <strong className="text-slate-900">{correctTotal}</strong> dari {questions.length} pertanyaan.
            </p>
          </div>

          {/* Star Rating Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 max-w-sm mx-auto flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 text-2xl">
              <Star className={`w-7 h-7 ${finalScore >= 70 || finalScore < 70 ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`} />
              <Star className={`w-8 h-8 ${finalScore >= 70 ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`} />
              <Star className={`w-7 h-7 ${finalScore >= 90 ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`} />
            </div>
            <span className="text-xs font-bold text-amber-900">
              {finalScore >= 90
                ? 'Prestasi Istimewa: 3 Bintang Emas!'
                : finalScore >= 70
                ? 'Sangat Baik: 2 Bintang Emas!'
                : 'Terus Bersemangat: 1 Bintang Emas!'}
            </span>
          </div>

          {/* Real-time Firebase Firestore sync indicator */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 max-w-md mx-auto flex items-center justify-center gap-2 text-xs font-bold text-emerald-900 shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span>Skor & capaianmu telah tersimpan & terupdate ke Database Firebase Guru secara realtime</span>
          </div>

          {/* Recommendations for review if there are mistakes */}
          {mistakenSilas.length > 0 ? (
            <div className="p-5 rounded-2xl bg-rose-50 border border-rose-200 text-left max-w-lg mx-auto space-y-3">
              <div className="flex items-center gap-2 text-rose-900 font-bold text-xs">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Rekomendasi Materi yang Perlu Dipelajari Kembali:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {mistakenSilas.map((silaNum) => (
                  <button
                    key={silaNum}
                    onClick={() => onNavigateToMateri(silaNum)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-rose-300 text-rose-800 text-xs font-bold hover:bg-rose-100 transition-colors flex items-center gap-1"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Pelajari Sila Ke-{silaNum}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold max-w-md mx-auto">
              🌟 Sempurna! Kamu memahami seluruh sila Pancasila tanpa ada kesalahan sedikit pun!
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Ulangi Evaluasi (Acak Ulang)</span>
            </button>

            <button
              onClick={() => onNavigateToMateri(1)}
              className="px-5 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs sm:text-sm rounded-2xl transition-all flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Buka Materi Pembelajaran</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
