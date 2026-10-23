/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, PlayerProfile } from './types';
import { 
  loadPlayerProfile, 
  savePlayerProfile, 
  resetPlayerProfile,
  createNewPlayerProfile,
  loadTeacherCustomPhoto,
  saveTeacherCustomPhoto,
  syncStudentGameProgress
} from './utils/storage';
import { isBgmPlaying, toggleBgm, addBgmListener } from './utils/audio';
import { Navbar } from './components/Navbar';
import { HomeView } from './components/HomeView';
import { MateriView } from './components/MateriView';
import { PetaLevelView } from './components/PetaLevelView';
import { LevelAdventureView } from './components/LevelAdventureView';
import { GamesHubView } from './components/GamesHubView';
import { EvaluasiView } from './components/EvaluasiView';
import { ProfilView } from './components/ProfilView';
import { PortalGuruView } from './components/PortalGuruView';
import { LeaderboardView } from './components/LeaderboardView';
import { SertifikatModal } from './components/SertifikatModal';
import { BantuanModal } from './components/BantuanModal';
import { NusantaraPosterBackground } from './components/NusantaraPosterBackground';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [profile, setProfile] = useState<PlayerProfile>(() => loadPlayerProfile());
  const [customTeacherPhoto, setCustomTeacherPhoto] = useState<string | null>(() => loadTeacherCustomPhoto());
  const [isBgmOn, setIsBgmOn] = useState<boolean>(() => isBgmPlaying());

  useEffect(() => {
    const unsub = addBgmListener((active) => {
      setIsBgmOn(active);
    });
    return unsub;
  }, []);

  const handleToggleBgm = () => {
    toggleBgm();
  };
  const [currentTab, setCurrentTab] = useState<TabType>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') || params.get('mode');
      if (tabParam === 'guru') return 'guru';
      if (tabParam === 'materi') return 'materi';
      if (tabParam === 'peta') return 'peta';
      if (tabParam === 'games') return 'games';
      if (tabParam === 'evaluasi') return 'evaluasi';
    }
    return 'home';
  });

  const [activeLevelId, setActiveLevelId] = useState<number>(1);
  const [selectedMateriSilaId, setSelectedMateriSilaId] = useState<number>(1);
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const handleUpdateTeacherPhoto = (dataUrl: string) => {
    saveTeacherCustomPhoto(dataUrl);
    setCustomTeacherPhoto(dataUrl);
  };

  // Sync profile to local storage on state updates
  useEffect(() => {
    savePlayerProfile(profile);
  }, [profile]);

  // Update rekaman siswa secara realtime setiap kali siswa mengakses aplikasi
  useEffect(() => {
    if (profile && profile.name && profile.name.trim()) {
      syncStudentGameProgress(
        profile,
        'Akses Aplikasi Petualangan Pancasila',
        'Siswa aktif membuka aplikasi'
      );
    }
  }, [profile.name]);

  const handleUpdateProfile = (updated: Partial<PlayerProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updated
    }));
  };

  const handleResetProfile = () => {
    const fresh = resetPlayerProfile();
    setProfile(fresh);
    setCurrentTab('home');
  };

  const handleCreateNewPlayer = (name: string) => {
    const fresh = createNewPlayerProfile(name);
    setProfile(fresh);
    setCurrentTab('home');
  };

  const handleToggleSound = () => {
    setProfile((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };

  const handleNavigate = (
    tab: TabType,
    extra?: { silaId?: number; levelId?: number }
  ) => {
    if (extra?.silaId) {
      setSelectedMateriSilaId(extra.silaId);
    }
    if (extra?.levelId) {
      setActiveLevelId(extra.levelId);
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen relative bg-transparent text-slate-800 flex flex-col font-sans">
      {/* Background Poster Nusantara & Merah Putih Ambient Accents */}
      <NusantaraPosterBackground />

      {/* Top Navbar adhering to Top Bar Contract */}
      <div className="relative z-40">
        <Navbar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            if (tab === 'level-play') {
              setActiveLevelId(profile.unlockedLevel <= 5 ? profile.unlockedLevel : 5);
            }
            setCurrentTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          profile={profile}
          isBgmOn={isBgmOn}
          onToggleBgm={handleToggleBgm}
          onToggleSound={handleToggleSound}
          onOpenHelp={() => setShowHelp(true)}
          onOpenProfile={() => {
            setCurrentTab('profil');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      </div>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {currentTab === 'home' && (
          <HomeView
            profile={profile}
            customPhoto={customTeacherPhoto}
            onUpdateCustomPhoto={handleUpdateTeacherPhoto}
            onNavigate={handleNavigate}
            onOpenCertificate={() => setShowCertificate(true)}
            onOpenHelp={() => setShowHelp(true)}
            onCreateNewPlayer={handleCreateNewPlayer}
          />
        )}

        {currentTab === 'materi' && (
          <MateriView
            profile={profile}
            initialSilaId={selectedMateriSilaId}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {currentTab === 'peta' && (
          <PetaLevelView
            profile={profile}
            onSelectLevel={(lvlId) => {
              setActiveLevelId(lvlId);
              setCurrentTab('level-play');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        )}

        {currentTab === 'level-play' && (
          <AnimatePresence mode="wait">
            <motion.div
              key={`level-screen-${activeLevelId}`}
              initial={{ opacity: 0, x: 25, filter: 'blur(3px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -25, filter: 'blur(3px)' }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <LevelAdventureView
                levelId={activeLevelId}
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onBackToMap={() => {
                  setCurrentTab('peta');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNextLevel={(nextLvl) => {
                  setActiveLevelId(nextLvl);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenCertificate={() => setShowCertificate(true)}
              />
            </motion.div>
          </AnimatePresence>
        )}

        {currentTab === 'games' && (
          <GamesHubView
            profile={profile}
            isBgmOn={isBgmOn}
            onToggleBgm={handleToggleBgm}
            onUpdateProfile={handleUpdateProfile}
          />
        )}

        {currentTab === 'evaluasi' && (
          <EvaluasiView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onNavigateToMateri={(silaId) => {
              setSelectedMateriSilaId(silaId);
              setCurrentTab('materi');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToGuru={() => {
              setCurrentTab('guru');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'peringkat' && (
          <LeaderboardView
            profile={profile}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'guru' && (
          <PortalGuruView
            profile={profile}
            customPhoto={customTeacherPhoto}
            onUpdateCustomPhoto={handleUpdateTeacherPhoto}
            onNavigateHome={() => {
              setCurrentTab('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentTab === 'profil' && (
          <ProfilView
            profile={profile}
            onUpdateProfile={handleUpdateProfile}
            onResetProfile={handleResetProfile}
            onCreateNewPlayer={handleCreateNewPlayer}
            onOpenCertificate={() => setShowCertificate(true)}
          />
        )}
      </main>

      {/* Official Certificate Modal with smooth Framer Motion transitions */}
      <AnimatePresence>
        {showCertificate && (
          <SertifikatModal
            profile={profile}
            onClose={() => setShowCertificate(false)}
          />
        )}
      </AnimatePresence>

      {/* Help & Guide Modal */}
      {showHelp && (
        <BantuanModal
          onClose={() => setShowHelp(false)}
          soundEnabled={profile.soundEnabled}
          onToggleSound={handleToggleSound}
        />
      )}

      {/* Clean footer with harmonious Merah Putih ribbon */}
      <footer className="relative z-20 border-t border-amber-200/80 bg-white/95 backdrop-blur-md mt-12 print:hidden overflow-hidden shadow-xs">
        {/* Harmonious Dual Bendera Merah Putih Ribbon */}
        <div className="w-full flex flex-col">
          <div className="h-1.5 bg-gradient-to-r from-red-600 via-rose-600 to-red-600 w-full" />
          <div className="h-1 bg-gradient-to-r from-white via-amber-50 to-white w-full border-b border-amber-200" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-900 font-heading">Petualangan Pancasila</span>
            <span>·</span>
            <span className="text-slate-600">Karya Riska Zulfa Luthfiyyah, S.Pd.</span>
            <span className="hidden md:inline text-[10px] bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-bold border border-red-200">
              🇮🇩 Merah Putih & Bhinneka Tunggal Ika
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-medium text-slate-600">
            <button
              onClick={() => {
                setCurrentTab('guru');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-amber-900 hover:text-red-700 font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Portal Guru & Rekap Nilai</span>
            </button>
            <span>·</span>
            <span>38 Provinsi Bersatu</span>
            <span>·</span>
            <button
              onClick={() => setShowHelp(true)}
              className="text-red-600 hover:underline font-semibold cursor-pointer"
            >
              Bantuan
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
