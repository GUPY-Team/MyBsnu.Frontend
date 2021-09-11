export function distinctBy<TElement, TKey>(elements: TElement[], selector: (element: TElement) => TKey): TElement[] {
    const ids = new Set<TKey>();

    const result = [];

    for (const element of elements) {
        const id = selector(element);
        if (!ids.has(id)) {
            ids.add(id);
            result.push(element);
        }
    }

    return result;
}
