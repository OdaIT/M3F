import { User, Task } from "../models/index.js";
import { now } from "../utils/utilTypes.js";

export function addTaskUser(user: User, text: string): { duplicate: boolean; taskText?: string } {
  const taskText = text.trim();
  if (!taskText) return { duplicate: false };

  if (user.tasks.some(t => t.text.toLowerCase() === taskText.toLowerCase())) {
    return { duplicate: true, taskText };
  }

  user.tasks.push({ text: taskText, completed: false });
  return { duplicate: false };
}

export function toggleTask(task: Task) {
  task.completed = !task.completed;
  if (task.completed) {
    task.completionTime = now();
  } else {
    delete task.completionTime;
  }
}

export function deleteTask(user: User, task: Task) {
  const index = user.tasks.indexOf(task);
  if (index !== -1) user.tasks.splice(index, 1);
}
