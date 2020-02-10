<script>
  import Repo from "./Repo.svelte";
  import RepoSkeleton from "./RepoSkeleton.svelte";
  const limit = 9; // Number of repositories to display
  export let repos = [];
  export let reposLoading;
  $: reposComputed = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, repos.length > limit ? limit : repos.length);
</script>

<section class="section">
  <div class="container">
    <h1 class="title">Top Repos</h1>
    <div class="columns is-multiline">
      {#if reposLoading}
        {#each Array(limit) as _, i}
          <div class="column is-4-desktop is-6-tablet is-12-mobile">
            <RepoSkeleton />
          </div>
        {/each}
      {:else}
        {#each reposComputed as repo (repo.id)}
          <div class="column is-flex is-4-desktop is-6-tablet is-12-mobile">
            <Repo
              name={repo.name}
              description={repo.description}
              language={repo.language}
              stargazersCount={repo.stargazers_count}
              forksCount={repo.forks_count}
              size={repo.size}
              languageColor={repo.languageColor}
              htmlUrl={repo.html_url} />
          </div>
        {/each}
      {/if}
    </div>
  </div>
</section>
