const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");
const count = document.querySelector("#task-count");
const error = document.querySelector("#task-error");

let tasks = [];
let editingIndex = null;

function render() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    const actions = document.createElement("div");
    actions.className = "task-actions";

    if (index === editingIndex) {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = task;

      const saveButton = document.createElement("button");
      saveButton.type = "button";
      saveButton.className = "save-button";
      saveButton.textContent = "Save";
      saveButton.addEventListener("click", () => {
        const newText = editInput.value.trim();

        if (!newText) {
          error.textContent = "Please enter a task.";
          editInput.focus();
          return;
        }

        const isDuplicate = tasks.some(
          (existingTask, taskIndex) =>
            taskIndex !== index && existingTask === newText,
        );

        if (isDuplicate) {
          error.textContent = "That task is already on the list.";
          editInput.focus();
          return;
        }

        tasks[index] = newText;
        error.textContent = "";
        editingIndex = null;
        render();
      });

      item.appendChild(editInput);
      actions.appendChild(saveButton);
    } else {
      const taskText = document.createElement("span");
      taskText.className = "task-text";
      taskText.textContent = task;

      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        editingIndex = index;
        render();
      });

      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        tasks.splice(index, 1);
        render();
      });

      item.appendChild(taskText);
      actions.appendChild(editButton);
      actions.appendChild(deleteButton);
    }

    item.appendChild(actions);
    list.appendChild(item);
  });

  count.textContent = String(tasks.length).padStart(2, "0");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();

  if (!text) {
    error.textContent = "Please enter a task.";
    return;
  }

  if (tasks.includes(text)) {
    error.textContent = "That task is already on the list.";
    return;
  }

  error.textContent = "";

  tasks.push(text);
  input.value = "";
  input.focus();
  render();
});
