// Web Audio API Synthesizer for rich, cheerful sound effects
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playClickSound(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {
    console.warn('Audio click error', e);
  }
}

export function playSuccessSound(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (cheerful arpeggio)
    
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.18, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.23);
    });
  } catch (e) {
    console.warn('Audio success error', e);
  }
}

export function playErrorSound(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [311.13, 277.18]; // Eb4 down to C#4 (gentle prompt, not harsh)

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.12);

      gain.gain.setValueAtTime(0.14, now + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.12 + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.12);
      osc.stop(now + idx * 0.12 + 0.21);
    });
  } catch (e) {
    console.warn('Audio error error', e);
  }
}

export function playLevelUpSound(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const chord = [440, 554.37, 659.25, 880]; // A major triumphant chord
    
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.05, now + 0.5);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    });
  } catch (e) {
    console.warn('Audio levelup error', e);
  }
}

export function playWheelTickSound(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(400, ctx.currentTime);

    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.03);
  } catch (e) {
    console.warn('Audio tick error', e);
  }
}

export function playFanfareSound(enabled: boolean = true) {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const melody = [
      { f: 523.25, t: 0, d: 0.15 },
      { f: 523.25, t: 0.15, d: 0.15 },
      { f: 523.25, t: 0.3, d: 0.15 },
      { f: 659.25, t: 0.45, d: 0.25 },
      { f: 783.99, t: 0.72, d: 0.2 },
      { f: 1046.5, t: 0.95, d: 0.6 }
    ];

    melody.forEach((item) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, now + item.t);

      gain.gain.setValueAtTime(0.18, now + item.t);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.t + item.d);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + item.t);
      osc.stop(now + item.t + item.d);
    });
  } catch (e) {
    console.warn('Audio fanfare error', e);
  }
}

// Indonesian Text-to-Speech reader for learning to read
export function speakTextIndonesian(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.9; // gentle pace for elementary kids
    utterance.pitch = 1.05; // slightly friendly child-friendly pitch
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.warn('Speech synthesis error', e);
  }
}

export function stopSpeaking() {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
}

// ---------------------------------------------------------------------------
// BACKGROUND MUSIC ENGINE (Multi-track Melodi Game Edukatif)
// ---------------------------------------------------------------------------
export type BgmTrackId = 'gamelan' | 'mars' | 'bintang';

export interface BgmTrackInfo {
  id: BgmTrackId;
  name: string;
  description: string;
  icon: string;
  tempoMs: number;
}

export const BGM_TRACKS: BgmTrackInfo[] = [
  {
    id: 'gamelan',
    name: 'Gamelan Ceria Nusantara',
    description: 'Irama pentatonis tradisional yang ceria dan menenangkan khas Nusantara',
    icon: '🎋',
    tempoMs: 230
  },
  {
    id: 'mars',
    name: 'Mars Petualangan Garuda',
    description: 'Nada semangat berirama mars ceria untuk menjelajahi tantangan',
    icon: '🎺',
    tempoMs: 200
  },
  {
    id: 'bintang',
    name: 'Alunan Bintang Damai',
    description: 'Melodi lembut lonceng emas untuk mengasah konsentrasi dan teka-teki',
    icon: '⭐',
    tempoMs: 270
  }
];

let isBgmActive = false;
let currentBgmTrack: BgmTrackId = 'gamelan';
let bgmVolumeLevel: 'lembut' | 'sedang' | 'ceria' = 'sedang';
let bgmTimer: number | null = null;
let bgmStep = 0;
const bgmListeners: Array<(active: boolean, track: BgmTrackId) => void> = [];

// Track 1: Gamelan Ceria Nusantara (Pelog / Slendro pentatonic joy)
const MELODY_GAMELAN = [
  523.25, 659.25, 783.99, 659.25, 880.00, 783.99, 659.25, 523.25,
  587.33, 659.25, 587.33, 523.25, 440.00, 523.25, 587.33, 659.25,
  783.99, 880.00, 1046.50, 880.00, 783.99, 659.25, 783.99, 880.00,
  659.25, 587.33, 523.25, 440.00, 523.25, 659.25, 523.25, 523.25,
  659.25, 783.99, 880.00, 1046.50, 880.00, 783.99, 659.25, 587.33,
  523.25, 440.00, 392.00, 440.00, 523.25, 587.33, 659.25, 783.99,
  880.00, 783.99, 659.25, 587.33, 523.25, 659.25, 783.99, 1046.50,
  783.99, 659.25, 587.33, 440.00, 523.25, 523.25, 523.25, 0
];
const BASS_GAMELAN = [
  261.63, 0, 329.63, 0, 349.23, 0, 392.00, 0,
  293.66, 0, 329.63, 0, 220.00, 0, 261.63, 0,
  349.23, 0, 392.00, 0, 261.63, 0, 329.63, 0,
  349.23, 0, 392.00, 0, 261.63, 0, 261.63, 0
];

// Track 2: Mars Petualangan Garuda (Energetic March)
const MELODY_MARS = [
  523.25, 523.25, 659.25, 783.99, 1046.50, 783.99, 659.25, 783.99,
  880.00, 880.00, 1046.50, 880.00, 783.99, 659.25, 587.33, 659.25,
  783.99, 783.99, 880.00, 783.99, 659.25, 523.25, 587.33, 659.25,
  523.25, 523.25, 659.25, 783.99, 523.25, 0, 523.25, 0
];
const BASS_MARS = [
  261.63, 261.63, 329.63, 392.00, 440.00, 392.00, 329.63, 392.00,
  349.23, 349.23, 440.00, 349.23, 392.00, 329.63, 293.66, 329.63
];

// Track 3: Alunan Bintang Damai (Calm, Sweet Pentatonic)
const MELODY_BINTANG = [
  659.25, 0, 783.99, 0, 880.00, 0, 783.99, 0,
  659.25, 0, 587.33, 0, 523.25, 659.25, 587.33, 0,
  440.00, 0, 523.25, 0, 659.25, 0, 587.33, 0,
  523.25, 0, 440.00, 0, 523.25, 0, 523.25, 0
];
const BASS_BINTANG = [
  261.63, 0, 0, 0, 329.63, 0, 0, 0,
  220.00, 0, 0, 0, 261.63, 0, 0, 0
];

function notifyListeners() {
  bgmListeners.forEach(fn => {
    try {
      fn(isBgmActive, currentBgmTrack);
    } catch {
      // ignore
    }
  });
}

export function addBgmListener(fn: (active: boolean, track: BgmTrackId) => void): () => void {
  bgmListeners.push(fn);
  return () => {
    const idx = bgmListeners.indexOf(fn);
    if (idx >= 0) bgmListeners.splice(idx, 1);
  };
}

export function isBgmPlaying(): boolean {
  return isBgmActive;
}

export function getCurrentBgmTrack(): BgmTrackId {
  return currentBgmTrack;
}

export function getBgmVolumeLevel(): 'lembut' | 'sedang' | 'ceria' {
  return bgmVolumeLevel;
}

export function setBgmVolumeLevel(level: 'lembut' | 'sedang' | 'ceria') {
  bgmVolumeLevel = level;
}

export function setBgmTrack(trackId: BgmTrackId) {
  currentBgmTrack = trackId;
  if (isBgmActive) {
    stopBgm();
    startBgm(trackId);
  } else {
    notifyListeners();
  }
}

export function startBgm(trackId?: BgmTrackId) {
  if (trackId) {
    currentBgmTrack = trackId;
  }
  if (isBgmActive) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  isBgmActive = true;
  bgmStep = 0;
  notifyListeners();

  const trackInfo = BGM_TRACKS.find(t => t.id === currentBgmTrack) || BGM_TRACKS[0];
  const tempoMs = trackInfo.tempoMs;

  const playTick = () => {
    if (!isBgmActive) return;
    try {
      const now = ctx.currentTime;

      // Select active melody & bass sequence
      let melodySeq = MELODY_GAMELAN;
      let bassSeq = BASS_GAMELAN;
      let waveType: OscillatorType = 'sine';
      let harmWave: OscillatorType = 'triangle';

      if (currentBgmTrack === 'mars') {
        melodySeq = MELODY_MARS;
        bassSeq = BASS_MARS;
        waveType = 'triangle';
        harmWave = 'sine';
      } else if (currentBgmTrack === 'bintang') {
        melodySeq = MELODY_BINTANG;
        bassSeq = BASS_BINTANG;
        waveType = 'sine';
        harmWave = 'sine';
      }

      // Volume multiplier
      const volMultiplier = bgmVolumeLevel === 'lembut' ? 0.6 : bgmVolumeLevel === 'ceria' ? 1.3 : 1.0;

      // Play melody note
      const noteFreq = melodySeq[bgmStep % melodySeq.length];
      if (noteFreq > 0) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = waveType;
        osc.frequency.setValueAtTime(noteFreq, now);

        const baseGain = 0.045 * volMultiplier;
        gain.gain.setValueAtTime(baseGain, now);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.32);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.33);

        // Harmonic overtone for natural marimba/bell resonance
        const harm = ctx.createOscillator();
        const harmGain = ctx.createGain();
        harm.type = harmWave;
        harm.frequency.setValueAtTime(noteFreq * 2, now);
        harmGain.gain.setValueAtTime(0.015 * volMultiplier, now);
        harmGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);
        harm.connect(harmGain);
        harmGain.connect(ctx.destination);
        harm.start(now);
        harm.stop(now + 0.19);
      }

      // Play bass note
      const bassIndex = Math.floor(bgmStep / 2) % bassSeq.length;
      if (bgmStep % 2 === 0) {
        const bassFreq = bassSeq[bassIndex];
        if (bassFreq > 0) {
          const bassOsc = ctx.createOscillator();
          const bassGain = ctx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(bassFreq, now);

          const baseBassGain = 0.035 * volMultiplier;
          bassGain.gain.setValueAtTime(baseBassGain, now);
          bassGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.4);

          bassOsc.connect(bassGain);
          bassGain.connect(ctx.destination);
          bassOsc.start(now);
          bassOsc.stop(now + 0.42);
        }
      }

      bgmStep++;
      bgmTimer = window.setTimeout(playTick, tempoMs);
    } catch (e) {
      console.warn('BGM error', e);
      stopBgm();
    }
  };

  playTick();
}

export function stopBgm() {
  isBgmActive = false;
  if (bgmTimer !== null) {
    clearTimeout(bgmTimer);
    bgmTimer = null;
  }
  notifyListeners();
}

export function toggleBgm(trackId?: BgmTrackId): boolean {
  if (isBgmActive) {
    stopBgm();
    return false;
  } else {
    startBgm(trackId || currentBgmTrack);
    return true;
  }
}

