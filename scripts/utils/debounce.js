export default function debounce(func, delay) {
// function debounce(func, delay) {
  let timeoutId;
  
  return function() {
    const context = this;
    const args = arguments;
    
    clearTimeout(timeoutId);
    
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

// module.exports = debounce;