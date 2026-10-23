export type TabType = 'home' | 'materi' | 'peta' | 'level-play' | 'games' | 'evaluasi' | 'peringkat' | 'profil' | 'guru';

export interface StudentResultRecord {
  id: string;
  nama: string;
  kelas: string;
  sekolah: string;
  nilaiEvaluasi: number;
  bintang: number;
  levelTuntas: number;
  lencanaCount: number;
  statusDuta: boolean;
  tanggal: string;
  waktuUpdate?: string;
  gameTerakhir?: string;
  poinTotal?: number;
  aktivitasCount?: number;
  catatan?: string;
}

export interface TeacherSettings {
  namaGuru: string;
  sekolah: string;
  kelasDefault: string;
  whatsappNumber: string;
  emailGuru: string;
  customPhotoUrl?: string;
  accessCode?: string;
}

export type AvatarId = 'budi' | 'siti' | 'wayan' | 'meilani' | 'edo' | 'dayu' | 'laode' | 'tiara';

export interface AvatarOption {
  id: AvatarId;
  name: string;
  region: string;
  island?: string;
  emoji: string;
  avatarBg: string;
  description: string;
  pakaianAdat?: string;
  rumahAdat?: string;
  alatMusik?: string;
  salamKhas?: string;
  nilaiKhas?: string;
  motifDaerah?: string;
}

export interface RegionalCultureZone {
  id: string;
  islandName: string;
  title: string;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  icon: string;
  rumahAdat: {
    nama: string;
    filosofi: string;
    icon: string;
  };
  pakaianAdat: {
    nama: string;
    deskripsi: string;
  };
  alatMusik: {
    nama: string;
    caraMain: string;
    icon: string;
  };
  tarianTradisional: string;
  salamKhas: string;
  tradisiGotongRoyong: {
    nama: string;
    penjelasan: string;
  };
  kaitanPancasila: string;
  funFact: string;
}

export interface Badge {
  id: string;
  levelNumber: number;
  name: string;
  silaNumber: number;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface PlayerProfile {
  name: string;
  avatarId: AvatarId;
  points: number;
  stars: number;
  unlockedLevel: number; // 1 to 6 (6 is Pulau Pancasila)
  completedLevels: number[];
  badges: string[]; // badge ids
  evaluasiBestScore: number | null;
  evaluasiStars: number;
  evaluasiAttempts: number;
  completedReflections: number[];
  gamesPlayedCount: number;
  soundEnabled: boolean;
  isDutaPancasila: boolean;
  dutaDate?: string;
}

export interface SilaPenerapan {
  title: string;
  desc: string;
  icon: string;
}

export interface SilaMateri {
  number: number;
  bunyi: string;
  lambang: string;
  lambangDeskripsi: string;
  warnaTema: string;
  badgeColor: string;
  penjelasan: string;
  maknaSimbol: string;
  penerapanRumah: SilaPenerapan[];
  penerapanSekolah: SilaPenerapan[];
  penerapanMasyarakat: SilaPenerapan[];
  refleksi: {
    pertanyaan: string;
    pilihan: {
      teks: string;
      benar: boolean;
      penjelasan: string;
    }[];
  };
}

export interface LevelChallenge {
  id: string;
  title: string;
  narrative: string;
  characterName: string;
  characterEmoji: string;
  question: string;
  options: {
    text: string;
    correct: boolean;
    feedback: string;
  }[];
}

export interface LevelData {
  id: number;
  name: string;
  silaNumber: number;
  silaTitle: string;
  locationTitle: string;
  description: string;
  badgeReward: {
    id: string;
    name: string;
    description: string;
    icon: string;
  };
  islandName: string;
  coords: { x: number; y: number }; // Percentage for map placement
  challenges: LevelChallenge[];
}

export interface SikapGameItem {
  id: number;
  situasi: string;
  silaTerkait: number;
  pilihan: {
    teks: string;
    benar: boolean;
    alasan: string;
  }[];
}

export interface PairMatchPair {
  id: string;
  silaNumber: number;
  silaTitle: string;
  symbol: string;
  perilaku: string;
}

export interface PuzzleSymbol {
  silaNumber: number;
  name: string;
  bunyi: string;
  symbol: string;
  color: string;
  clue: string;
}

export interface MisiKebaikan {
  id: string;
  judul: string;
  lokasi: string;
  silaNumber: number;
  kisah: string;
  karakter: string;
  masalah: string;
  solusi: {
    opsi: string;
    poin: number;
    dampak: string;
    rekomendasi: boolean;
  }[];
}

export interface BenarSalahItem {
  id: number;
  pernyataan: string;
  silaNumber: number;
  jawabanBenar: boolean;
  penjelasan: string;
}

export interface RodaTantanganItem {
  silaNumber: number;
  title: string;
  color: string;
  tantangan: string;
  pertanyaan: string;
  pilihan: string[];
  kunci: number;
  penjelasan: string;
}

export interface EvaluasiQuestion {
  id: number;
  tipe: 'pilihan-ganda' | 'benar-salah';
  silaTerkait: number;
  pertanyaan: string;
  opsi: string[];
  kunciIndex: number;
  pembahasan: string;
}
