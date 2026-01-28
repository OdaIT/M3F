import { Task } from "./task.js";

export interface UserTask {
  status: "active" | "inactive";
  role: UserRole;
  tasks: Task[];
}

export enum UserRole {
    ADMIN = "admin",
    MANAGER = "manager",
    MEMBER = "member",
    VIEWER = "viewer"
}

