<script>
  import background from "$lib/assets/backgrounds/2_6099x1780.JPG";
  import profile from "$lib/assets/profile.png";
</script>

<div>
  <div
    style="background-image: url({background});"
    class="background"
  ></div>
  <div class="content">
    <img src={profile} alt="Profile" width="150" height="150" />
  </div>
</div>

<style>
  .background {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
    margin-bottom: 20px;
  }
</style>
