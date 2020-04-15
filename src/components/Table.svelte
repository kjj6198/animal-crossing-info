<script>
  import { fade } from 'svelte/transition';
  import TableHeadColumn from './TableHeadColumn.svelte';
  import TableCell from './TableCell.svelte';
  import { tick } from 'svelte';
  export let config;
  export let data;
  export let title;
  let sortType = null;
  $: tableHeads = Object.keys(config);
  const originalData = data.slice();
  let sortedData = null;

  async function handleSort(e) {
    const field = e.detail.field;
    sortType = e.detail.sortType;
    await tick();
    const comparator = config[field].comparator;

    if (comparator) {
      const accessor =
        config[field].accessor ||
        function accessor(d) {
          return d[field];
        };

      if (sortType === 'asc') {
        sortedData = originalData.sort((a, b) =>
          comparator(accessor(a), accessor(b))
        );
      } else if (sortType === 'desc') {
        sortedData = originalData.sort((a, b) =>
          comparator(accessor(b), accessor(a))
        );
      } else {
        sortType = null;
        sortedData = null;
      }
    }
  }
</script>

<style>
  .thead {
    padding: 20px 0;
    background-color: #f2f2f2;
  }

  .caption {
    caption-side: top;
    padding: 12px;
    text-align: center;
    background-color: #fff;
  }

  .table {
    table-layout: fixed;
    position: relative;
    min-width: 100%;
    margin-left: auto;
    margin-right: auto;
    font-variant-numeric: lining-nums tabular-nums;
    border-collapse: collapse;
    background-color: #fff;
  }
</style>

<table class="table">
  {#if title}
    <caption class="caption">
      <h2>{title}</h2>
    </caption>
  {/if}
  <thead class="thead">
    <tr>
      {#each tableHeads as head}
        <TableHeadColumn
          on:sort={handleSort}
          sortable={config[head].sortable}
          field={head}
          name={config[head].name}
          align={config[head].align} />
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each sortedData || data as item, i}
      <tr transition:fade={{ delay: 200 + i * 30, duration: 200 }}>
        {#each Object.keys(config) as itemKey}
          <TableCell
            type={config[itemKey].type}
            data={item}
            formatter={config[itemKey].formatter}
            accessor={config[itemKey].accessor}
            align={config[itemKey].align || 'left'}
            field={itemKey} />
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
