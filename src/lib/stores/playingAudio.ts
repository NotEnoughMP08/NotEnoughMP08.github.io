let current: HTMLAudioElement | null = null;

export function getPlayingAudio() {
  return current;
}

export function setPlayingAudio(audio: HTMLAudioElement | null) {
  current = audio;
}
