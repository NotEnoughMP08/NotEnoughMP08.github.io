<script lang="ts">
	import favicon from '$lib/assets/cropped_circle_image.png';
	import 'bootstrap-icons/font/bootstrap-icons.css';
	import { browser } from '$app/environment';
	import { onMount, tick } from 'svelte';
	import { get } from 'svelte/store';
	import type { Locale } from '$lib/i18n';
	import { LANG_OPTIONS, locale, switchLocale, t } from '$lib/i18n';

	const THEME_STORAGE_KEY = 'nemp-theme';

	let { children } = $props();
	let theme: 'light' | 'dark' = 'light';
	let hasExplicitPreference = false;
	const currentYear = new Date().getFullYear();
	let isLanguageMenuOpen = false;
	let languageButton: HTMLButtonElement | null = null;
	let languageMenu: HTMLUListElement | null = null;

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

	const closeLanguageMenu = () => {
		if (!isLanguageMenuOpen) {
			return;
		}

		isLanguageMenuOpen = false;
	};

	const getLanguageOptionButtons = () =>
		Array.from(languageMenu?.querySelectorAll<HTMLButtonElement>('[data-option]') ?? []);

	const focusActiveLanguageOption = () => {
		const activeCode = get(locale);
		const active =
			languageMenu?.querySelector<HTMLButtonElement>(`[data-option="${activeCode}"]`) ??
			languageMenu?.querySelector<HTMLButtonElement>('[data-option]');

		active?.focus();
	};

	const focusRelativeLanguageOption = (direction: 1 | -1) => {
		const buttons = getLanguageOptionButtons();

		if (!buttons.length) {
			return;
		}

		const activeElement = document.activeElement;
		let index = buttons.findIndex((button) => button === activeElement);

		if (index === -1) {
			const activeCode = get(locale);
			index = buttons.findIndex((button) => button.dataset.option === activeCode);
		}

		if (index === -1) {
			index = direction === 1 ? -1 : 0;
		}

		const nextIndex = (index + direction + buttons.length) % buttons.length;
		buttons[nextIndex].focus();
	};

	const focusBoundaryLanguageOption = (position: 'first' | 'last') => {
		const buttons = getLanguageOptionButtons();

		if (!buttons.length) {
			return;
		}

		const target = position === 'first' ? buttons[0] : buttons[buttons.length - 1];
		target.focus();
	};

	const toggleLanguageMenu = async () => {
		if (isLanguageMenuOpen) {
			closeLanguageMenu();
			return;
		}

		isLanguageMenuOpen = true;
		await tick();
		focusActiveLanguageOption();
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

		document.addEventListener('click', handleOutsideClick);
		document.addEventListener('keydown', handleDocumentKeydown);

		return () => {
			mediaQuery.removeEventListener('change', handlePreferenceChange);
			document.removeEventListener('click', handleOutsideClick);
			document.removeEventListener('keydown', handleDocumentKeydown);
		};
	});

	const handleLanguageChange = (code: Locale) => {
		switchLocale(code);
		closeLanguageMenu();
		languageButton?.focus();
	};

	const handleOutsideClick = (event: MouseEvent) => {
		if (!isLanguageMenuOpen) {
			return;
		}

		const target = event.target as Node;

		if (languageButton?.contains(target) || languageMenu?.contains(target)) {
			return;
		}

		closeLanguageMenu();
	};

	const handleDocumentKeydown = (event: KeyboardEvent) => {
		if (event.key !== 'Escape' || !isLanguageMenuOpen) {
			return;
		}

		event.preventDefault();
		closeLanguageMenu();
		languageButton?.focus();
	};

	const handleLanguageMenuKeydown = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'Escape': {
				event.preventDefault();
				closeLanguageMenu();
				languageButton?.focus();
				break;
			}
			case 'ArrowDown': {
				event.preventDefault();
				focusRelativeLanguageOption(1);
				break;
			}
			case 'ArrowUp': {
				event.preventDefault();
				focusRelativeLanguageOption(-1);
				break;
			}
			case 'Home': {
				event.preventDefault();
				focusBoundaryLanguageOption('first');
				break;
			}
			case 'End': {
				event.preventDefault();
				focusBoundaryLanguageOption('last');
				break;
			}
		}
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
  <link href="https://cdn.jsdelivr.net/gh/sun-typeface/SUIT@2/fonts/static/woff2/SUIT.css" rel="stylesheet">
  <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanskr.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosansjp.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/earlyaccess/notosanssc.css">
  <title>NotEnoughMP</title>
  <style>
    body {
      font-family: 'SUIT', 'Noto Sans KR', 'Noto Sans JP', 'Noto Sans SC', sans-serif;
      margin: 0;
    }
  </style>
</svelte:head>

<div class="navbar">
  <div class="nemp">NEMP</div>
  <div class="nav-right">
    <nav class="menu" aria-label={$t('nav.ariaLabel')}>
      <div class="menu-items">
        <div class="menu-item"><a href="/">{$t('nav.home')}</a></div>
        <div class="menu-item"><a href="/about">{$t('nav.about')}</a></div>
        <div class="menu-item"><a href="/works">{$t('nav.works')}</a></div>
        <div class="menu-item"><a href="/contact">{$t('nav.contact')}</a></div>
      </div>
    </nav>
    <div class="language-dropdown" class:open={isLanguageMenuOpen}>
      <button
        type="button"
        class="language-toggle-button"
        aria-haspopup="listbox"
        aria-expanded={isLanguageMenuOpen}
        aria-controls="language-menu"
        on:click={toggleLanguageMenu}
        bind:this={languageButton}>
        <i class="bi bi-translate" aria-hidden="true"></i>
        <span>{$t(`language.${$locale}`)}</span>
        <i class={`bi ${isLanguageMenuOpen ? 'bi-chevron-up' : 'bi-chevron-down'}`} aria-hidden="true"></i>
      </button>
      {#if isLanguageMenuOpen}
        <ul
          id="language-menu"
          class="language-menu"
          role="listbox"
          aria-label={$t('language.srLabel')}
          aria-activedescendant={`language-option-${$locale}`}
          bind:this={languageMenu}
          on:keydown={handleLanguageMenuKeydown}>
          {#each LANG_OPTIONS as option}
            <li>
              <button
                type="button"
                class="language-option"
                class:active={$locale === option.code}
                role="option"
                aria-selected={$locale === option.code}
                data-option={option.code}
                id={`language-option-${option.code}`}
                on:click={() => handleLanguageChange(option.code)}>
                <span>{$t(`language.${option.code}`)}</span>
                {#if $locale === option.code}
                  <i class="bi bi-check" aria-hidden="true"></i>
                {/if}
              </button>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </div>
</div>
{@render children?.()}
<button
	type="button"
	class="theme-toggle"
	on:click={toggleTheme}
	aria-label={theme === 'dark' ? $t('theme.switchToLight') : $t('theme.switchToDark')}>
	<i class={`bi ${theme === 'dark' ? 'bi-sun-fill' : 'bi-moon-stars-fill'}`} aria-hidden="true"></i>
	<span class="sr-only">{theme === 'dark' ? $t('theme.switchToLight') : $t('theme.switchToDark')}</span>
</button>
<div class="footer">
  &copy; {currentYear} NEMP. {$t('footer.copyright')}
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
    font-family: 'SUIT', 'Noto Sans KR', 'Noto Sans JP', 'Noto Sans SC', sans-serif;
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

  .nav-right {
    display: flex;
    align-items: center;
    gap: 16px;
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

  .menu-item a:hover,
  .menu-item a:focus-visible {
    color: var(--color-accent);
  }

  .language-dropdown {
    position: relative;
  }

  .language-dropdown.open .language-toggle-button {
    border-color: var(--color-accent);
  }

  .language-toggle-button {
    display: flex;
    align-items: center;
    gap: 8px;
    border-radius: 9999px;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    padding: 6px 16px;
    cursor: pointer;
    box-shadow: 0 10px 20px rgba(15, 17, 21, 0.12);
    backdrop-filter: blur(14px);
    transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  }

  .language-toggle-button:hover {
    transform: translateY(-1px);
    border-color: var(--color-accent);
  }

  .language-toggle-button:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .language-toggle-button i:last-child {
    font-size: 0.75rem;
    margin-left: 2px;
  }

  .language-menu {
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 160px;
    margin: 0;
    padding: 8px;
    border-radius: 16px;
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    box-shadow: 0 18px 32px rgba(15, 17, 21, 0.18);
    backdrop-filter: blur(18px);
    list-style: none;
    animation: fade-in 0.15s ease forwards;
    z-index: 1100;
  }

  .language-menu li {
    list-style: none;
  }

  .language-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: none;
    background: transparent;
    padding: 10px 12px;
    border-radius: 12px;
    color: var(--color-text);
    font-size: 0.9rem;
    cursor: pointer;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .language-option:hover,
  .language-option:focus-visible {
    background-color: rgba(0, 0, 0, 0.06);
    color: var(--color-accent);
    outline: none;
  }

  .language-option.active {
    background-color: var(--color-accent);
    color: #ffffff;
  }

  .language-option i {
    font-size: 0.85rem;
    margin-left: 8px;
  }

  .language-option.active i {
    color: inherit;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
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

  @media (max-width: 720px) {
    .navbar {
      flex-direction: column;
      align-items: flex-start;
      gap: 12px;
      padding: 16px;
    }

    .nav-right {
      width: 100%;
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }

    .menu-items {
      justify-content: space-between;
      width: 100%;
    }

    .language-dropdown {
      align-self: flex-end;
    }
  }
</style>
