import { TaskArray } from "./array";
const map = { 1: "title", 2: "description", 3: "date" };

export function inboxjs() {
  let taskID = TaskArray.length;
  main.innerHTML = `
    <div id="today-content">
        <p>
            To-do List
        </p>
        <button id="addTaskBtnInitial">
            + Add task
        </button>
    </div>
    `;
  const addTaskBtnInitial = document.getElementById("addTaskBtnInitial");
  const todayContent = document.getElementById("today-content");
  addTaskBtnInitial.addEventListener("click", addTaskfunction);

  for (let i = 0; i < TaskArray.length; i++) {
    if (TaskArray[i] === null) continue;
    const taskList = document.createElement("ul");
    taskList.id = i;
    todayContent.insertBefore(taskList, addTaskBtnInitial);

    //checkbox
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.id = "checkbox";
    taskList.appendChild(check);
    if (TaskArray[check.closest("ul").id]["check"] === true) {
      check.setAttribute("checked", "checked");
    }
    check.addEventListener("change", function (e) {
      if (this.checked) {
        taskListItemArray[1].style.textDecoration = "line-through";
        taskListItemArray[2].style.textDecoration = "line-through";
        TaskArray[e.target.closest("ul").id]["check"] = true;
      } else {
        taskListItemArray[1].style.textDecoration = "none";
        taskListItemArray[2].style.textDecoration = "none";
        TaskArray[e.target.closest("ul").id]["check"] = false;
      }
      localStorage.setItem("TaskArray", JSON.stringify(TaskArray));
    });

    const taskListItem = document.createElement("li");
    taskList.appendChild(taskListItem);

    let taskListItemArray = [];

    taskListItemArray[1] = document.createElement("p");
    taskListItemArray[2] = document.createElement("p");
    taskListItemArray[3] = document.createElement("p");
    taskListItemArray[1].innerHTML = TaskArray[i]["title"];
    taskListItemArray[2].innerHTML = TaskArray[i]["description"];
    taskListItemArray[3].innerHTML = TaskArray[i]["date"];

    taskListItemArray.forEach((item, index) => {
      taskListItem.appendChild(item);
      if (TaskArray[item.closest("ul").id]["check"] === true) {
        taskListItemArray[1].style.textDecoration = "line-through";
        taskListItemArray[2].style.textDecoration = "line-through";
      }
      item.id = `taskListItemp${index}`;
      item.addEventListener("click", function () {
        let allInputCreated = document.querySelectorAll("input[id^='taskListItemp']");
        allInputCreated.forEach((x) => {
          x.remove();
        });
        let hideClass = document.querySelectorAll(".hide");
        hideClass.forEach((x) => {
          x.classList.remove("hide");
        });
        item.classList.add("hide");
        const taskListItempInput = document.createElement("input");
        taskListItempInput.id = `taskListItemp${index}Input`;
        taskListItem.insertBefore(taskListItempInput, item);
        taskListItempInput.addEventListener("keypress", function (event) {
          if (event.key === "Enter" && event.target.value.length > 0) {
            event.preventDefault();
            let parentID = event.target.closest("ul").id;
            TaskArray[parentID][map[index]] = event.target.value;
            item.innerHTML = event.target.value;
            event.target.remove();
            item.classList.remove("hide");
            localStorage.setItem("TaskArray", JSON.stringify(TaskArray));
          }
        });
      });
    });

    //removeBtn
    const removeBtn = document.createElement("button");
    removeBtn.id = "removeTaskBtn";
    taskList.appendChild(removeBtn);
    removeBtn.innerHTML = "X";
    removeBtn.addEventListener("click", function () {
      taskList.remove();
      TaskArray[i] = null;
      localStorage.setItem("TaskArray", JSON.stringify(TaskArray));
    });
  }

  function addTaskfunction() {
    addTaskBtnInitial.remove();
    const taskDiv = document.createElement("div");
    taskDiv.id = "taskDiv";
    todayContent.appendChild(taskDiv);

    const taskName = document.createElement("input");
    taskName.setAttribute("type", "text");
    taskName.id = "addTaskName";
    taskName.addEventListener("keyup", btnDisable);
    taskName.setAttribute("placeholder", "Task Name");
    taskDiv.appendChild(taskName);

    const taskDescription = document.createElement("input");
    taskDescription.setAttribute("type", "text");
    taskDescription.id = "addTaskDescription";
    taskDescription.setAttribute("placeholder", "Description");
    taskDiv.appendChild(taskDescription);

    const taskDate = document.createElement("input");
    taskDate.setAttribute("type", "date");
    taskDate.id = "addTaskDate";
    taskDiv.appendChild(taskDate);

    const addTaskBtn = document.createElement("button");
    addTaskBtn.innerHTML = "Add Task";
    addTaskBtn.id = "addTaskBtn";
    todayContent.appendChild(addTaskBtn);
    addTaskBtn.addEventListener("click", pushTask);
    addTaskBtn.disabled = true;
  }

  function btnDisable() {
    if (document.getElementById("addTaskName").value != "") {
      addTaskBtn.disabled = false;
    }
  }

  const TaskFactory = (title, description, date, check = false) => {
    return { title, description, date, check };
  };

  function pushTask() {
    const newTask = TaskFactory(
      document.getElementById("addTaskName").value,
      document.getElementById("addTaskDescription").value,
      document.getElementById("addTaskDate").value
    );
    TaskArray.push(newTask);
    console.log(TaskArray);

    const taskList = document.createElement("ul");
    taskList.id = taskID;
    todayContent.insertBefore(taskList, taskDiv);

    //checkbox
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.id = "checkbox";
    check.addEventListener("change", function (e) {
      if (this.checked) {
        taskListItemArray[1].style.textDecoration = "line-through";
        taskListItemArray[2].style.textDecoration = "line-through";
        TaskArray[e.target.closest("ul").id]["check"] = true;
      } else {
        taskListItemArray[1].style.textDecoration = "none";
        taskListItemArray[2].style.textDecoration = "none";
        TaskArray[e.target.closest("ul").id]["check"] = false;
      }
      localStorage.setItem("TaskArray", JSON.stringify(TaskArray));
    });
    taskList.appendChild(check);

    const taskListItem = document.createElement("li");
    taskList.appendChild(taskListItem);

    let taskListItemArray = [];
    taskListItemArray[1] = document.createElement("p");
    taskListItemArray[2] = document.createElement("p");
    taskListItemArray[3] = document.createElement("p");
    taskListItemArray[1].innerHTML = TaskArray[taskID]["title"];
    taskListItemArray[2].innerHTML = TaskArray[taskID]["description"];
    taskListItemArray[3].innerHTML = TaskArray[taskID]["date"];
    console.log(taskListItemArray);

    taskListItemArray.forEach((item, index) => {
      taskListItem.appendChild(item);
      item.id = `taskListItemp${index}`;
      item.addEventListener("click", function () {
        let allInputCreated = document.querySelectorAll("input[id^='taskListItemp']");
        allInputCreated.forEach((x) => {
          x.remove();
        });
        let hideClass = document.querySelectorAll(".hide");
        hideClass.forEach((x) => {
          x.classList.remove("hide");
        });
        item.classList.add("hide");
        const taskListItempInput = document.createElement("input");
        taskListItempInput.id = `taskListItemp${index}Input`;
        taskListItem.insertBefore(taskListItempInput, item);
        taskListItempInput.addEventListener("keypress", function (event) {
          if (event.key === "Enter" && event.target.value.length > 0) {
            event.preventDefault();
            let parentID = event.target.closest("ul").id;
            TaskArray[parentID][map[index]] = event.target.value;
            item.innerHTML = event.target.value;
            event.target.remove();
            item.classList.remove("hide");
            localStorage.setItem("TaskArray", JSON.stringify(TaskArray));
          }
        });
      });
    });

    //removeBtn
    const removeBtn = document.createElement("button");
    removeBtn.id = "removeTaskBtn";
    taskList.appendChild(removeBtn);
    removeBtn.innerHTML = "X";
    removeBtn.addEventListener("click", function () {
      taskList.remove();
      TaskArray[removeBtn.closest("ul").id] = null;
      localStorage.setItem("TaskArray", JSON.stringify(TaskArray));
    });

    main.addEventListener("click", function (e) {
      if (e.target.id.includes("main")) {
        let allInputCreated = document.querySelectorAll("input[id^='taskListItemp']");
        allInputCreated.forEach((x) => {
          x.remove();
        });
        let hideClass = document.querySelectorAll(".hide");
        hideClass.forEach((x) => {
          x.classList.remove("hide");
        });
      }
    });

    taskID++;

    //reset
    document.getElementById("addTaskName").value = "";
    document.getElementById("addTaskDescription").value = "";
    document.getElementById("addTaskDate").value = "";
    addTaskBtn.disabled = true;

    localStorage.setItem("TaskArray", JSON.stringify(TaskArray));
  }
}
