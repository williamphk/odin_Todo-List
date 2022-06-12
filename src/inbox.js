import { TaskArray } from "./array";
let taskID = 0;

export function inboxjs() {
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
    const taskList = document.createElement("ul");
    todayContent.insertBefore(taskList, addTaskBtnInitial);

    //checkbox
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.id = "checkbox";
    check.addEventListener("change", function () {
      if (this.checked) {
        taskListItemp1.style.textDecoration = "line-through";
        taskListItemp2.style.textDecoration = "line-through";
      } else {
        taskListItemp1.style.textDecoration = "none";
        taskListItemp2.style.textDecoration = "none";
      }
    });
    taskList.appendChild(check);

    const taskListItem = document.createElement("li");
    taskList.appendChild(taskListItem);

    const taskListItemp1 = document.createElement("p");
    const taskListItemp2 = document.createElement("p");
    const taskListItemp3 = document.createElement("p");
    taskListItem.appendChild(taskListItemp1);
    taskListItem.appendChild(taskListItemp2);
    taskListItem.appendChild(taskListItemp3);
    taskListItemp1.innerHTML = TaskArray[i]["title"];
    taskListItemp2.innerHTML = TaskArray[i]["description"];
    taskListItemp3.innerHTML = TaskArray[i]["date"];
    taskListItemp1.id = "taskListItemp1";
    taskListItemp2.id = "taskListItemp2";
    taskListItemp3.id = "taskListItemp3";
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

  const TaskFactory = (title, description, date) => {
    return { title, description, date };
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
    todayContent.insertBefore(taskList, taskDiv);

    //checkbox
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.id = "checkbox";
    check.addEventListener("change", function () {
      if (this.checked) {
        taskListItemp1.style.textDecoration = "line-through";
        taskListItemp2.style.textDecoration = "line-through";
      } else {
        taskListItemp1.style.textDecoration = "none";
        taskListItemp2.style.textDecoration = "none";
      }
    });
    taskList.appendChild(check);

    const taskListItem = document.createElement("li");
    taskList.appendChild(taskListItem);

    const taskListItemp1 = document.createElement("p");
    const taskListItemp2 = document.createElement("p");
    const taskListItemp3 = document.createElement("p");
    taskListItem.appendChild(taskListItemp1);
    taskListItem.appendChild(taskListItemp2);
    taskListItem.appendChild(taskListItemp3);
    taskListItemp1.innerHTML = TaskArray[taskID]["title"];
    taskListItemp2.innerHTML = TaskArray[taskID]["description"];
    taskListItemp3.innerHTML = TaskArray[taskID]["date"];
    taskListItemp1.id = "taskListItemp1";
    taskListItemp2.id = "taskListItemp2";
    taskListItemp3.id = "taskListItemp3";
    taskListItemp1.addEventListener("click", function () {
      taskListItemp1.remove();
      const taskListItemp1Input = document.createElement("input");
      taskListItemp1Input.id = "taskListItemp1Input";
      taskListItem.prepend(taskListItemp1Input);
    });
    taskListItemp2.addEventListener("click", function () {
      taskListItemp2.remove();
      const taskListItemp2Input = document.createElement("input");
      taskListItemp2Input.id = "taskListItemp2Input";
      taskListItem.insertBefore(taskListItemp2Input, taskListItemp3);
    });
    taskID++;

    //reset
    document.getElementById("addTaskName").value = "";
    document.getElementById("addTaskDescription").value = "";
    document.getElementById("addTaskDate").value = "";
    addTaskBtn.disabled = true;
  }
}
