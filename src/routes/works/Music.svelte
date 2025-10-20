<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import profile from "$lib/assets/profile.png";
  import { getPlayingAudio, setPlayingAudio } from "$lib/stores/playingAudio";

  let { music } = $props();
  let { title, subtitle, src } = music;

  import "bootstrap-icons/font/bootstrap-icons.css";

  let audio: HTMLAudioElement;
  let isPlaying = $state(false);
  let progress = $state(0);
  let audioDuration = $state("0:00");
  let audioCurrentTime = $state("0:00");
  let audioVolume = $state(50);

  function togglePlayAudio() {
    if (!audio) {
      return;
    }

    if (isPlaying) {
      audio.pause();
      isPlaying = false;
      if (getPlayingAudio() === audio) {
        setPlayingAudio(null);
      }
      return;
    }

    const activeAudio = getPlayingAudio();
    if (activeAudio && activeAudio !== audio) {
      activeAudio.pause();
    }

    audio.play();
    isPlaying = true;
    setPlayingAudio(audio);
    return;
  }

  function changeProgress(event: Event) {
    if (!audio) {
      return;
    }
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    audio.currentTime = (value / 10000) * audio.duration;
    progress = value;
    audioCurrentTime = `${Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60)
      .toString()
      .padStart(2, "0")}`;
  }

  function changeVolume(event: Event) {
    if (!audio) {
      return;
    }
    const target = event.target as HTMLInputElement;
    const value = Number(target.value);
    audio.volume = value / 100;
    audioVolume = value;
  }

  const handleLoadedMetadata = () => {
    if (!audio) {
      return;
    }
    const minutes = Math.floor(audio.duration / 60);
    const seconds = Math.floor(audio.duration % 60)
      .toString()
      .padStart(2, "0");
    audioDuration = `${minutes}:${seconds}`;
  };

  const handleTimeUpdate = () => {
    if (audio && audio.duration) {
      progress = (audio.currentTime / audio.duration) * 10000;
      audioCurrentTime = `${Math.floor(audio.currentTime / 60)}:${Math.floor(audio.currentTime % 60)
        .toString()
        .padStart(2, "0")}`;
    }
  };

  const handleEnded = () => {
    if (!audio) {
      return;
    }
    isPlaying = false;
    progress = 0;
    audioCurrentTime = "0:00";
    audio.currentTime = 0;
    if (getPlayingAudio() === audio) {
      setPlayingAudio(null);
    }
  };

  const handlePause = () => {
    if (!audio) {
      return;
    }
    isPlaying = false;
    if (getPlayingAudio() === audio) {
      setPlayingAudio(null);
    }
  };

  const handlePlay = () => {
    if (!audio) {
      return;
    }
    isPlaying = true;
    setPlayingAudio(audio);
  };

  onMount(() => {
    audio = new Audio(src);
    audio.volume = 0.5;
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("play", handlePlay);
  });

  onDestroy(() => {
    if (!audio) {
      return;
    }
    audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
    audio.removeEventListener("timeupdate", handleTimeUpdate);
    audio.removeEventListener("ended", handleEnded);
    audio.removeEventListener("pause", handlePause);
    audio.removeEventListener("play", handlePlay);
    if (getPlayingAudio() === audio) {
      setPlayingAudio(null);
    }
    audio.pause();
  });
</script>


<div class="music">
  <div class="music-left">
    <div class="music-albumart">
      <img src={profile} alt="Album Art" width="100" height="100" />
    </div>
  </div>
  <div class="music-right">
    <div class="music-title">{title}</div>
    <div class="music-subtitle">{subtitle}</div>
    <div class="music-audio">
      <div class="music-audio-top">
        <div class="music-audio-top-left">
        <button class="music-play-button" onclick={togglePlayAudio} aria-label="Play">
          {#if isPlaying}
            <i class="bi bi-pause-fill" style="font-size: 1.5em; color: #333;"></i>
          {:else}
            <i class="bi bi-play-fill" style="font-size: 1.5em; color: #333;"></i>
          {/if}
        </button>
        <span class="music-time">{audioCurrentTime}</span> /
        <span class="music-duration">{audioDuration}</span>
        </div>
        <div class="music-audio-top-right hide-mobile">
          <input type="range" min="0" max="100" value={audioVolume} onchange={changeVolume} oninput={changeVolume} onmouseleave={hideVolume} class="music-volume-bar" />
          <i class="bi bi-volume-up-fill" style="font-size: 1.5em; color: #333;" onmouseenter={showVolume}></i>
        </div>
      </div>
      <div class="music-audio-bar">
        <input type="range" min="0" max="10000" value={progress} onchange={changeProgress} oninput={changeProgress} class="music-progress-bar" />
      </div>
    </div>
  </div>
</div>

<style>
  .music {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .music-left {
    flex: 0 0 auto;
  }

  .music-albumart img {
    border-radius: 8px;
  }

  .music-right {
    flex: 1 1 auto;
  }

  .music-title {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .music-subtitle {
    font-size: 1em;
    color: #666;
    margin-bottom: 10px;
  }

  .music-audio {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .music-audio-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .music-audio-top-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .music-play-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
  }

  .music-time, .music-duration {
    font-size: 0.9em;
    color: #333;
  }

  .music-audio-top-right {
    cursor: pointer;
  }

  .music-audio-bar {
    width: 100%;
  }

  .music-progress-bar {
    width: 100%;
  }

  .music-volume-bar {
    width: 100px;
  }

  @media (max-width: 600px) {
    .hide-mobile {
      display: none;
    }
  }

  input[type="range"] {
    accent-color: #444; /* Example color */
  }
</style>
