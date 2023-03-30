/**
 * Get the intersection of arrays
 * @param a
 * @param arr
 */
const getIntersection = <T,_>(a: T[], ...arr: T[][]): T[] => [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));

/**
 * Split an array into chunks
 * @param arr
 * @param size
 */
const chunk = <T,>(arr: T[], size: number): T[][] => (
  arr.reduce((acc, e, i) => (i % size ? acc[acc.length - 1].push(e) : acc.push([e]), acc), [] as T[][])
);

export {
  getIntersection,
  chunk
}
