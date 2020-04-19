<script>
  import { fishTableConfig } from './config/fishTableConfig.js';
  import { condition } from './config/condition.js';
  import Table from './components/Table.svelte';
  import SearchInput from './components/SearchInput.svelte';
  import Label from './components/Label.svelte';
  let search = '';
  let fishes = [];
  let data = fetch('/data/fish.json')
    .then((res) => {
      if (!res.ok) {
        throw Error('error');
      }
      return res;
    })
    .then((res) => res.json())
    .then((res) => {
      fishes = Object.keys(res).map((key) => res[key]);
      return fishes;
    });

  let conditions = [];

  function handleToggle(e) {
    const { value } = e.detail;
    if (conditions.find((c) => c.value === value)) {
      conditions = conditions.filter((c) => c.value !== value);
    } else {
      conditions = [...conditions, { value, fn: condition[value].execute }];
    }
  }

  $: filteredData =
    conditions.length > 0
      ? fishes
          .filter((data) => (search === '' ? true : data.name.includes(search)))
          .filter((data) =>
            conditions.length ? conditions.every((cond) => cond.fn(data)) : true
          )
      : fishes.filter((f) => f.name.includes(search));

  function handleSearch(e) {
    search = e.detail.value;
  }
</script>

<style>
  .container {
    width: 95%;
    max-width: 1280px;
    margin: auto;
  }

  .title {
    margin-top: 1em;
  }

  .banner {
    max-width: 100%;
  }

  @media (min-width: 680px) {
    .banner {
      max-width: auto;
      height: 80px;
    }
  }

  .wrapper {
    text-align: center;
    margin-bottom: 1em;
  }

  :global(.table-image) {
    height: 50px;
  }

  .label-wrapper {
    margin-top: 20px;
    margin-bottom: 20px;
  }
</style>

<main>
  <div class="container">
    <div class="wrapper">
      <img class="banner" src="/images/animal.png" alt="動物森友會" />
      <h2 class="title">情報表</h2>
      <div>
        <SearchInput on:search={handleSearch} />
      </div>

      <div class="label-wrapper">
        {#each Object.values(condition) as { label, value, execute }}
          <Label
            {label}
            {value}
            on:toggle={handleToggle}
            active={conditions.find((c) => c.value === value)} />
        {/each}
      </div>
      <span>共 {filteredData.length} 筆資料</span>
    </div>
    {#await data}
      <p>loading...</p>
    {:then}
      <Table config={fishTableConfig} data={filteredData} />
    {:catch error}
      <p>{error.message}</p>
    {/await}
  </div>
</main>
