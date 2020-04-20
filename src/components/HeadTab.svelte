<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let currentTab = '魚類';
  function handleTabClick(tabName) {
    currentTab = tabName;
    dispatch('tabItemClick', {
      tabName
    });
  }
</script>

<style>
  .container {
    margin: 20px 0;
  }

  button {
    border: 0;
    -webkit-appearance: none;
    padding: 8px;
    background-color: transparent;
  }

  button.active {
    background-color: #f3ebbd;
  }

  img {
    width: 30px;
  }
</style>

<svelte:head>
  <title>動物森友會情報表 | {currentTab === 'fish' ? '魚類' : '昆蟲類'}</title>
</svelte:head>

<div class="container">
  <button
    class:active={currentTab === 'fish'}
    on:click={() => handleTabClick('fish')}>
    <img alt="魚類" src="/images/fish-logo.png" />
    魚類
  </button>
  <button
    class:active={currentTab === 'insect'}
    on:click={() => handleTabClick('insect')}>
    <img alt="昆蟲類" src="/images/insect-logo.png" />
    昆蟲類
  </button>

</div>
