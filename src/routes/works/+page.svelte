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
      <div class="featured-song">
        <Music music={featuredSong} />
        {#if featuredSong.youtubeVideos?.length}
          <div class="featured-song-videos">
            {#each featuredSong.youtubeVideos as video (video.embed)}
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
            {/each}
          </div>
        {/if}
      </div>
    {/if}
    {#if songOriginal.length}
      <div class="musics">
        {#each songOriginal as music (music.title)}
          <Music {music} />
        {/each}
      </div>
    {/if}
    <div class="subtitle">{$t("works.arrange")}</div>
    <div class="musics">
      {#each songArrange as music (music.title)}
        <Music {music} />
      {/each}
    </div>
  </div>
  <div class="title">{$t("works.bgm")}</div>
  <div class="content">
    <div class="subtitle">{$t("works.original")}</div>
    <div class="musics">
      {#each bgmOriginal as music (music.title)}
        <Music {music} />
      {/each}
    </div>
    <div class="subtitle">{$t("works.arrange")}</div>
    <div class="musics">
      {#each bgmArrange as music (music.title)}
        <Music {music} />
      {/each}
    </div>
  </div>
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
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

  .musics {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 20px;
  }

  .featured-song {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 20px;
  }

  .featured-song-videos {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .featured-video {
    display: flex;
    flex-direction: column;
    gap: 12px;
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
</style>
