const inputFieldEl = document.querySelector("#input-field");
const taskListContainerEl = document.querySelector(".tasklist-container");
const addItemEl = document.querySelector("#add-item");
const completeAllTasksEl = document.querySelector(".edit-list #complete-all");
const clearAllTasksEl = document.querySelector(".edit-list #clear-all");
const allEl = document.querySelector("#all");
const completeEl = document.querySelector("#complete");
const uncompleteEl = document.querySelector("#uncomplete");
const editListEl = document.querySelector(".edit-list");
const footerEl = document.querySelector(".footer");
const noItemAddedEl = document.querySelector(".no-item-added");
const tasks = [];
let taskId = 0;

function addTask() {
  const text = inputFieldEl.value.trim();
  tasks.push({ text: text, checked: false });
  setVisibility(editListEl, footerEl, noItemAddedEl);
  render(tasks);
}

function setVisibility(editListEl, footerEl, noItemAddedEl) {
  if (tasks.length > 0) {
    editListEl.style.display = "flex";
    footerEl.style.display = "flex";
    noItemAddedEl.style.display = "none";
  } else {
    editListEl.style.display = "none";
    footerEl.style.display = "none";
    noItemAddedEl.style.display = "block";
  }
}

function render(tasks) {
  clear(taskListContainerEl);
  tasks.forEach((task) => {
    addItemEl.style.display = "none";
    const taskListItemEl = createTaskListItem(task);
    const checkbox = taskListItemEl.querySelector('input[type="checkbox"]');
    if (task.checked) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
    taskListContainerEl.appendChild(taskListItemEl);
    taskId++;
    inputFieldEl.value = "";
    updateTasks();
    const index = tasks.findIndex((item) => item.text === task.text);
    const deleteButtonEl = taskListItemEl.querySelector("#delete-button");
    checkbox.addEventListener("click", (event) => {
      addEventListenerToCheckBox(event, index);
    });
    deleteButtonEl.addEventListener("click", () => {
      addEventListenerToDelete(taskListItemEl, index);
    });
  });
}

function clear(element) {
  element.innerHTML = "";
}

function createTaskListItem(task) {
  const taskListItemEl = document.createElement("div");
  taskListItemEl.classList.add("tasklist-item");
  taskListItemEl.classList.add(`task-${taskId}`);
  taskListItemEl.innerHTML = `
    <div>
        <input type="checkbox" id="task_${taskId}" />
        <label for="task_${taskId}">${task.text}</label>
    </div>
    <div>
        <button id="delete-button"><i class="fa-solid fa-xmark"></i></button>
    </div>
    `;

  return taskListItemEl;
}

function addEventListenerToCheckBox(event, index) {
  if (event.target.checked) {
    tasks[index].checked = true;
  } else {
    tasks[index].checked = false;
  }
  updateTasks();
}

function addEventListenerToDelete(taskListItemEl, index) {
  taskListItemEl.remove();
  tasks.splice(index, 1);
  setVisibility(editListEl, footerEl, noItemAddedEl);
  updateTasks();
}

function updateTasks() {
  let count = 0;
  const checkboxes = document.querySelectorAll(
    '.tasklist-item input[type="checkbox"]'
  );
  const taskLeftEl = document.querySelector("#tasks-left");
  checkboxes.forEach((checkbox) => {
    if (!checkbox.checked) {
      count++;
    }
  });
  taskLeftEl.textContent = count;
}

// Event Listeners
completeAllTasksEl.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(
    '.tasklist-item input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = true;
  });
  updateTasks();
});

clearAllTasksEl.addEventListener("click", () => {
  const checkboxes = document.querySelectorAll(
    '.tasklist-item input[type="checkbox"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
  updateTasks();
});

uncompleteEl.addEventListener("click", () => {
  const uncompletedTasks = tasks.filter((item) => {
    if (!item.checked) {
      return item;
    }
  });
  render(uncompletedTasks);
});

allEl.addEventListener("click", () => {
  render(tasks);
});

completeEl.addEventListener("click", () => {
  const completedTasks = tasks.filter((item) => {
    if (item.checked) {
      return item;
    }
  });
  render(completedTasks);
});

inputFieldEl.addEventListener("input", function () {
  if (inputFieldEl.value.trim() !== "") {
    addItemEl.style.display = "inline";
  } else {
    addItemEl.style.display = "none";
  }
});

addItemEl.addEventListener("click", addTask);
inputFieldEl.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    inputFieldEl.blur();
    addTask();
  }
});
