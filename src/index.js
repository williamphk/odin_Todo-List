import "./style.css";
import { inboxjs } from "./inbox";
import { todayjs } from "./today";
import { thisweekjs } from "./thisweek";

const body = document.querySelector("body");
const content = document.querySelector("#content");
const header = document.createElement("header");
body.insertBefore(header, content);
header.innerHTML = `
<span class="material-symbols-outlined" style="color: white">
menu
</span>
<span class="material-symbols-outlined" style="color: white">
home
</span>
<input type="search" placeholder="search"/>
<span class="material-symbols-outlined" style="color: white">
add
</span>
<span class="material-symbols-outlined" style="color: white">
help
</span>
<span class="material-symbols-outlined" style="color: white">
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
    <div id="inbox-nav" class="page">
        <span class="material-symbols-outlined" style="color: blue">
        inbox
        </span>
        Inbox
    </div>
    <a id="today-nav" class="page">
        <span class="material-symbols-outlined" style="color: green">
        today
        </span>
        Today
    </a>
    <a id="thisweek-nav" class="page">
        <span class="material-symbols-outlined" style="color: purple">
        calendar_month
        </span>
        This Week
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

inboxjs();
const inbox = document.getElementById("inbox-nav");
inbox.addEventListener("click", inboxjs);
const today = document.getElementById("today-nav");
today.addEventListener("click", todayjs);
const thisweek = document.getElementById("thisweek-nav");
thisweek.addEventListener("click", thisweekjs);
