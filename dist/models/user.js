export class User {
    constructor(name, email, status, tasks = []) {
        this.name = name;
        this.email = email;
        this.status = status;
        this.tasks = tasks;
    }
}
