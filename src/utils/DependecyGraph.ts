export class DependencyGraph<T> {
    private graph: Map<T, T[]> = new Map();

    addDependency(item: T, dependsOn: T): void {

        if (!this.graph.has(item)) {
            this.graph.set(item, []);
        }

        const dependencies = this.graph.get(item)!;

        if (!dependencies.includes(dependsOn)) {
            dependencies.push(dependsOn);
        }
    }

    getDependencies(item: T): T[] {
        return this.graph.get(item) || [];
    }

    hasDependencies(item: T): boolean {
        const dependencies = this.graph.get(item);
        return dependencies !== undefined && dependencies.length > 0;
    }
}