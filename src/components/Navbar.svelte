<script>
  import { link } from "svelte-routing";
  let isActive = false;
</script>

<style>
  .navbar-menu {
    background: #393e46;
    color: #fff;
  }
</style>

<nav class="navbar is-transparent">
  <div class="container">
    <div class="navbar-brand">
      <a
        use:link
        href="/"
        class="navbar-item has-text-white is-size-5-mobile is-size
        is-size-4-tablet has-text-grey-light">
        Coderstats
      </a>
      <span
        class="navbar-burger burger {isActive ? 'is-active' : ''}"
        data-target="navbarMenuHero"
        on:click={() => (isActive = !isActive)}>
        <span />
        <span />
        <span />
      </span>
    </div>
    <div id="navbarMenuHero" class="navbar-menu {isActive ? 'is-active' : ''}">
      <div class="navbar-end">
        <a use:link href="/" class="navbar-item has-text-grey-light">Home</a>
        <a
          href="https://github.com/sorxrob/coderstats"
          target="_BLANK"
          class="navbar-item has-text-grey-light">
          Github
        </a>
      </div>
    </div>
  </div>
</nav>
