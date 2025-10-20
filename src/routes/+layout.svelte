<script lang="ts">
	import favicon from '$lib/assets/cropped_circle_image.png';
  import "bootstrap-icons/font/bootstrap-icons.css";
  import { onMount } from 'svelte';

	let { children } = $props();
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
  <div class="menu">
    <div class="menu-items">
      <div class="menu-item"><a href="/">Home</a></div>
      <div class="menu-item"><a href="/about">About</a></div>
      <div class="menu-item"><a href="/works">Works</a></div>
      <div class="menu-item"><a href="/contact">Contact</a></div>
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
    max-width: var(--page-width);
    margin: 0 auto;
  }

  .nemp {
    font-weight: bold;
    font-size: 1.2em;
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
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .menu-item {
    padding: 0 15px;
  }

  .menu-item a {
    text-decoration: none;
    color: #333;
    font-weight: 500;
  }
</style>
