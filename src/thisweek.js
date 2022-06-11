import { TaskArray } from "./array";
import { isThisWeek, parseISO } from "date-fns";

export function thisweekjs() {
  main.innerHTML = `
    <div id="today-content">
        <p>
            Today
        </p>
    </div>
    `;

  const todayContent = document.getElementById("today-content");

  for (let i = 0; i < TaskArray.length; i++) {
    let date = parseISO(TaskArray[i]["date"]);
    if (isThisWeek(date)) {
      const taskList = document.createElement("ul");
      todayContent.appendChild(taskList);

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
  }
}
