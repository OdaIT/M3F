export class RatingSystem<T> {
    private ratings: Map<T, number[]> = new Map();

    rate(item: T, value: number): void {
        if (value < 1 || value > 5) {
            throw new Error("Rating deve estar entre 1 e 5");
        }

        if (!this.ratings.has(item)) {
            this.ratings.set(item, []);
        }

        this.ratings.get(item)!.push(value);
    }

    getAverage(item: T): number {
        const itemRatings = this.ratings.get(item);

        if (!itemRatings || itemRatings.length === 0) {
            return 0;
        }

        const sum = itemRatings.reduce((acc, rating) => acc + rating, 0);
        return sum / itemRatings.length;
    }

    getRatings(item: T): number[] {
        return this.ratings.get(item) || [];
    }
}