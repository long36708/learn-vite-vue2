/**
 * @Author: longmo
 * @Date: 2025-01-07 12:43:24
 * @LastEditTime: 2025-01-07 12:48:59
 * @FilePath: src/utils/set.ts
 * @Description:
 */

/**
 * 数组去重 求并集
 * @param arr1
 * @param arr2
 */
export function union(arr1, arr2) {
  return Array.from(new Set([...arr1, ...arr2]));
}

/**
 * 数组去重 求并集
 * @param arr1
 * @param arr2
 * @param key
 */
export function unionBy(arr1, arr2, key) {
  return Array.from(new Set([...arr1, ...arr2])).map((item) => {
    return (
      arr1.find((i) => i[key] === item[key]) ||
      arr2.find((i) => i[key] === item[key])
    );
  });
}

/**
 * 数组交集
 * @param arr1
 * @param arr2
 */
export function intersection(arr1, arr2) {
  return Array.from(new Set(arr1.filter((item) => arr2.includes(item))));
}

export function intersectionBy(arr1, arr2, key) {
  return Array.from(new Set(arr1.filter((item) => arr2.includes(item[key]))));
}

/**
 * 数组差集 在arr1中，不在arr2中的元素
 * @param arr1
 * @param arr2
 */

export function difference(arr1, arr2) {
  return Array.from(new Set(arr1.filter((item) => !arr2.includes(item))));
}

export function differenceBy(arr1, arr2, key) {
  return Array.from(new Set(arr1.filter((item) => !arr2.includes(item[key]))));
}
