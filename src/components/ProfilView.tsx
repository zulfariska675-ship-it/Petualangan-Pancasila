import React, { useState } from 'react';
import { PlayerProfile, AvatarId } from '../types';
import { AVATARS, ALL_BADGES } from '../data/pancasilaData';
import { ASSETS } from '../assets';
import { playClickSound, playSuccessSound } from '../utils/audio';
import { syncStudentGameProgress } from '../utils/storage';
import { 
  User, 
  Award, 
  Star, 
  RotateCcw, 
  Check, 
  Edit3, 
  ShieldCheck, 
  Sparkles, 
  Compass, 
  CheckCircle2, 
  Printer,
  UserPlus
} from 'lucide-react';

interface ProfilViewProps {
  profile: PlayerProfile;
  onUpdateProfile: (updated: Partial<PlayerProfile>) => void;
  onResetProfile: () => void;
  onCreateNewPlayer?: (name: string) => void;
  onOpenCertificate: () => void;
}

export const ProfilView: React.FC<ProfilViewProps> = ({
  profile,
  onUpdateProfile,
  onResetProfile,
  onCreateNewPlayer,
  onOpenCertificate
}) => {
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [tempName, setTempName] = useState<string>(profile.name);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [showNewPlayerModal, setShowNewPlayerModal] = useState<boolean>(false);
  const [newPlayerName, setNewPlayerName] = useState<string>('');

  const currentAvatar = AVATARS.find((a) => a.id === profile.avatarId) || AVATARS[0];

  const handleSaveName = () => {
    if (!tempName.trim()) return;
    playClickSound(profile.soundEnabled);
    const newName = tempName.trim();
    onUpdateProfile({ name: newName });
    syncStudentGameProgress(
      { ...profile, name: newName },
      'Pembaruan Nama Profil',
      `Siswa mengubah nama profil menjadi ${newName}`
    );
    setIsEditingName(false);
  };

  const handleSelectAvatar = (id: AvatarId) => {
    playSuccessSound(profile.soundEnabled);
    onUpdateProfile({ avatarId: id });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs">
        <div>
          <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
            Akun & Pencapaian Siswa
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 font-heading">
            Profil Petualang Pancasila
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sesuaikan nama dan karakter anak nusantara, serta pantau seluruh lencana yang telah kamu raih!
          </p>
        </div>

        {/* Certificate Button if Duta */}
        {profile.isDutaPancasila && (
          <button
            onClick={onOpenCertificate}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs shadow-xs transition-colors flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Lihat Sertifikat Digital</span>
          </button>
        )}
      </div>

      {/* Main Profile Info Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pb-6 border-b border-slate-100">
          {/* Avatar circle */}
          <div className={`w-24 h-24 rounded-3xl ${currentAvatar.avatarBg} flex items-center justify-center text-5xl shadow-md border-3 shrink-0`}>
            <span>{currentAvatar.emoji}</span>
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    maxLength={25}
                    className="px-3 py-1.5 rounded-xl border border-amber-400 font-bold text-slate-800 text-lg focus:outline-hidden focus:ring-2 focus:ring-red-400"
                    autoFocus
                  />
                  <button
                    onClick={handleSaveName}
                    className="p-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
                    title="Simpan Nama"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold text-slate-800 font-heading">
                    {profile.name}
                  </h2>
                  <button
                    onClick={() => {
                      setTempName(profile.name);
                      setIsEditingName(true);
                    }}
                    className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                    title="Ubah Nama"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="font-bold text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                🇮🇩 Karakter: {currentAvatar.name} ({currentAvatar.region})
              </span>
              <span className="font-semibold text-rose-800 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
                Sapaan: “{currentAvatar.salamKhas || 'Salam Pancasila!'}”
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {currentAvatar.description}
            </p>

            {/* Regional Cultural Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
              <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
                <span className="text-[10px] text-amber-800 uppercase font-bold block">Pakaian Adat:</span>
                <span className="font-bold text-slate-800">{currentAvatar.pakaianAdat || 'Pakaian Nusantara'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-xs">
                <span className="text-[10px] text-emerald-800 uppercase font-bold block">Rumah Adat:</span>
                <span className="font-bold text-slate-800">{currentAvatar.rumahAdat || 'Rumah Tradisional'}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-indigo-50/80 border border-indigo-200 text-xs">
                <span className="text-[10px] text-indigo-800 uppercase font-bold block">Alat Musik & Kesenian:</span>
                <span className="font-bold text-slate-800">{currentAvatar.alatMusik || 'Alat Musik Daerah'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Avatar Selection Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Pilih Karakter Anak Nusantara (8 Daerah):
            </span>
            <span className="text-[11px] text-amber-700 font-semibold hidden sm:inline">
              Klik karakter untuk berganti pakaian & daerah asal
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {AVATARS.map((av) => {
              const isSelected = profile.avatarId === av.id;
              return (
                <button
                  key={av.id}
                  onClick={() => handleSelectAvatar(av.id)}
                  className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-b from-amber-100 to-yellow-100 border-amber-500 shadow-md ring-2 ring-amber-400 scale-104'
                      : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-amber-50/50'
                  }`}
                  title={`${av.name} dari ${av.region}`}
                >
                  <span className="text-3xl block mb-1 hover:scale-110 transition-transform">{av.emoji}</span>
                  <div className="space-y-0.5">
                    <span className="text-xs font-extrabold text-slate-900 block font-heading">
                      {av.name}
                    </span>
                    <span className="text-[10px] text-slate-500 line-clamp-1 block">
                      {av.island || av.region}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="mt-1 text-[9px] font-black text-amber-900 bg-amber-200 px-1.5 py-0.2 rounded-full">
                      Dipilih
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100">
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
            <span className="text-[11px] text-slate-500 block font-medium">Bintang Terkumpul</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span className="text-xl font-bold text-slate-800 tabular-nums">{profile.stars}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200">
            <span className="text-[11px] text-slate-500 block font-medium">Total Poin</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Award className="w-4 h-4 text-rose-500" />
              <span className="text-xl font-bold text-slate-800 tabular-nums">{profile.points}</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
            <span className="text-[11px] text-slate-500 block font-medium">Level Diselesaikan</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Compass className="w-4 h-4 text-emerald-500" />
              <span className="text-xl font-bold text-slate-800 tabular-nums">
                {profile.completedLevels.length} / 5
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-sky-50 border border-sky-200">
            <span className="text-[11px] text-slate-500 block font-medium">Skor Evaluasi</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              <span className="text-xl font-bold text-slate-800 tabular-nums">
                {profile.evaluasiBestScore ? `${profile.evaluasiBestScore}%` : '-'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Gallery */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-xl font-bold text-slate-800 font-heading">
              Galeri Lencana Kehormatan
            </h3>
            <p className="text-xs text-slate-500">
              Lencana diperoleh dengan menyelesaikan level petualangan di Peta Level Nusantara.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            {profile.badges.length} dari {ALL_BADGES.length} Lencana
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ALL_BADGES.map((badge) => {
            const isUnlocked = profile.badges.includes(badge.id);

            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  isUnlocked
                    ? 'bg-amber-50/70 border-amber-300 shadow-2xs'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${
                    isUnlocked
                      ? 'bg-amber-400 text-slate-900 shadow-xs'
                      : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {isUnlocked ? badge.icon : '🔒'}
                </div>
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-800">{badge.name}</h4>
                    {isUnlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">
                    {badge.description}
                  </p>
                  <span className="text-[10px] font-semibold text-amber-700 block pt-1">
                    {isUnlocked ? 'Status: Terbuka' : `Selesaikan Level ${badge.levelNumber}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reset Progress & Pemain Baru Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-800 font-heading">
              Ganti Pemain Baru / Atur Ulang Skor
            </h4>
            <span className="text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-300">
              Mulai dari 0 Poin & 0 Bintang
            </span>
          </div>
          <p className="text-xs text-slate-500">
            Setiap pemain baru atau pengaturan ulang akan mulai dengan 0 bintang dan 0 poin secara bersih.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {/* Tombol Pemain Baru */}
          <button
            onClick={() => {
              playClickSound(profile.soundEnabled);
              setShowNewPlayerModal(true);
            }}
            className="px-4 py-2 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>+ Masuk Sebagai Pemain Baru</span>
          </button>

          {/* Tombol Atur Ulang Profil Saat Ini */}
          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="px-3.5 py-2 border border-rose-300 text-rose-600 hover:bg-rose-50 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Poin & Bintang</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShowResetConfirm(false);
                  playSuccessSound(profile.soundEnabled);
                  onResetProfile();
                }}
                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors"
              >
                Ya, Reset ke 0!
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
              >
                Batal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Masuk Pemain Baru */}
      {showNewPlayerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-amber-200 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="text-center space-y-1.5">
              <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner text-2xl">
                🎮
              </div>
              <h3 className="text-xl font-bold text-slate-800 font-heading">
                Selamat Datang Pemain Baru!
              </h3>
              <p className="text-xs text-slate-500">
                Pemain baru akan memulai petualangan dengan <strong className="text-amber-700 font-bold">0 Bintang</strong> dan <strong className="text-red-600 font-bold">0 Poin</strong>.
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
                      } else {
                        onResetProfile();
                        onUpdateProfile({ name: newPlayerName.trim() });
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
                  } else {
                    onResetProfile();
                    onUpdateProfile({ name: newPlayerName.trim() });
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
    </div>
  );
};
