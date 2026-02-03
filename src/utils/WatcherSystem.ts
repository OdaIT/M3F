export class WatcherSystem<T, U> {
    static watch(arg0: number, arg1: string) {
      throw new Error("Method not implemented.");
    }
    private watchers: Map<T, U[]> = new Map();

    watch(target: T, user: U): void {
        if (!this.watchers.has(target)) {
            this.watchers.set(target, []);
        }

        const targetWatchers = this.watchers.get(target)!;

        if (!targetWatchers.includes(user)) {
            targetWatchers.push(user);
        }
    }

    unwatch(target: T, user: U): void {
        if (!this.watchers.has(target)) {
            return; 
        }

        const targetWatchers = this.watchers.get(target)!;
        const userIndex = targetWatchers.indexOf(user);

        if (userIndex > -1) {
            targetWatchers.splice(userIndex, 1);
        }

        if (targetWatchers.length === 0) {
            this.watchers.delete(target);
        }
    }

    getWatchers(target: T): U[] {
        return this.watchers.get(target) || [];
    }

    isWatching(target: T, user: U): boolean {
        const targetWatchers = this.watchers.get(target);
        return targetWatchers ? targetWatchers.includes(user) : false;
    }

    getWatcherCount(target: T): number {
        return this.getWatchers(target).length;
    }

    getWatchedBy(user: U): T[] {
        const watched: T[] = [];

        this.watchers.forEach((watchers, target) => {
            if (watchers.includes(user)) {
                watched.push(target);
            }
        });

        return watched;
    }

    clearWatchers(target: T): void {
        this.watchers.delete(target);
    }

    unwatchAll(user: U): void {
        this.watchers.forEach((watchers, target) => {
            this.unwatch(target, user);
        });
    }

    getAllWatchedTargets(): T[] {
        return Array.from(this.watchers.keys());
    }

    getTotalWatchRelations(): number {
        let total = 0;
        this.watchers.forEach(watchers => {
            total += watchers.length;
        });
        return total;
    }
}