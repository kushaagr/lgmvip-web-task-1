import { getFormattedDate } from './utils/dateutils.js';
import { createElement } from './utils/domutil.js';
import { setActive } from "./utils/misc.js";
import { createItem, getList, saveList } from './utils/storeutils.js';
// const { setActive } = require("./utils/misc.js");

const addTagsDialog = document.getElementById("addTagsDialog");
const newItemModal = document.getElementById("newItemModal");
const root = document.getElementById("root");

// console.log(newItemModal, addTagsDialog);



// Custom comparator function to sort items by their --displayOrder property
const sortByDisplayOrder = (itemA, itemB) => {
  const orderA = parseInt(window.getComputedStyle(itemA).getPropertyValue("--displayOrder"));
  const orderB = parseInt(window.getComputedStyle(itemB).getPropertyValue("--displayOrder"));
  
  return orderA - orderB;
}

function swapUp() {
  const active = document.getElementsByClassName("active")[0];
  if (!active) {
    return;
  }

  const datec = getFormattedDate(active.getAttribute("data-datec"));
  const items = Array.from(document.querySelectorAll(`article[data-datec="${datec}"] > .title-date`));
  items.sort(sortByDisplayOrder);
  let prevItem = null;
  for (const item of items) {
    if (item == active) {
      if (prevItem) {
        console.log("Performing swap");
        const temp = prevItem.style.getPropertyValue("--displayOrder");
        prevItem.style.setProperty("--displayOrder", item.style.getPropertyValue("--displayOrder"));
        item.style.setProperty("--displayOrder", temp);
      }
    }
    prevItem = item;
  }
  saveList()
}


function swapDown() {
  const active = document.getElementsByClassName("active")[0];
  if (!active) {
    return;
  }

  const datec = getFormattedDate(active.getAttribute("data-datec"));
  const items = Array.from(document.querySelectorAll(`article[data-datec="${datec}"] > .title-date`));
  items.sort(sortByDisplayOrder);
  let prevItem = null;
  for (const item of items) {
    if (item == active) {
      prevItem = item;
      continue;
    }
    if (prevItem) {
        console.log("Performing swap");
        const temp = prevItem.style.getPropertyValue("--displayOrder");
        prevItem.style.setProperty("--displayOrder", item.style.getPropertyValue("--displayOrder"));
        item.style.setProperty("--displayOrder", temp);
        prevItem = null;
    }
  }
  saveList();
}

function deleteAnItem() {

  const active = document.getElementsByClassName("active")[0];
  if (!active) {
    return;
  }
  app_state.deletedItems.push(active.cloneNode(true));
  active.remove();
  const item = document.querySelector(".title-date")
  if (item) {
    // item.classList.add("active");
    setActive(item);
  }
  saveList();
}

function undoDelete() {
  if (app_state.deletedItems.length < 1) {
    return;
  }
  const section = app_state.deletedItems.pop();
  // document.getElementById("todoContainer").appendChild(section);
  const datec = section.getAttribute("data-datec");
  const container = document.querySelector(`article[data-datec="${datec}"]`);
  container.appendChild(section);
  setActive(section);
  section.addEventListener('click', (e) => {setActive(e.currentTarget)});
  section.querySelector(".completed-toggle").addEventListener('change', (e) => {saveList()});
  section.querySelector(".signifier").addEventListener('change', (e) => {saveList()});

  saveList();
}

document.getElementById("swapUpButton").addEventListener('click', swapUp);
document.getElementById("swapDownButton").addEventListener('click', swapDown);
document.getElementById("deleteItem").addEventListener('click', deleteAnItem);
document.getElementById("undoDelete").addEventListener('click', undoDelete);

for (const el of document.getElementsByClassName(".completed-toggle")) {
  el.addEventListener('change', (e) => {saveList()});
}
for (const el of document.getElementsByClassName(".signifier")) {
  el.addEventListener('change', (e) => {saveList()});
}

function addToActiveClass() {
  const activeEl = document.getElementsByClassName("active")[0];
  if (!activeEl) {
    return;
  }
  const pills = document.querySelectorAll("#modalPillContainer > .pill");
  // const itemPillContainer = document.getElementById("itemPillContainer");
  for (const pill of pills) {
    const newPill = pill.cloneNode(true);
    newPill.classList.remove("pillx");
    // itemPillContainer.appendChild(newPill);
    activeEl.getElementsByClassName("pill-container")[0].appendChild(newPill);
  }
  saveList();
}

document.getElementById("addTagsForm").addEventListener('submit', addToActiveClass);

const keybindings = {
  'T': showModal(addTagsDialog),
  'N': showModal(newItemModal),
  'Q': deleteAnItem,
  'Z': undoDelete,
  'W': swapUp,
  'S': swapDown
}

function showModal(modal) {
  return () => modal.showModal();
}

document.body.addEventListener("keyup", (event) => {
  if (event.key in keybindings) {
    keybindings[event.key]();
  }
}) 



addTagsDialog.addEventListener("close", function (e) {
  document.getElementById("pillCreator").value = '';
  document.getElementById("modalPillContainer").textContent = '';
})
newItemModal.addEventListener("close", function (e) {
  document.getElementById("todoItem").value = '';
})
// addTagsDialog.ael.bind(this)()

// addTagsDialog.addEventListener("click", function(e){sensitiveBackdrop(this, e)});
// newItemModal.addEventListener("click", function(e){sensitiveBackdrop(this, e)});


const dialogBoxes = document.getElementsByTagName("dialog");
for (const dlgBox of dialogBoxes) {
  dlgBox.addEventListener("click", function(e) { sensitiveBackdrop(this, e) });
  dlgBox.addEventListener("keyup", function(e) { e.stopPropagation(); });
}
// console.log("dlg", dialogBoxes);


function sensitiveBackdrop(dialog, event) {
  const rect = dialog.getBoundingClientRect();
  const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
  if (!isInDialog) {
    dialog.close();
  }
}

const TodoBuckets = Array.from(document.getElementsByClassName('title-date'));
TodoBuckets.forEach(bucket => {
  bucket.addEventListener('click', e => {
    // console.log("click");
    TodoBuckets.forEach(bucket => bucket.classList.remove('active'));
    // console.log(e.currentTarget);
    // console.log(e.currentTarget.classList);
    e.currentTarget.classList.add('active');
    // console.log(e.currentTarget.classList);
  })
});

document.addEventListener("DOMContentLoaded", ev => {
  const items = getList();
  for (const item of items) {
    createItem(item);
  }
})



// const submitButtons = Array.from(document.querySelectorAll("button[type=submit]"));
// submitButtons.addEventListener("submit", )

// const forms = document.getElementsByTagName('form');
// for (const form of forms) {
//   form.addEventListener("submit", e => {console.log("Submit happened");});
// }
// console.log(forms);

