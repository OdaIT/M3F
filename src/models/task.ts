import { TaskStatus } from "../tasks/TaskStatus";
import { Priority } from "../services/priority";

export interface Task {
  idTask: number;
  statusT: TaskStatus;
  category: "Work" | "Personal" | "Study";
  text: string;
  priority: Priority;
  completionTime?: string;
}

//Exercício 4 — Interface de Tarefa, implementado aqui