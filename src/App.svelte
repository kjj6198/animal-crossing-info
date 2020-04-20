<script>
  import { fishTableConfig } from './config/fishTableConfig.js';
  import { insectConfig } from './config/insectConfig';
  import { condition } from './config/condition.js';
  import Table from './components/Table.svelte';
  import SearchInput from './components/SearchInput.svelte';
  import Label from './components/Label.svelte';
  import HeadTab from './components/HeadTab.svelte';
  import { loadData } from './utils.js';
  import store from './store.js';

  let search = '';
  let conditions = [];
  let currentTab = 'fish';

  $: $store[currentTab].status === 'LOADED'
    ? $store[currentTab].data
    : loadData(`/data/${currentTab}.json`).then((data) =>
        store.update((store) => ({
          ...store,
          [currentTab]: {
            status: 'LOADED',
            data
          }
        }))
      );

  function handleToggle(e) {
    const { value } = e.detail;
    if (conditions.find((c) => c.value === value)) {
      conditions = conditions.filter((c) => c.value !== value);
    } else {
      conditions = [...conditions, { value, fn: condition[value].execute }];
    }
  }

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
      <p>
        有幫助嗎？歡迎分享或是追蹤我的
        <a href="https://twitter.com/kalanyei">Twitter</a>
      </p>
      <div>
        <SearchInput on:search={handleSearch} />
      </div>
      <HeadTab
        {currentTab}
        on:tabItemClick={(e) => (currentTab = e.detail.tabName)} />
      <span>共 {$store[currentTab].data.length} 筆資料</span>
      <div class="label-wrapper">
        {#each Object.values(condition) as { label, value, execute }}
          <Label
            {label}
            {value}
            on:toggle={handleToggle}
            active={conditions.find((c) => c.value === value)} />
        {/each}
      </div>
    </div>
    {#if $store[currentTab].status === 'LOADED'}
      <Table
        title={currentTab === 'fish' ? '魚類圖鑑' : '昆蟲類圖鑑'}
        config={currentTab === 'fish' ? fishTableConfig : insectConfig}
        data={$store[currentTab].data} />
    {/if}
  </div>
</main>
