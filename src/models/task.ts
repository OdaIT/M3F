import { TaskStatus } from "../tasks/TaskStatus";

export interface Task {
  idTask: string;
  statusT: TaskStatus;
  text: string;
  completionTime?: string;
}

