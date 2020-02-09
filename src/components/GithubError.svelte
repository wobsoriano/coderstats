<script>
  import { navigate } from "svelte-routing";
  import { link } from "svelte-routing";
  export let message;
</script>

<style>
  .icon {
    font-size: 70px;
    color: #0092ca;
  }

  a,
  a:hover {
    color: #0092ca;
  }
</style>

<section class="hero is-fullheight" style="background: #222831;">
  <div class="hero-body">
    <div class="container has-text-centered">
      <span class="icon">
        <i class="fab fa-github-alt" />
      </span>
      <h1 class="title is-size-2 has-text-white has-margin-top-20">
        {message}
      </h1>
      <h1 class="subtitle is-size-4">
        <a href="/" use:link replace>Back</a>
      </h1>
    </div>
  </div>
</section>
