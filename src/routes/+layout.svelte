<script lang="ts">
	import favicon from '$lib/assets/cropped_circle_image.png';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	const THEME_STORAGE_KEY = 'nemp-theme';

	let { children } = $props();
	let theme: 'light' | 'dark' = 'light';
	let hasExplicitPreference = false;

	const applyTheme = (value: 'light' | 'dark') => {
		theme = value;

		if (browser) {
			document.documentElement.dataset.theme = value;

			if (document.body) {
				document.body.dataset.theme = value;
			}
		}
	};

	const toggleTheme = () => {
		const nextTheme = theme === 'dark' ? 'light' : 'dark';

		if (browser) {
			localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
		}

		hasExplicitPreference = true;
		applyTheme(nextTheme);
	};

	onMount(() => {
		if (!browser) {
			return;
		}

		const stored = localStorage.getItem(THEME_STORAGE_KEY);

		if (stored === 'dark' || stored === 'light') {
			hasExplicitPreference = true;
			applyTheme(stored);
		} else {
			applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
		}

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		const handlePreferenceChange = (event: MediaQueryListEvent) => {
			if (!hasExplicitPreference) {
				applyTheme(event.matches ? 'dark' : 'light');
			}
		};

		mediaQuery.addEventListener('change', handlePreferenceChange);

		return () => {
			mediaQuery.removeEventListener('change', handlePreferenceChange);
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
<button
	type="button"
	class="theme-toggle"
	on:click={toggleTheme}
	aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
	<i class={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`} aria-hidden="true"></i>
	<span class="sr-only">{theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}</span>
</button>
<div class="footer">
  &copy; {new Date().getFullYear()} NEMP. All rights reserved.
</div>

<style>
  :global(:root) {
    --page-width: 800px;
    --color-background: #f5f3f2;
    --color-text: #333333;
    --color-muted: #666666;
    --color-surface: rgba(255, 255, 255, 0.85);
    --color-border: rgba(0, 0, 0, 0.08);
    --color-accent: #5a4326;
    --color-toggle-bg: rgba(0, 0, 0, 0.05);
    --color-toggle-border: rgba(0, 0, 0, 0.1);
    --color-toggle-icon: #333333;
    color-scheme: light;
  }

  :global(:root[data-theme='dark']) {
    --color-background: #0f1115;
    --color-text: #f0f3f9;
    --color-muted: #9ca4b5;
    --color-surface: rgba(25, 30, 40, 0.85);
    --color-border: rgba(255, 255, 255, 0.08);
    --color-accent: #6f95ff;
    --color-toggle-bg: rgba(255, 255, 255, 0.08);
    --color-toggle-border: rgba(255, 255, 255, 0.12);
    --color-toggle-icon: #f0f3f9;
    color-scheme: dark;
  }

  :global(body) {
    font-family: 'SUIT', sans-serif;
    margin: 0;
    background-color: var(--color-background);
    color: var(--color-text);
    transition: background-color 0.3s ease, color 0.3s ease;
  }

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
    color: var(--color-text);
    font-weight: 500;
    transition: color 0.3s ease;
  }

  .footer {
    text-align: center;
    padding: 20px;
    font-size: 0.9em;
    color: var(--color-muted);
    transition: color 0.3s ease;
  }

  .theme-toggle {
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 48px;
    height: 48px;
    border-radius: 9999px;
    border: 1px solid var(--color-toggle-border);
    background: var(--color-toggle-bg);
    color: var(--color-toggle-icon);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    backdrop-filter: blur(12px);
    box-shadow: 0 8px 16px rgba(15, 17, 21, 0.12);
    transition: transform 0.2s ease, background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
    z-index: 1000;
  }

  .theme-toggle:hover {
    transform: translateY(-2px);
  }

  .theme-toggle:focus-visible {
    outline: 2px solid var(--color-toggle-icon);
    outline-offset: 3px;
  }

  .theme-toggle i {
    font-size: 1.2rem;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
    white-space: nowrap;
  }
</style>
