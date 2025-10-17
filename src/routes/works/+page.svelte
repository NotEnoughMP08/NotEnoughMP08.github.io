<script lang="ts">
  import Header from "../Header.svelte";
  import Music from "./Music.svelte";

  import musics from "$lib/data/musics.json";

  let songOriginal = musics.filter((music) => music.class === "song-original");
  let songArrange = musics.filter((music) => music.class === "song-arrange");
  let bgmOriginal = musics.filter((music) => music.class === "bgm-original");
  let bgmArrange = musics.filter((music) => music.class === "bgm-arrange");
</script>

<Header />
<div class="container">
  <div class="title">Song</div>
  <div class="content">
    <div class="subtitle">Original</div>
    <div class="musics">
      {#each songOriginal as music (music.title)}
        <Music {music} />
      {/each}
    </div>
    <div class="subtitle">Arrange</div>
    <div class="musics">
      {#each songArrange as music (music.title)}
        <Music {music} />
      {/each}
    </div>
  </div>
  <div class="title">BGM</div>
  <div class="content">
    <div class="subtitle">Original</div>
    <div class="musics">
      {#each bgmOriginal as music (music.title)}
        <Music {music} />
      {/each}
    </div>
    <div class="subtitle">Arrange</div>
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
</style>
