import { BaseEntity } from "./BaseIntety";
import { UserTask, UserRole } from "./user";
import { Task } from "./task";
import { Comment } from "./taskComment";

export class User extends BaseEntity implements UserTask {
  status: "active" | "inactive";
  tasks: Task[];
  role: UserRole;

  private commentService: CommentService;

  constructor(
    name: string,
    email: string,
    status: "active" | "inactive",
    role: UserRole,
    createdAt: string,
    commentService: CommentService,
    tasks: Task[] = []
  ) {
    super(name, email, createdAt);
    this.status = status;
    this.role = role;
    this.tasks = tasks;
    this.commentService = commentService;
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
}

