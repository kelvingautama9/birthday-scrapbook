/**
 * Utility for mobile haptic feedback and gentle Web Audio API sound effects.
 * Designed to work without any external audio file dependencies.
 */

// Safe haptic feedback for mobile devices
export function triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'success' | 'error' = 'light') {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      switch (type) {
        case 'light':
          navigator.vibrate(15);
          break;
        case 'medium':
          navigator.vibrate(35);
          break;
        case 'heavy':
          navigator.vibrate(60);
          break;
        case 'success':
          navigator.vibrate([20, 50, 40]);
          break;
        case 'error':
          navigator.vibrate([40, 40, 40, 40, 60]);
          break;
      }
    } catch {
      // Haptics not allowed or unsupported
    }
  }
}

// Web Audio API context singleton
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

// 1. Soft click / tap sound
export function playSoftTap() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(440, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.05);
}

// 2. Lock unlocked romantic harp chime
export function playUnlockChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51]; // C5, E5, G5, C6, E6
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

    gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.08);
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + idx * 0.08 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.6);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.08);
    osc.stop(ctx.currentTime + idx * 0.08 + 0.65);
  });
}

// 3. Playful error wobble
export function playErrorBuzz() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(220, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.15);

  gain.gain.setValueAtTime(0.07, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.16);
}

// 4. Paper flap open / wax seal pop
export function playPaperPop() {
  const ctx = getAudioContext();
  if (!ctx) return;

  // White noise burst filtered like rustling parchment
  const bufferSize = ctx.sampleRate * 0.1;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1200;
  filter.Q.value = 2.0;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.12, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start();
}

// 5. Soft typewriter keystroke
export function playTypewriterKey() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  const pitch = 300 + Math.random() * 150;
  osc.frequency.setValueAtTime(pitch, ctx.currentTime);

  gain.gain.setValueAtTime(0.03, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0005, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.04);
}

// 6. Victory celebration chord (for prank yes button)
export function playCelebrationSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const chord = [392.0, 523.25, 659.25, 783.99, 1046.5]; // G4, C5, E5, G5, C6
  chord.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

    gain.gain.setValueAtTime(0, ctx.currentTime + idx * 0.06);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + idx * 0.06 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.06);
    osc.stop(ctx.currentTime + idx * 0.06 + 0.85);
  });
}

// 7. Ambient Romantic Music Player (Sequenced Playlist: Perfect -> You Belong With Me -> Love Story -> Looping)
export interface SongTrack {
  title: string;
  src: string;
}

export const PLAYLIST: SongTrack[] = [
  { title: 'Perfect', src: '/perfect.mp3' },
  { title: 'You Belong With Me', src: '/youbelongwithme.mp3' },
  { title: 'Love Story', src: '/lovestory.mp3' },
];

class MusicBoxPlayer {
  private isPlaying: boolean = false;
  private audioElement: HTMLAudioElement | null = null;
  private customAudioActive: boolean = false;
  private currentTrackIndex: number = 0;
  private listeners: Array<(track: SongTrack) => void> = [];
  private timerId: number | null = null;
  private currentStep: number = 0;
  private masterGain: GainNode | null = null;

  // Romantic melody progression fallback (Pentatonic lullaby in C Major / A Minor)
  private melody = [
    523.25, 659.25, 783.99, 659.25, 880.0, 783.99, 659.25, 523.25,
    587.33, 659.25, 783.99, 880.0, 1046.5, 880.0, 783.99, 659.25,
    698.46, 783.99, 880.0, 783.99, 659.25, 587.33, 523.25, 440.0,
    523.25, 587.33, 659.25, 783.99, 659.25, 587.33, 523.25, 523.25
  ];

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getCurrentTrack(): SongTrack {
    return PLAYLIST[this.currentTrackIndex];
  }

  public onTrackChange(listener: (track: SongTrack) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyTrackChange() {
    const current = this.getCurrentTrack();
    this.listeners.forEach((fn) => fn(current));
  }

  public start() {
    this.isPlaying = true;

    // Putar playlist berurutan (Perfect -> You Belong With Me -> Love Story)
    this.playTrackAtIndex(this.currentTrackIndex, 0);
  }

  private playTrackAtIndex(index: number, attemptsCount: number) {
    if (!this.isPlaying) return;
    if (typeof window === 'undefined') return;

    // Jika seluruh file playlist belum ada di server, fallback ke synthesizer nada romantis
    if (attemptsCount >= PLAYLIST.length) {
      this.customAudioActive = false;
      this.startSynth();
      return;
    }

    this.currentTrackIndex = index % PLAYLIST.length;
    const targetTrack = PLAYLIST[this.currentTrackIndex];
    this.notifyTrackChange();

    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.volume = 0.65;
    }

    const audio = this.audioElement;
    // Set loop = false agar event 'ended' terpicu saat lagu selesai
    audio.loop = false;
    audio.src = targetTrack.src;

    // Ketika lagu selesai, lanjut otomatis ke lagu berikutnya dalam playlist
    audio.onended = () => {
      if (!this.isPlaying) return;
      // Berpindah ke lagu berikutnya: index 0 -> 1 -> 2 -> kembali ke 0 (looping)
      const nextIndex = (this.currentTrackIndex + 1) % PLAYLIST.length;
      this.playTrackAtIndex(nextIndex, 0);
    };

    // Penanganan error (misal file belum diupload di folder public)
    audio.onerror = () => {
      // Coba lagu berikutnya di playlist
      const nextIndex = (this.currentTrackIndex + 1) % PLAYLIST.length;
      this.playTrackAtIndex(nextIndex, attemptsCount + 1);
    };

    audio
      .play()
      .then(() => {
        this.customAudioActive = true;
        // Matikan synth jika custom audio berhasil jalan
        this.stopSynth();
      })
      .catch(() => {
        // Coba track berikutnya jika gagal play
        const nextIndex = (this.currentTrackIndex + 1) % PLAYLIST.length;
        this.playTrackAtIndex(nextIndex, attemptsCount + 1);
      });
  }

  private startSynth() {
    if (!this.isPlaying || this.customAudioActive) return;

    const ctx = getAudioContext();
    if (!ctx) return;

    this.masterGain = ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
    this.masterGain.connect(ctx.destination);

    const stepDuration = 380; // ms per note

    const playNext = () => {
      if (!this.isPlaying || this.customAudioActive || !ctx || !this.masterGain) return;

      const freq = this.melody[this.currentStep % this.melody.length];
      this.currentStep++;

      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      noteGain.gain.setValueAtTime(0.2, ctx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start();
      osc.stop(ctx.currentTime + 0.65);

      this.timerId = window.setTimeout(playNext, stepDuration);
    };

    playNext();
  }

  private stopSynth() {
    if (this.timerId) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    if (this.masterGain && audioCtx) {
      try {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, audioCtx.currentTime);
        this.masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.2);
      } catch {
        // ignore
      }
    }
  }

  public stop() {
    this.isPlaying = false;

    // Hentikan pemutaran audio
    if (this.audioElement) {
      try {
        this.audioElement.pause();
      } catch {
        // ignore
      }
    }

    // Hentikan synthesizer nada
    this.stopSynth();
  }
}

export const romanticMusicBox = new MusicBoxPlayer();
