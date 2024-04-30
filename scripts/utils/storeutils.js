import debounce from "./debounce.js";
import { createElement } from "./domutil.js";
import { getFormattedDate, getFormattedTime } from "./dateutils.js";
import { setActive } from "/scripts/utils/misc.js";

function saveToLS() {
    console.log("Writing to store...");

    const items = document.querySelectorAll(".title-date");
    const allItems = [];
    for (const item of items) { 
        const datec = item.getAttribute("data-datec");
        const timec = item.getAttribute("data-timec");
        const textContent = item.getElementsByClassName("text")[0].textContent;
        const pills = item.querySelectorAll(".pill-container > .pill");
        const checkbox = item.getElementsByTagName("input")[0].checked;
        const signifier = item.getElementsByTagName("select")[0].value;
        const disorder = item.style.getPropertyValue("--displayOrder");

        const utcDate = new Date(`${datec} ${timec}`);
        console.log({datec, timec, utcDate});

        const anItem = {
            utcDate,
            /* unixTime would be useful for sorting */
            unixTime: utcDate.getTime(), /* Number(utcDate) would also work.. */
            textContent: textContent.trim(),
            pills: Array.from(pills).map(pill => pill.textContent),
            checkbox,
            signifier,
            flexOrder: disorder
        }

        allItems.push(anItem);
    }
    

    localStorage.setItem('allItems', JSON.stringify(allItems));
    console.log("Writing to store...done");

}

function getFromLS() {
    console.log("Store access requested..");
    const allItems = JSON.parse(
        localStorage.getItem('allItems')
    );
    /* Note: Array is sorted in descending order and so whening
    creating new sections from this array, sections should be 
    appended to document rather than prepend, this is so optimize
    on performance. */
    allItems.sort((a, b) => b.unixTime - a.unixTime);
    console.log(allItems);
    return allItems;
}

function createItem(item) {
    const todoItemValue = item.textContent;
    console.log({item}, item.textContent, todoItemValue);

    const pillsHtml = item.pills?.map(pilltext => `<div class="pill">${pilltext}</div>`).join("") ?? "";
    console.log(pillsHtml);


    const dt = new Date(item.utcDate);
    const section = createElement("section", {
        "data-datec": getFormattedDate(dt),
        "date-timec": getFormattedTime(dt),
        // "class": ["title-date", "active"]
        class: ["title-date"]
    });

    section.innerHTML = /* html */ `
    <div class="stack">
        <div id="itemPillContainer" class="tags pill-container">${pillsHtml}</div>
        <div class="content">
            <input
                type="checkbox"
                name="mark-completed"
                id="completed-hint-tag"
                class="completed-toggle"
                ${item.checkbox === true ? "checked" : ""}
            />
            <select name="signifier" id="" class="signifier">
                <option ${item.signifier === "todo" ? "selected" : ""} value="todo">➔</option>
                <option ${item.signifier === "log" ? "selected" : ""} value="log">≋</option>
                <option ${item.signifier === "anything" ? "selected" : ""} value="anything">🞲</option>
                <option ${item.signifier === "quote" ? "selected" : ""} value="quote">❝</option>
                <option ${item.signifier === "diamond" ? "selected" : ""} value="diamond">❖</option>
                <option ${item.signifier === "flag" ? "selected" : ""} value="flag">⚐</option>
            </select>
            <p>
                <span class="text">${todoItemValue}</span>
                <span class="completed-tag pill unhidden">completed</span>
            </p>
        </div>
    </div>
    `;


    section.addEventListener("click", (e) => {
        setActive(e.currentTarget)
    });
    section.querySelector(".completed-toggle").addEventListener('change', (e) => {saveList()});
    section.querySelector(".signifier").addEventListener('change', (e) => {saveList()});

    section.style.setProperty("--displayOrder", item.flexOrder);
    section.setAttribute("data-datec", getFormattedDate(dt));
    section.setAttribute("data-timec", getFormattedTime(dt));

    let container = document.querySelector(`article[data-datec="${getFormattedDate(dt)}"]`);
    if (!container) {
        container = createElement('article', {
            "data-datec": getFormattedDate(dt),
            class: ["todoContainer"]
        });
        document.getElementById("itemContainer").appendChild(container);
    } 
    /* Note: appendChild is used because items array is assumed to 
        be sorted in descending order */
    container.appendChild(section);

}

export const saveList = debounce(saveToLS, 1500);
export const getList = getFromLS;
export { createItem };
