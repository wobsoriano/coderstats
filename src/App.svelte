<script>
  import "node_modules/bulma/css/bulma.min.css";
  import "node_modules/bulma-helpers/css/bulma-helpers.min.css";
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./pages/Home.svelte";
  import User from "./pages/User.svelte";

  export let url = "";
</script>

<Router {url}>
  <Route path="user" component={User} />
  <Route path="/" component={Home} />
</Router>
