export const roundTo = (n, digits) => {
    let negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    const mult = Math.pow(10, digits);
    n = parseFloat((n * mult).toFixed(11));
    n = (Math.round(n) / mult).toFixed(2);
    if (negative) {
        n = (n * -1).toFixed(2);
    }
    return parseFloat(n);
}
