import "./style.css";

const body = document.querySelector("body");
const content = document.querySelector("#content");
const header = document.createElement("header");
body.insertBefore(header, content);
header.innerHTML = `
<span class="material-symbols-outlined">
menu
</span>
<span class="material-symbols-outlined">
home
</span>
<span class="material-symbols-outlined">
search
</span>
<input type="text"></input>
<span class="material-symbols-outlined">
add
</span>
<span class="material-symbols-outlined">
help
</span>
<span class="material-symbols-outlined">
notifications
</span>
<span class="icon">
</span>
`;

const sideBar = document.createElement("div");
content.appendChild(sideBar);
sideBar.id = "sideBar";
sideBar.innerHTML = `
<nav>
    <a id="today-nav" class="page">
        <span class="material-symbols-outlined">
        today
        </span>
        Today
    </a>
    <a id="upcoming-nav" class="page">
        <span class="material-symbols-outlined">
        calendar_month
        </span>
        Upcoming
    </a>
    <a id="project-nav" class="page">
        <span class="material-symbols-outlined">
        expand_more
        </span>
        Projects
    </a>
</nav>
`;
const main = document.createElement("div");
content.appendChild(main);
main.id = "main";
