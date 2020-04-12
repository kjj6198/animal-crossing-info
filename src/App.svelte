<script>
  import { fishTableConfig } from './config/fishTableConfig.js';
  import Table from './components/Table.svelte';
  export let name;

  let data = fetch('/data/fish.json')
    .then((res) => {
      if (!res.ok) {
        throw Error('error');
      }
      return res;
    })
    .then((res) => res.json())
    .then((res) => {
      return Object.keys(res).map((key) => res[key]);
    });
</script>

<style>
  .container {
    width: 1280px;
    margin: auto;
  }

  .title {
    margin-top: 1em;
  }

  .banner {
    height: 80px;
  }

  .wrapper {
    text-align: center;
    margin-bottom: 1em;
  }
</style>

<main>
  <div class="container">
    <div class="wrapper">
      <img class="banner" src="/images/animal.png" alt="動物森友會" />
      <h2 class="title">情報表</h2>
    </div>
    {#await data}
      <p>...waiting</p>
    {:then fish}

      <Table config={fishTableConfig} data={Object.values(fish)} />

    {:catch error}
      <p>{error.message}</p>
    {/await}
  </div>
</main>
