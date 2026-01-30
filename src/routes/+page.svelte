<script lang="ts">
  import background from "$lib/assets/backgrounds/2_6099x1780.JPG";
  import profile from "$lib/assets/profile.png";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import { t } from "$lib/i18n";
</script>

<div
  style="background-image: url({background});"
  class="background"
>
  <div class="content">
    <img src={profile} alt="Profile" width="150" height="150" class="profile-image" />
    <div class="text">
      <div class="name">NEMP</div>
      <div class="description">{$t("home.description")}</div>
      <div class="description">{$t("home.description2")}</div>
      <div class="contact">
        <a href="https://x.com/NotEnoughMP" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <i class="bi bi-twitter-x" style="font-size: 1.5em; color: white; margin-right: 10px;"></i>
        </a>
        <a href="https://www.youtube.com/c/NEMPofficial" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <i class="bi bi-youtube" style="font-size: 1.5em; color: white; margin-right: 10px;"></i>
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .background {
    max-width: 100vw;
    height: 100vh;
    margin: auto;
    background-size: cover;
    background-position: center;
    background-color: rgba(0, 0, 0, 0.5);
    background-blend-mode: darken;
    margin-bottom: 20px;
  }

  .content {
    display: flex;
    flex-direction: row;
    gap: 40px;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: white;
    backdrop-filter: saturate(0.9) blur(4px);
  }

  .profile-image {
    border-radius: 50%;
  }

  .name {
    font-size: 2em;
    font-weight: bold;
  }

  .text div {
    margin-bottom: 10px;
  }

  @media (max-width: 600px) {
    .content {
      flex-direction: column;
      text-align: center;
    }
  }
</style>
