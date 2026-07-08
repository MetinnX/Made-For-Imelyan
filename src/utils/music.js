let bgMusic = null;

function createBgMusic() {
  if (typeof window === 'undefined') {
    return null;
  }

  const audio = new Audio('/assets/music/background-song.mp3');
  audio.preload = 'auto';
  audio.loop = true;
  return audio;
}

export function getBgMusic() {
  if (!bgMusic) {
    bgMusic = createBgMusic();
  }
  return bgMusic;
}

export async function playBgMusic() {
  const music = getBgMusic();
  if (!music) return;

  try {
    await music.play();
  } catch (error) {
    // Browser dapat memblokir autoplay sebelum ada interaksi user.
    // Error ini sengaja diabaikan agar tidak memutus alur scene.
  }
}

export function pauseBgMusic() {
  const music = getBgMusic();
  if (music) {
    music.pause();
  }
}

export function isBgMusicPlaying() {
  const music = getBgMusic();
  return Boolean(music && !music.paused);
}
