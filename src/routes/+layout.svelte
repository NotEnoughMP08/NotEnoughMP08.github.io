<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  <style>
    body {
      margin: 0;
      font-family: 'Pretendard', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
    }
  </style>
</svelte:head>

<div>
  <div class="navbar">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
      <li><a href="/works">Works</a></li>
      <li><a href="/contact">Contact</a></li>
    </ul>
  </div>
  {@render children?.()}
</div>

<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f8f8;
  }

  ul {
    list-style: none;
    display: flex;
    gap: 15px;
    margin: auto;
    padding: 0;
  }

  li a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
  }

  li a:hover {
    color: #0070f3;
  }
</style>
