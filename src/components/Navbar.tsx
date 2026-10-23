import React from 'react';
import { TabType, PlayerProfile } from '../types';
import { 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  Star, 
  Award, 
  Compass, 
  BookOpen, 
  Gamepad2, 
  CheckSquare, 
  User, 
  Home,
  GraduationCap,
  Music,
  Trophy
} from 'lucide-react';
import { playClickSound } from '../utils/audio';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  profile: PlayerProfile;
  isBgmOn: boolean;
  onToggleBgm: () => void;
  onToggleSound: () => void;
  onOpenHelp: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  profile,
  isBgmOn,
  onToggleBgm,
  onToggleSound,
  onOpenHelp,
  onOpenProfile
}) => {
  const handleNav = (tab: TabType) => {
    playClickSound(profile.soundEnabled);
    onSelectTab(tab);
  };

  const navItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Beranda', icon: <Home className="w-4 h-4" /> },
    { id: 'materi', label: 'Materi', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'peta', label: 'Peta Level', icon: <Compass className="w-4 h-4" /> },
    { id: 'games', label: 'Permainan', icon: <Gamepad2 className="w-4 h-4" /> },
    { id: 'evaluasi', label: 'Evaluasi', icon: <CheckSquare className="w-4 h-4" /> },
    { id: 'peringkat', label: 'Peringkat', icon: <Trophy className="w-4 h-4" /> },
    { id: 'guru', label: 'Portal Guru', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'profil', label: 'Profil', icon: <User className="w-4 h-4" /> }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-xs">
      {/* Harmonious Bendera Merah Putih Ribbon & Gold Trim */}
      <div className="w-full flex flex-col">
        <div className="h-1.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 w-full" />
        <div className="h-1 bg-gradient-to-r from-white via-amber-50 to-white w-full border-b border-amber-300/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Zone 1: Single text element wordmark with Creator Credit */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left group focus-visible:outline-hidden cursor-pointer"
          title="Ke Halaman Utama"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform border border-amber-300">
            <span className="text-xl leading-none">🇮🇩</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-red-600 transition-colors block leading-tight font-heading">
                Petualangan Pancasila
              </span>
              <span className="text-[10px] text-red-700 bg-red-50 px-2 py-0.5 rounded-full font-bold border border-red-200 hidden md:inline-flex items-center gap-1">
                🇮🇩 Merah Putih
              </span>
            </div>
            <span className="text-[11px] text-slate-500 hidden sm:block font-medium">
              Karya Riska Zulfa Luthfiyyah, S.Pd.
            </span>
          </div>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-amber-50/80 p-1 rounded-xl border border-amber-200/60">
          {navItems.map((item) => {
            const isActive = currentTab === item.id || (currentTab === 'level-play' && item.id === 'peta');
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-red-600 text-white shadow-xs'
                    : item.id === 'guru'
                    ? 'text-amber-900 bg-amber-100/60 hover:bg-amber-200/70 font-bold'
                    : 'text-slate-600 hover:text-red-700 hover:bg-amber-100/70'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Quick Stats & Primary Action */}
        <div className="flex items-center gap-2">
          {/* Quick HUD Score */}
          <div 
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 px-2.5 py-1.5 bg-amber-50 rounded-xl border border-amber-200 text-xs font-semibold text-slate-700 cursor-pointer hover:bg-amber-100/70 transition-colors"
            title="Klik untuk lihat Profil & Lencana"
          >
            <div className="flex items-center gap-1 text-amber-600">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span className="tabular-nums">{profile.stars}</span>
            </div>
            <span className="text-amber-300">·</span>
            <div className="flex items-center gap-1 text-red-600">
              <Award className="w-3.5 h-3.5" />
              <span className="tabular-nums">{profile.points} <span className="text-[10px] text-slate-500">pt</span></span>
            </div>
          </div>

          {/* BGM Music Button */}
          <button
            onClick={onToggleBgm}
            className={`p-2 rounded-lg transition-colors flex items-center gap-1 ${
              isBgmOn
                ? 'bg-amber-100 text-amber-900 border border-amber-300 font-bold'
                : 'text-slate-400 hover:text-slate-800 hover:bg-slate-100'
            }`}
            title={isBgmOn ? 'Musik Latar Aktif (Klik untuk Matikan)' : 'Putar Musik Latar Ceria'}
            aria-label="Toggle Background Music"
          >
            <Music className={`w-4 h-4 ${isBgmOn ? 'text-red-600 animate-pulse' : ''}`} />
            <span className="text-[10px] hidden sm:inline">{isBgmOn ? 'Musik Nyala' : 'Musik'}</span>
          </button>

          {/* Sound Toggle Button */}
          <button
            onClick={() => {
              playClickSound(true);
              onToggleSound();
            }}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title={profile.soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            aria-label="Toggle Sound"
          >
            {profile.soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Help Button */}
          <button
            onClick={() => {
              playClickSound(profile.soundEnabled);
              onOpenHelp();
            }}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Bantuan & Petunjuk"
            aria-label="Bantuan"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Mobile navigation row */}
      <div className="lg:hidden flex items-center justify-around border-t border-amber-200/50 bg-white px-2 py-1.5 overflow-x-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id || (currentTab === 'level-play' && item.id === 'peta');
          return (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className={`flex flex-col items-center py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? 'text-red-600 font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {item.icon}
              <span className="mt-0.5 whitespace-nowrap">{item.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};

