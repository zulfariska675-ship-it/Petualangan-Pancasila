import React, { useState, useEffect } from 'react';
import { 
  BGM_TRACKS, 
  BgmTrackId, 
  isBgmPlaying, 
  getCurrentBgmTrack, 
  getBgmVolumeLevel,
  setBgmVolumeLevel,
  setBgmTrack,
  startBgm,
  stopBgm,
  toggleBgm,
  addBgmListener,
  playClickSound
} from '../utils/audio';
import { Music, Volume2, VolumeX, Play, Pause, Sparkles } from 'lucide-react';

interface GameMusicBarProps {
  compact?: boolean;
  soundEnabled?: boolean;
}

export const GameMusicBar: React.FC<GameMusicBarProps> = ({ 
  compact = false,
  soundEnabled = true
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => isBgmPlaying());
  const [activeTrack, setActiveTrack] = useState<BgmTrackId>(() => getCurrentBgmTrack());
  const [volume, setVolume] = useState<'lembut' | 'sedang' | 'ceria'>(() => getBgmVolumeLevel());

  useEffect(() => {
    const unsubscribe = addBgmListener((active, track) => {
      setIsPlaying(active);
      setActiveTrack(track);
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = () => {
    playClickSound(soundEnabled);
    toggleBgm(activeTrack);
  };

  const handleSelectTrack = (trackId: BgmTrackId) => {
    playClickSound(soundEnabled);
    setBgmTrack(trackId);
    if (!isPlaying) {
      startBgm(trackId);
    }
  };

  const handleChangeVolume = (vol: 'lembut' | 'sedang' | 'ceria') => {
    playClickSound(soundEnabled);
    setBgmVolumeLevel(vol);
    setVolume(vol);
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 bg-amber-50/90 border border-amber-300/80 px-3 py-1.5 rounded-2xl shadow-2xs">
        <button
          onClick={handleTogglePlay}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
            isPlaying
              ? 'bg-red-600 text-white shadow-xs animate-pulse'
              : 'bg-white text-slate-700 hover:bg-amber-100 border border-amber-200'
          }`}
          title={isPlaying ? 'Jeda Musik Game' : 'Putar Musik Game Ceria'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlaying ? 'Musik On' : 'Nyalakan Musik'}</span>
        </button>

        {/* Small Animated equalizer bars when active */}
        {isPlaying && (
          <div className="flex items-end gap-0.5 h-4 px-1">
            <span className="w-1 bg-red-500 rounded-full animate-bounce h-3" style={{ animationDelay: '0ms' }} />
            <span className="w-1 bg-amber-500 rounded-full animate-bounce h-4" style={{ animationDelay: '150ms' }} />
            <span className="w-1 bg-emerald-500 rounded-full animate-bounce h-2" style={{ animationDelay: '300ms' }} />
            <span className="w-1 bg-blue-500 rounded-full animate-bounce h-3.5" style={{ animationDelay: '200ms' }} />
          </div>
        )}

        {/* Track cycle */}
        <div className="hidden sm:flex items-center gap-1 text-[11px]">
          {BGM_TRACKS.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelectTrack(t.id)}
              className={`px-2 py-0.5 rounded-lg font-medium transition-colors ${
                activeTrack === t.id
                  ? 'bg-amber-400 text-slate-900 font-bold'
                  : 'text-slate-600 hover:bg-amber-100'
              }`}
              title={t.description}
            >
              <span>{t.icon} {t.name.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Full Expanded Player Card for Games Hub
  return (
    <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-5 sm:p-6 text-white shadow-md relative overflow-hidden">
      {/* Decorative background note shapes */}
      <div className="absolute -right-4 -bottom-6 text-white/10 text-9xl font-serif pointer-events-none select-none">
        𝄞
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        {/* Left Info & Equalizer */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-xl shadow-xs">
              🎵
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-yellow-200 block">
                Musik Pengiring Game Pancasila
              </span>
              <h3 className="text-lg font-bold font-heading flex items-center gap-2">
                <span>{BGM_TRACKS.find(t => t.id === activeTrack)?.name}</span>
                {isPlaying && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-white text-red-600 px-2 py-0.5 rounded-full shadow-2xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping" />
                    Sedang Diputar
                  </span>
                )}
              </h3>
            </div>
          </div>
          <p className="text-xs text-white/90 max-w-xl leading-relaxed">
            {BGM_TRACKS.find(t => t.id === activeTrack)?.description}
          </p>
        </div>

        {/* Right Play Controls & Track Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Main Play / Pause Button */}
          <button
            onClick={handleTogglePlay}
            className={`px-5 py-3 rounded-2xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 ${
              isPlaying
                ? 'bg-white text-red-600 hover:bg-yellow-50 hover:scale-102 active:scale-98'
                : 'bg-yellow-300 hover:bg-yellow-200 text-slate-900 hover:scale-102 active:scale-98'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Jeda Musik</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Putar Musik Game Ceria</span>
              </>
            )}
          </button>

          {/* Equalizer animation */}
          {isPlaying && (
            <div className="hidden lg:flex items-end gap-1 h-8 bg-black/20 px-3 py-1 rounded-xl">
              <span className="w-1.5 bg-yellow-300 rounded-full animate-bounce h-5" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 bg-yellow-200 rounded-full animate-bounce h-7" style={{ animationDelay: '120ms' }} />
              <span className="w-1.5 bg-white rounded-full animate-bounce h-3" style={{ animationDelay: '240ms' }} />
              <span className="w-1.5 bg-yellow-300 rounded-full animate-bounce h-6" style={{ animationDelay: '180ms' }} />
              <span className="w-1.5 bg-yellow-100 rounded-full animate-bounce h-4" style={{ animationDelay: '90ms' }} />
            </div>
          )}
        </div>
      </div>

      {/* Track Selection Bar & Volume Levels */}
      <div className="relative z-10 mt-4 pt-4 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        {/* Track Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-bold text-yellow-200 text-[11px] shrink-0">Pilih Irama:</span>
          {BGM_TRACKS.map((track) => (
            <button
              key={track.id}
              onClick={() => handleSelectTrack(track.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                activeTrack === track.id
                  ? 'bg-white text-slate-900 shadow-xs ring-2 ring-yellow-300'
                  : 'bg-black/20 hover:bg-black/30 text-white'
              }`}
            >
              <span>{track.icon}</span>
              <span>{track.name}</span>
            </button>
          ))}
        </div>

        {/* Volume Level Controls */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-[11px] font-bold text-yellow-200 mr-1">Volume:</span>
          {(['lembut', 'sedang', 'ceria'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => handleChangeVolume(lvl)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-colors ${
                volume === lvl
                  ? 'bg-yellow-300 text-slate-900 shadow-2xs'
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
