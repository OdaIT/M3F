import { User } from "../models/userClass";
import { Task } from "../models/task";

export const users: User[] = [];

export function createUserService(name: string, email: string): string | null {
  validateEmail(email);

  if (!validateEmail(email)) return "Email invalid";
  if (!name || !email) return "Name and email are required";
  if (users.some(u => u.email === email)) return "Email already exists";

  users.push({ name, email, status: "active", tasks: [] });
  return null;
}

export function validateEmail(email_: string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email_);
}

export function toggleUserStatus(user: User) {
  user.status = user.status === "active" ? "inactive" : "active";
}

export function deleteUser(user: User) {
  const index = users.indexOf(user);
  if (index !== -1) users.splice(index, 1);
}


export function assignUser(task: Task, user: User): void {
    if (!this.taskToUsers.has(task.idTask)) {
      this.taskToUsers.set(task.idTask, new Set());
    }
    this.taskToUsers.get(task.idTask)!.add(user);

    if (!this.userToTasks.has(user.email)) {
      this.userToTasks.set(user.email, new Set());
    }
    this.userToTasks.get(user.email)!.add(task);

    if (!user.tasks.some(t => t.idTask === task.idTask)) {
      user.tasks.push(task);
    }
  }

export function unassignUser(task: Task, user: User): void {
    const users = this.taskToUsers.get(task.idTask);
    users?.delete(user);
    if (users?.size === 0) {
      this.taskToUsers.delete(task.idTask);
    }
    const tasks = this.userToTasks.get(user.email);
    tasks?.delete(task);
    if (tasks?.size === 0) {
      this.userToTasks.delete(user.email);
    }

    user.tasks = user.tasks.filter(t => t.idTask !== task.idTask);
}

 export function getUsersFromTask(taskId: number): User[] {
    return Array.from(this.taskToUsers.get(taskId) ?? []);
  }

 export function getTasksFromUser(user: User): Task[] {
    return Array.from(this.userToTasks.get(user.email) ?? []);
  }