import React, { useState, useEffect, useMemo } from 'react';
import { PlayerProfile, StudentResultRecord, TabType } from '../types';
import { subscribeToStudentRecords } from '../services/firebaseDb';
import { loadStudentRecords } from '../utils/storage';
import { playClickSound } from '../utils/audio';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Medal, 
  Star, 
  Award, 
  Crown, 
  Search, 
  Flame, 
  Sparkles, 
  ChevronRight, 
  ArrowUpRight, 
  Compass, 
  CheckCircle2, 
  User, 
  School, 
  RefreshCw,
  HeartHandshake,
  TrendingUp,
  Filter
} from 'lucide-react';

interface LeaderboardViewProps {
  profile: PlayerProfile;
  onNavigate: (tab: TabType, extra?: any) => void;
}

type SortMetric = 'points' | 'stars' | 'levels' | 'evaluasi';

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ profile, onNavigate }) => {
  const [records, setRecords] = useState<StudentResultRecord[]>(() => {
    // Initial local cache
    const cached = loadStudentRecords();
    return cached.filter(r => r.nama && !['rec-1', 'rec-2', 'rec-3'].includes(r.id));
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('all');
  const [sortMetric, setSortMetric] = useState<SortMetric>('points');
  const [isLiveConnected, setIsLiveConnected] = useState<boolean>(true);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>(new Date().toLocaleTimeString('id-ID'));

  // Subscribe to real-time Firebase Firestore student records
  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToStudentRecords(
      (firestoreRecords) => {
        setRecords(firestoreRecords);
        setLoading(false);
        setIsLiveConnected(true);
        setLastRefreshedAt(new Date().toLocaleTimeString('id-ID'));
      },
      (error) => {
        console.warn('Leaderboard running from local backup:', error);
        setIsLiveConnected(false);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  // Sorted and filtered list
  const filteredAndSortedRecords = useMemo(() => {
    let list = [...records];

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.nama.toLowerCase().includes(q) ||
          r.sekolah.toLowerCase().includes(q) ||
          (r.kelas && r.kelas.toLowerCase().includes(q))
      );
    }

    // Filter by class
    if (selectedClassFilter !== 'all') {
      list = list.filter((r) => r.kelas === selectedClassFilter);
    }

    // Sort according to selected metric
    list.sort((a, b) => {
      if (sortMetric === 'points') {
        const ptsA = a.poinTotal ?? 0;
        const ptsB = b.poinTotal ?? 0;
        if (ptsB !== ptsA) return ptsB - ptsA;
        return (b.bintang ?? 0) - (a.bintang ?? 0);
      } else if (sortMetric === 'stars') {
        const starsA = a.bintang ?? 0;
        const starsB = b.bintang ?? 0;
        if (starsB !== starsA) return starsB - starsA;
        return (b.poinTotal ?? 0) - (a.poinTotal ?? 0);
      } else if (sortMetric === 'levels') {
        const lvlA = a.levelTuntas ?? 0;
        const lvlB = b.levelTuntas ?? 0;
        if (lvlB !== lvlA) return lvlB - lvlA;
        return (b.poinTotal ?? 0) - (a.poinTotal ?? 0);
      } else {
        // Evaluasi
        const evalA = a.nilaiEvaluasi ?? 0;
        const evalB = b.nilaiEvaluasi ?? 0;
        if (evalB !== evalA) return evalB - evalA;
        return (b.poinTotal ?? 0) - (a.poinTotal ?? 0);
      }
    });

    return list;
  }, [records, searchQuery, selectedClassFilter, sortMetric]);

  // Extract unique classes for filtering
  const availableClasses = useMemo(() => {
    const classes = new Set<string>();
    records.forEach((r) => {
      if (r.kelas && r.kelas.trim()) {
        classes.add(r.kelas.trim());
      }
    });
    return Array.from(classes);
  }, [records]);

  // Find current student's rank
  const myRankIndex = useMemo(() => {
    const myName = profile.name.trim().toLowerCase();
    return filteredAndSortedRecords.findIndex(
      (r) => r.nama.trim().toLowerCase() === myName
    );
  }, [filteredAndSortedRecords, profile.name]);

  const myRankRecord = myRankIndex !== -1 ? filteredAndSortedRecords[myRankIndex] : null;

  // Top 3 Podium students
  const top1 = filteredAndSortedRecords[0];
  const top2 = filteredAndSortedRecords[1];
  const top3 = filteredAndSortedRecords[2];
  const restRecords = filteredAndSortedRecords.slice(3);

  const getMetricDisplay = (rec: StudentResultRecord) => {
    switch (sortMetric) {
      case 'points':
        return `${rec.poinTotal ?? 0} Poin`;
      case 'stars':
        return `${rec.bintang ?? 0} Bintang`;
      case 'levels':
        return `${rec.levelTuntas ?? 0} Level Tuntas`;
      case 'evaluasi':
        return `Nilai ${rec.nilaiEvaluasi ?? 0}/100`;
      default:
        return `${rec.poinTotal ?? 0} Poin`;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-lg border border-red-400/30 p-6 sm:p-8">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-semibold uppercase tracking-wider text-amber-100 border border-white/20">
              <Trophy className="w-3.5 h-3.5 text-yellow-300" />
              Papan Peringkat Real-Time
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
              Papan Juara Bintang Nusantara
            </h1>
            <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
              Pantau perolehan skor tertinggi sahabat Pancasila di seluruh level. Berkompetisi secara sehat, jujur, dan bersemangat membela nilai luhur bangsa!
            </p>
          </div>

          {/* Real-time Status Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 shrink-0 flex flex-col gap-2 min-w-[220px]">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isLiveConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-300'}`} />
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                Firebase Real-Time DB
              </span>
            </div>
            <div className="text-[11px] text-white/80">
              Total Siswa Terdaftar: <strong className="text-yellow-200">{records.length} Siswa</strong>
            </div>
            <div className="text-[10px] text-white/60">
              Pembaruan Terakhir: {lastRefreshedAt}
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Spirit Box */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <HeartHandshake className="w-5 h-5 text-amber-600 shrink-0" />
          <span className="text-amber-900 leading-snug">
            <strong>Semangat Pancasila:</strong> Nilai kejujuran, saling menghargai, dan persaudaraan jauh lebih berharga daripada sekadar angka. Mari saling mendukung sesama kawan!
          </span>
        </div>
        <button
          onClick={() => {
            playClickSound(profile.soundEnabled);
            onNavigate('peta');
          }}
          className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
        >
          <span>Mulai Petualangan</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Top 3 Podium (If at least 1 record exists) */}
      {filteredAndSortedRecords.length > 0 && (
        <section className="space-y-4">
          <div className="text-center space-y-1">
            <span className="text-xs font-bold text-red-600 uppercase tracking-wider block">
              Juara Tertinggi Saat Ini
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 font-heading">
              Podium Bintang Kehormatan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-8 max-w-4xl mx-auto">
            {/* Rank 2 (Silver) */}
            {top2 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="order-2 md:order-1 bg-white rounded-3xl p-5 border-2 border-slate-200 shadow-md flex flex-col items-center text-center relative hover:shadow-lg transition-shadow"
              >
                <div className="absolute -top-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 flex items-center justify-center text-white text-xl shadow-md border-2 border-white">
                  🥈
                </div>
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl mt-4 border-2 border-slate-300">
                  🇮🇩
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase mt-2 block">
                  Peringkat ke-2
                </span>
                <h3 className="text-base font-extrabold text-slate-900 font-heading truncate max-w-[200px]">
                  {top2.nama}
                </h3>
                <span className="text-[11px] text-slate-500">{top2.kelas || 'Kelas IV'}</span>

                <div className="mt-3 px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-800 font-extrabold text-xs">
                  {getMetricDisplay(top2)}
                </div>

                <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    {top2.bintang} Bintang
                  </span>
                  <span>·</span>
                  <span>{top2.levelTuntas}/6 Level</span>
                </div>
              </motion.div>
            ) : (
              <div className="order-2 md:order-1 hidden md:block" />
            )}

            {/* Rank 1 (Gold 👑 - Center & Prominent) */}
            {top1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, type: 'spring', stiffness: 260 }}
                className="order-1 md:order-2 bg-gradient-to-b from-amber-50 via-white to-amber-50/40 rounded-3xl p-6 border-3 border-amber-400 shadow-xl flex flex-col items-center text-center relative hover:shadow-2xl transition-shadow ring-4 ring-amber-300/30"
              >
                <div className="absolute -top-7 w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center text-white text-2xl shadow-lg border-3 border-white animate-bounce">
                  👑
                </div>
                <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-4xl mt-3 border-3 border-amber-400 shadow-inner">
                  🏆
                </div>
                <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-[10px] font-extrabold text-amber-900 uppercase tracking-wide">
                  <Crown className="w-3 h-3 text-amber-600" />
                  Juara Utama 1
                </div>
                <h3 className="text-lg font-extrabold text-slate-900 font-heading truncate max-w-[220px] mt-1">
                  {top1.nama}
                </h3>
                <span className="text-xs text-slate-600 font-medium">
                  {top1.kelas || 'Kelas IV'} · {top1.sekolah || 'Sekolah Dasar (SD)'}
                </span>

                <div className="mt-3.5 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-900 font-extrabold text-sm shadow-xs">
                  {getMetricDisplay(top1)}
                </div>

                <div className="mt-3 flex items-center gap-3 text-xs text-slate-700 font-semibold">
                  <span className="flex items-center gap-1 text-amber-800">
                    <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                    {top1.bintang} Bintang
                  </span>
                  <span>·</span>
                  <span className="text-red-700 font-bold">{top1.levelTuntas}/6 Level Tuntas</span>
                </div>

                {top1.statusDuta && (
                  <span className="mt-3 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-emerald-600" />
                    Duta Pancasila Resmi
                  </span>
                )}
              </motion.div>
            )}

            {/* Rank 3 (Bronze) */}
            {top3 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.2 }}
                className="order-3 bg-white rounded-3xl p-5 border-2 border-amber-200/80 shadow-md flex flex-col items-center text-center relative hover:shadow-lg transition-shadow"
              >
                <div className="absolute -top-6 w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-600 to-amber-700 flex items-center justify-center text-white text-xl shadow-md border-2 border-white">
                  🥉
                </div>
                <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-3xl mt-4 border-2 border-amber-300">
                  🌟
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase mt-2 block">
                  Peringkat ke-3
                </span>
                <h3 className="text-base font-extrabold text-slate-900 font-heading truncate max-w-[200px]">
                  {top3.nama}
                </h3>
                <span className="text-[11px] text-slate-500">{top3.kelas || 'Kelas IV'}</span>

                <div className="mt-3 px-3.5 py-1.5 rounded-xl bg-amber-100/70 text-amber-900 font-extrabold text-xs">
                  {getMetricDisplay(top3)}
                </div>

                <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-600 font-semibold">
                  <span className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    {top3.bintang} Bintang
                  </span>
                  <span>·</span>
                  <span>{top3.levelTuntas}/6 Level</span>
                </div>
              </motion.div>
            ) : (
              <div className="order-3 hidden md:block" />
            )}
          </div>
        </section>
      )}

      {/* Player's Own Status Card */}
      <section className="bg-gradient-to-r from-red-50 via-white to-amber-50 p-5 rounded-3xl border-2 border-red-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center text-xl font-extrabold shadow-sm shrink-0">
            {myRankIndex !== -1 ? `#${myRankIndex + 1}` : '🎮'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 bg-red-100 px-2 py-0.5 rounded-full">
                Posisi Kamu
              </span>
              <span className="text-xs text-slate-400 font-medium">· Akun Aktif</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading">
              {profile.name}
            </h3>
            <p className="text-xs text-slate-600">
              {myRankIndex !== -1
                ? `Hebat! Kamu berada di peringkat ke-${myRankIndex + 1} dari ${filteredAndSortedRecords.length} siswa.`
                : 'Ayo mainkan level atau selesaikan kuis untuk mencatatkan namamu di papan peringkat!'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 block">Skor Kamu Saat Ini</span>
            <span className="text-base font-extrabold text-red-600 tabular-nums">
              {profile.points} Poin · {profile.stars} ⭐
            </span>
          </div>

          <button
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onNavigate('peta');
            }}
            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span>Tambah Poin</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Filter & Metric Controls */}
      <section className="bg-white p-5 rounded-3xl border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari nama kawan atau sekolah..."
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-hidden focus:border-red-500"
            />
          </div>

          {/* Class Filter */}
          {availableClasses.length > 0 && (
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={selectedClassFilter}
                onChange={(e) => setSelectedClassFilter(e.target.value)}
                className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-hidden"
              >
                <option value="all">Semua Kelas</option>
                {availableClasses.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Metric Sorting Tabs */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 mr-1">Urutkan Berdasarkan:</span>
          
          <button
            onClick={() => {
              playClickSound(profile.soundEnabled);
              setSortMetric('points');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              sortMetric === 'points'
                ? 'bg-red-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Poin Tertinggi</span>
          </button>

          <button
            onClick={() => {
              playClickSound(profile.soundEnabled);
              setSortMetric('stars');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              sortMetric === 'stars'
                ? 'bg-amber-500 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Bintang Emas</span>
          </button>

          <button
            onClick={() => {
              playClickSound(profile.soundEnabled);
              setSortMetric('levels');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              sortMetric === 'levels'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Level Tuntas</span>
          </button>

          <button
            onClick={() => {
              playClickSound(profile.soundEnabled);
              setSortMetric('evaluasi');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              sortMetric === 'evaluasi'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Nilai Evaluasi</span>
          </button>
        </div>
      </section>

      {/* Leaderboard Table / Rankings List */}
      <section className="bg-white rounded-3xl border border-amber-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-red-600" />
            <h3 className="text-base font-extrabold text-slate-800 font-heading">
              Daftar Lengkap Peringkat Siswa
            </h3>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-bold">
              {filteredAndSortedRecords.length} Peserta
            </span>
          </div>

          <span className="text-[11px] text-slate-400 hidden sm:block">
            Tersinkronisasi otomatis via Firestore
          </span>
        </div>

        {loading ? (
          <div className="py-16 text-center text-slate-400 space-y-2">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-red-500" />
            <p className="text-xs font-semibold">Mengambil data skor dari Firebase...</p>
          </div>
        ) : filteredAndSortedRecords.length === 0 ? (
          <div className="py-16 text-center text-slate-400 space-y-3 px-4">
            <Trophy className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-sm font-bold text-slate-700 font-heading">
              {searchQuery ? 'Tidak ada siswa yang sesuai pencarian' : 'Belum ada data nilai di papan peringkat'}
            </h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? 'Coba ganti kata kunci pencarian atau bersihkan filter kelas.'
                : 'Ayo mulai berpetualang dan kumpulkan poin agar namamu tercatat di sini!'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => {
                  playClickSound(profile.soundEnabled);
                  onNavigate('peta');
                }}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Mulai Petualangan Level 1
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-slate-100 overflow-x-auto">
            {filteredAndSortedRecords.map((rec, index) => {
              const isCurrentPlayer = rec.nama.trim().toLowerCase() === profile.name.trim().toLowerCase();
              const rank = index + 1;

              return (
                <motion.div
                  key={rec.id || `rank-${index}`}
                  whileHover={{ backgroundColor: isCurrentPlayer ? '#FEF2F2' : '#FFFDF5' }}
                  className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors ${
                    isCurrentPlayer ? 'bg-red-50/70 border-l-4 border-l-red-600' : ''
                  }`}
                >
                  {/* Left: Rank badge & Student details */}
                  <div className="flex items-center gap-3.5 min-w-[200px]">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold shrink-0 shadow-2xs ${
                        rank === 1
                          ? 'bg-amber-400 text-slate-900 border border-amber-300 font-black'
                          : rank === 2
                          ? 'bg-slate-200 text-slate-800 border border-slate-300'
                          : rank === 3
                          ? 'bg-amber-700 text-white border border-amber-600'
                          : rank <= 10
                          ? 'bg-red-50 text-red-700 border border-red-200'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 font-heading">
                          {rec.nama}
                        </span>
                        {isCurrentPlayer && (
                          <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-extrabold">
                            Kamu
                          </span>
                        )}
                        {rec.statusDuta && (
                          <span className="text-[10px] bg-yellow-100 text-amber-900 px-2 py-0.5 rounded-full font-bold border border-yellow-300 hidden sm:inline-block">
                            Duta
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 block">
                        {rec.kelas || 'Kelas IV'} · {rec.sekolah || 'Sekolah Dasar (SD)'}
                      </span>
                    </div>
                  </div>

                  {/* Middle: Progress info (Hidden on small screens) */}
                  <div className="hidden md:flex items-center gap-4 text-xs text-slate-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>{rec.bintang ?? 0} ⭐</span>
                    </div>
                    <span>·</span>
                    <div>
                      <span>{rec.levelTuntas ?? 0}/6 Level</span>
                    </div>
                    <span>·</span>
                    <div className="text-[11px] text-slate-500">
                      Ujian: {rec.nilaiEvaluasi ?? 0}/100
                    </div>
                  </div>

                  {/* Right: Primary Highlight Metric */}
                  <div className="text-right shrink-0">
                    <div className="text-sm sm:text-base font-extrabold text-slate-900 font-heading tabular-nums">
                      {rec.poinTotal ?? 0} <span className="text-xs text-slate-400 font-normal">Poin</span>
                    </div>
                    <span className="text-[10px] text-emerald-600 font-semibold block">
                      {rec.gameTerakhir ? rec.gameTerakhir.slice(0, 26) : 'Petualangan'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* Footer Encouragement Note */}
      <div className="text-center space-y-2 pt-2">
        <p className="text-xs text-slate-500">
          Peringkat diperbarui secara otomatis setiap kali kawan-kawan menuntaskan tantangan atau evaluasi.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onNavigate('peta');
            }}
            className="text-xs font-bold text-red-600 hover:text-red-700 underline underline-offset-4 cursor-pointer"
          >
            Jelajahi Peta Level
          </button>
          <span className="text-slate-300">·</span>
          <button
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onNavigate('games');
            }}
            className="text-xs font-bold text-amber-700 hover:text-amber-800 underline underline-offset-4 cursor-pointer"
          >
            Arena Permainan
          </button>
          <span className="text-slate-300">·</span>
          <button
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onNavigate('evaluasi');
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline underline-offset-4 cursor-pointer"
          >
            Evaluasi 12 Soal
          </button>
        </div>
      </div>
    </div>
  );
};
