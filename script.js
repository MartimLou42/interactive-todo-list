const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");

let tasks = [];

function render() {
  list.innerHTML = "";
  tasks.forEach((task, index) => {
    const item = document.createElement("li");
    item.textContent = task;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      render();
    });

    item.appendChild(deleteButton);
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
