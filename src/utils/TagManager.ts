export class TagManager<T> {
    private tags: Map<T, string[]> = new Map();

    addTag(item: T, tag: string): void {
        if (!this.tags.has(item)) {
            this.tags.set(item, []);
        }

        const itemTags = this.tags.get(item)!;

        if (!itemTags.includes(tag)) {
            itemTags.push(tag);
        }
    }

    removeTag(item: T, tag: string): void {
        if (!this.tags.has(item)) {
            return;
        }

        const itemTags = this.tags.get(item)!;
        const tagIndex = itemTags.indexOf(tag);

        if (tagIndex > -1) {
            itemTags.splice(tagIndex, 1);
        }

        if (itemTags.length === 0) {
            this.tags.delete(item);
        }
    }

    getTags(item: T): string[] {
        return this.tags.get(item) || [];
    }

    hasTag(item: T, tag: string): boolean {
        const itemTags = this.tags.get(item);
        return itemTags ? itemTags.includes(tag) : false;
    }

    getItemsByTag(tag: string): T[] {
        const items: T[] = [];
        
        this.tags.forEach((tags, item) => {
            if (tags.includes(tag)) {
                items.push(item);
            }
        });

        return items;
    }

    clearTags(item: T): void {
        this.tags.delete(item);
    }

    getAllTags(): string[] {
        const allTags = new Set<string>();
        
        this.tags.forEach(tags => {
            tags.forEach(tag => allTags.add(tag));
        });

        return Array.from(allTags);
    }

    addTags(item: T, tags: string[]): void {
        tags.forEach(tag => this.addTag(item, tag));
    }

    getTagCount(item: T): number {
        return this.getTags(item).length;
    }
}