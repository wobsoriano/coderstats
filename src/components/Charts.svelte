<script>
  import { afterUpdate } from "svelte";
  import ApexCharts from "apexcharts";
  import languageColors from "../language_colors.json";
  export let repos = [];
  export let reposLoading;

  function createTopLanguagesChart() {
    if (!repos.length) return;
    const options = {
      chart: {
        type: "pie"
      },
      series: [],
      labels: [],
      colors: []
    };

    repos
      .filter(i => i.language)
      .forEach(repo => {
        const idx = options.labels.indexOf(repo.language);
        if (idx !== -1) {
          options.series[idx]++;
        } else {
          options.labels.push(repo.language);
          options.series.push(1);
          options.colors.push(repo.languageColor);
        }
      });

    const chart = new ApexCharts(
      document.getElementById("top-languages"),
      options
    );
    chart.render();
  }

  function createMostStarredChart() {
    if (!repos.length) return;
    const mostStarred = repos.sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    const options = {
      chart: {
        type: "bar"
      },
      series: [
        {
          name: "most starred",
          data: mostStarred.map(i => i.stargazers_count).slice(0, 5)
        }
      ],
      xaxis: {
        categories: mostStarred.map(i => i.name).slice(0, 5)
      }
    };
    const chart = new ApexCharts(
      document.getElementById("most-starred"),
      options
    );
    chart.render();
  }

  function createStarsPerLanguageChart() {
    if (!repos.length) return;

    const languages = [];

    repos
      .filter(i => i.language)
      .forEach(repo => {
        const idx = languages.findIndex(i => i.lang === repo.language);
        if (idx !== -1) {
          languages[idx].stars += repo.stargazers_count;
        } else {
          languages.push({
            lang: repo.language,
            stars: repo.stargazers_count,
            color: repo.languageColor
          });
        }
      });

    const sorted = languages.sort((a, b) => b.stars - a.stars);

    const options = {
      chart: {
        type: "donut"
      },
      series: sorted.map(i => i.stars),
      labels: sorted.map(i => i.lang),
      colors: sorted.map(i => i.color)
    };

    const chart = new ApexCharts(
      document.getElementById("stars-per-language"),
      options
    );
    chart.render();
  }

  function createCharts() {
    createTopLanguagesChart();
    createMostStarredChart();
    createStarsPerLanguageChart();
  }

  afterUpdate(createCharts);
</script>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column is-flex">
        <div class="card is-full-width">
          <div class="card-content">
            <div class="content">
              <h1 class="title is-4">Top Languages</h1>
              {#if reposLoading}
                Please wait...
              {:else}
                <div id="top-languages" />
              {/if}
            </div>
          </div>
        </div>
      </div>
      <div class="column is-flex">
        <div class="card is-full-width">
          <div class="card-content">
            <div class="content">
              <h1 class="title is-4">Most Starred</h1>
              {#if reposLoading}
                Please wait...
              {:else}
                <div id="most-starred" />
              {/if}
            </div>
          </div>
        </div>
      </div>
      <div class="column is-flex">
        <div class="card is-full-width">
          <div class="card-content">
            <div class="content">
              <h1 class="title is-4">Stars per Language</h1>
              {#if reposLoading}
                Please wait...
              {:else}
                <div id="stars-per-language" />
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
