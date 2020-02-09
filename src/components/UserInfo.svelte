<script>
  import { format, parseISO } from "date-fns";
  import { Skeleton } from "svelte-loading-skeleton";
  import Navbar from "./Navbar.svelte";
  export let public_repos = 0;
  export let followers = 0;
  export let following = 0;
  export let avatar_url = "";
  export let login = "";
  export let name = "";
  export let location = "";
  export let created_at = "";
  export let profileLoading;
  export let html_url = "";
  $: createdAt = created_at ? format(parseISO(created_at), "MMMM d, yyyy") : "";
</script>

<style>
  .username,
  .username:hover {
    color: #0092ca;
  }

  .stats {
    display: grid;
    grid-gap: 0.5rem;
    grid-template-columns: repeat(3, minmax(100px, 150px));
    justify-content: center;
  }

  .stats .stats__item {
    flex-direction: column;
    padding: 1rem;
    border-radius: 0.25rem;
    background: #393e46;
  }

  .avatar {
    border: 0.5rem solid #0092ca;
    border-radius: 100%;
    width: 150px;
    height: 150px;
  }

  .hero {
    background: #222831;
  }
</style>

<section class="hero">
  <div class="hero-head">
    <Navbar />
  </div>
  <div class="hero-body">
    <div class="container has-text-centered">
      {#if profileLoading}
        <h1 class="is-size-2 has-text-white">Loading...</h1>
      {:else}
        {#if avatar_url}
          <img class="avatar" src={avatar_url} alt="avatar" />
        {:else}
          <img
            class="avatar"
            src="https://robohash.org/robert.png"
            alt="avatar" />
        {/if}
        {#if name}
          <h1 class="is-size-2 has-text-white has-margin-top-20">{name}</h1>
        {/if}
        <h1 class="is-size-4 has-margin-bottom-15">
          <a href={html_url} target="_BLANK" class="username">@{login}</a>
        </h1>
        <div class="has-text-grey-light has-margin-bottom-30">
          {#if location}
            <span class="icon is-inline-block is-small">
              <i class="fa fa-map-marker-alt" />
            </span>
            <span class="has-margin-right-30">{location}</span>
          {/if}
          <span class="icon is-inline-block is-small">
            <i class="fa fa-calendar-alt" />
          </span>
          <span>Joined {createdAt}</span>
        </div>
        <div class="stats">
          <div class="stats__item">
            <span class="has-text-white is-size-4-desktop">{public_repos}</span>
            <br />
            <span class="has-text-grey is-size-7-mobile">Repositories</span>
          </div>
          <div class="stats__item">
            <span class="has-text-white is-size-4-desktop">{followers}</span>
            <br />
            <span class="has-text-grey is-size-7-mobile">Followers</span>
          </div>
          <div class="stats__item">
            <span class="has-text-white is-size-4-desktop">{following}</span>
            <br />
            <span class="has-text-grey is-size-7-mobile">Following</span>
          </div>
        </div>
      {/if}
    </div>
  </div>
</section>
