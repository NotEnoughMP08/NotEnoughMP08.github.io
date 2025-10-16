<script lang="ts">
  import Header from "../Header.svelte";
  import Music from "./Music.svelte";
</script>

<Header />
<div class="container">
  <div class="title">Song</div>
  <div class="content">
    <div class="subtitle">Original</div>
    <div class="musics">
      <Music title="Sample Song 1" subtitle="Artist 1" audioSrc="/src/lib/assets/musics/01.mp3" />
      <Music title="Sample Song 2" subtitle="Artist 2" audioSrc="/src/lib/assets/musics/02.mp3" />
      <Music title="Sample Song 3" subtitle="Artist 3" audioSrc="/src/lib/assets/musics/03.mp3" />
    </div>
    <div class="subtitle">Arrange</div>
  </div>
  <div class="title">BGM</div>
  <div class="content">
    <div class="subtitle">Original</div>
    <div class="subtitle">Arrange</div>
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
