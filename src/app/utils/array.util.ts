/**
 * Get the intersection of arrays
 * @param a
 * @param arr
 */
const getIntersection = <T,_>(a: T[], ...arr: T[][]): T[] => [...new Set(a)].filter((v) => arr.every((b) => b.includes(v)));

export {
  getIntersection
}
