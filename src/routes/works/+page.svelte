<script lang="ts">
  import Header from "../Header.svelte";
  import Music from "./Music.svelte";

  import musics from "$lib/data/musics.json";
  import { t } from "$lib/i18n";

  const allSongOriginal = musics.filter((music) => music.class === "song-original");
  const featuredSong = allSongOriginal.find((music) => music.featured);
  const songOriginal = featuredSong
    ? allSongOriginal.filter((music) => music !== featuredSong)
    : allSongOriginal;
  const songArrange = musics.filter((music) => music.class === "song-arrange");
  const bgmOriginal = musics.filter((music) => music.class === "bgm-original");
  const bgmArrange = musics.filter((music) => music.class === "bgm-arrange");
</script>

<Header />
<div class="container">
  <div class="title">{$t("works.song")}</div>
  <div class="content">
    <div class="subtitle">{$t("works.original")}</div>
    {#if featuredSong}
      <div class="media-grid media-grid-featured">
        <div class="media-item">
          <Music music={featuredSong} />
        </div>
        {#if featuredSong.youtubeVideos?.length}
          {#each featuredSong.youtubeVideos as video (video.embed)}
            <div class="media-item">
              <div class="featured-video">
                <div class="featured-video-embed">
                  <iframe
                    title={`${featuredSong.title} - ${video.title}`}
                    src={video.embed}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
                </div>
                <div class="featured-video-info">
                  <div class="featured-video-title">{video.title}</div>
                  <div class="featured-video-subtitle">{video.subtitle}</div>
                </div>
              </div>
            </div>
          {/each}
        {/if}
      </div>
    {/if}
    {#if songOriginal.length}
      <div class="media-grid">
        {#each songOriginal as music (music.title)}
          <div class="media-item">
            <Music {music} />
          </div>
        {/each}
      </div>
    {/if}
    <div class="subtitle">{$t("works.arrange")}</div>
    <div class="media-grid">
      {#each songArrange as music (music.title)}
        <div class="media-item">
          <Music {music} />
        </div>
      {/each}
    </div>
  </div>
  <div class="title">{$t("works.bgm")}</div>
  <div class="content">
    <div class="subtitle">{$t("works.original")}</div>
    <div class="media-grid">
      {#each bgmOriginal as music (music.title)}
        <div class="media-item">
          <Music {music} />
        </div>
      {/each}
    </div>
    <div class="subtitle">{$t("works.arrange")}</div>
    <div class="media-grid">
      {#each bgmArrange as music (music.title)}
        <div class="media-item">
          <Music {music} />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 1120px;
    margin: 0 auto;
    padding: 20px 24px;
  }

  .title {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .subtitle {
    font-size: 1.5em;
    font-weight: semi-bold;
    margin-bottom: 5px;
  }

  .content {
    margin-bottom: 40px;
  }

  .media-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    margin-bottom: 20px;
    align-items: stretch;
  }

  .media-grid-featured {
    gap: 24px;
    margin-bottom: 24px;
    align-items: start;
  }

  .media-item {
    display: flex;
    flex-direction: column;
  }

  .media-item > :global(.music),
  .media-item > .featured-video {
    flex: 1 1 auto;
    height: 100%;
  }

  .media-grid-featured .media-item > :global(.music) {
    height: auto;
  }

  .featured-video {
    display: flex;
    flex-direction: column;
    gap: 12px;
    height: 100%;
  }

  .featured-video-embed {
    position: relative;
    width: 100%;
    padding-top: 56.25%;
  }

  .featured-video-embed iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    border-radius: 12px;
  }

  .featured-video-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .featured-video-title {
    font-size: 1.2em;
    font-weight: bold;
    color: var(--color-text);
  }

  .featured-video-subtitle {
    font-size: 1em;
    color: var(--color-muted);
  }

  @media (max-width: 600px) {
    .media-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
