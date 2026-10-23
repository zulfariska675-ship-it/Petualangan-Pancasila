import React, { useState, useEffect } from 'react';
import { StudentResultRecord } from '../types';
import { 
  testFirestoreConnection, 
  loadStudentRecordsFirestore,
  clearAllStudentRecordsFirestore
} from '../services/firebaseDb';
import firebaseConfig from '../../firebase-applet-config.json';
import { playClickSound, playSuccessSound, playErrorSound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { 
  Database, 
  CheckCircle2, 
  RefreshCw, 
  Server, 
  ShieldCheck, 
  Trash2, 
  Users, 
  Award, 
  Star,
  Activity,
  Flame,
  Radio
} from 'lucide-react';

interface FirebaseFirestoreCardProps {
  records: StudentResultRecord[];
  soundEnabled: boolean;
  onRefreshRecords: () => void;
  onAddNewStudent: () => void;
  onExportCSV: () => void;
  onPrintTable: () => void;
}

export const FirebaseFirestoreCard: React.FC<FirebaseFirestoreCardProps> = ({
  records,
  soundEnabled,
  onRefreshRecords,
  onAddNewStudent,
  onExportCSV,
  onPrintTable
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    testFirestoreConnection().then((connected) => {
      setIsConnected(connected);
    });
  }, []);

  const handleManualRefresh = async () => {
    playClickSound(soundEnabled);
    setIsRefreshing(true);
    setStatusMessage(null);
    try {
      const live = await loadStudentRecordsFirestore();
      onRefreshRecords();
      playSuccessSound(soundEnabled);
      setStatusMessage(`Sinkronisasi berhasil! ${live.length} data siswa aktif diperbarui dari Firestore.`);
      confetti({ particleCount: 25, spread: 50, origin: { y: 0.6 } });
    } catch (err: any) {
      playErrorSound(soundEnabled);
      setStatusMessage('Gagal mengambil data dari Firestore. Menampilkan cache lokal.');
    } finally {
      setIsRefreshing(false);
      setTimeout(() => setStatusMessage(null), 4000);
    }
  };

  const handleClearRecords = async () => {
    if (confirm('Apakah Ibu Guru yakin ingin mengosongkan seluruh rekaman data siswa di Firebase Firestore?')) {
      playClickSound(soundEnabled);
      try {
        const deleted = await clearAllStudentRecordsFirestore();
        localStorage.removeItem('petualangan_pancasila_rekap_siswa_v1');
        onRefreshRecords();
        playSuccessSound(soundEnabled);
        setStatusMessage(`Berhasil mengosongkan ${deleted} dokumen dari Firebase Firestore.`);
      } catch (err) {
        playErrorSound(soundEnabled);
        setStatusMessage('Gagal menghapus data dari Firestore.');
      }
    }
  };

  const averageScore = records.length > 0
    ? Math.round(records.reduce((acc, r) => acc + (r.nilaiEvaluasi || 0), 0) / records.length)
    : 0;
  const dutaCount = records.filter((r) => r.statusDuta).length;

  return (
    <section className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/80 shadow-xs space-y-6">
      {/* Header with Cloud Firestore Identity */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white flex items-center justify-center text-2xl shadow-sm shadow-orange-500/20 shrink-0">
            <Flame className="w-7 h-7 text-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200 uppercase tracking-wider">
                Cloud Database
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Real-Time Sync Aktif</span>
              </span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 font-heading mt-1">
              Firebase Cloud Firestore
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Penyimpanan database utama menggantikan Spreadsheet. Data tersimpan secara real-time dan terisolasi privat.
            </p>
          </div>
        </div>

        {/* Database Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="px-3.5 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Muat ulang data dari Cloud Firestore"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-orange-600' : 'text-amber-700'}`} />
            <span>{isRefreshing ? 'Menyinkronkan...' : 'Sinkronkan Firestore'}</span>
          </button>

          <button
            onClick={onAddNewStudent}
            className="px-3.5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
          >
            <span>+ Tambah Siswa</span>
          </button>

          <button
            onClick={handleClearRecords}
            className="px-3 py-2 bg-slate-50 hover:bg-rose-50 text-slate-500 hover:text-rose-700 border border-slate-200 hover:border-rose-300 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Kosongkan seluruh data dari Firestore"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Kosongkan</span>
          </button>
        </div>
      </div>

      {/* Real-time Status Alert / Toast */}
      {statusMessage && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-900 font-semibold animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Cloud Configuration Details Banner */}
      <div className="p-4 bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 rounded-2xl border border-orange-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs">
        <div className="space-y-1.5 min-w-0">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-orange-600 animate-pulse shrink-0" />
            <span className="font-extrabold text-slate-800">Firestore Instance ID:</span>
            <code className="bg-white/90 text-orange-900 font-mono text-[11px] font-bold px-2 py-0.5 rounded-md border border-orange-200 truncate max-w-sm">
              {firebaseConfig.firestoreDatabaseId}
            </code>
          </div>
          <p className="text-[11px] text-slate-600">
            Koleksi aktif: <code className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800 font-bold border border-orange-100">/student_records</code> & <code className="font-mono bg-white px-1.5 py-0.5 rounded text-slate-800 font-bold border border-orange-100">/teacher_settings</code>
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 text-[11px] text-slate-600 bg-white/80 px-3 py-1.5 rounded-xl border border-orange-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Security Rules: <strong>Terlindungi & Tervalidasi</strong></span>
        </div>
      </div>

      {/* Real-Time Database Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Dokumen Siswa
          </span>
          <span className="text-xl font-extrabold text-slate-800 font-heading mt-0.5">
            {records.length}
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">
            Tersimpan di Cloud
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Rata-rata Nilai
          </span>
          <span className="text-xl font-extrabold text-red-600 font-heading mt-0.5">
            {averageScore} / 100
          </span>
          <span className="text-[10px] text-slate-500 font-semibold mt-0.5">
            Evaluasi Pemahaman
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Duta Pancasila
          </span>
          <span className="text-xl font-extrabold text-amber-600 font-heading mt-0.5">
            {dutaCount}
          </span>
          <span className="text-[10px] text-amber-700 font-semibold mt-0.5">
            Siswa Dinobatkan
          </span>
        </div>

        <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col items-center justify-center">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Mode Akses
          </span>
          <span className="text-sm font-extrabold text-slate-800 font-heading mt-1">
            Privat Guru
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5">
            Dilindungi Kode Akses
          </span>
        </div>
      </div>
    </section>
  );
};
