import { BaseEntity } from "./BaseIntety";
import { UserTask, UserRole } from "./user";
import { Task } from "./task";
import { Comment } from "./taskComment.js";
import { CommentService } from "./taskComment.js";
import { IdGenerator } from "../utils/IdGenerator";
import { now } from "../utils/utilTypes";

export class User extends BaseEntity implements UserTask {
  id: number;
  status: "active" | "inactive";
  tasks: Task[];
  role: UserRole;
  private commentService: CommentService;
  private static allUsersEmails: string[] = [];
  private static mapIdEmail: Map<string, number> = new Map();

  constructor(
    name: string,
    email: string,
    status: "active" | "inactive",
    role: UserRole,
    createdAt: string,
    commentService: CommentService,
    tasks: Task[] = [],
  ) {
    super(name, email, createdAt)
    this.id = IdGenerator.generate();
    User.mapIdEmail.set(this.email, this.id);
    this.status = status;
    this.role = role;
    this.tasks = tasks;
    this.commentService = commentService;
    User.allUsersEmails.push(this.email);
  }

  addComment(taskId: number, message: string): Comment {
    return this.commentService.addComment(taskId, this.email, message);
  }

  getComments(taskId: number): Comment[] {
    return this.commentService.getComments(taskId);
  }

  deleteComment(commentId: number): void {
    this.commentService.deleteComment(commentId);
  }
  
  static emailExists(email: string): boolean {
      return User.allUsersEmails.includes(email);
  }
  static getIdByEmail(email: string): number | undefined {
    return User.mapIdEmail.get(email);
  }
  static createUser(name: string, email: string, role: UserRole)
    : User {
    const commentService = new CommentService();
    return new User(
      name,
      email,
      "active",
      role,
      now(),
      commentService
    );
  }
}