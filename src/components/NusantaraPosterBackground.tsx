import React, { useState } from 'react';
import { ASSETS } from '../assets';
import { Maximize2, X, Eye, EyeOff, Sparkles, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export type PosterBackgroundMode = 'nyata' | 'jelas' | 'lembut' | 'sembunyi';
export type PosterBackgroundSize = 'kecil' | 'sedang' | 'penuh';

interface NusantaraPosterBackgroundProps {
  onOpenFullPoster?: () => void;
}

export const NusantaraPosterBackground: React.FC<NusantaraPosterBackgroundProps> = ({
  onOpenFullPoster
}) => {
  const [bgMode, setBgMode] = useState<PosterBackgroundMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('petualangan_pancasila_bg_mode');
      if (saved === 'nyata' || saved === 'jelas' || saved === 'lembut' || saved === 'sembunyi') {
        return saved as PosterBackgroundMode;
      }
    }
    // Default to 'nyata' (real & vivid) as requested by the user
    return 'nyata';
  });

  const [bgSize, setBgSize] = useState<PosterBackgroundSize>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('petualangan_pancasila_bg_size');
      if (saved === 'kecil' || saved === 'sedang' || saved === 'penuh') {
        return saved as PosterBackgroundSize;
      }
    }
    // Default to 'kecil' (scaled-down background poster as requested)
    return 'kecil';
  });

  const [showFullPosterModal, setShowFullPosterModal] = useState<boolean>(false);

  const handleSetMode = (mode: PosterBackgroundMode) => {
    setBgMode(mode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('petualangan_pancasila_bg_mode', mode);
    }
  };

  const handleToggleSize = () => {
    const nextSize: PosterBackgroundSize =
      bgSize === 'kecil' ? 'sedang' : bgSize === 'sedang' ? 'penuh' : 'kecil';
    setBgSize(nextSize);
    if (typeof window !== 'undefined') {
      localStorage.setItem('petualangan_pancasila_bg_size', nextSize);
    }
  };

  // Vivid, authentic opacity levels that make the artwork truly shine
  const opacityStyle =
    bgMode === 'nyata'
      ? { opacity: 0.88, filter: 'saturate(1.1) contrast(1.05)' }
      : bgMode === 'jelas'
      ? { opacity: 0.60, filter: 'saturate(1.05)' }
      : bgMode === 'lembut'
      ? { opacity: 0.28, filter: 'saturate(1.0)' }
      : { opacity: 0 };

  // Calculate scaled-down dimensions
  const computedBgSize =
    bgSize === 'kecil'
      ? 'min(620px, 62vw) auto'
      : bgSize === 'sedang'
      ? 'min(860px, 80vw) auto'
      : 'cover';

  return (
    <>
      {/* Fixed Ambient Background Canvas with Poster Nusantara (Vivid & Real) */}
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-all duration-500 bg-gradient-to-b from-amber-50/50 via-slate-50/30 to-amber-100/30"
        aria-hidden="true"
      >
        {/* Scaled-down Vivid Poster Image Layer */}
        {bgMode !== 'sembunyi' && (
          <div
            className="absolute inset-0 transition-all duration-500"
            style={{
              backgroundImage: `url(${ASSETS.posterNusantara})`,
              backgroundSize: computedBgSize,
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              ...opacityStyle
            }}
          />
        )}

        {/* Delicate Scrim for Optimal Typography Contrast without washing out the colors */}
        {bgMode !== 'sembunyi' && (
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-amber-950/20 pointer-events-none" />
        )}

        {/* Top Waving Bendera Merah Putih Border Ribbon */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 shadow-md pointer-events-none z-10" />
        <div className="absolute top-2 left-0 right-0 h-1 bg-gradient-to-r from-white via-amber-50 to-white shadow-2xs pointer-events-none z-10" />

        {/* Bottom Waving Bendera Merah Putih Border Ribbon */}
        <div className="absolute bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-white via-amber-50 to-white pointer-events-none z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-2.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 shadow-lg pointer-events-none z-10" />
      </div>

      {/* Floating Ambient Controls: Adjust Poster & Zoom Poster */}
      <div className="fixed bottom-3 right-3 z-30 flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl border-2 border-red-500 shadow-xl text-xs print:hidden animate-in fade-in duration-300">
        <div className="flex items-center gap-1 text-[11px] font-extrabold text-red-700 mr-1">
          <span className="text-sm">🇮🇩</span>
          <span className="hidden sm:inline">Latar Poster:</span>
        </div>

        <button
          onClick={() => handleSetMode('nyata')}
          className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold transition-all cursor-pointer ${
            bgMode === 'nyata'
              ? 'bg-red-600 text-white shadow-sm scale-105'
              : 'text-slate-700 hover:bg-red-50'
          }`}
          title="Mode Nyata & Sangat Jelas (Paling Hidup)"
        >
          ✨ Nyata
        </button>

        <button
          onClick={() => handleSetMode('jelas')}
          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
            bgMode === 'jelas'
              ? 'bg-red-600 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          title="Mode Jelas (Seimbang)"
        >
          Jelas
        </button>

        <button
          onClick={() => handleSetMode('lembut')}
          className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
            bgMode === 'lembut'
              ? 'bg-red-600 text-white shadow-2xs'
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          title="Mode Halus (Lembut)"
        >
          Lembut
        </button>

        <button
          onClick={() => handleSetMode('sembunyi')}
          className={`p-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
            bgMode === 'sembunyi'
              ? 'bg-slate-800 text-white'
              : 'text-slate-400 hover:bg-slate-100'
          }`}
          title="Sembunyikan Gambar Latar"
        >
          <EyeOff className="w-3.5 h-3.5" />
        </button>



        {/* Toggle size button */}
        {bgMode !== 'sembunyi' && (
          <button
            onClick={handleToggleSize}
            className="flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-extrabold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 transition-colors cursor-pointer"
            title={`Ukuran Gambar Latar: ${bgSize === 'kecil' ? 'Kecil' : bgSize === 'sedang' ? 'Sedang' : 'Penuh'}. Klik untuk mengubah.`}
          >
            <span>📐</span>
            <span className="capitalize">{bgSize}</span>
          </button>
        )}

        <span className="w-px h-4 bg-amber-300 mx-0.5" />

        <button
          onClick={() => setShowFullPosterModal(true)}
          className="flex items-center gap-1 px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-900 rounded-xl text-[10px] font-extrabold shadow-xs transition-transform hover:scale-105 cursor-pointer"
          title="Lihat Poster Utuh Garuda & Peta Budaya Resolusi Penuh"
        >
          <Maximize2 className="w-3.5 h-3.5 text-red-700" />
          <span className="hidden sm:inline">Perbesar</span>
        </button>
      </div>

      {/* Modal Poster Penuh (High-Res Showcase for Children & Teachers) */}
      <AnimatePresence>
        {showFullPosterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            onClick={() => setShowFullPosterModal(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-amber-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Bendera Merah Putih */}
              <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 text-white p-4 sm:p-5 flex items-center justify-between relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-700 to-red-900" />
                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white" />

                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl border border-white/30 shadow-xs">
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
                  onClick={() => setShowFullPosterModal(false)}
                  className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                  title="Tutup"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Poster Full Image with Zoomable container */}
              <div className="p-3 sm:p-6 bg-gradient-to-b from-sky-100 via-amber-50 to-orange-50 max-h-[75vh] overflow-auto flex items-center justify-center">
                <img
                  src={ASSETS.posterNusantara}
                  alt="Poster Lengkap Petualangan Pancasila: Garuda Pancasila, Rumah Adat Nusantara, Peta Indonesia, dan Anak-Anak Berbusana Adat"
                  className="w-full max-h-[72vh] object-contain rounded-2xl shadow-xl border-2 border-white"
                />
              </div>

              {/* Footer penjelasan unsur budaya */}
              <div className="bg-white p-4 border-t border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-red-700">🇮🇩 Nilai Luhur:</span>
                  <span className="font-medium">
                    Garuda Pancasila melambangkan persatuan 38 provinsi di atas kebhinekaan suku, adat, dan budaya Nusantara.
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-3 py-1 bg-amber-100 rounded-xl font-extrabold text-amber-900 text-xs border border-amber-300">
                    Bhinneka Tunggal Ika
                  </span>
                  <button
                    onClick={() => setShowFullPosterModal(false)}
                    className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold cursor-pointer transition-colors shadow-xs"
                  >
                    Tutup Poster
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
