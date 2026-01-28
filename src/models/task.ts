import { TaskStatus } from "../tasks/TaskStatus";
import { Priority } from "../services/priority";

export interface Task {
  idTask: number;
  statusT: TaskStatus;
  text: string;
  priority: Priority;
  completionTime?: string;
}

