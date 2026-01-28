<script lang="ts">
  import Header from "../Header.svelte";
  import emailjs from "@emailjs/browser";
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { t } from "$lib/i18n";

  const PUBLIC_KEY = "CAFvgQTgbDLMJh9rW";

  onMount(() => {
    emailjs.init(PUBLIC_KEY);

  });

  const SERVICE_ID = "NEMP.me";
  const TEMPLATE_ID = "NotEnoughMP08_Mail";

  async function handleSubmit(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const translate = get(t);

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form);
      alert(String(translate("contact.success")));
      form.reset();
    } catch (error) {
      alert(String(translate("contact.error")));
    }
  }
</script>

<Header />

<div class="container">
  <div class="title">{$t("contact.title")}</div>
  <form id="contact-form" name="contact-form" onsubmit={handleSubmit}>
    <div class="field">
      <label for="name">
        <div>{$t("contact.name")}</div>
      </label>
      <input type="text" id="name" name="name" required />
    </div>
    <div class="field">
      <label for="email">
        <div>{$t("contact.email")}</div>
      </label>
      <input type="email" id="email" name="email" required />
    </div>
    <div class="field">
      <label for="message">
        <div>{$t("contact.message")}</div>
      </label>
      <textarea id="message" name="message" required></textarea>
    </div>
    <button type="submit">{$t("contact.submit")}</button>
  </form>
</div>

<style>
  .container {
    max-width: 720px;
    margin: 3rem auto;
    padding: 0 20px;
    text-align: center;
  }

  .title {
    font-size: 2.2rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    letter-spacing: 0.02em;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    text-align: left;
    margin: 0 auto;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label div {
    font-weight: 600;
    font-size: 0.95rem;
    color: var(--color-text);
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--color-border);
    border-radius: 12px;
    font-size: 1rem;
    background-color: var(--color-surface);
    color: var(--color-text);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 3px rgba(90, 67, 38, 0.15);
  }

  textarea {
    min-height: 160px;
    resize: vertical;
  }

  button {
    align-self: center;
    width: min(220px, 100%);
    border: none;
    border-radius: 999px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    padding: 0.9rem 1.75rem;
    background-color: var(--color-accent);
    color: #ffffff;
    box-shadow: 0 8px 16px rgba(90, 67, 38, 0.18);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
  }

  button:hover,
  button:focus-visible {
    background-color: rgba(90, 67, 38, 0.9);
    transform: translateY(-1px);
    box-shadow: 0 10px 20px rgba(90, 67, 38, 0.22);
  }

  button:active {
    transform: translateY(0);
    box-shadow: 0 6px 12px rgba(90, 67, 38, 0.16);
  }
</style>
