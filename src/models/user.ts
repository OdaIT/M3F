import { Task } from "./task.js";

export interface User {
  name: string;
  email: string;
  status: "active" | "inactive";
  tasks: Task[];
}
