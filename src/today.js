import { TaskArray } from "./array";
import { isToday, parseISO } from "date-fns";

export function todayjs() {
  main.innerHTML = `
    <div id="today-content">
        <p>
            Today
        </p>
    </div>
    `;

  const todayContent = document.getElementById("today-content");

  for (let i = 0; i < TaskArray.length; i++) {
    if (TaskArray[i] === null) continue;
    let date = parseISO(TaskArray[i]["date"]);
    if (isToday(date)) {
      const taskList = document.createElement("ul");
      taskList.id = i;
      todayContent.appendChild(taskList);
      console.log(TaskArray);
      //checkbox
      const check = document.createElement("input");
      check.setAttribute("type", "checkbox");
      check.id = "checkbox";
      taskList.appendChild(check);
      if (TaskArray[check.closest("ul").id]["check"] === true) {
        check.setAttribute("checked", "checked");
      }
      check.addEventListener("change", function () {
        if (this.checked) {
          taskListItemp1.style.textDecoration = "line-through";
          taskListItemp2.style.textDecoration = "line-through";
        } else {
          taskListItemp1.style.textDecoration = "none";
          taskListItemp2.style.textDecoration = "none";
        }
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
      });
    }
  }
}
