import { now } from "../utils/utilTypes.js";

export class Comment {
  public readonly id: number;
  public readonly taskId: number;
  public readonly userId: string;
  public message: string;
  public readonly createdAt: string;

  constructor(
    id: number,
    taskId: number,
    userId: string,
    message: string
  ) {
    this.id = id;
    this.taskId = taskId;
    this.userId = userId;
    this.message = message;
    this.createdAt = now();
  }
}

export class CommentService {
  private comments: Comment[] = [];
  private nextId = 1;

  addComment(taskId: number, userId: string, message: string): Comment {
    if (!message.trim()) {
      throw new Error("Comment message cannot be empty");
    }

    const comment = new Comment(
      this.nextId++,
      taskId,
      userId,
      message
    );

    this.comments.push(comment);
    return comment;
  }

  getComments(taskId: number): Comment[] {
    return this.comments.filter(c => c.taskId === taskId);
  }

  deleteComment(commentId: number): void {
    this.comments = this.comments.filter(c => c.id !== commentId);
  }
}