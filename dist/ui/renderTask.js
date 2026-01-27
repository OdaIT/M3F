import { users } from "../services/index.js";
import { createUserCard } from "./renderUser.js";
const usersDiv = document.getElementById("users");
const totalUsersEl = document.getElementById("totalUsers");
const activeUsersEl = document.getElementById("activeUsers");
const inactiveUsersEl = document.getElementById("inactiveUsers");
const pendingTasksEl = document.getElementById("pendingTasks");
const completedTasksEl = document.getElementById("completedTasks");
const totalTasksEl = document.getElementById("totalTasks");
const sortSelect = document.getElementById("sortSelect");
const filterSelect = document.getElementById("filterSelect");
export function userStatus() {
    usersDiv.innerHTML = "";
    let visibleUsers = [...users];
    if (filterSelect.value === "active") {
        visibleUsers = visibleUsers.filter(u => u.status === "active");
    }
    else if (filterSelect.value === "inactive") {
        visibleUsers = visibleUsers.filter(u => u.status === "inactive");
    }
    if (sortSelect.value === "az") {
        visibleUsers.sort((a, b) => a.name.localeCompare(b.name));
    }
    else {
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
    users.forEach(u => u.tasks.forEach(t => (t.completed ? completed++ : pending++)));
    let total = pending + completed;
    totalTasksEl.textContent = total.toString();
    pendingTasksEl.textContent = pending.toString();
    completedTasksEl.textContent = completed.toString();
}
