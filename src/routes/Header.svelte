<script lang="ts">
  import background from '$lib/assets/backgrounds/1_6240x2341.JPG';
</script>

<div
  style="background-image: url({background});"
  class="header"
>
</div>

<style>
  .header {
    max-width: var(--page-width);
    height: 300px;
    margin: auto;
    background-size: cover;
    background-position: center;
    margin-bottom: 80px;
    border-radius: 15px;
    filter: saturate(0.9);
  }

  @media (max-width: 800px) {
    .header {
      border-radius: 0;
      margin-bottom: 60px;
    }
  }
</style>
