import React from 'react';
import { PlayerProfile } from '../types';
import { ASSETS } from '../assets';
import { X, Printer, Award, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface SertifikatModalProps {
  profile: PlayerProfile;
  onClose: () => void;
}

export const SertifikatModal: React.FC<SertifikatModalProps> = ({ profile, onClose }) => {
  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.86, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 280 }}
        className="relative bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-400 my-auto"
      >
        {/* Close Button (Hidden on print) */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 print:hidden z-10 transition-colors"
          title="Tutup Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Action Header for print (Hidden on print) */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-200 mb-6 print:hidden">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Award className="w-5 h-5 text-amber-600" />
            <span>Sertifikat Digital Resmi Duta Pancasila</span>
          </div>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer hover:shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>

        {/* Printable Certificate Canvas */}
        <div
          id="printable-certificate"
          className="relative bg-gradient-to-br from-amber-50 via-white to-amber-50 p-6 sm:p-10 rounded-2xl border-8 border-double border-amber-500 text-center space-y-6 shadow-inner"
        >
          {/* Ornate corner ornaments */}
          <div className="absolute top-2 left-2 text-amber-400 text-xl font-serif select-none">⚜</div>
          <div className="absolute top-2 right-2 text-amber-400 text-xl font-serif select-none">⚜</div>
          <div className="absolute bottom-2 left-2 text-amber-400 text-xl font-serif select-none">⚜</div>
          <div className="absolute bottom-2 right-2 text-amber-400 text-xl font-serif select-none">⚜</div>

          {/* Top Emblem with spring animation */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="flex items-center justify-center gap-4"
          >
            <img
              src={ASSETS.garudaShield}
              alt="Perisai Garuda Pancasila"
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-md"
            />
          </motion.div>

          {/* Certificate Title */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="space-y-1"
          >
            <span className="text-[11px] sm:text-xs font-extrabold tracking-[0.2em] text-red-600 uppercase block font-heading">
              REPUBLIK INDONESIA · PETUALANGAN PANCASILA
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">
              SERTIFIKAT PENGHARGAAN
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-600 to-amber-500 mx-auto rounded-full mt-2" />
          </motion.div>

          {/* Official Quote Required by Prompt */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.25, type: 'spring', stiffness: 280 }}
            className="py-2"
          >
            <div className="inline-block px-6 py-2 rounded-2xl bg-amber-100 border border-amber-300 shadow-xs">
              <span className="text-base sm:text-xl font-extrabold text-amber-950 font-heading">
                “Selamat! Kamu telah menjadi Duta Pancasila.”
              </span>
            </div>
          </motion.div>

          {/* Recipient Details */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32 }}
            className="space-y-2"
          >
            <span className="text-xs sm:text-sm text-slate-500 italic block">
              Sertifikat ini dengan bangga dianugerahkan kepada siswa:
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-red-700 underline decoration-amber-400 decoration-wavy underline-offset-8 font-heading">
              {profile.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-3">
              Atas ketekunan, kejujuran, dan keluhuran budi pekerti dalam menyelesaikan seluruh misi petualangan nilai-nilai Pancasila di Desa Kerukunan, Kota Empati, Pulau Persatuan, Balai Musyawarah, Negeri Keadilan, dan Pulau Pancasila.
            </p>
          </motion.div>

          {/* Achievements Summary Badges */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-center gap-6 py-2"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>{profile.stars} Bintang Emas</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-red-800">
              <Award className="w-4 h-4 text-red-500" />
              <span>{profile.points} Poin Kehormatan</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span>Lencana 5 Sila Lengkap</span>
            </div>
          </motion.div>

          {/* Signatures & Date */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.48 }}
            className="grid grid-cols-2 gap-8 pt-6 border-t border-amber-200 text-xs"
          >
            <div className="space-y-1">
              <span className="text-slate-500 block">Diberikan pada tanggal: {currentDate}</span>
              <div className="pt-6 font-bold text-slate-800 text-sm font-heading">
                Riska Zulfa Luthfiyyah, S.Pd.
              </div>
              <div className="border-b-2 border-slate-400 w-44 mx-auto" />
              <span className="text-[11px] text-slate-600 block mt-1 font-semibold">
                Pengembang Media Petualangan Pancasila
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 block">Tanda Kehormatan Resmi:</span>
              <div className="flex items-center justify-center">
                <motion.img
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  src={ASSETS.dutaBadge}
                  alt="Medali Emas Duta Pancasila"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 object-contain transition-transform"
                />
              </div>
              <div className="pt-1 border-b-2 border-slate-400 w-44 mx-auto" />
              <span className="text-[11px] text-slate-600 block mt-1 font-semibold">
                Duta Pelajar Berkarakter Pancasila
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
