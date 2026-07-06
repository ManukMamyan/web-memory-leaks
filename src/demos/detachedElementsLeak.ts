const detachedList: HTMLUListElement[] = [];

export function createDetachedElements(): void {
    const ul = document.createElement("ul");
    for (let i = 0; i < 5; i++) {
        const li = document.createElement("li");
        ul.appendChild(li);
    }
    detachedList.push(ul);
}
