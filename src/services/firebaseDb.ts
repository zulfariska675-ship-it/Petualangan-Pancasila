import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  getDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocFromServer,
  writeBatch
} from 'firebase/firestore';
import { StudentResultRecord, TeacherSettings } from '../types';
import firebaseConfig from '../../firebase-applet-config.json';

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export const STUDENT_RECORDS_COLLECTION = 'student_records';
export const TEACHER_SETTINGS_COLLECTION = 'teacher_settings';
export const DEFAULT_TEACHER_DOC_ID = 'default_settings';

/**
 * Validates connection to Firestore at application start
 */
export async function testFirestoreConnection(): Promise<boolean> {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    return true;
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firestore is currently running in offline/cached mode.');
      return false;
    }
    // Test document does not exist, which is expected and means connection succeeded
    return true;
  }
}

/**
 * Sanitize doc ID to be safe for Firestore path
 */
function sanitizeDocId(id: string): string {
  return id.replace(/[^a-zA-Z0-9_-]/g, '_');
}

/**
 * Real-time listener for Student Records from Firebase Firestore
 */
export function subscribeToStudentRecords(
  onUpdate: (records: StudentResultRecord[]) => void,
  onError?: (err: Error) => void
): () => void {
  const colRef = collection(db, STUDENT_RECORDS_COLLECTION);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const records: StudentResultRecord[] = [];
      snapshot.forEach((d) => {
        const data = d.data() as StudentResultRecord;
        if (data && data.nama && !['rec-1', 'rec-2', 'rec-3'].includes(data.id)) {
          records.push(data);
        }
      });

      // Sort by latest update or creation
      records.sort((a, b) => {
        const timeA = a.waktuUpdate || a.tanggal || '';
        const timeB = b.waktuUpdate || b.tanggal || '';
        return timeB.localeCompare(timeA);
      });

      onUpdate(records);
    },
    (err) => {
      console.error('Error in Firestore student_records snapshot:', err);
      if (onError) onError(err);
    }
  );
}

/**
 * Save or update a student record in Firestore in real-time
 */
export async function saveStudentRecordFirestore(record: StudentResultRecord): Promise<void> {
  if (!record.nama || ['rec-1', 'rec-2', 'rec-3'].includes(record.id)) {
    return;
  }

  // Use a predictable sanitized ID based on student name or record ID
  const docId = sanitizeDocId(record.id || `rec_${record.nama.trim().toLowerCase()}`);
  const docRef = doc(db, STUDENT_RECORDS_COLLECTION, docId);

  // Clean undefined properties to prevent Firestore error
  const cleanRecord: Record<string, any> = {
    id: record.id || docId,
    nama: record.nama.trim(),
    kelas: record.kelas || 'Kelas IV',
    sekolah: record.sekolah || 'Sekolah Dasar (SD)',
    nilaiEvaluasi: Number(record.nilaiEvaluasi ?? 0),
    bintang: Number(record.bintang ?? 0),
    levelTuntas: Number(record.levelTuntas ?? 0),
    lencanaCount: Number(record.lencanaCount ?? 0),
    statusDuta: Boolean(record.statusDuta),
    tanggal: record.tanggal || new Date().toLocaleDateString('id-ID'),
    waktuUpdate: record.waktuUpdate || new Date().toLocaleString('id-ID'),
    gameTerakhir: record.gameTerakhir || 'Petualangan Pancasila',
    poinTotal: Number(record.poinTotal ?? 0),
    aktivitasCount: Number(record.aktivitasCount ?? 1),
    catatan: record.catatan || 'Aktif bermain game edukasi Pancasila'
  };

  await setDoc(docRef, cleanRecord, { merge: true });
}

/**
 * Delete a student record from Firestore
 */
export async function deleteStudentRecordFirestore(recordId: string): Promise<void> {
  const docId = sanitizeDocId(recordId);
  const docRef = doc(db, STUDENT_RECORDS_COLLECTION, docId);
  await deleteDoc(docRef);
}

/**
 * Clear all student records from Firestore
 */
export async function clearAllStudentRecordsFirestore(): Promise<number> {
  const colRef = collection(db, STUDENT_RECORDS_COLLECTION);
  const snapshot = await getDocs(colRef);
  let deletedCount = 0;
  const batch = writeBatch(db);

  snapshot.forEach((d) => {
    batch.delete(d.ref);
    deletedCount++;
  });

  if (deletedCount > 0) {
    await batch.commit();
  }
  return deletedCount;
}

/**
 * Fetch all student records once from Firestore
 */
export async function loadStudentRecordsFirestore(): Promise<StudentResultRecord[]> {
  try {
    const colRef = collection(db, STUDENT_RECORDS_COLLECTION);
    const snapshot = await getDocs(colRef);
    const records: StudentResultRecord[] = [];
    snapshot.forEach((d) => {
      const data = d.data() as StudentResultRecord;
      if (data && data.nama && !['rec-1', 'rec-2', 'rec-3'].includes(data.id)) {
        records.push(data);
      }
    });
    return records;
  } catch (err) {
    console.error('Failed to load student records from Firestore:', err);
    return [];
  }
}

/**
 * Real-time listener for Teacher Settings from Firebase Firestore
 */
export function subscribeToTeacherSettings(
  onUpdate: (settings: TeacherSettings) => void
): () => void {
  const docRef = doc(db, TEACHER_SETTINGS_COLLECTION, DEFAULT_TEACHER_DOC_ID);
  return onSnapshot(docRef, (snapshot) => {
    if (snapshot.exists()) {
      onUpdate(snapshot.data() as TeacherSettings);
    }
  });
}

/**
 * Save teacher settings to Firestore
 */
export async function saveTeacherSettingsFirestore(settings: TeacherSettings): Promise<void> {
  const docRef = doc(db, TEACHER_SETTINGS_COLLECTION, DEFAULT_TEACHER_DOC_ID);
  const cleanData: Record<string, any> = {
    namaGuru: settings.namaGuru || 'Riska Zulfa Luthfiyyah, S.Pd.',
    sekolah: settings.sekolah || 'Sekolah Dasar (SD)',
    kelasDefault: settings.kelasDefault || 'Kelas IV (Fase B)',
    whatsappNumber: settings.whatsappNumber || '',
    emailGuru: settings.emailGuru || 'zulfariska675@gmail.com',
    accessCode: settings.accessCode || 'GURU2025'
  };
  if (settings.customPhotoUrl) {
    cleanData.customPhotoUrl = settings.customPhotoUrl;
  }
  await setDoc(docRef, cleanData, { merge: true });
}

/**
 * Load teacher settings from Firestore
 */
export async function loadTeacherSettingsFirestore(): Promise<TeacherSettings | null> {
  try {
    const docRef = doc(db, TEACHER_SETTINGS_COLLECTION, DEFAULT_TEACHER_DOC_ID);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as TeacherSettings;
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch teacher settings from Firestore:', err);
    return null;
  }
}
