<script>
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let isOnComposition = false;

  const handleComposition = (e) => {
    if (e.type === 'compositionend') {
      isOnComposition = false;
    } else {
      isOnComposition = true;
    }
  };

  function debounce(fn, delay) {
    let timer;

    return function() {
      let context = this;
      let args = arguments;

      clearTimeout(timer);

      timer = setTimeout(function() {
        fn.apply(context, args);
      }, delay);
    };
  }

  function handleInput(e) {
    const dispatchDebounce = debounce(dispatch, 2500);

    dispatchDebounce('search', {
      value: e.target.value
    });
  }
</script>

<style>
  input {
    color: #424242;
    outline: none;
    border: 0;
  }
  .search {
    width: 350px;
    padding: 12px 20px;
    font-size: 18px;
    background-color: #fff;
    box-shadow: 0 1px 8px rgba(114, 114, 114, 0.5);
    border-radius: 3px;
  }

  .search::placeholder {
    color: #797979;
    opacity: 0.7;
  }
</style>

<input
  on:input={handleInput}
  on:compositionstart={handleComposition}
  on:compositionend={handleComposition}
  placeholder="輸入關鍵字搜尋"
  class="search"
  type="search" />
