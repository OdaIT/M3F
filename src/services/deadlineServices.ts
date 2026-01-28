import { now } from "../utils/utilTypes";

export class DeadlineService {
  protected deadlines: Map<number, string> = new Map();

  setDeadline(taskId: number): void {
    this.deadlines.set(taskId, now());
  }

  isExpired(taskId: number): boolean {
    const deadline = this.deadlines.get(taskId);
    if (!deadline) return false;

    return (
      this.parseDate(deadline) < this.parseDate(now())
    );
  }

  getExpiredTasks(): number[] {
    const expired: number[] = [];
    const current = this.parseDate(now());

    for (const [taskId, deadline] of this.deadlines.entries()) {
      if (this.parseDate(deadline) < current) {
        expired.push(taskId);
      }
    }

    return expired;
  }

  private parseDate(dateStr: string): number {
    const [date, time] = dateStr.split(" ");
    const [day, month, year] = date.split("/").map(Number);
    const [hour, minute] = time.split(":").map(Number);

    return new Date(year, month - 1, day, hour, minute).getTime();
  }
}