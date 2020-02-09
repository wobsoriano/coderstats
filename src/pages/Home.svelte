<script>
  import { navigate } from "svelte-routing";
  import { onMount } from "svelte";

  let username = "";
  const handleSubmit = e => {
    e.preventDefault();
    if (!username) return;

    navigate(`/user?name=${username}`);
  };

  onMount(() => {
    document.getElementById("search").focus();
  });
</script>

<style>
  #search {
    background-color: #393e46;
    outline: 0;
    border: 0;
    border-radius: 0.25rem;
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    padding: 1rem;
    font-size: 2rem;
    font-weight: 400;
    text-align: center;
  }

  .icon {
    font-size: 70px;
    color: #0092ca;
  }
</style>

<section class="hero is-fullheight" style="background: #222831;">
  <div class="hero-body">
    <div class="container has-text-centered">
      <span class="icon">
        <i class="fab fa-github-alt" />
      </span>
      <h1 class="title is-2 has-text-white has-margin-top-20">
        Enter Github Username
      </h1>
      <form on:submit|preventDefault={handleSubmit}>
        <input
          id="search"
          bind:value={username}
          class="has-text-grey-light has-margin-top-5"
          type="text" />
      </form>
    </div>
  </div>
</section>
