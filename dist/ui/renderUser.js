import { users } from "../services/index.js";
import { toggleTask } from "../services/index.js";
import { userStatus } from "./renderTask.js";
export function createUserCard(user) {
    const userIndex = users.indexOf(user);
    const userDiv = document.createElement("div");
    userDiv.className = "user";
    const title = document.createElement("h2");
    title.textContent = `${user.name} (${user.email})`;
    const status = document.createElement("span");
    status.textContent = user.status.toUpperCase();
    status.className = `status ${user.status}`;
    const toggleStatusBtn = document.createElement("button");
    toggleStatusBtn.textContent =
        user.status === "active" ? "Set Inactive" : "Set Active";
    toggleStatusBtn.onclick = () => {
        user.status = user.status === "active" ? "inactive" : "active";
        userStatus();
    };
    const deleteUserBtn = document.createElement("button");
    deleteUserBtn.textContent = "Delete User";
    deleteUserBtn.onclick = () => {
        users.splice(userIndex, 1);
        userStatus();
    };
    const taskInput = document.createElement("input");
    taskInput.placeholder = "New task";
    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task";
    addTaskBtn.onclick = () => addTaskUser(user, taskInput.value);
    const taskList = document.createElement("ul");
    user.tasks.forEach((task, taskIndex) => {
        const li = document.createElement("li");
        const text = document.createElement("span");
        text.textContent =
            task.completed && task.completionTime
                ? `[${task.completionTime}] ${task.text}`
                : task.text;
        if (task.completed)
            text.classList.add("done");
        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.onclick = () => {
            const newText = prompt("Edit task", task.text);
            if (newText) {
                task.text = newText;
                userStatus();
            }
        };
        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";
        completeBtn.onclick = () => {
            toggleTask(task);
            userStatus();
        };
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => {
            user.tasks.splice(taskIndex, 1);
            userStatus();
        };
        li.append(text, completeBtn, editBtn, deleteBtn);
        taskList.appendChild(li);
    });
    userDiv.append(title, status, toggleStatusBtn, deleteUserBtn, document.createElement("br"), taskInput, addTaskBtn, taskList);
    return userDiv;
}
