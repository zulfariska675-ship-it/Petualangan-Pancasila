import React from 'react';
import { X, BookOpen, Compass, Gamepad2, Award, ShieldCheck, Heart, Volume2, GraduationCap } from 'lucide-react';

interface BantuanModalProps {
  onClose: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const BantuanModal: React.FC<BantuanModalProps> = ({
  onClose,
  soundEnabled,
  onToggleSound
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-amber-300 my-auto animate-in fade-in zoom-in-95 duration-200 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-amber-200 pb-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center text-2xl border border-amber-300">
            💡
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-heading">
              Panduan, Bantuan & Profil Pengembang
            </h3>
            <p className="text-xs text-slate-500">
              Media Pembelajaran Interaktif Petualangan Pancasila karya Riska Zulfa Luthfiyyah
            </p>
          </div>
        </div>

        {/* Feature Guides */}
        <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {/* Creator Profile Spotlight */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-red-50 to-amber-50 border border-amber-300 flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 border-2 border-amber-400 shadow-xs shrink-0 flex items-center justify-center text-amber-700">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-1.5 text-red-700 font-bold text-xs font-heading">
                <GraduationCap className="w-4 h-4" />
                <span>Pengembang & Penulis Media:</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900">
                Riska Zulfa Luthfiyyah, S.Pd.
              </h4>
              <p className="text-[11px] text-slate-600 leading-snug">
                Dikembangkan dengan cinta untuk kemajuan pendidikan moral dan karakter Pancasila generasi muda Indonesia.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <Compass className="w-4 h-4 text-amber-600" />
              <span>1. Cara Menjelajahi Peta Level</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mulai dari Level 1 (Desa Kerukunan) lalu selesaikan tantangan cerita untuk membuka level berikutnya secara bertahap hingga Pulau Pancasila. Setiap level menghadiahkan lencana kehormatan dan bintang!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-red-50/70 border border-red-200 space-y-1">
            <div className="flex items-center gap-2 text-red-900 font-bold text-xs">
              <BookOpen className="w-4 h-4 text-red-600" />
              <span>2. Modul Materi Interaktif & Suara</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pelajari arti dan lambang kelima sila. Tekan tombol <strong>"Dengarkan Suara"</strong> untuk mendengarkan teks dibacakan secara otomatis. Jawab pertanyaan refleksi untuk meraih poin tambahan!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
              <Gamepad2 className="w-4 h-4 text-emerald-600" />
              <span>3. 6 Jenis Permainan Asyik</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pilih Sikap yang Tepat, Pasangkan Nilai, Susun Puzzle Lambang, Misi Kebaikan Karakter, Kuis Benar atau Salah, serta Roda Keberuntungan Tantangan!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50/70 border border-sky-200 space-y-1">
            <div className="flex items-center gap-2 text-sky-900 font-bold text-xs">
              <Award className="w-4 h-4 text-sky-600" />
              <span>4. Portal Guru & Pengumpulan Hasil Siswa</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Guru dapat membuka menu <strong>Portal Guru</strong> untuk mengakses tautan khusus penampung nilai siswa, menghubungkan Google Form/Sheets, mengunduh file CSV Excel, dan mencetak rekapitulasi nilai kelas.
            </p>
          </div>

          {/* Child Safe & Offline Note */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Keamanan & Privasi Anak (Kid-Safe)</span>
            </div>
            <ul className="text-[11px] text-slate-600 space-y-1 list-disc list-inside">
              <li>100% Bebas Iklan & Aman untuk Siswa Sekolah Dasar.</li>
              <li>Tidak memerlukan pembuatan akun atau pendaftaran login.</li>
              <li>Seluruh kemajuan belajar tersimpan secara aman di peramban (browser) siswa.</li>
            </ul>
          </div>
        </div>

        {/* Sound toggle row in help */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
            <Volume2 className="w-4 h-4 text-slate-500" />
            <span>Efek Suara Permainan:</span>
          </div>

          <button
            onClick={onToggleSound}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs border transition-colors ${
              soundEnabled
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                : 'bg-slate-100 text-slate-500 border-slate-300'
            }`}
          >
            {soundEnabled ? 'Aktif (Suara Nyala)' : 'Nonaktif (Mute)'}
          </button>
        </div>
      </div>
    </div>
  );
};

