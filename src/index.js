import "./style.css";

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
    <a id="today-nav" class="page">
        <span class="material-symbols-outlined" style="color: green">
        today
        </span>
        Today
    </a>
    <a id="upcoming-nav" class="page">
        <span class="material-symbols-outlined" style="color: purple">
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
main.innerHTML = `
<div id="today-content">
    <p>
        Today (date)
    </p>
    <button id="addTaskBtnInitial">
        + Add task
    </button>
</div>
`;

const addTaskBtnInitial = document.getElementById("addTaskBtnInitial");
const todayContent = document.getElementById("today-content");
addTaskBtnInitial.addEventListener("click", addTaskfunction);
function addTaskfunction() {
  addTaskBtnInitial.remove();
  const taskDiv = document.createElement("div");
  taskDiv.id = "taskDiv";
  todayContent.appendChild(taskDiv);

  const taskName = document.createElement("input");
  taskName.setAttribute("type", "text");
  taskName.id = "addTaskName";
  taskName.addEventListener("keyup", success);
  taskName.setAttribute("placeholder", "Title");
  taskDiv.appendChild(taskName);

  const taskDescription = document.createElement("input");
  taskDescription.setAttribute("type", "text");
  taskDescription.id = "addTaskDescription";
  taskDescription.setAttribute("placeholder", "Description");
  taskDiv.appendChild(taskDescription);

  const addTaskBtn = document.createElement("button");
  addTaskBtn.innerHTML = "Add Task";
  addTaskBtn.id = "addTaskBtn";
  todayContent.appendChild(addTaskBtn);
  addTaskBtn.addEventListener("click", pushTask);
  addTaskBtn.disabled = true;
}

function success() {
  if (document.getElementById("addTaskName").value != "") {
    addTaskBtn.disabled = false;
  }
}

let TaskArray = [];
let taskID = 0;

const TaskFactory = (title, description) => {
  return { title, description };
};

function pushTask() {
  const newTask = TaskFactory(
    document.getElementById("addTaskName").value,
    document.getElementById("addTaskDescription").value
  );
  TaskArray.push(newTask);
  console.log(TaskArray);

  const taskList = document.createElement("ul");
  todayContent.insertBefore(taskList, taskDiv);

  const taskListItem = document.createElement("li");
  taskList.appendChild(taskListItem);

  const taskListItemp1 = document.createElement("p");
  const taskListItemp2 = document.createElement("p");
  taskListItem.appendChild(taskListItemp1);
  taskListItem.appendChild(taskListItemp2);
  taskListItemp1.innerHTML = TaskArray[taskID]["title"];
  taskListItemp2.innerHTML = TaskArray[taskID]["description"];
  taskListItemp1.id = "taskListItemp1";
  taskListItemp2.id = "taskListItemp2";
  taskID++;

  //reset
  document.getElementById("addTaskName").value = "";
  document.getElementById("addTaskDescription").value = "";
  addTaskBtn.disabled = true;
}
