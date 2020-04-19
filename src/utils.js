function delay(func, wait, ...args) {
  return setTimeout(function delayFn() {
    return func.apply(null, args);
  }, wait);
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
