export class SystemLogger {
    private static logs: string[] = [];

    static log(message: string): void {
        const timestamp = new Date().toISOString();
        timestamp.replace('T', ' ').replace('Z', '');
        const logEntry = `[${timestamp}] ${message}`;
        this.logs.push(logEntry);
    }

    static getLogs(): string[] {
        return [...this.logs];
    }

    static clear(): void {
        this.logs = [];
    }
}