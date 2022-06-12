import "./style.css";
import { inboxjs } from "./inbox";
import { todayjs } from "./today";
import { thisweekjs } from "./thisweek";
import { newprojectjs } from "./newproject";
import { ProjectObject, TaskArray } from "./array";

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
<nav id="nav">
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
    <button id = "addProjectBtn">
    + Add Project
    </button>
</nav>
`;

const main = document.createElement("div");
content.appendChild(main);
main.id = "main";

const nav = document.getElementById("nav");

inboxjs();
const inbox = document.getElementById("inbox-nav");
inbox.addEventListener("click", inboxjs);
const today = document.getElementById("today-nav");
today.addEventListener("click", todayjs);
const thisweek = document.getElementById("thisweek-nav");
thisweek.addEventListener("click", thisweekjs);

const addProjectBtn = document.getElementById("addProjectBtn");
addProjectBtn.addEventListener("click", addProjectFunction);

let projectNaVArray = [];
let projectID = 0;

function addProjectFunction() {
  addProjectBtn.classList.add("hide");
  const addProjectInput = document.createElement("input");
  addProjectInput.setAttribute("type", "text");
  addProjectInput.setAttribute("maxlength", "25");
  addProjectInput.setAttribute("placeholder", "Add project");
  addProjectInput.id = "addProjectInput";
  nav.appendChild(addProjectInput);
  addProjectInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && e.target.value.length > 0) {
      if (ProjectObject[e.target.value]) {
        alert("Duplicate Project Name");
        return;
      }
      //const newProjectNav = document.createElement("li");
      //newProjectNav.id = `newProjectNav${projectID}`;
      //newProjectNav.setAttribute("class", "newProjectNav");
      const projectName = e.target.value;
      nav.insertBefore(newProjectFunction(projectID, projectName), addProjectInput);
      //newProjectNav.innerHTML = `- ${e.target.value}`;
      ProjectObject[projectName] = [];
      //newProjectNav.addEventListener("click", () => newprojectjs(projectName));
      e.target.value = "";
      projectNaVArray[projectID] = e.target.value;
      projectID++;
      localStorage.setItem("ProjectObject", JSON.stringify(ProjectObject));
    }
  });
}

window.onload = () => {
  console.log(localStorage);
  let projectStorage = localStorage.getItem("ProjectObject");
  if (projectStorage && projectStorage.length > 0) {
    ProjectObject = JSON.parse(projectStorage);
    Object.keys(ProjectObject).forEach((x, index) => {
      if (ProjectObject[x] != null) {
        nav.insertBefore(newProjectFunction(index, x), addProjectBtn);
        console.log(x, index);
      }
    });
  }
  let InboxStorage = localStorage.getItem("TaskArray");
  if (InboxStorage && InboxStorage.length > 0) {
    TaskArray = JSON.parse(InboxStorage);
  }
  inboxjs();
};

function newProjectFunction(projectID, projectName) {
  const newProjectNav = document.createElement("li");
  newProjectNav.id = `newProjectNav${projectID}`;
  newProjectNav.setAttribute("class", "newProjectNav");
  const navDiv = document.createElement("div");
  navDiv.id = "nav-div";
  newProjectNav.appendChild(navDiv);
  navDiv.innerHTML = `- ${projectName}`;
  navDiv.addEventListener("click", () => newprojectjs(projectName));
  const removeBtn = document.createElement("button");
  removeBtn.id = "removeBtn";
  newProjectNav.appendChild(removeBtn);
  removeBtn.innerHTML = "X";
  removeBtn.addEventListener("click", function () {
    newProjectNav.remove();
    ProjectObject[projectName] = null;
    localStorage.setItem("ProjectObject", JSON.stringify(ProjectObject));
  });
  return newProjectNav;
}
