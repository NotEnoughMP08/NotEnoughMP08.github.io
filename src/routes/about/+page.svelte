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
<div class="container">
  <div class="profile">
    <img src={profile} alt="Profile" width="150" height="150" class="profile-image" />
  </div>
  <div class="content">
    <div class="text-name">
      NEMP
    </div>
    <div class="text">
      {@html $t('about.intro1')}
    </div>
    <div class="text">
      {@html $t('about.intro2')}
    </div>
  </div>
</div>
<div class="container">
  <div class="title">{$t('about.workHistory')}</div>
  <ul class="text">
    {#each worksList as work}
      <li>{work}</li>
    {/each}
  </ul>
</div>

<style>
.quote-container {
  max-width: var(--page-width);
  margin: auto;
  margin-top: 20px;
  text-align: center;
  padding: 0 20px;
  margin-bottom: 60px;
}

  .container {
    max-width: var(--page-width);
    margin: auto;
    display: flex;
    flex-direction: row;
    gap: 20px;
    margin-top: 40px;
  }

  .profile {
    flex: 4;
    display: flex;
    justify-content: center;
    align-items: top;
  }

  .profile-image {
    border-radius: 50%;
  }

  .content {
    flex: 8;
  }

  .text-quote {
    font-size: 1.2em;
    word-break: keep-all;
    margin-bottom: 15px;
    line-height: 1.6;
    white-space: pre-line;
  }

  .text-name {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 15px;
  }

  .text {
    margin-bottom: 10px;
    line-height: 1.6;
  }

  @media (max-width: 800px) {
    .container {
      flex-direction: column;
      align-items: center;
      padding: 0 20px;
    }

    .profile {
      margin-bottom: 20px;
    }

    .content {
      flex: none;
    }
  }

  .text li {
    margin-bottom: 8px;
  }
</style>
