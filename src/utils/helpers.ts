export function truncate(str: string, n: number) {
    if (str.length <= n) return str;

    return str.substr(0, n - 1);
}
