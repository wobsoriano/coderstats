<script>
  import { afterUpdate } from "svelte";
  import Chart from "chart.js/dist/Chart.js";
  import { randomColor } from "../utils";
  import langColors from "../utils/langColors.js";
  export let repos = [];
  export let reposLoading;

  function createTopLanguagesChart() {
    if (!repos.length) return;
    const ctx = document.getElementById("top-languages").getContext("2d");
    const opts = {
      type: "pie",
      responsive: true,
      maintainAspectRatio: false,
      data: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ]
      },
      options: {
        legend: {
          position: "right"
        }
      }
    };

    repos
      .filter(i => i.language)
      .forEach(repo => {
        const idx = opts.data.labels.indexOf(repo.language);
        if (idx !== -1) {
          opts.data.datasets[0].data[idx]++;
        } else {
          opts.data.labels.push(repo.language);
          opts.data.datasets[0].data.push(1);
          opts.data.datasets[0].backgroundColor.push(repo.languageColor);
        }
      });

    const chart = new Chart(ctx, opts);
  }

  function createMostStarredChart() {
    if (!repos.length) return;
    const ctx = document.getElementById("most-starred").getContext("2d");
    const mostStarred = repos.sort(
      (a, b) => b.stargazers_count - a.stargazers_count
    );
    const opts = {
      type: "bar",
      responsive: true,
      maintainAspectRatio: false,
      data: {
        labels: mostStarred.map(i => i.name).slice(0, 5),
        datasets: [
          {
            label: "Most Starred",
            data: mostStarred.map(i => i.stargazers_count).slice(0, 5),
            backgroundColor: [...Array(5)].map(i => randomColor())
          }
        ]
      },
      options: {
        legend: {
          display: false
        }
      }
    };
    new Chart(ctx, opts);
  }

  function createStarsPerLanguageChart() {
    if (!repos.length) return;

    const ctx = document.getElementById("stars-per-language").getContext("2d");

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
    const opts = {
      type: "doughnut",
      responsive: true,
      maintainAspectRatio: false,
      data: {
        labels: sorted.map(i => i.lang),
        datasets: [
          {
            data: sorted.map(i => i.stars),
            backgroundColor: sorted.map(i => i.color)
          }
        ]
      },
      options: {
        legend: {
          position: "right"
        }
      }
    };

    const chart = new Chart(ctx, opts);
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
                <canvas id="top-languages" height="260" />
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
                <canvas id="most-starred" height="260" />
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
                <canvas id="stars-per-language" height="260" />
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
