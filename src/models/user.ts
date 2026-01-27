import { Task } from "./task.js";

export interface Usuario {
  status: "active" | "inactive";
  tasks: Task[];
}