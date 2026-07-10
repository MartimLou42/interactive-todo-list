const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskError = document.querySelector("#task-error");
const taskList = document.querySelector("#task-list");
const emptyMessage = document.querySelector("#empty-message");
const tasks = [];

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const listItem = document.createElement("li");
    listItem.textContent = task;
    taskList.appendChild(listItem);
  });

  emptyMessage.hidden = tasks.length > 0;
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newTask = taskInput.value.trim();

  if (!newTask) {
    taskError.textContent = "Enter a task before adding it.";
    taskInput.focus();
    return;
  }

  tasks.push(newTask);
  taskError.textContent = "";
  taskForm.reset();
  renderTasks();
  taskInput.focus();
});

renderTasks();
