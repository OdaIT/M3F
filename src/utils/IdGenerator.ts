export class IdGenerator {

    private static counter: number = 0;
    static generate(): number {
        this.counter++;
        return this.counter;
    }
}