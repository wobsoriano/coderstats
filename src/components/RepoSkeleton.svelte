<script>
  import { Skeleton } from "svelte-loading-skeleton";
</script>

<div class="card">
  <div class="card-content">
    <div class="content">
      <h1>
        <Skeleton height="20px" />
      </h1>

      <p>
        <Skeleton height="20px" />
        <Skeleton width="75%" height="20px" />
      </p>

      <div class="columns is-mobile">
        <div class="column">
          <Skeleton height="20px" />
        </div>
        <div class="column">
          <Skeleton height="20px" />
        </div>
      </div>
    </div>
  </div>
</div>
