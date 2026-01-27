import { BaseEntity } from "./BaseIntety";
import { Usuario } from "./user";
import { Task } from "./task";

export class User extends BaseEntity implements Usuario{
  status: "active" | "inactive";
  tasks: Task[];

  constructor(
    name: string,
    email: string,
    status: "active" | "inactive",
    createdAt: string,
    tasks: Task[] = []
  )
  {
    super (email, createdAt, name);
    this.status = status;
    this.tasks = tasks;
  }
  get creationDate():string{
    return `User created on ${this.createdAt}`;
}
}