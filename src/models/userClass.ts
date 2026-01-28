import { BaseEntity } from "./BaseIntety";
import { UserTask, UserRole } from "./user";
import { Task } from "./task";

export class User extends BaseEntity implements UserTask{
  status: "active" | "inactive";
  tasks: Task[];

  constructor(
    name: string,
    email: string,
    status: "active" | "inactive",
    role: UserRole,
    createdAt: string,
    tasks: Task[] = []
  )
  {
    super (name, email, createdAt);
    this.status = status;
    this.role = role;
    this.tasks = tasks;
  }
  get creationDate():string{
    return `User created on ${this.createdAt}`;
}
}