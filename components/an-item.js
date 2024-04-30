import { getFormattedDate, getFormattedTime } from "/scripts/utils/dateutils.js";
import { createElement } from "/scripts/utils/domutil.js";
// import '../src/styles/an-item-styles.css';
// import '../src/styles/pill-styles.css';

customElements.define('an-item', class extends HTMLElement {
    constructor() {
        super();
        // const sr = document.getElementById('itemContainer');
        const sr = this.attachShadow({ mode: 'open' });
        const itemtext = this.getAttribute('text');

        const dt = new Date();
        const section = createElement('section', {
            "data-datec": getFormattedDate(dt),
            "date-timec": getFormattedTime(dt),
            // "class": ["title-date", "active"]
            "class": ["title-date"]
        });

        section.innerHTML = /*html*/`
            <div class="stack">
                <div class="tags pill-container"></div>
                <div class="content">
                    <input
                        type="checkbox"
                        name="mark-completed"
                        id="completed-hint-tag"
                        class="completed-toggle"
                    />
                    <select name="signifier" id="" class="signifier">
                        <option value="todo">➔</option>
                        <option value="log">≋</option>
                        <option value="anything">🞲</option>
                        <option value="quote">❝</option>
                        <option value="diamond">❖</option>
                        <option value="flag">⚐</option>
                    </select>
                    <p class="text">
                        ${itemtext}
                        <span class="completed-tag pill unhidden">completed</span>
                    </p>
                </div>
            </div>
        `

        // <section data-datec="${this.getFormattedDate()}" data-timec="${this.getFormattedTime()}" 
        // class="title-date active pt-2 pb-2 border-b-2 my-0 rounded-md bg-white drop-shadow-md px-2">
        const styles = document.createElement('style');
        styles.innerText = this.getStyles();
        // styles.innerText = /* css */ ``;
        sr.appendChild(styles);

        sr.appendChild(section);
        // return section;
    }

    // Monitor the 'name' attribute for changes.
    static get observedAttributes() {return ['text']; }
    // Respond to attribute changes.
    attributeChangedCallback(attr, oldValue, newValue) {
        if (attr == 'text') {
        this.textContent = `${newValue}`;
    }
  }

  getStyles() {
    return /* css */ `
    *, ::after, ::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    :root {
        --rounded-md: 0.375rem;
        --rounded-lg: 0.5rem;
        --space-2: 0.5rem;
        --space-0-5: 0.125rem;
        --space-1: 0.25rem;
        --space-1-5: 0.375rem;

        --slate-500: #64748b;
        --slate-900: #0f172a;
        --gray-500: #6b7280;
        --gray-200: #e5e7eb;
        --green-200: #bbf7d0;
        --drop-shadow: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
          drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
        --drop-shadow-md: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
          drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
        --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1),
          0 2px 4px -2px rgb(0 0 0 / 0.1);
      }
    .pill {
        display: inline-block;
        cursor: pointer;
        pointer-events: none;
        min-width: max-content;
        margin: var(--space-1);
        margin-left: 0;
        padding-inline: var(--space-2);
        padding-block: var(--space-0-5);
        border-radius: var(--rounded-lg);
        font-size: 0.8rem;
        filter: var(--drop-shadow);
    }

    .pillx::after {
        content: "x";
        display: inline-block;
        opacity: 0.7;
        padding: 0 var(--space-2);
        border-radius: inherit;
        pointer-events: all;
        margin-left: var(--space-0-5);
        filter: brightness(0.8);
        color: blue;
    }

    .content {
        display: flex;
        flex-wrap: nowrap;
        align-items: flex-start;
    }
    .title-date {
        transition: all 150ms ease;
        padding: 0.5rem;
        border-bottom: 0.5rem;
        margin-block: 0;
        border-radius: 0.375rem;
        background-color: white;
        filter: drop-shadow(0 4px 3px rgb(0 0 0 / 0.07))
            drop-shadow(0 2px 2px rgb(0 0 0 / 0.06));
    }
    .stack {
        display: flex;
        flex-direction: column;
    }
    .text {
        display: inline-block;
        /* cursor-default rounded-md bg-slate-100 px-2 */
        cursor: default;
        border-radius: 0.375rem;
        background-color: #f1f5f9;
        padding-inline: 0.5rem;
    }
    .pill-container {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
        scrollbar-width: thin;
    }
    .signifier {
    /*  appearance-none rounded-md bg-slate-100 bg-transparent outline-gray-500 outline-dashed outline-1 
                    px-2 mx-1 min-w-max hover:drop-shadow-xl hover:bg-slate-100 transition-all */
        appearance: none;
        border-radius: 0.375rem;
        background-color: transparent;
        outline: 1px dashed #6b7280;
        padding-inline: 0.5rem;
        margin-inline: 0.25rem;
        min-width: max-content;
        transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1);
    }
    .signifier:hover {
        background-color: #f1f5f9;
        filter: drop-shadow(0 20px 13px rgb(0 0 0 / 0.03))
            drop-shadow(0 8px 5px rgb(0 0 0 / 0.08));
    }
    .completed-toggle {
        --toggle-sz: 16px;
        appearance: none;
        width: var(--toggle-sz);
        height: var(--toggle-sz);
        border-radius: 4px;
        border: 2px dashed #999;
        transition: background-color border-style 150ms ease;
        position: relative;
        transform-origin: center center;
        /* min-w-max active:animate-ping pt-5 px-2 */
        min-width: max-content;
        padding-top: 1.25rem;
        padding-inline: 0.5rem;
    }
    .completed-toggle::after {
        content: "";
        position: absolute;
        inset: -2px;
        border-radius: inherit;
        transform: scale(0);
        transition: transform 0.3s cubic-bezier(0.4, 2.5, 0.4, 1); /* Custom cubic-bezier for spring effect */
    }
    .completed-toggle:checked::after {
        transform: scale(1);
    }
    .completed-toggle:checked {
        border-style: solid;
    }
    .completed-tag {
        display: none !important;
    }
    .completed-toggle:checked ~ p > .completed-tag {
        display: inline-block !important;
    }

    .title-date:has(+ .title-date:hover) {
        border-radius: 6px 6px 0 0;
    }
    .title-date:hover {
        border-radius: 0;
    }
    .title-date:hover + .title-date {
        border-radius: 0 0 6px 6px;
    }
    .pill::after {
        content: "";
        display: none;
    }

    `;
  }
})