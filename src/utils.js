function delay(func, wait, ...args) {
  return setTimeout(function delayFn() {
    return func.apply(null, args);
  }, wait);
}

export function loadData(path) {
  return fetch(path)
    .then(function convertToJSON(res) {
      if (!res.ok) {
        throw new Error('error');
      }

      return res.json();
    })
    .then(function convertToArray(res) {
      const result = Object.keys(res).map((key) => res[key]);
      return result;
    });
}

export function debounce(func, wait, immediate) {
  let timeout;

  const later = function (...args) {
    timeout = null;
    if (args) func.apply(null, args);
  };

  const debounced = function (...args) {
    if (timeout) clearTimeout(timeout);

    timeout = delay(later, wait, ...args);
  };

  return debounced;
}

const NUMBER_REG = /(\d)(?=(\d{3})+(?!\d))/g;
const DELIMITER = ',';

export function formatNumber(num, delimiter = DELIMITER) {
  const str = String(num);

  return str.replace(NUMBER_REG, `$1${delimiter}`);
}

export function priceComparator(a, b) {
  return b - a;
}
