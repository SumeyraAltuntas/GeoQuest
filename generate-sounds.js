/**
 * This script generates simple sound effect WAV files for GeoQuest.
 *
 * It creates 4 sounds:
 * - correct.wav  — a pleasant rising two-tone beep (like "ding ding!")
 * - wrong.wav    — a low buzz (like "bzzzt")
 * - levelup.wav  — a cheerful ascending three-tone melody
 * - tap.wav      — a short subtle click
 *
 * Run with: node generate-sounds.js
 * Files are saved to: assets/sounds/
 */

const fs = require('fs');
const path = require('path');

const SAMPLE_RATE = 44100;

// Generate a sine wave tone at a given frequency for a duration
function generateTone(frequency, durationMs, volume = 0.5) {
  const numSamples = Math.floor(SAMPLE_RATE * (durationMs / 1000));
  const samples = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    // Apply fade in/out to avoid clicks (first and last 5% of samples)
    let envelope = 1;
    const fadeLen = Math.floor(numSamples * 0.05);
    if (i < fadeLen) envelope = i / fadeLen;
    if (i > numSamples - fadeLen) envelope = (numSamples - i) / fadeLen;

    samples[i] = Math.sin(2 * Math.PI * frequency * i / SAMPLE_RATE) * volume * envelope;
  }
  return samples;
}

// Combine multiple tones sequentially
function combineTones(tones) {
  const totalLength = tones.reduce((sum, t) => sum + t.length, 0);
  const combined = new Float32Array(totalLength);
  let offset = 0;
  for (const tone of tones) {
    combined.set(tone, offset);
    offset += tone.length;
  }
  return combined;
}

// Add silence (pause between tones)
function silence(durationMs) {
  return new Float32Array(Math.floor(SAMPLE_RATE * (durationMs / 1000)));
}

// Convert float samples to a WAV file buffer
function samplesToWav(samples) {
  const numSamples = samples.length;
  const bitsPerSample = 16;
  const numChannels = 1;
  const byteRate = SAMPLE_RATE * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = numSamples * (bitsPerSample / 8);
  const headerSize = 44;
  const buffer = Buffer.alloc(headerSize + dataSize);

  // WAV header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // chunk size
  buffer.writeUInt16LE(1, 20);  // PCM format
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(SAMPLE_RATE, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  // Write samples as 16-bit integers
  for (let i = 0; i < numSamples; i++) {
    const val = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.floor(val * 32767), headerSize + i * 2);
  }

  return buffer;
}

// Create the output directory
const outDir = path.join(__dirname, 'assets', 'sounds');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// === CORRECT SOUND ===
// Two rising tones: C5 (523Hz) then E5 (659Hz) — sounds cheerful
const correctSamples = combineTones([
  generateTone(523, 100, 0.4),  // C5 for 100ms
  silence(30),                   // tiny pause
  generateTone(659, 150, 0.4),  // E5 for 150ms
]);

// === WRONG SOUND ===
// Low descending tone: E4 (330Hz) then C4 (262Hz) — sounds sad
const wrongSamples = combineTones([
  generateTone(330, 120, 0.35), // E4 for 120ms
  silence(20),
  generateTone(262, 180, 0.35), // C4 for 180ms
]);

// === LEVEL UP SOUND ===
// Ascending three-tone melody: C5, E5, G5 — sounds triumphant
const levelupSamples = combineTones([
  generateTone(523, 120, 0.4),  // C5
  silence(30),
  generateTone(659, 120, 0.4),  // E5
  silence(30),
  generateTone(784, 200, 0.45), // G5 (held longer)
]);

// === TAP SOUND ===
// Very short high click
const tapSamples = generateTone(1000, 30, 0.2);

// Write all files
const sounds = {
  'correct.wav': correctSamples,
  'wrong.wav': wrongSamples,
  'levelup.wav': levelupSamples,
  'tap.wav': tapSamples,
};

for (const [filename, samples] of Object.entries(sounds)) {
  const wav = samplesToWav(samples);
  const filepath = path.join(outDir, filename);
  fs.writeFileSync(filepath, wav);
  console.log(`Created: ${filepath} (${(wav.length / 1024).toFixed(1)} KB)`);
}

console.log('\nAll sound files generated successfully!');
