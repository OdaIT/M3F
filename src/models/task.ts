import { TaskStatus } from "../tasks/TaskStatus";

export interface Task {
  statusT: TaskStatus;
  text: string;
  completed: boolean;
  completionTime?: string;
}
