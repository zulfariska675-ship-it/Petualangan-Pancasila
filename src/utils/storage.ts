import { PlayerProfile, StudentResultRecord, TeacherSettings } from '../types';
import {
  saveStudentRecordFirestore,
  deleteStudentRecordFirestore,
  saveTeacherSettingsFirestore
} from '../services/firebaseDb';

const STORAGE_KEY = 'petualangan_pancasila_save_v1';
const TEACHER_SETTINGS_KEY = 'petualangan_pancasila_guru_settings_v1';
const STUDENT_RECORDS_KEY = 'petualangan_pancasila_rekap_siswa_v1';

export const DEFAULT_PROFILE: PlayerProfile = {
  name: 'Petualang Hebat',
  avatarId: 'budi',
  points: 0,
  stars: 0,
  unlockedLevel: 1,
  completedLevels: [],
  badges: [],
  evaluasiBestScore: null,
  evaluasiStars: 0,
  evaluasiAttempts: 0,
  completedReflections: [],
  gamesPlayedCount: 0,
  soundEnabled: true,
  isDutaPancasila: false
};

export const DEFAULT_TEACHER_SETTINGS: TeacherSettings = {
  namaGuru: 'Riska Zulfa Luthfiyyah, S.Pd.',
  sekolah: 'Sekolah Dasar (SD)',
  kelasDefault: 'Kelas IV (Fase B)',
  whatsappNumber: '081234567890',
  emailGuru: 'zulfariska675@gmail.com',
  accessCode: 'GURU2025'
};

export const DEFAULT_SAMPLE_STUDENTS: StudentResultRecord[] = [];

export function loadPlayerProfile(): PlayerProfile {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_PROFILE,
      ...parsed
    };
  } catch (e) {
    console.error('Failed to load profile', e);
    return DEFAULT_PROFILE;
  }
}

export function savePlayerProfile(profile: PlayerProfile): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile', e);
  }
}

export function resetPlayerProfile(): PlayerProfile {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to reset profile', e);
  }
  return DEFAULT_PROFILE;
}

export function createNewPlayerProfile(name: string): PlayerProfile {
  const newProfile: PlayerProfile = {
    ...DEFAULT_PROFILE,
    name: name.trim() || 'Petualang Hebat'
  };
  savePlayerProfile(newProfile);

  // Otomatis sinkronisasi pemain baru ke Firebase Firestore
  syncStudentGameProgress(newProfile, 'Pendaftaran Pemain Baru', 'Pemain baru memulai petualangan');

  return newProfile;
}

const CUSTOM_PHOTO_KEY = 'petualangan_pancasila_riska_photo_v1';

export function loadTeacherCustomPhoto(): string | null {
  try {
    return localStorage.getItem(CUSTOM_PHOTO_KEY);
  } catch (e) {
    return null;
  }
}

export function saveTeacherCustomPhoto(dataUrl: string): void {
  try {
    localStorage.setItem(CUSTOM_PHOTO_KEY, dataUrl);
  } catch (e) {
    console.error('Failed to save custom photo', e);
  }
}

export function removeTeacherCustomPhoto(): void {
  try {
    localStorage.removeItem(CUSTOM_PHOTO_KEY);
  } catch (e) {
    console.error('Failed to remove custom photo', e);
  }
}

export function loadTeacherSettings(): TeacherSettings {
  try {
    const raw = localStorage.getItem(TEACHER_SETTINGS_KEY);
    if (!raw) return DEFAULT_TEACHER_SETTINGS;
    const parsed = JSON.parse(raw);
    const result: TeacherSettings = {
      ...DEFAULT_TEACHER_SETTINGS,
      ...parsed
    };
    if (result.sekolah === 'SD Negeri Nusantara' || !result.sekolah) {
      result.sekolah = 'Sekolah Dasar (SD)';
    }
    return result;
  } catch (e) {
    return DEFAULT_TEACHER_SETTINGS;
  }
}

export function saveTeacherSettings(settings: TeacherSettings): void {
  try {
    localStorage.setItem(TEACHER_SETTINGS_KEY, JSON.stringify(settings));
    // Simpan ke Firebase Firestore secara realtime
    saveTeacherSettingsFirestore(settings).catch((err) => {
      console.warn('Realtime Firestore teacher settings sync error:', err);
    });
  } catch (e) {
    console.error('Failed to save teacher settings', e);
  }
}

export function loadStudentRecords(): StudentResultRecord[] {
  try {
    const raw = localStorage.getItem(STUDENT_RECORDS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Filter out dummy/mock student IDs
    return parsed.filter(
      (r) => !['rec-1', 'rec-2', 'rec-3'].includes(r.id)
    );
  } catch (e) {
    return [];
  }
}

export function saveStudentRecord(record: StudentResultRecord): StudentResultRecord[] {
  try {
    const current = loadStudentRecords();
    const updated = [record, ...current.filter((r) => r.id !== record.id)];
    localStorage.setItem(STUDENT_RECORDS_KEY, JSON.stringify(updated));

    // Simpan ke Firebase Firestore secara realtime
    saveStudentRecordFirestore(record).catch((err) => {
      console.warn('Realtime Firestore student record sync error:', err);
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('student-records-updated', {
          detail: {
            studentName: record.nama,
            updatedRecord: record
          }
        })
      );
    }

    return updated;
  } catch (e) {
    console.error('Failed to save student record', e);
    return [];
  }
}

export function deleteStudentRecord(recordId: string): StudentResultRecord[] {
  try {
    const current = loadStudentRecords();
    const updated = current.filter((r) => r.id !== recordId);
    localStorage.setItem(STUDENT_RECORDS_KEY, JSON.stringify(updated));

    // Hapus dari Firebase Firestore secara realtime
    deleteStudentRecordFirestore(recordId).catch((err) => {
      console.warn('Realtime Firestore student record delete error:', err);
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('student-records-updated', {
          detail: { deletedId: recordId }
        })
      );
    }

    return updated;
  } catch (e) {
    return [];
  }
}

const CUSTOM_HERO_PHOTO_KEY = 'petualangan_pancasila_hero_photo_v1';

export function loadCustomHeroPhoto(): string | null {
  try {
    return localStorage.getItem(CUSTOM_HERO_PHOTO_KEY);
  } catch {
    return null;
  }
}

export function saveCustomHeroPhoto(dataUrl: string): void {
  try {
    localStorage.setItem(CUSTOM_HERO_PHOTO_KEY, dataUrl);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hero-photo-updated', { detail: dataUrl }));
    }
  } catch (e) {
    console.error('Failed to save custom hero photo', e);
  }
}

export function resetCustomHeroPhoto(): void {
  try {
    localStorage.removeItem(CUSTOM_HERO_PHOTO_KEY);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hero-photo-updated', { detail: null }));
    }
  } catch (e) {
    console.error('Failed to reset hero photo', e);
  }
}

/**
 * Otomatis memperbarui rekap data siswa ke Firebase Firestore setiap kali siswa memainkan game / menyelesaikan tantangan.
 */
export function syncStudentGameProgress(
  profile: PlayerProfile,
  activityTitle: string,
  detail?: string
): StudentResultRecord[] {
  try {
    const current = loadStudentRecords();
    const settings = loadTeacherSettings();
    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const formattedTime = now.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Cari apakah siswa dengan nama ini sudah ada di daftar
    const existingIndex = current.findIndex(
      (r) => r.nama.trim().toLowerCase() === profile.name.trim().toLowerCase()
    );

    const prevRecord = existingIndex >= 0 ? current[existingIndex] : null;
    const prevAktivitasCount = prevRecord?.aktivitasCount || 0;

    const updatedRecord: StudentResultRecord = {
      id: prevRecord?.id || `rec-${Date.now()}`,
      nama: profile.name,
      kelas: prevRecord?.kelas || settings.kelasDefault,
      sekolah: prevRecord?.sekolah || settings.sekolah,
      nilaiEvaluasi: profile.evaluasiBestScore !== null ? profile.evaluasiBestScore : (prevRecord?.nilaiEvaluasi || 0),
      bintang: Math.max(profile.stars, prevRecord?.bintang || 0),
      levelTuntas: Math.max(profile.completedLevels.length, prevRecord?.levelTuntas || 0),
      lencanaCount: Math.max(profile.badges.length, prevRecord?.lencanaCount || 0),
      statusDuta: profile.isDutaPancasila || (prevRecord?.statusDuta || false),
      tanggal: formattedDate,
      waktuUpdate: `${formattedDate}, ${formattedTime} WIB`,
      gameTerakhir: activityTitle,
      poinTotal: profile.points,
      aktivitasCount: prevAktivitasCount + 1,
      catatan: detail 
        ? `${activityTitle}: ${detail}`
        : `Tuntas memainkan ${activityTitle}`
    };

    let updatedList: StudentResultRecord[];
    if (existingIndex >= 0) {
      updatedList = [
        updatedRecord,
        ...current.filter((_, idx) => idx !== existingIndex)
      ];
    } else {
      updatedList = [updatedRecord, ...current];
    }

    localStorage.setItem(STUDENT_RECORDS_KEY, JSON.stringify(updatedList));

    // Simpan ke Firebase Firestore secara realtime
    saveStudentRecordFirestore(updatedRecord).catch((err) => {
      console.warn('Realtime Firestore sync error on activity:', err);
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('student-records-updated', {
          detail: {
            studentName: profile.name,
            activityTitle,
            updatedRecord
          }
        })
      );
    }

    return updatedList;
  } catch (e) {
    console.error('Failed to sync student game progress', e);
    return loadStudentRecords();
  }
}
