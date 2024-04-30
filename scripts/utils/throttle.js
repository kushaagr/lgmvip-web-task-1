export default function throttle(func, delay) {
  let throttled = false;
  
  return function() {
    if (!throttled) {
      func.apply(this, arguments);
      throttled = true;
      setTimeout(() => {
        throttled = false;
      }, delay);
    }
  };
}
