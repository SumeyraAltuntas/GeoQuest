import { useEffect, useRef, useCallback } from 'react';
import { Audio, AVPlaybackSource } from 'expo-av';

export type SoundName = 'correct' | 'wrong' | 'levelup' | 'tap';

const SOUND_FILES: Record<SoundName, AVPlaybackSource> = {
  correct: require('../../assets/sounds/correct.wav'),
  wrong: require('../../assets/sounds/wrong.wav'),
  levelup: require('../../assets/sounds/levelup.wav'),
  tap: require('../../assets/sounds/tap.wav'),
};

/**
 * Preloads all sound effects once and reuses them for the app's lifetime.
 *
 * The previous implementation created (and decoded) a brand-new Audio.Sound on
 * every answer, relying on a playback-status callback to unload it. Under rapid
 * taps this leaked native sound instances and caused audible lag. Preloading is
 * both faster and leak-free; everything is unloaded on unmount.
 */
export function useSounds(): (name: SoundName) => void {
  const soundsRef = useRef<Partial<Record<SoundName, Audio.Sound>>>({});

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Respect the iOS silent switch: sound effects shouldn't override it.
        await Audio.setAudioModeAsync({ playsInSilentModeIOS: false });
        for (const name of Object.keys(SOUND_FILES) as SoundName[]) {
          const { sound } = await Audio.Sound.createAsync(SOUND_FILES[name]);
          if (cancelled) {
            sound.unloadAsync().catch(() => {});
            return;
          }
          soundsRef.current[name] = sound;
        }
      } catch {
        // Audio is a nice-to-have; haptics still provide feedback if it fails.
      }
    })();

    return () => {
      cancelled = true;
      for (const sound of Object.values(soundsRef.current)) {
        sound?.unloadAsync().catch(() => {});
      }
      soundsRef.current = {};
    };
  }, []);

  return useCallback((name: SoundName) => {
    soundsRef.current[name]?.replayAsync().catch(() => {});
  }, []);
}
