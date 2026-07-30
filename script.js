const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");
const error = document.querySelector("#task-error");

let tasks = [];
let editingIndex = null;

function isTaskValid(text, originalText = "") {
  let message = "";
  if (!text) {
    message = "Please enter a task.";
  } else if (text !== originalText && tasks.some((task) => task.text === text)) {
    message = "That task is already on the list.";
  }

  error.textContent = message;
  return message === "";
}

function createButton(text, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

function createTaskItem(task, index) {
  const item = document.createElement("li");
  const actions = document.createElement("div");
  actions.className = "task-actions";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.completed;

  const checkboxAction = task.completed ? "incomplete" : "complete";
  checkbox.setAttribute("aria-label", `Mark ${task.text} as ${checkboxAction}`);
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    const taskText = item.querySelector(".task-text");
    if (taskText) {
      taskText.classList.toggle("completed", task.completed);
    }

    const nextAction = task.completed ? "incomplete" : "complete";
    checkbox.setAttribute("aria-label", `Mark ${task.text} as ${nextAction}`);
    updateCount();
  });

  if (index === editingIndex) {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.className = "edit-input";
    editInput.value = task.text;
    const saveButton = createButton("Save", () => {
      const newText = editInput.value.trim();
      if (!isTaskValid(newText, task.text)) {
        editInput.focus();
        return;
      }
      task.text = newText;
      editingIndex = null;
      renderTasks();
    });
    saveButton.className = "save-button";
    item.append(editInput);
    actions.append(saveButton);
  } else {
    const taskText = document.createElement("span");
    taskText.className = task.completed ? "task-text completed" : "task-text";
    taskText.textContent = task.text;
    const editButton = createButton("Edit", () => {
      editingIndex = index;
      renderTasks();
    });
    const deleteButton = createButton("Delete", () => {
      tasks.splice(index, 1);
      renderTasks();
    });
    item.append(taskText);
    actions.append(editButton, deleteButton);
  }
  item.prepend(checkbox);
  item.append(actions);
  return item;
}

function renderTasks() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    list.append(createTaskItem(task, index));
  });
  updateCount();
}

function updateCount() {
  const openTasks = tasks.filter((task) => !task.completed);
  count.textContent = String(openTasks.length).padStart(2, "0");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();
  if (!isTaskValid(text, "")) {
    return;
  }
  tasks.push({ text, completed: false });
  input.value = "";
  input.focus();
  renderTasks();
});
