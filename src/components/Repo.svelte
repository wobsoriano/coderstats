<script>
  export let name = "";
  export let description = "";
  export let language = "";
  export let stargazersCount = 0;
  export let forksCount = 0;
  export let size = 0;
  export let languageColor = "";
  export let htmlUrl = "";

  function handleClick(url) {
    const win = window.open(url, "_blank");
    win.focus();
  }
</script>

<style>
  .card {
    position: relative;
    padding-bottom: 45px;
  }

  .repo-stats {
    position: absolute;
    bottom: 0px;
    height: 45px;
  }
</style>

<div
  class="card is-full-width has-cursor-pointer"
  on:click|preventDefault={() => handleClick(htmlUrl)}>
  <div class="card-content">
    <div class="content">
      <h1 class="title is-5">{name}</h1>

      {#if description}
        <p>{description}</p>
      {/if}
      <div class="repo-stats">
        <div class="is-pulled-left is-size-7">
          <span
            class="icon is-inline-block is-small"
            style="color: {languageColor};">
            <i class="fa fa-circle" />
          </span>
          <span class="has-margin-right-10">
            {#if language}{language}{:else}Unknown{/if}
          </span>
          <span class="icon is-inline-block is-small">
            <i class="fa fa-star" />
          </span>
          <span class="has-margin-right-10">{stargazersCount}</span>
          <span class="icon is-inline-block is-small">
            <i class="fa fa-code-branch" />
          </span>
          <span>{forksCount}</span>
        </div>
        <div class="is-pulled-right is-size-7">
          <span>{size} KB</span>
        </div>
        <div class="is-clearfix" />
      </div>
    </div>
  </div>
</div>
