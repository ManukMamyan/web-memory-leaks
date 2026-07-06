const storage: string[] = [];

export function allocateMemory(): void {
    const str = new Array(1000000).join("x");
    const pos = str.indexOf("x");
    if (Math.random() > 1) {
        console.log(pos);
    }
    storage.push(str);
}

export function allocateMemorySimple(): void {
    const str = new Array(1000000).join("x");
    storage.push(str);
}
