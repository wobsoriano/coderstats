<script>
  import { onMount } from "svelte";
  import UserInfo from "../components/UserInfo.svelte";
  import Charts from "../components/Charts.svelte";
  import Repos from "../components/Repos.svelte";
  import Footer from "../components/Footer.svelte";
  import GithubError from "../components/GithubError.svelte";
  import GitHub from "github-api";
  import queryString from "query-string";
  import langColors from "../utils/langColors.js";
  const gh = new GitHub();
  let profile = {};
  let repos = [];
  let reposLoading = false;
  let profileLoading = false;
  let githubError = "";
  const queryParams = queryString.parse(location.search);
  const user = gh.getUser(queryParams.name);
  onMount(async () => {
    profileLoading = true;
    reposLoading = true;
    try {
      profile = (await user.getProfile()).data;
      repos = (await user.listRepos({ type: "owner" })).data.map(i => ({
        ...i,
        languageColor: langColors[i.language]
      }));
    } catch (e) {
      if (e.response && e.response.status === 404) {
        githubError = "User not found!";
      } else {
        githubError = "Oh no! Something went wrong. Try again later!";
      }
    }
    profileLoading = false;
    reposLoading = false;
  });
</script>

{#if githubError}
  <GithubError message={githubError} />
{:else}
  <UserInfo {...profile} {profileLoading} />
  <Charts {repos} {reposLoading} />
  <Repos {repos} {reposLoading} />
  <Footer />
{/if}
