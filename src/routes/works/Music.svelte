<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import profile from "$lib/assets/profile.png";
  import { getPlayingAudio, setPlayingAudio } from "$lib/stores/playingAudio";
  import { t } from "$lib/i18n";

  let { music } = $props();
  let { title, subtitle, src, credit } = music;

  import "bootstrap-icons/font/bootstrap-icons.css";

  let audio: HTMLAudioElement;
  let isPlaying = $state(false);
  let progress = $state(0);
  let audioDuration = $state("0:00");
  let audioCurrentTime = $state("0:00");
  let audioVolume = $state(50);
  let showVolumeControl = $state(false);
  let isHovering = $state(false);
  let showCredit = $state(false);

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
      showCredit = false;
      return;
    }

    const activeAudio = getPlayingAudio();
    if (activeAudio && activeAudio !== audio) {
      activeAudio.pause();
    }

    audio.play();
    isPlaying = true;
    setPlayingAudio(audio);
    if (credit) {
      showCredit = true;
    }
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

  function showVolume() {
    showVolumeControl = true;
  }

  function hideVolume() {
    showVolumeControl = false;
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
    showCredit = false;
    if (getPlayingAudio() === audio) {
      setPlayingAudio(null);
    }
  };

  const handlePause = () => {
    if (!audio) {
      return;
    }
    isPlaying = false;
    showCredit = false;
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


<div class="music" onmouseenter={() => (isHovering = true)} onmouseleave={() => (isHovering = false)}>
  <div class="music-left">
    <div class="music-albumart">
      <img src={profile} alt="Album Art" width="100" height="100" />
    </div>
  </div>
  <div class="music-right">
    <div class="music-title">{title}</div>
    <div class="music-subtitle">{subtitle}</div>
    {#if (isHovering || showCredit) && credit}
      <div class="music-credit">
        <div class="music-credit-title">{credit.title}</div>
        {#each credit.details as detail}
          <div class="music-credit-detail">{detail}</div>
        {/each}
      </div>
    {/if}
    <div class="music-audio">
      <div class="music-audio-top">
        <div class="music-audio-top-left">
        <button
          class="music-play-button"
          type="button"
          onclick={togglePlayAudio}
          aria-label={isPlaying ? $t("music.pause") : $t("music.play")}>
          {#if isPlaying}
            <i class="bi bi-pause-fill"></i>
          {:else}
            <i class="bi bi-play-fill"></i>
          {/if}
        </button>
        <span class="music-time">{audioCurrentTime}</span> /
        <span class="music-duration">{audioDuration}</span>
        </div>
        <div class="music-audio-top-right hide-mobile">
          <input type="range" min="0" max="100" value={audioVolume} onchange={changeVolume} oninput={changeVolume} class="music-volume-bar" />
          <i class="bi bi-volume-up-fill music-volume-icon" role="button" aria-label={$t("music.volume")} tabindex="0"></i>
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
    padding: 16px;
    background-color: var(--color-surface);
    border-radius: 16px;
    border: 1px solid var(--color-border);
    box-shadow: 0 8px 24px rgba(15, 17, 21, 0.08);
    transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
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
    color: var(--color-text);
  }

  .music-subtitle {
    font-size: 1em;
    color: var(--color-muted);
    margin-bottom: 10px;
  }

  .music-credit {
    background-color: var(--color-surface-variant);
    border-left: 3px solid var(--color-accent);
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 10px;
    transition: opacity 0.3s ease;
    animation: slideIn 0.3s ease;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-5px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .music-credit-title {
    font-weight: bold;
    font-size: 0.95em;
    color: var(--color-accent);
    margin-bottom: 6px;
  }

  .music-credit-detail {
    font-size: 0.85em;
    color: var(--color-muted);
    line-height: 1.4;
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

  .music-play-button i {
    font-size: 1.5em;
    color: var(--color-text);
    transition: color 0.3s ease;
  }

  .music-play-button:hover i,
  .music-play-button:focus-visible i {
    color: var(--color-accent);
  }

  .music-time, .music-duration {
    font-size: 0.9em;
    color: var(--color-muted);
  }

  .music-audio-top-right {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
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

  .music-volume-icon {
    font-size: 1.5em;
    color: var(--color-text);
    transition: color 0.3s ease;
  }

  .music-volume-icon:hover,
  .music-volume-icon:focus-visible {
    color: var(--color-accent);
  }

  @media (max-width: 600px) {
    .hide-mobile {
      display: none;
    }
  }

  input[type="range"] {
    accent-color: var(--color-accent);
  }
</style>
