<script>
  import Header from "../Header.svelte";
  import emailjs from "@emailjs/browser";
  import { onMount } from "svelte";

  onMount(() => {
    emailjs.init("H3EbxQzX4r43xALBg");

  });

  const SERVICE_ID = "nemp-me";
  const TEMPLATE_ID = "template_nemp_me";

  function handleSubmit(event) {
    event.preventDefault();

    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, event.target)
      .then(
        (result) => {
          alert("이메일이 전송되었습니다!");
          event.target.reset();
        },
        (error) => {
          alert("이메일 전송에 실패했습니다. 다시 시도해주세요.");
          console.log(error);
        }
      );
  }
</script>

<Header />

<div class="container">
  <div class="title">Contact</div>
  <form id="contact-form" name="contact-form" onsubmit={handleSubmit}>
    <div class="field">
      <label for="name">
        <div>Name:</div>
      </label>
      <input type="text" id="name" name="name" required />
    </div>
    <div class="field">
      <label for="email">
        <div>Email:</div>
      </label>
      <input type="email" id="email" name="email" required />
    </div>
    <div class="field">
      <label for="message">
        <div>Message:</div>
      </label>
      <textarea id="message" name="message" required></textarea>
    </div>
    <button type="submit">Submit</button>
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
