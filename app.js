const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";
let tasks = [
  { id: 1, text: "Review open pull requests", completed: false },
  { id: 2, text: "Fix the README typo", completed: true },
  { id: 3, text: "Add issue templates", completed: false }
];

function getVisibleTasks() {
  if (currentFilter === "open") {
    return tasks.filter((task) => task.completed === false);
  }

  if (currentFilter === "completed") {
    return tasks.filter((task) => task.completed === true);
  }

  return tasks;
}

function renderTasks() {
  const visibleTasks = getVisibleTasks();
  taskList.innerHTML = "";

  visibleTasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "task-item completed" : "task-item";

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const toggleButton = document.createElement("button");
    toggleButton.className = "secondary-btn";
    toggleButton.textContent = task.completed ? "Reopen" : "Complete";
    toggleButton.addEventListener("click", () => toggleTask(task.id));

    const deleteButton = document.createElement("button");
    deleteButton.className = "danger-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    actions.appendChild(toggleButton);
    actions.appendChild(deleteButton);

    li.appendChild(text);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

function addTask(text) {
  tasks.push({
    id: Date.now(),
    text,
    completed: false
  });

  renderTasks();
}

function toggleTask(taskId) {
  tasks = tasks.map((task) => {
    if (task.id === taskId) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });

  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const value = taskInput.value.trim();

  if (!value) {
    return;
  }

  addTask(value);
  taskInput.value = "";
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    renderTasks();
  });
});

renderTasks();
