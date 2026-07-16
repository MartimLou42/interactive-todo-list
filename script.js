const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");

let tasks = [];
let editingIndex = null;

function render() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const item = document.createElement("li");

    if (index === editingIndex) {
      const editInput = document.createElement("input");
      editInput.type = "text";
      editInput.value = task;

      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.addEventListener("click", () => {
        const newText = editInput.value.trim();
        if (newText) tasks[index] = newText;
        editingIndex = null;
        render();
      });

      item.appendChild(editInput);
      item.appendChild(saveButton);
    } else {
      item.textContent = task;

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        editingIndex = index;
        render();
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        tasks.splice(index, 1);
        render();
      });

      item.appendChild(editButton);
      item.appendChild(deleteButton);
    }

    list.appendChild(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  const error = document.querySelector("#task-error");

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
