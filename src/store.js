import { writable } from 'svelte/store';

const store = writable({
  fish: {
    status: 'LOADING',
    data: [],
  },
  insect: {
    status: 'LOADING',
    data: [],
  },
});

export default store;
