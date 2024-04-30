
export function createElement(type, options = {}) {
  /* Source: https://github.com/WebDevSimplified/js-util-functions/blob/main/domUtils/domUtils.js */
  const element = document.createElement(type)
  Object.entries(options).forEach(([key, value]) => {
    if (key === "class") {
      if (Array.isArray(value)) {
        element.classList.add(...value);
      } else {
        element.classList.add(value);
      }
      return;
    }

    if (key === "dataset") {
      Object.entries(value).forEach(([dataKey, dataValue]) => {
        element.dataset[dataKey] = dataValue;
      })
      return;
    }

    if (key === "text") {
      element.textContent = value;
      return;
    }

    element.setAttribute(key, value);
  })
  return element;
}