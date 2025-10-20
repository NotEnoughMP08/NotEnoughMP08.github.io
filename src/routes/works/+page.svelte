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

  const songArrangeVideos = [
    {
      embed: "https://www.youtube.com/embed/5YLJwhyczHc?si=BLaIhY9_ToivwHXu",
      title: "한결(Hangyeol) - 나의 우주(My Universe)",
      subtitle: "Pop, Rock"
    },
    {
      embed: "https://www.youtube.com/embed/BoCKhWamZ6I?si=4YjzqjFZwM5n4N8n",
      title: "SNS코믹 ‘이웃집 남동생이 초등학생인데 너무 잘해! 엔딩 테마 ‘운명’",
      subtitle: "K-pop Ballad"
    },
    {
      embed: "https://www.youtube.com/embed/RogYuIRaB74?si=QGWrZvhVwcXMH5tZ",
      title: "엘시(Elsea) 1주년 콘서트 ‘태연 - I’",
      subtitle: "K-pop, Rock"
    },
    {
      embed: "https://www.youtube.com/embed/MMHbFSSwi2s?si=ycYqkTYGELjhPNBG",
      title: "엘시(Elsea) 1주년 콘서트 ‘Ed Sheeran - Perfect’",
      subtitle: "Acoustic Pop"
    }
  ];

  const bgmOriginalVideos = [
    {
      embed: "https://www.youtube.com/embed/7bd0YMP6BgQ?si=4Gi5miO7J1rbtHAC",
      title: "Journey",
      subtitle: "Orchestral, World"
    },
    {
      embed: "https://www.youtube.com/embed/PwXO4YZT5MI?si=7vf5MVIbUdtgChR1",
      title: "Typewriter",
      subtitle: "Acoustic"
    },
    {
      embed: "https://www.youtube.com/embed/NCrUf-pYmFY?si=vl0LDqS7Kg54dUrB",
      title: "雪国(설국)",
      subtitle: "Acoustic, World"
    },
    {
      embed: "https://www.youtube.com/embed/CauhOsP6CRI?si=B7ZaaXpj0ljw6jfJ",
      title: "Final Stage",
      subtitle: "Orchestral, Epic"
    },
    {
      embed: "https://www.youtube.com/embed/t8GSTUMmhv4?si=pAyHJlAr7VlBirCl",
      title: "주간일기",
      subtitle: "Acoustic, Piano"
    }
  ];

  const bgmArrangeVideos = [
    {
      embed: "https://www.youtube.com/embed/9Ic4Xc7_Bcw?si=AoxzBZTSMYM2NNW1",
      title: "Team LiBRA - Blue Archive ‘0k@eri’ Band Arrange cover",
      subtitle: "R&B, Band, Instrumental"
    },
    {
      embed: "https://www.youtube.com/embed/-ZPHtBoS8RQ?si=QBnXFBYecB3rZHAd&start=152",
      title: "Blue Archive OST Jazz Arrange Album - SCHALE Jazz Lab",
      subtitle: "Jazz, Instrumental"
    }
  ];
</script>

<Header />
<div class="container">
  <div class="title">{$t("works.song")}</div>
  <div class="content">
    <div class="subtitle">{$t("works.original")}</div>
    {#if featuredSong}
      <div class="media-featured">
        <div class="featured-card">
          <Music music={featuredSong} />
        </div>
        {#if featuredSong.youtubeVideos?.length}
          <div class="featured-videos-grid">
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
    {#if songArrangeVideos.length}
      <div class="videos-section">
        <div class="videos-grid">
          {#each songArrangeVideos as video (video.embed)}
            <div class="video-card">
              <div class="featured-video-embed">
                <iframe
                  title={`Song Arrange - ${video.title}`}
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
      </div>
    {/if}
  </div>
  <div class="title">{$t("works.bgm")}</div>
  <div class="content">
    <div class="subtitle">{$t("works.original")}</div>
    {#if bgmOriginalVideos.length}
      <div class="videos-section videos-section-before">
        <div class="videos-grid">
          {#each bgmOriginalVideos as video (video.embed)}
            <div class="video-card">
              <div class="featured-video-embed">
                <iframe
                  title={`BGM Original - ${video.title}`}
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
      </div>
    {/if}
    <div class="media-grid">
      {#each bgmOriginal as music (music.title)}
        <div class="media-item">
          <Music {music} />
        </div>
      {/each}
    </div>
    <div class="subtitle">{$t("works.arrange")}</div>
    {#if bgmArrangeVideos.length}
      <div class="videos-section videos-section-before">
        <div class="videos-grid">
          {#each bgmArrangeVideos as video (video.embed)}
            <div class="video-card">
              <div class="featured-video-embed">
                <iframe
                  title={`BGM Arrange - ${video.title}`}
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
      </div>
    {/if}
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

  .media-featured {
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-bottom: 32px;
  }

  .featured-card {
    align-self: start;
    width: 100%;
    max-width: min(100%, calc((100% - 20px) / 2));
  }

  .videos-section {
    margin-top: 16px;
  }

  .videos-section-before {
    margin-top: 0;
    margin-bottom: 16px;
  }

  .media-item {
    display: flex;
    flex-direction: column;
  }

  .media-item > :global(.music) {
    flex: 1 1 auto;
    height: 100%;
  }

  .featured-videos-grid,
  .videos-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }

  .featured-video,
  .video-card {
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

    .featured-card {
      max-width: 100%;
    }

    .featured-videos-grid,
    .videos-grid {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }
</style>
