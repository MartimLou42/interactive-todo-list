const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");
const error = document.querySelector("#task-error");

let tasks = [];
let editingIndex = null;

function showError(message) {
  error.textContent = message;
}

function isTaskValid(text, originalText) {
  if (!text) {
    showError("Please enter a task.");
    return false;
  }

  if (text !== originalText && tasks.includes(text)) {
    showError("That task is already on the list.");
    return false;
  }

  showError("");
  return true;
}

function createButton(text) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  return button;
}

function startEditing(index) {
  editingIndex = index;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function saveTask(index, editInput) {
  const newText = editInput.value.trim();
  const originalText = tasks[index];

  if (!isTaskValid(newText, originalText)) {
    editInput.focus();
    return;
  }

  tasks[index] = newText;
  editingIndex = null;
  renderTasks();
}

function createTaskItem(task, index) {
  const item = document.createElement("li");
  const actions = document.createElement("div");
  actions.className = "task-actions";

  if (index === editingIndex) {
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = task;

    const saveButton = createButton("Save");
    saveButton.className = "save-button";
    saveButton.addEventListener("click", () => {
      saveTask(index, editInput);
    });

    item.append(editInput);
    actions.append(saveButton);
  } else {
    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = task;

    const editButton = createButton("Edit");
    editButton.addEventListener("click", () => {
      startEditing(index);
    });

    const deleteButton = createButton("Delete");
    deleteButton.addEventListener("click", () => {
      deleteTask(index);
    });

    item.append(taskText);
    actions.append(editButton, deleteButton);
  }

  item.append(actions);
  return item;
}

function renderTasks() {
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    list.append(createTaskItem(task, index));
  });

  count.textContent = String(tasks.length).padStart(2, "0");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (!isTaskValid(text, "")) {
    return;
  }

  tasks.push(text);
  input.value = "";
  input.focus();
  renderTasks();
});
