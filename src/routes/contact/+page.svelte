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
      console.log(error);
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
    max-width: var(--page-width);
    margin: 2rem auto;
  }

  .title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .field {
    margin-bottom: 1rem;
  }

  label div {
    margin-bottom: 0.5rem;
    font-weight: bold;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }

  textarea {
    height: 150px;
    resize: vertical;
  }

  button {
    display: block;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    padding: 0.75rem;
    background-color: lightgrey;
    color: black;
  }
</style>
