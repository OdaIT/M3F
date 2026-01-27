import { users } from "../services/index.js";
import { createUserCard } from "./renderUser.js";

const usersDiv = document.getElementById("users") as HTMLDivElement;
const totalUsersEl = document.getElementById("totalUsers") as HTMLSpanElement;
const activeUsersEl = document.getElementById("activeUsers") as HTMLSpanElement;
const inactiveUsersEl = document.getElementById("inactiveUsers") as HTMLSpanElement;
const pendingTasksEl = document.getElementById("pendingTasks") as HTMLSpanElement;
const completedTasksEl = document.getElementById("completedTasks") as HTMLSpanElement;
const totalTasksEl = document.getElementById("totalTasks") as HTMLSpanElement;

const sortSelect = document.getElementById("sortSelect") as HTMLSelectElement;
const filterSelect = document.getElementById("filterSelect") as HTMLSelectElement;

export function userStatus() {
  usersDiv.innerHTML = "";

  let visibleUsers = [...users];

  if (filterSelect.value === "active") {
    visibleUsers = visibleUsers.filter(u => u.status === "active");
  } else if (filterSelect.value === "inactive") {
    visibleUsers = visibleUsers.filter(u => u.status === "inactive");
  }

  if (sortSelect.value === "az") {
    visibleUsers.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    visibleUsers.sort((a, b) => b.tasks.length - a.tasks.length);
  }

  visibleUsers.forEach(user => {
    usersDiv.appendChild(createUserCard(user));
  });

  showStats();
}

function showStats() {
  totalUsersEl.textContent = users.length.toString();
  activeUsersEl.textContent = users.filter(u => u.status === "active").length.toString();
  inactiveUsersEl.textContent = users.filter(u => u.status === "inactive").length.toString();

  let pending = 0;
  let completed = 0;

  users.forEach(u =>
    u.tasks.forEach(t => (t.completed ? completed++ : pending++))
  );

  let total = pending + completed;

  totalTasksEl.textContent = total.toString();
  pendingTasksEl.textContent = pending.toString();
  completedTasksEl.textContent = completed.toString();
}
