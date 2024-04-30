
function setActive(el) {
  console.log("running setActive()")
  for (const child of document.getElementsByClassName('active')) {
    child.classList.remove('active');
    // console.log(child, child.classList);
  }
  el.classList.add("active");
}

export { setActive };
// module.exports.setActive = setActive;