<script lang="ts">
  import Header from '../Header.svelte';
  import profile from '$lib/assets/profile.png';

  import works from '$lib/data/about-works.json';
</script>

<Header />
<div class="quote-container">
  <div class="text-quote">
    당신의 이야기 속 감정과 순간을 음악으로 섬세히 그려내는 작곡가입니다.
  </div>
  <div class="text-quote">
    풍부한 서사성을 담은 사운드를 기반으로 오케스트라부터 록·재즈까지 다양한 장르를 아우르는 맞춤형 음악을 제공합니다.
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
      넥슨 ‘블루아카이브’ 페스티벌, 라이브 아이돌 그룹 ‘IHOTEU’ 라이브, 버츄얼 유튜버 음원 제작 등 다양한 프로젝트 경험을 보유한 작곡가입니다.
    </div>
    <div class="text">
      어쿠스틱부터 메탈, 재즈까지 장르를 넘나드는 폭 넓은 제작 경험과 지속적인 연구 기술을 바탕으로 클라이언트의 비전을 음악적으로 실현하는 맞춤형 솔루션을 제공합니다
    </div>
  </div>
</div>
<div class="container">
  <div class="title">Work History</div>
  <ul class="text">
    {#each works as work}
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
