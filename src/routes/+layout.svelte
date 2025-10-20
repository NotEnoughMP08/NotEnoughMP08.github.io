<script lang="ts">
	import favicon from '$lib/assets/cropped_circle_image.png';
  import "bootstrap-icons/font/bootstrap-icons.css";
  import { onMount } from 'svelte';

	let { children } = $props();

  let menuHidden = $state(true);

  function toggleMenu() {
    menuHidden = !menuHidden;
  }

  let menu: HTMLDivElement;
  let button: HTMLButtonElement;
  function handleClickOutside(event: MouseEvent) {
    if (menuHidden && menu && button && !menu.contains(event.target as Node) && !button.contains(event.target as Node)) {
      menuHidden = true;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  });
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
  <link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css" rel="stylesheet">
  <title>NotEnoughMP</title>
  <style>
    body {
      font-family: 'SUIT', sans-serif;
      margin: 0;
      --page-width: 800px;
      background-color: #f5f3f2;
      color: #333;
    }
  </style>
</svelte:head>

<div class="navbar">
  <div class="nemp">NEMP</div>
  <div class="menu" class:hidden={menuHidden} bind:this={menu}>
    <div class="menu-items">
      <div class="menu-item"><a href="/" onclick={() => menuHidden = true}>Home</a></div>
      <div class="menu-item"><a href="/about" onclick={() => menuHidden = true}>About</a></div>
      <div class="menu-item"><a href="/works" onclick={() => menuHidden = true}>Works</a></div>
      <div class="menu-item"><a href="/contact" onclick={() => menuHidden = true}>Contact</a></div>
    </div>
  </div>
</div>
{@render children?.()}
<div class="footer" style="text-align: center; padding: 20px; font-size: 0.9em; color: #666;">
  &copy; {new Date().getFullYear()} NEMP. All rights reserved.
</div>

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

  .menu .menu-button {
  }
</style>
