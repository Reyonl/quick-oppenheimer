// Procedural WAV Audio Generator for Remotion
// Generates standalone Data URIs for cinematic sound effects without external downloads

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  if (typeof btoa !== 'undefined') {
    return btoa(binary);
  }

  // Pure JS Base64 Fallback
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let base64 = '';
  let i = 0;
  while (i < binary.length) {
    const b0 = binary.charCodeAt(i++);
    const b1 = i < binary.length ? binary.charCodeAt(i++) : NaN;
    const b2 = i < binary.length ? binary.charCodeAt(i++) : NaN;

    const u24 = (b0 << 16) | ((isNaN(b1) ? 0 : b1) << 8) | (isNaN(b2) ? 0 : b2);

    base64 += chars[(u24 >> 18) & 63];
    base64 += chars[(u24 >> 12) & 63];
    base64 += isNaN(b1) ? '=' : chars[(u24 >> 6) & 63];
    base64 += isNaN(b2) ? '=' : chars[u24 & 63];
  }
  return base64;
}

function createWavDataUri(sampleRate: number, samples: Float32Array): string {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const subChunk2Size = samples.length * ((numChannels * bitsPerSample) / 8);
  const chunkSize = 36 + subChunk2Size;

  const buffer = new ArrayBuffer(44 + subChunk2Size);
  const view = new DataView(buffer);

  function writeString(offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  // RIFF Chunk Descriptor
  writeString(0, 'RIFF');
  view.setUint32(4, chunkSize, true);
  writeString(8, 'WAVE');

  // "fmt " sub-chunk
  writeString(12, 'fmt ');
  view.setUint32(16, 16, true); // Subchunk1Size (16 for PCM)
  view.setUint16(20, 1, true); // AudioFormat (1 = PCM)
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);

  // "data" sub-chunk
  writeString(36, 'data');
  view.setUint32(40, subChunk2Size, true);

  // Write 16-bit PCM samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }

  const base64 = arrayBufferToBase64(buffer);
  return `data:audio/wav;base64,${base64}`;
}

// 1. Geiger Click
export function generateGeigerClick(): string {
  const sampleRate = 22050;
  const duration = 0.05; // 50ms
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const decay = Math.exp(-i / (sampleRate * 0.008));
    samples[i] = (Math.random() * 2 - 1) * decay * 0.9;
  }
  return createWavDataUri(sampleRate, samples);
}

// 2. Heartbeat Boom / Tension Thump
export function generateHeartbeat(): string {
  const sampleRate = 22050;
  const duration = 0.4;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);
  const freq = 55; // 55Hz sub bass

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 8);
    const sine = Math.sin(2 * Math.PI * freq * t);
    samples[i] = sine * env * 0.95;
  }
  return createWavDataUri(sampleRate, samples);
}

// 3. Countdown Beep (high pitch tech ping)
export function generateCountdownBeep(freq = 950): string {
  const sampleRate = 22050;
  const duration = 0.15;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const env = Math.exp(-t * 12);
    const wave = Math.sin(2 * Math.PI * freq * t);
    samples[i] = wave * env * 0.6;
  }
  return createWavDataUri(sampleRate, samples);
}

// 4. Massive Atomic Explosion Rumble
export function generateExplosionSound(): string {
  const sampleRate = 22050;
  const duration = 3.5;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  let lastFilter = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    // Low frequency sub sweep: 90Hz drops to 25Hz
    const pitch = 90 / (1 + t * 4);
    const sub = Math.sin(2 * Math.PI * pitch * t);

    // Filtered noise
    const rawNoise = Math.random() * 2 - 1;
    lastFilter = lastFilter + 0.1 * (rawNoise - lastFilter);

    // Envelope: sharp attack, slow decay
    const attack = Math.min(1, t / 0.05);
    const decay = Math.exp(-t * 0.9);

    samples[i] = (sub * 0.7 + lastFilter * 0.5) * attack * decay * 0.95;
  }
  return createWavDataUri(sampleRate, samples);
}

// 5. Emergency Siren / Alarm Stutter
export function generateAlarmSound(): string {
  const sampleRate = 22050;
  const duration = 0.5;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const freq = 600 + Math.sin(2 * Math.PI * 5 * t) * 200;
    const wave = Math.sin(2 * Math.PI * freq * t) > 0 ? 0.4 : -0.4;
    const env = Math.min(1, Math.min(t * 20, (duration - t) * 20));
    samples[i] = wave * env;
  }
  return createWavDataUri(sampleRate, samples);
}

// 6. Glitch Crackle
export function generateGlitchSound(): string {
  const sampleRate = 22050;
  const duration = 0.2;
  const numSamples = Math.floor(sampleRate * duration);
  const samples = new Float32Array(numSamples);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const crackle = Math.random() > 0.85 ? (Math.random() * 2 - 1) * 0.8 : 0;
    const buzz = Math.sin(2 * Math.PI * 180 * t) * 0.3;
    samples[i] = crackle + buzz;
  }
  return createWavDataUri(sampleRate, samples);
}
