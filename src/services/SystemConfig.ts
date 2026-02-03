export class SystemConfig {
    static appName: string = "God, send help";
    static version: string = "0.0.0.0.0.0.0.0.0.0.0.1";
    static environment: string = "caothic";

    static setEnvironment(environment: string): void {
        this.environment = environment;
    }
    static setVersion(version: string): void {
        this.version = version;
    }

    static getInfo(): { appName: string; version: string; environment: string } {
        return {
            appName: this.appName,
            version: this.version,
            environment: this.environment
        };
    }
}