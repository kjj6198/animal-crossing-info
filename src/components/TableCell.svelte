<script>
  export let type;
  export let data;
  export let field;
  export let formatter;
  export let accessor;
  export let align;
  export let hideMobile;
</script>

<style>
  @media (max-width: 680px) {
    .hideMobile {
      display: none;
    }
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

  .currency {
    font-family: 'Helvetica Neue';
  }

  td,
  th {
    position: relative;
    padding: 12px 9px;
    line-height: 1.67;
  }
</style>

<td class={`align-${align} ${type || ''}`} class:hideMobile>
  {#if formatter && accessor}
    {@html formatter(accessor(data))}
  {:else if formatter}
    {@html formatter(data[field])}
  {:else if type === 'image'}
    <img src={`/images${data[field]}`} class="table-image" alt="icon" />
  {:else if type === 'text'}{data[field]}{/if}
</td>
