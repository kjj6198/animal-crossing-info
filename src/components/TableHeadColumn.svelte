<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  export let name;
  export let align;
  export let sortable;
  export let onSortBtnClick;
  export let field;
  let currentSortType = null;

  function nextState(sortType) {
    if (sortType === null) {
      return 'asc';
    } else if (sortType === 'asc') {
      return 'desc';
    } else if (sortType === 'desc') {
      return null;
    }
  }

  function handleSortClick(sortType) {
    return function handle(e) {
      if (currentSortType === sortType) {
        return;
      }

      currentSortType = sortType;
      dispatch('sort', {
        sortType: currentSortType,
        field
      });
    };
  }

  function getClassNames() {
    if (sortable) {
      return `sortable align-${align}`;
    } else if (align) {
      return `align-${align}`;
    }

    return '';
  }

  $: className = getClassNames();
</script>

<style>
  td,
  th {
    font-size: 18px;
    color: #424242;
    position: relative;
    padding: 12px 9px;
    line-height: 1.67;
  }

  .align-right {
    text-align: right;
  }

  .align-left {
    text-align: left;
  }

  .align-center {
    text-align: center;
  }

  .sortable {
    cursor: pointer;
  }
</style>

<th
  data-field={field}
  class={className}
  on:click={handleSortClick(nextState(currentSortType))}>
  {name}
  {#if sortable}
    {#if !currentSortType}
      <span>▲</span>
      <span>▼</span>
    {:else if currentSortType === 'asc'}
      <span>▲</span>
    {:else if currentSortType === 'desc'}
      <span>▼</span>
    {/if}
  {/if}
</th>
