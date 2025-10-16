<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
  import "bootstrap-icons/font/bootstrap-icons.css";
  import { onMount } from 'svelte';

	let { children } = $props();

  let menuHidden = $state(true);

  function toggleMenu() {
    menuHidden = !menuHidden;
  }

  let menu: HTMLDivElement;
  let button: HTMLButtonElement;
  // Close the menu when clicking outside
  function handleClickOutside(event: MouseEvent) {
    if (menuHidden && menu && button && !menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
      menuHidden = false;
    }
  }

  // Add event listener to handle clicks outside the menu
  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
  <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
  <style>
    body {
      margin: 0;
      font-family: 'Pretendard', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
      --page-width: 800px;
      background-color: #f5f3f2;
    }
  </style>
</svelte:head>

<div class="navbar">
  <div class="nemp">NEMP</div>
  <div class="menu" class:hidden={menuHidden} bind:this={menu}>
    <div class="menu-button" bind:this={button}>
      <button class="menu-icon" onclick={toggleMenu} aria-label="Close Menu">
        <i class="bi bi-x" style="font-size: 2em; color: #333;"></i>
      </button>
    </div>
    <div class="menu-items">
      <div class="menu-item"><a href="/">Home</a></div>
      <div class="menu-item"><a href="/about">About</a></div>
      <div class="menu-item"><a href="/works">Works</a></div>
      <div class="menu-item"><a href="/contact">Contact</a></div>
    </div>
  </div>
  <div class="menu-button">
    <button class="menu-icon" onclick={toggleMenu} aria-label="Toggle Menu" bind:this={button}>
      <i class="bi bi-list" style="font-size: 2em; color: #333;"></i>
    </button>
  </div>
</div>
{@render children?.()}


<style>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }

  .nemp {
    font-weight: bold;
    font-size: 1.2em;
  }

  .menu-icon {
    background: none;
    border: none;
    cursor: pointer;
  }

  .menu {
    height: 100vh;
    width: 200px;
    top: 0;
    left: calc(100vw - 200px);
    position: fixed;
    background-color: #f5f3f2;
    text-align: right;
  }

  .menu-button {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }

  .menu .menu-button {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    margin: 10px;
  }

  .menu-items {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .menu-item {
    padding: 15px 20px;
  }

  .menu-item a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
  }

  .hidden {
    display: none;
  }

  @media (min-width: 600px) {
    .menu {
      position: static;
      width: auto;
      height: auto;
      background-color: transparent;
      display: flex;
      align-items: center;
      left: auto;
      top: auto;
    }

    .menu-items {
      flex-direction: row;
      align-items: center;
    }

    .menu-item {
      padding: 0 15px;
    }

    .menu-button {
      display: none;
    }
  }
</style>
