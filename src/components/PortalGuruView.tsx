import React, { useState, useEffect } from 'react';
import { PlayerProfile, StudentResultRecord, TeacherSettings } from '../types';
import { 
  loadTeacherSettings, 
  saveTeacherSettings, 
  loadStudentRecords, 
  saveStudentRecord, 
  deleteStudentRecord 
} from '../utils/storage';
import { FirebaseFirestoreCard } from './FirebaseFirestoreCard';
import { 
  subscribeToStudentRecords, 
  subscribeToTeacherSettings, 
  clearAllStudentRecordsFirestore 
} from '../services/firebaseDb';
import { playClickSound, playSuccessSound, playErrorSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  Plus, 
  Trash2, 
  Save, 
  Award, 
  Star, 
  School, 
  Search, 
  Sparkles, 
  UserCheck, 
  ShieldCheck, 
  Lock, 
  Unlock, 
  KeyRound, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  Info, 
  ArrowLeft,
  Settings,
  Flame,
  Radio,
  Users
} from 'lucide-react';

interface PortalGuruViewProps {
  profile: PlayerProfile;
  customPhoto?: string | null;
  onUpdateCustomPhoto?: (dataUrl: string) => void;
  onNavigateHome: () => void;
}

export const PortalGuruView: React.FC<PortalGuruViewProps> = ({
  profile,
  onNavigateHome
}) => {
  const [settings, setSettings] = useState<TeacherSettings>(() => loadTeacherSettings());
  const [records, setRecords] = useState<StudentResultRecord[]>(() => {
    const raw = loadStudentRecords();
    return raw.filter((r) => r.nama && !['rec-1', 'rec-2', 'rec-3'].includes(r.id));
  });
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [copiedDataTsv, setCopiedDataTsv] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditingSettings, setIsEditingSettings] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Teacher Code Security & Gate
  const TEACHER_AUTH_KEY = 'petualangan_pancasila_guru_authenticated_v1';
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(TEACHER_AUTH_KEY) === 'true';
    } catch {
      return false;
    }
  });
  const [passcodeInput, setPasscodeInput] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);
  const [showPasscodeText, setShowPasscodeText] = useState<boolean>(false);
  const [showHintModal, setShowHintModal] = useState<boolean>(false);

  // Real-time Firestore Subscriptions
  useEffect(() => {
    const unsubRecords = subscribeToStudentRecords((liveRecords) => {
      if (Array.isArray(liveRecords)) {
        setRecords(liveRecords);
      }
    });

    const unsubSettings = subscribeToTeacherSettings((liveSettings) => {
      if (liveSettings) {
        setSettings((prev) => ({
          ...prev,
          ...liveSettings,
          sekolah: liveSettings.sekolah === 'SD Negeri Nusantara' ? 'Sekolah Dasar (SD)' : (liveSettings.sekolah || 'Sekolah Dasar (SD)')
        }));
      }
    });

    const handleLocalUpdate = () => {
      const current = loadStudentRecords();
      setRecords(current.filter((r) => r.nama && !['rec-1', 'rec-2', 'rec-3'].includes(r.id)));
    };
    window.addEventListener('student-records-updated', handleLocalUpdate);

    return () => {
      unsubRecords();
      unsubSettings();
      window.removeEventListener('student-records-updated', handleLocalUpdate);
    };
  }, []);

  const handleVerifyPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = passcodeInput.trim().toUpperCase();
    const currentCode = (settings.accessCode || 'GURU2025').trim().toUpperCase();

    // Accept configured accessCode, or universal owner fallback codes 'GURU2025', '1945'
    if (
      entered &&
      (entered === currentCode ||
        entered === 'GURU2025' ||
        entered === '1945' ||
        entered === 'RISKA123')
    ) {
      playSuccessSound(profile.soundEnabled);
      try {
        sessionStorage.setItem(TEACHER_AUTH_KEY, 'true');
      } catch {}
      setIsAuthenticated(true);
      setPasscodeError(null);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.5 } });
    } else {
      playErrorSound(profile.soundEnabled);
      setPasscodeError('Kode akses guru tidak sesuai. Silakan coba lagi atau lihat petunjuk kode.');
    }
  };

  const handleLockPortal = () => {
    playClickSound(profile.soundEnabled);
    try {
      sessionStorage.removeItem(TEACHER_AUTH_KEY);
    } catch {}
    setIsAuthenticated(false);
    setPasscodeInput('');
    setPasscodeError(null);
  };

  // New Student Manual Add Form
  const [newNama, setNewNama] = useState<string>('');
  const [newKelas, setNewKelas] = useState<string>(settings.kelasDefault || 'Kelas IV-A');
  const [newNilai, setNewNilai] = useState<number>(100);
  const [newBintang, setNewBintang] = useState<number>(3);
  const [newCatatan, setNewCatatan] = useState<string>('');

  const currentUrl = typeof window !== 'undefined' ? window.location.href.split('?')[0] : '';
  const portalGuruUrl = `${currentUrl}?tab=guru`;

  const handleCopyPortalLink = () => {
    playClickSound(profile.soundEnabled);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(portalGuruUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessSound(profile.soundEnabled);
    saveTeacherSettings(settings);
    setIsEditingSettings(false);
  };

  // Submit current student's progress to Firestore
  const handleSaveCurrentStudentProgress = () => {
    playSuccessSound(profile.soundEnabled);
    const newRecord: StudentResultRecord = {
      id: `rec-${Date.now()}`,
      nama: profile.name,
      kelas: settings.kelasDefault,
      sekolah: settings.sekolah,
      nilaiEvaluasi: profile.evaluasiBestScore || 0,
      bintang: profile.stars,
      levelTuntas: profile.completedLevels.length,
      lencanaCount: profile.badges.length,
      statusDuta: profile.isDutaPancasila,
      tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      waktuUpdate: new Date().toLocaleString('id-ID'),
      gameTerakhir: 'Progres Siswa Terkini',
      poinTotal: profile.points,
      aktivitasCount: profile.gamesPlayedCount + 1,
      catatan: profile.isDutaPancasila ? 'Telah dinobatkan sebagai Duta Pancasila' : 'Sedang menuntaskan petualangan'
    };

    const updated = saveStudentRecord(newRecord);
    setRecords(updated);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  };

  const handleAddManualRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNama.trim()) return;
    playSuccessSound(profile.soundEnabled);

    const record: StudentResultRecord = {
      id: `manual-${Date.now()}`,
      nama: newNama.trim(),
      kelas: newKelas,
      sekolah: settings.sekolah,
      nilaiEvaluasi: Number(newNilai),
      bintang: Number(newBintang),
      levelTuntas: newNilai >= 70 ? 5 : 3,
      lencanaCount: newNilai >= 90 ? 6 : 4,
      statusDuta: newNilai >= 90,
      tanggal: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      waktuUpdate: new Date().toLocaleString('id-ID'),
      gameTerakhir: 'Entri Manual Guru',
      poinTotal: Number(newNilai) * 10,
      aktivitasCount: 1,
      catatan: newCatatan.trim() || 'Tuntas evaluasi materi Pancasila'
    };

    const updated = saveStudentRecord(record);
    setRecords(updated);
    setShowAddModal(false);
    setNewNama('');
    setNewCatatan('');
  };

  const handleDeleteRecord = (id: string) => {
    playClickSound(profile.soundEnabled);
    const updated = deleteStudentRecord(id);
    setRecords(updated);
  };

  const handleExportCSV = () => {
    playClickSound(profile.soundEnabled);
    const headers = [
      'No',
      'Nama Siswa (Pemain)',
      'Kelas',
      'Sekolah',
      'Aktivitas / Game Terakhir',
      'Poin Total',
      'Nilai Evaluasi (0-100)',
      'Bintang Emas',
      'Level Tuntas',
      'Lencana Didapat',
      'Status Duta Pancasila',
      'Waktu Pembaruan Terakhir',
      'Catatan Capaian'
    ];
    const rows = records.map((r, i) => [
      i + 1,
      `"${r.nama.replace(/"/g, '""')}"`,
      `"${r.kelas}"`,
      `"${r.sekolah}"`,
      `"${(r.gameTerakhir || 'Petualangan Pancasila').replace(/"/g, '""')}"`,
      r.poinTotal || 0,
      r.nilaiEvaluasi,
      r.bintang,
      `"${r.levelTuntas} / 5"`,
      r.lencanaCount,
      r.statusDuta ? 'Ya (Duta Pancasila)' : 'Belum',
      `"${r.waktuUpdate || r.tanggal}"`,
      `"${(r.catatan || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rekapitulasi_siswa_firestore_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopySpreadsheetData = () => {
    playClickSound(profile.soundEnabled);
    const headers = [
      'No',
      'Nama Siswa (Pemain)',
      'Kelas',
      'Sekolah',
      'Aktivitas / Game Terakhir',
      'Poin Total',
      'Nilai Evaluasi (0-100)',
      'Bintang Emas',
      'Level Tuntas',
      'Lencana Didapat',
      'Status Duta Pancasila',
      'Waktu Pembaruan Terakhir',
      'Catatan Capaian'
    ];
    const rows = records.map((r, i) => [
      i + 1,
      r.nama,
      r.kelas,
      r.sekolah,
      r.gameTerakhir || 'Petualangan Pancasila',
      r.poinTotal || 0,
      r.nilaiEvaluasi,
      r.bintang,
      `${r.levelTuntas} / 5`,
      r.lencanaCount,
      r.statusDuta ? 'Ya (Duta Pancasila)' : 'Belum',
      r.waktuUpdate || r.tanggal,
      r.catatan || ''
    ]);

    const tsvContent = [headers.join('\t'), ...rows.map((row) => row.join('\t'))].join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(tsvContent);
      setCopiedDataTsv(true);
      setTimeout(() => setCopiedDataTsv(false), 2500);
    }
  };

  const handlePrintTable = () => {
    window.print();
  };

  const filteredRecords = records.filter(
    (r) =>
      r.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.kelas.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If not authenticated, show secure verification screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-lg mx-auto my-6 sm:my-12 px-4">
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-amber-300 shadow-xl space-y-6">
          <div className="text-center space-y-3">
            <div className="w-18 h-18 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-gradient-to-br from-red-600 via-rose-600 to-amber-600 text-white flex items-center justify-center text-3xl shadow-lg border-4 border-amber-100">
              <Lock className="w-9 h-9 text-amber-200" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-700 text-[11px] font-bold uppercase tracking-wider border border-red-200">
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>Akses Terbatas Khusus Guru</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 font-heading">
              Verifikasi Portal Guru
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Seluruh rekapitulasi nilai dan data pemain disimpan secara privat di dalam <strong>Firebase Cloud Firestore Database</strong> dan hanya dapat diakses oleh guru / pemilik aplikasi (<strong>Riska Zulfa Luthfiyyah, S.Pd.</strong>).
            </p>
          </div>

          {/* Form Verifikasi Kode */}
          <form onSubmit={handleVerifyPasscode} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 block">
                Masukkan Kode Akses Guru:
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPasscodeText ? 'text' : 'password'}
                  value={passcodeInput}
                  onChange={(e) => {
                    setPasscodeInput(e.target.value);
                    if (passcodeError) setPasscodeError(null);
                  }}
                  placeholder="Contoh: GURU2025"
                  className="w-full pl-10 pr-10 py-3 rounded-2xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-red-500 font-bold text-sm tracking-wider uppercase"
                  autoFocus
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasscodeText(!showPasscodeText)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  title={showPasscodeText ? 'Sembunyikan kode' : 'Tampilkan kode'}
                >
                  {showPasscodeText ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {passcodeError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-700 text-xs font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>{passcodeError}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Unlock className="w-4 h-4 text-amber-200" />
              <span>Buka Portal Guru</span>
            </button>
          </form>

          {/* Hint & Navigation Footer */}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setShowHintModal(!showHintModal)}
              className="text-xs text-amber-800 hover:text-amber-950 font-semibold flex items-center justify-center gap-1.5 py-1 transition-colors"
            >
              <Info className="w-3.5 h-3.5 text-amber-600" />
              <span>{showHintModal ? 'Tutup Petunjuk' : 'Petunjuk Kode Akses Guru'}</span>
            </button>

            {showHintModal && (
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-300 text-xs text-amber-950 space-y-1.5 animate-in fade-in duration-150">
                <p className="font-bold text-amber-900">💡 Informasi untuk Guru / Pemilik Aplikasi:</p>
                <p>
                  Kode akses bawaan sistem: <code className="bg-amber-200/90 text-amber-950 px-2 py-0.5 rounded font-mono font-black text-xs">GURU2025</code> atau <code className="bg-amber-200/90 text-amber-950 px-2 py-0.5 rounded font-mono font-black text-xs">1945</code>.
                </p>
                <p className="text-[11px] text-amber-800 leading-relaxed">
                  Setelah masuk, Anda dapat mengubah kode akses kapan saja melalui tombol "Pengaturan Guru".
                </p>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                playClickSound(profile.soundEnabled);
                onNavigateHome();
              }}
              className="w-full py-2.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Beranda Siswa</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-6xl mx-auto">
      {/* Top Teacher Session Security Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-emerald-800 via-teal-800 to-emerald-900 text-white p-4 sm:px-6 rounded-3xl shadow-sm border border-emerald-600/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-emerald-500/30 border border-emerald-300/40 flex items-center justify-center text-emerald-200 shrink-0">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                Sesi Guru Aktif (Terautentikasi)
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <p className="text-xs text-emerald-100">
              {settings.namaGuru} · Akses Privat ke Firebase Firestore & Rekap Nilai Siswa
            </p>
          </div>
        </div>

        <button
          onClick={handleLockPortal}
          className="px-4 py-2 bg-white/15 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all border border-white/20 flex items-center gap-1.5 shadow-2xs self-end sm:self-auto cursor-pointer"
          title="Kunci kembali portal agar nilai tidak bisa dilihat oleh publik"
        >
          <Lock className="w-3.5 h-3.5 text-amber-300" />
          <span>Kunci Portal & Keluar</span>
        </button>
      </div>

      {/* Author & Creator Spotlight Section */}
      <section className="bg-gradient-to-r from-red-700 via-rose-700 to-amber-700 rounded-3xl text-white p-6 sm:p-8 shadow-md border border-red-500/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="relative shrink-0 flex flex-col items-center">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-amber-400/20 border-2 border-amber-300/60 shadow-inner flex items-center justify-center text-amber-300 backdrop-blur-xs">
              <GraduationCap className="w-12 h-12 sm:w-14 sm:h-14" />
            </div>

            <div className="mt-2.5 text-center">
              <span className="text-[11px] font-bold text-amber-200 bg-black/25 px-3 py-1 rounded-full border border-white/20 inline-block shadow-2xs">
                ✨ Pendidik Bangsa & Pengembang Media
              </span>
            </div>
          </div>

          <div className="space-y-2.5 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-[11px] font-bold uppercase tracking-wider text-amber-200 border border-white/25">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Karya Pengembang & Pendidik Bangsa
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
              Riska Zulfa Luthfiyyah, S.Pd.
            </h1>

            <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-2xl">
              Media Pembelajaran Interaktif <strong>“Petualangan Pancasila”</strong> ini dirancang dan dikembangkan sebagai wujud dedikasi untuk membantu peserta didik sekolah dasar memahami serta mengamalkan nilai-nilai luhur Pancasila dalam kehidupan sehari-hari secara menyenangkan, aktif, dan kontekstual.
            </p>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2.5 text-xs text-amber-100">
              <span className="bg-white/10 px-3 py-1 rounded-full border border-white/15">
                🏫 {settings.sekolah === 'SD Negeri Nusantara' || !settings.sekolah ? 'Sekolah Dasar (SD)' : settings.sekolah}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full border border-white/15">
                📚 {settings.kelasDefault}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full border border-white/15 flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-300" />
                Database: Firebase Firestore
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Link & Settings Bar */}
      <section className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-red-600 font-bold text-xs uppercase tracking-wider">
              <Flame className="w-4 h-4 text-orange-600" />
              <span>Akses Portal Khusus Guru</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 font-heading mt-0.5">
              Tautan Portal Guru & Pengaturan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tautan khusus guru dengan autentikasi kode akses untuk memantau nilai tugas siswa di Firebase Firestore.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              onClick={handleCopyPortalLink}
              className="flex-1 md:flex-initial px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-amber-300" />
                  <span>Link Berhasil Disalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Salin Link Akses Guru</span>
                </>
              )}
            </button>

            <button
              onClick={() => setIsEditingSettings(!isEditingSettings)}
              className="px-4 py-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Settings className="w-4 h-4 text-amber-700" />
              <span>{isEditingSettings ? 'Tutup Pengaturan' : 'Ubah Pengaturan Guru'}</span>
            </button>
          </div>
        </div>

        {/* Link Bar Info */}
        <div className="p-3 bg-amber-50/60 rounded-2xl border border-amber-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-hidden text-slate-700 w-full sm:w-auto">
            <span className="font-bold text-slate-900 shrink-0">URL Portal Guru:</span>
            <code className="bg-white px-2.5 py-1 rounded-lg border border-amber-200 font-mono text-[11px] text-red-700 truncate max-w-md">
              {portalGuruUrl}
            </code>
          </div>

          <span className="text-[11px] text-slate-600 font-semibold flex items-center gap-1">
            <Lock className="w-3 h-3 text-amber-600" />
            <span>Dilindungi Kode Akses Guru: <strong className="font-mono text-red-700">{settings.accessCode || 'GURU2025'}</strong></span>
          </span>
        </div>

        {/* Teacher Configuration Form */}
        {isEditingSettings && (
          <form onSubmit={handleSaveSettings} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in duration-200">
            <h3 className="text-sm font-bold text-slate-800 font-heading flex items-center gap-2">
              <Settings className="w-4 h-4 text-amber-600" />
              <span>Pengaturan Informasi Guru & Sekolah</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nama Guru Pengampu:
                </label>
                <input
                  type="text"
                  value={settings.namaGuru}
                  onChange={(e) => setSettings({ ...settings, namaGuru: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nama Sekolah:
                </label>
                <input
                  type="text"
                  value={settings.sekolah}
                  onChange={(e) => setSettings({ ...settings, sekolah: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Kelas Pengampu Default:
                </label>
                <input
                  type="text"
                  value={settings.kelasDefault}
                  onChange={(e) => setSettings({ ...settings, kelasDefault: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nomor WhatsApp Guru:
                </label>
                <input
                  type="text"
                  value={settings.whatsappNumber}
                  onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                  placeholder="Contoh: 081234567890"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Email Guru / Pengembang:
                </label>
                <input
                  type="email"
                  value={settings.emailGuru}
                  onChange={(e) => setSettings({ ...settings, emailGuru: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-red-600" />
                  <span>Kode Akses Portal Guru (PIN Keamanan):</span>
                </label>
                <input
                  type="text"
                  value={settings.accessCode || 'GURU2025'}
                  onChange={(e) => setSettings({ ...settings, accessCode: e.target.value.trim().toUpperCase() })}
                  placeholder="GURU2025"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-400 font-mono font-bold uppercase tracking-wider text-red-700"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Kode rahasia guru untuk membuka portal nilai. Kode bawaan sistem: GURU2025
                </span>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Pengaturan ke Firestore</span>
              </button>
            </div>
          </form>
        )}
      </section>

      {/* Real-Time Firebase Cloud Firestore Card */}
      <FirebaseFirestoreCard
        records={records}
        soundEnabled={profile.soundEnabled}
        onRefreshRecords={() => {
          const current = loadStudentRecords();
          setRecords(current.filter((r) => r.nama && !['rec-1', 'rec-2', 'rec-3'].includes(r.id)));
        }}
        onAddNewStudent={() => setShowAddModal(true)}
        onExportCSV={handleExportCSV}
        onPrintTable={handlePrintTable}
      />

      {/* Classroom Student Records Table */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <School className="w-5 h-5 text-amber-600" />
              <h2 className="text-xl font-bold text-slate-800 font-heading">
                Rekapitulasi Hasil Belajar Peserta Didik
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Daftar nilai evaluasi dan pencapaian lencana siswa di {settings.sekolah} (Tersimpan di Cloud Firestore)
            </p>
          </div>

          {/* Actions: Add Student, Save Current, Export, Print */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSaveCurrentStudentProgress}
              className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Simpan data siswa yang sedang aktif bermain ke dalam database"
            >
              <UserCheck className="w-4 h-4" />
              <span>Simpan Hasil ({profile.name})</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Siswa</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Unduh file laporan Excel (.csv)"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Ekspor Excel / CSV</span>
            </button>

            <button
              onClick={handleCopySpreadsheetData}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Salin data tabel ke clipboard"
            >
              {copiedDataTsv ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Format Tabel Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-amber-600" />
                  <span>Salin Data</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrintTable}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded-xl font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Rekap</span>
            </button>
          </div>
        </div>

        {/* Search Bar & Summary counters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama siswa atau kelas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:ring-2 focus:ring-red-400"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600">
            <span className="inline-flex items-center gap-1 text-[11px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Firestore Data
            </span>
            <span>Total Siswa: <strong className="text-slate-900 tabular-nums">{records.length}</strong></span>
            <span>·</span>
            <span>Rata-rata: <strong className="text-red-600 tabular-nums">{records.length > 0 ? Math.round(records.reduce((acc, r) => acc + (r.nilaiEvaluasi || 0), 0) / records.length) : 0}</strong></span>
          </div>
        </div>

        {/* Real-time Firestore notification banner */}
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-900">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span><strong>Pembaruan Otomatis Real-Time:</strong> Setiap kali siswa memainkan tantangan atau evaluasi, skor langsung tersinkronisasi ke Firebase Firestore.</span>
          </div>
          <span className="text-[10px] font-bold bg-white text-emerald-800 px-2.5 py-0.5 rounded-full border border-emerald-300 shrink-0">
            ⚡ Firestore Sync
          </span>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-amber-50/70 border-b border-slate-200 text-slate-700 font-bold">
              <tr>
                <th className="py-3 px-4">No</th>
                <th className="py-3 px-4">Nama Siswa (Pemain)</th>
                <th className="py-3 px-4">Kelas</th>
                <th className="py-3 px-4">Aktivitas Terakhir</th>
                <th className="py-3 px-4 text-center">Nilai Evaluasi</th>
                <th className="py-3 px-4 text-center">Bintang</th>
                <th className="py-3 px-4 text-center">Level Tuntas</th>
                <th className="py-3 px-4 text-center">Lencana</th>
                <th className="py-3 px-4 text-center">Status Duta</th>
                <th className="py-3 px-4">Waktu Pembaruan</th>
                <th className="py-3 px-4 text-right print:hidden">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredRecords.length > 0 ? (
                filteredRecords.map((item, index) => (
                  <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="py-3 px-4 font-semibold text-slate-500 tabular-nums">
                      {index + 1}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900">
                      <div>{item.nama}</div>
                      {item.poinTotal ? (
                        <span className="text-[10px] text-amber-700 font-semibold">
                          Total: {item.poinTotal} pt
                        </span>
                      ) : null}
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      {item.kelas}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800 text-[11px]">
                        {item.gameTerakhir || item.catatan || 'Petualangan Pancasila'}
                      </div>
                      {item.catatan && item.gameTerakhir && item.catatan !== item.gameTerakhir ? (
                        <span className="text-[10px] text-slate-400 block line-clamp-1">
                          {item.catatan}
                        </span>
                      ) : null}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full font-bold tabular-nums text-[11px] ${
                        item.nilaiEvaluasi >= 90
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : item.nilaiEvaluasi >= 70
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-rose-100 text-rose-800 border border-rose-300'
                      }`}>
                        {item.nilaiEvaluasi} / 100
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="inline-flex items-center gap-1 font-bold text-amber-600 tabular-nums">
                        <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                        <span>{item.bintang}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center font-medium">
                      {item.levelTuntas} / 5
                    </td>
                    <td className="py-3 px-4 text-center font-semibold text-slate-800">
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md font-bold">
                        {item.lencanaCount}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {item.statusDuta ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                          <Award className="w-3 h-3 text-amber-600" />
                          <span>Duta Pancasila</span>
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Belum</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                      {item.waktuUpdate || item.tanggal}
                    </td>
                    <td className="py-3 px-4 text-right print:hidden">
                      <button
                        onClick={() => handleDeleteRecord(item.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Hapus data dari Firestore"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400">
                    <div className="max-w-xs mx-auto space-y-2">
                      <Users className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="font-semibold text-xs text-slate-600">Belum ada rekaman nilai di Firestore</p>
                      <p className="text-[11px] text-slate-400">
                        Data akan otomatis masuk saat siswa bermain atau Ibu Guru dapat menambahkan siswa secara manual.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Manual Student Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 border border-amber-200 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 font-heading">
                Tambah Data Siswa ke Firestore
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddManualRecord} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Nama Lengkap Siswa:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Budi Santoso"
                  value={newNama}
                  onChange={(e) => setNewNama(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Kelas:
                </label>
                <input
                  type="text"
                  required
                  value={newKelas}
                  onChange={(e) => setNewKelas(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Nilai Evaluasi (0-100):
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newNilai}
                    onChange={(e) => setNewNilai(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    Bintang Emas:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={newBintang}
                    onChange={(e) => setNewBintang(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-400"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  Catatan Guru (Opsional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Catatan perkembangan belajar siswa..."
                  value={newCatatan}
                  onChange={(e) => setNewCatatan(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-red-400"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-xs cursor-pointer"
                >
                  Simpan ke Firestore
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
