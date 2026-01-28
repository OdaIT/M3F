import { User, Task, UserTask } from "../models/index.js";
import { now } from "../utils/utilTypes.js";
import { Priority } from "./priority.js";

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
  task.statusT= "completed";
  if (task.statusT) {
    task.completionTime = now();
  } else {
    delete task.completionTime;
  }
}

export function deleteTask(user: User, task: Task) {
  const index = user.tasks.indexOf(task);
  if (index !== -1) user.tasks.splice(index, 1);
}

export function setPriority(userTask: UserTask, taskId: number, priority: Priority): void {
  const task = userTask.tasks.find(t => t.idTask === taskId);
  if (!task) return;

  task.priority = priority;
}
