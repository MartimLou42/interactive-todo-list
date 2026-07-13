const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const list = document.querySelector("#task-list");

let tasks = [];

function render() {
  list.innerHTML = "";
  tasks.forEach((task) => {
    const item = document.createElement("li");
    item.textContent = task;
    list.appendChild(item);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  tasks.push(text);
  input.value = "";
  input.focus();
  render();
});
