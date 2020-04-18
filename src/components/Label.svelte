<script>
  import { createEventDispatcher } from 'svelte';
  export let label;
  export let value;
  export let active;

  const dispatch = createEventDispatcher();
  function handleClick() {
    dispatch('toggle', {
      value
    });
  }
</script>

<style>
  .button {
    display: inline-block;
    outline: none;
    border: 0;
    -webkit-appearance: none;
    background-color: transparent;
    padding-bottom: 4px;
  }

  .button.active {
    font-weight: bold;
    border-bottom: 2px solid #06b8ab;
  }

  .button:not(last-child) {
    margin-right: 7px;
  }
</style>

<button class="button" class:active on:click={handleClick}>{label}</button>
