<script lang="ts">
  import Header from "../Header.svelte";
  import Music from "./Music.svelte";

  import musics from "$lib/data/musics.json";
  import { t } from "$lib/i18n";

  let hoveredVideoIndex: number | null = $state(null);
  let playingVideoIndex: number | null = $state(null);
  let isVideoHoverDelayed: number | null = $state(null);
  let videoHoverTimeout: ReturnType<typeof setTimeout> | null = null;
  
  let hoveredArrangeVideoIndex: number | null = $state(null);
  let playingArrangeVideoIndex: number | null = $state(null);
  let isArrangeVideoHoverDelayed: number | null = $state(null);
  let arrangeVideoHoverTimeout: ReturnType<typeof setTimeout> | null = null;
  
  let hoveredBgmVideoIndex: number | null = $state(null);
  let playingBgmVideoIndex: number | null = $state(null);
  let isBgmVideoHoverDelayed: number | null = $state(null);
  let bgmVideoHoverTimeout: ReturnType<typeof setTimeout> | null = null;

  const allSongOriginal = musics.filter((music) => music.class === "song-original");
  const featuredSong = allSongOriginal.find((music) => music.featured);
  const songOriginal = featuredSong
    ? allSongOriginal.filter((music) => music !== featuredSong)
    : allSongOriginal;
  const songArrange = musics.filter((music) => music.class === "song-arrange");
  const bgmOriginal = musics.filter((music) => music.class === "bgm-original");
  const bgmArrange = musics.filter((music) => music.class === "bgm-arrange");

  function handleVideoMouseEnter(index: number) {
    hoveredVideoIndex = index;
    if (videoHoverTimeout) clearTimeout(videoHoverTimeout);
    videoHoverTimeout = setTimeout(() => {
      isVideoHoverDelayed = index;
    }, 300);
  }

  function handleVideoMouseLeave(index: number) {
    if (videoHoverTimeout) clearTimeout(videoHoverTimeout);
    if (playingVideoIndex !== index) {
      hoveredVideoIndex = null;
      isVideoHoverDelayed = null;
    }
  }

  function handleVideoClick(index: number) {
    playingVideoIndex = playingVideoIndex === index ? null : index;
  }

  function handleArrangeVideoMouseEnter(index: number) {
    hoveredArrangeVideoIndex = index;
    if (arrangeVideoHoverTimeout) clearTimeout(arrangeVideoHoverTimeout);
    arrangeVideoHoverTimeout = setTimeout(() => {
      isArrangeVideoHoverDelayed = index;
    }, 300);
  }

  function handleArrangeVideoMouseLeave(index: number) {
    if (arrangeVideoHoverTimeout) clearTimeout(arrangeVideoHoverTimeout);
    if (playingArrangeVideoIndex !== index) {
      hoveredArrangeVideoIndex = null;
      isArrangeVideoHoverDelayed = null;
    }
  }

  function handleArrangeVideoClick(index: number) {
    playingArrangeVideoIndex = playingArrangeVideoIndex === index ? null : index;
  }

  function handleBgmVideoMouseEnter(index: number) {
    hoveredBgmVideoIndex = index;
    if (bgmVideoHoverTimeout) clearTimeout(bgmVideoHoverTimeout);
    bgmVideoHoverTimeout = setTimeout(() => {
      isBgmVideoHoverDelayed = index;
    }, 300);
  }

  function handleBgmVideoMouseLeave(index: number) {
    if (bgmVideoHoverTimeout) clearTimeout(bgmVideoHoverTimeout);
    if (playingBgmVideoIndex !== index) {
      hoveredBgmVideoIndex = null;
      isBgmVideoHoverDelayed = null;
    }
  }

  function handleBgmVideoClick(index: number) {
    playingBgmVideoIndex = playingBgmVideoIndex === index ? null : index;
  }

  let hoveredArrangeVideoIndex2: number | null = $state(null);
  let playingArrangeVideoIndex2: number | null = $state(null);
  let isArrangeVideo2HoverDelayed: number | null = $state(null);
  let arrangeVideo2HoverTimeout: ReturnType<typeof setTimeout> | null = null;

  function handleArrangeVideo2MouseEnter(index: number) {
    hoveredArrangeVideoIndex2 = index;
    if (arrangeVideo2HoverTimeout) clearTimeout(arrangeVideo2HoverTimeout);
    arrangeVideo2HoverTimeout = setTimeout(() => {
      isArrangeVideo2HoverDelayed = index;
    }, 300);
  }

  function handleArrangeVideo2MouseLeave(index: number) {
    if (arrangeVideo2HoverTimeout) clearTimeout(arrangeVideo2HoverTimeout);
    if (playingArrangeVideoIndex2 !== index) {
      hoveredArrangeVideoIndex2 = null;
      isArrangeVideo2HoverDelayed = null;
    }
  }

  function handleArrangeVideo2Click(index: number) {
    playingArrangeVideoIndex2 = playingArrangeVideoIndex2 === index ? null : index;
  }

  const songArrangeVideos = [
    {
      embed: "https://www.youtube.com/embed/5YLJwhyczHc?si=BLaIhY9_ToivwHXu",
      title: "한결(Hangyeol) - 나의 우주(My Universe)",
      subtitle: "Pop, Rock",
      credit: {
        title: "【Credit】",
        details: [
          "Music Produced: 한결 (HANGYEOL)",
          "Lyrics: 한결 (HANGYEOL)",
          "Composed: 한결 (HANGYEOL)",
          "Arranged: NEMP, 김찬영, Ray"
        ]
      }
    },
    {
      embed: "https://www.youtube.com/embed/BoCKhWamZ6I?si=4YjzqjFZwM5n4N8n",
      title: "SNS코믹 '이웃집 남동생이 초등학생인데 너무 잘해! 엔딩 테마 '운명'",
      subtitle: "K-pop Ballad",
      credit: {
        title: "【Credit】",
        details: [
          "Vocal/Lyrics: RoA",
          "Composed: 마감요정 (DREAMSCAPEY)",
          "Arranged: N4ML (DREAMSCAPEY), NEMP",
          "Mixi/Mastering: N4ML (DREAMSCAPEY)",
          "Guitar: PoDoDan (DREAMSCAPEY)",
          "Bass: CK (DREAMSCAPEY)"
        ]
      }
    },
    {
      embed: "https://www.youtube.com/embed/RogYuIRaB74?si=QGWrZvhVwcXMH5tZ",
      title: "엘시(Elsea) 1주년 콘서트 '태연 - I'",
      subtitle: "K-pop, Rock",
      credit: {
        title: "【Credit】",
        details: [
          "Arranged/Piano/Chorus: NEMP"
        ]
      }
    },
    {
      embed: "https://www.youtube.com/embed/MMHbFSSwi2s?si=ycYqkTYGELjhPNBG",
      title: "엘시(Elsea) 1주년 콘서트 'Ed Sheeran - Perfect'",
      subtitle: "Acoustic Pop",
      credit: {
        title: "【Credit】",
        details: [
          "Arranged: NEMP"
        ]
      }
    }
  ];

  const bgmOriginalVideos = [
    {
      embed: "https://www.youtube.com/embed/7bd0YMP6BgQ?si=4Gi5miO7J1rbtHAC",
      title: "Journey",
      subtitle: "Orchestral, World",
      credit: {
        title: "【Credit】",
        details: [
          "Music: NEMP",
          "Mastering: s_dan0",
          "Illust: AsH",
          "VFX: GamJji"
        ]
      }
    },
    {
      embed: "https://www.youtube.com/embed/PwXO4YZT5MI?si=7vf5MVIbUdtgChR1",
      title: "Typewriter",
      subtitle: "Acoustic",
      credit: {
        title: "【Credit】",
        details: [
          "Music: NEMP",
          "Illustration: attwn_park"
        ]
      }
    },
    {
      embed: "https://www.youtube.com/embed/NCrUf-pYmFY?si=vl0LDqS7Kg54dUrB",
      title: "雪国(설국)",
      subtitle: "Acoustic, World",
      credit: {
        title: "【Credit】",
        details: [
          "Music: NEMP",
          "Illustration: cheon_do"
        ]
      }
    },
    {
      embed: "https://www.youtube.com/embed/CauhOsP6CRI?si=B7ZaaXpj0ljw6jfJ",
      title: "Final Stage",
      subtitle: "Orchestral, Epic",
      credit: {
        title: "【Credit】",
        details: [
          "Music: NEMP",
          "VFX: GamJji"
        ]
      }
    },
    {
      embed: "https://www.youtube.com/embed/t8GSTUMmhv4?si=pAyHJlAr7VlBirCl",
      title: "주간일기",
      subtitle: "Acoustic, Piano",
      credit: {
        title: "【Credit】",
        details: [
          "Music: NEMP"
        ]
      }
    }
  ];

  const bgmArrangeVideos = [
    {
      embed: "https://www.youtube.com/embed/9Ic4Xc7_Bcw?si=AoxzBZTSMYM2NNW1",
      title: "Team LiBRA - Blue Archive ‘0k@eri’ Band Arrange cover",
      subtitle: "R&B, Band, Instrumental",
      credit: {
        title: "【Credit】",
        details: [
          "'0k@eri' Band Arrange cover Band arrange from Team LiBRA",
          "Arranged: NEMP",
          "Piano: NEMP",
          "Synth: キリケン",
          "EWI: NezMayo",
          "Guitar: Jiho Park",
          "Bass: MSPR",
          "Drum: Lee_Shiba_Inu",
          "Art: HRNa",
          "Animation: SSS[사메스]",
          "Video: JunK"
        ]
      }
    },
    {
      embed: "https://www.youtube.com/embed/-ZPHtBoS8RQ?si=QBnXFBYecB3rZHAd&start=152",
      title: "Blue Archive OST Jazz Arrange Album - SCHALE Jazz Lab",
      subtitle: "Jazz, Instrumental",
      credit: {
        title: "【Credit】",
        details: [
          "Arranged/Mix: Z:U, NEMP",
          "Mastering: Z:U",
          "Album art: bolchan"
        ]
      }
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
            {#each featuredSong.youtubeVideos as video, index (video.embed)}
              <div class="featured-video" role="button" tabindex="0" onmouseenter={() => handleVideoMouseEnter(index)} onmouseleave={() => handleVideoMouseLeave(index)} onclick={() => handleVideoClick(index)} onkeydown={(e) => e.key === 'Enter' && handleVideoClick(index)}>
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
                  {#if video.credit}
                    <div class="video-credit" class:visible={isVideoHoverDelayed === index || playingVideoIndex === index}>
                      <div class="video-credit-title">{video.credit.title}</div>
                      {#each video.credit.details as detail}
                        <div class="video-credit-detail">{detail}</div>
                      {/each}
                    </div>
                  {/if}
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
    {#if songArrangeVideos.length}
      <div class="videos-section videos-section-before">
        <div class="videos-grid">
          {#each songArrangeVideos as video, index (video.embed)}
            <div class="video-card" role="button" tabindex="0" onmouseenter={() => handleArrangeVideoMouseEnter(index)} onmouseleave={() => handleArrangeVideoMouseLeave(index)} onclick={() => handleArrangeVideoClick(index)} onkeydown={(e) => e.key === 'Enter' && handleArrangeVideoClick(index)}>
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
                {#if video.credit}
                  <div class="video-credit" class:visible={isArrangeVideoHoverDelayed === index || playingArrangeVideoIndex === index}>
                    <div class="video-credit-title">{video.credit.title}</div>
                    {#each video.credit.details as detail}
                      <div class="video-credit-detail">{detail}</div>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
    <div class="media-grid song-arrange-grid">
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
    {#if bgmOriginalVideos.length}
      <div class="videos-section videos-section-before">
        <div class="videos-grid">
          {#each bgmOriginalVideos as video, index (video.embed)}
            <div class="video-card" role="button" tabindex="0" onmouseenter={() => handleBgmVideoMouseEnter(index)} onmouseleave={() => handleBgmVideoMouseLeave(index)} onclick={() => handleBgmVideoClick(index)} onkeydown={(e) => e.key === 'Enter' && handleBgmVideoClick(index)}>
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
                {#if video.credit}
                  <div class="video-credit" class:visible={isBgmVideoHoverDelayed === index || playingBgmVideoIndex === index}>
                    <div class="video-credit-title">{video.credit.title}</div>
                    {#each video.credit.details as detail}
                      <div class="video-credit-detail">{detail}</div>
                    {/each}
                  </div>
                {/if}
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
          {#each bgmArrangeVideos as video, index (video.embed)}
            <div class="video-card" role="button" tabindex="0" onmouseenter={() => handleArrangeVideo2MouseEnter(index)} onmouseleave={() => handleArrangeVideo2MouseLeave(index)} onclick={() => handleArrangeVideo2Click(index)} onkeydown={(e) => e.key === 'Enter' && handleArrangeVideo2Click(index)}>
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
                {#if video.credit}
                  <div class="video-credit" class:visible={isArrangeVideo2HoverDelayed === index || playingArrangeVideoIndex2 === index}>
                    <div class="video-credit-title">{video.credit.title}</div>
                    {#each video.credit.details as detail}
                      <div class="video-credit-detail">{detail}</div>
                    {/each}
                  </div>
                {/if}
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
    font-size: 2.4em;
    font-weight: 700;
    margin-bottom: 18px;
    letter-spacing: 0.02em;
  }

  .subtitle {
    font-size: 1.75em;
    font-weight: 600;
    margin-bottom: 24px;
    letter-spacing: 0.015em;
  }

  .content {
    margin-bottom: 56px;
  }

  .content .media-grid,
  .content .media-featured,
  .videos-section,
  .videos-section-before {
    margin-top: 32px;
  }

  .content .media-featured + .subtitle,
  .content .media-grid + .subtitle {
    margin-top: 32px;
  }

  .content .subtitle + .media-grid,
  .content .subtitle + .media-featured,
  .content .subtitle + .videos-section-before {
    margin-top: 24px;
  }

  .content .subtitle + .media-grid.song-arrange-grid {
    margin-top: 24px;
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

  .videos-section-before {
    margin-top: 0;
    margin-bottom: 16px;
  }

  .videos-section-before + .media-grid {
    margin-top: 16px;
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

  .video-credit {
    background-color: var(--color-surface-variant);
    border-left: 3px solid var(--color-accent);
    padding: 12px;
    border-radius: 8px;
    margin-top: 8px;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    transition: max-height 0.4s ease, opacity 0.4s ease, margin-top 0.4s ease;
  }

  .video-credit.visible {
    max-height: 200px;
    opacity: 1;
    margin-top: 8px;
  }

  .video-credit-title {
    font-weight: bold;
    font-size: 0.95em;
    color: var(--color-accent);
    margin-bottom: 6px;
  }

  .video-credit-detail {
    font-size: 0.85em;
    color: var(--color-muted);
    line-height: 1.4;
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
