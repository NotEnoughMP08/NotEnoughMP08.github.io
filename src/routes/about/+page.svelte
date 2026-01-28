<script lang="ts">
  import Header from '../Header.svelte';
  import profile from '$lib/assets/profile.png';
  import { t, tList } from '$lib/i18n';

  let worksList: string[] = [];

  $: {
    worksList = $tList('about.worksList');
  }
</script>

<Header />
<div class="quote-container">
  <div class="text-quote">
    {$t('about.quote1')}
  </div>
  <div class="text-quote">
    {@html $t('about.quote2')}
  </div>
</div>
<section class="profile-section">
  <img
    src={profile}
    alt="Profile"
    width="150"
    height="150"
    class="profile-avatar"
  />
  <div class="profile-details">
    <div class="profile-name">NEMP</div>
    <div class="profile-text">
      {@html $t('about.intro1')}
    </div>
    <div class="profile-text">
      {@html $t('about.intro2')}
    </div>
  </div>
</section>
<section class="work-section">
  <div class="section-title">{$t('about.workHistory')}</div>
  <ul class="work-list">
    {#each worksList as work}
      <li>{work}</li>
    {/each}
  </ul>
</section>

<style>
.quote-container {
  max-width: var(--page-width);
  margin: auto;
  margin-top: 110px;
  text-align: center;
  padding: 0 20px;
  margin-bottom: 80px;
}

  .text-quote {
    font-size: 1.2em;
    word-break: keep-all;
    margin-bottom: 15px;
    line-height: 1.6;
    white-space: pre-line;
  }

  .profile-section {
    max-width: 720px;
    margin: 40px auto 0;
    padding: 0 20px;
    display: grid;
    grid-template-columns: auto minmax(0, 540px);
    align-items: center;
    justify-content: center;
    column-gap: 48px;
  }

  .profile-avatar {
    border-radius: 50%;
    justify-self: center;
  }

  .profile-details {
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding: 36px 0;
    max-width: 540px;
    text-align: left;
    align-items: flex-start;
  }

  .profile-name {
    font-size: 1.5em;
    font-weight: 700;
  }

  .profile-text {
    line-height: 1.6;
    width: 100%;
    word-break: keep-all;
  }

  .work-section {
    max-width: var(--page-width);
    margin: 80px auto 240px;
    padding: 0 20px;
    display: grid;
    grid-template-columns: minmax(0, 200px) minmax(0, 1fr);
    column-gap: 72px;
    align-items: start;
  }

  .section-title {
    font-size: 1.2em;
    font-weight: 600;
    justify-self: start;
  }

  .work-list {
    margin: 0;
    padding-left: 24px;
    line-height: 1.7;
    word-break: keep-all;
  }

  @media (max-width: 900px) {
    .work-section {
      grid-template-columns: minmax(0, 180px) minmax(0, 1fr);
      column-gap: 48px;
      margin-top: 70px;
    }
  }

  @media (max-width: 800px) {
    .profile-section {
      grid-template-columns: 1fr;
      gap: 32px;
      text-align: center;
      padding: 0 20px;
      justify-items: center;
    }

    .profile-details {
      padding: 0;
      align-items: center;
      text-align: center;
    }

    .work-section {
      grid-template-columns: 1fr;
      row-gap: 24px;
      column-gap: 0;
      text-align: left;
      margin-top: 60px;
      margin-bottom: 200px;
    }

    .section-title {
      justify-self: start;
      text-align: left;
    }

    .work-list {
      padding-left: 20px;
    }
  }

  @media (max-width: 720px) {
    .quote-container {
      margin-top: 80px;
      margin-bottom: 70px;
    }
  }

  .work-list li {
    margin-bottom: 8px;
  }
</style>
