/**
 * @Author: longmo
 * @Date: 2025-01-07 12:43:24
 * @LastEditTime: 2025-01-07 12:54:37
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

export function differenceWith(arr1, arr2, compareFn) {
  return Array.from(
    new Set(arr1.filter((item) => !arr2.some((i) => compareFn(item, i))))
  );
}

export function differenceWithBy(arr1, arr2, key, compareFn) {
  return Array.from(
    new Set(
      arr1.filter((item) => !arr2.some((i) => compareFn(item[key], i[key])))
    )
  );
}

/**
 * 补集
 * @param arr1
 * @param arr2
 */
export function symmetricDifference(arr1, arr2) {
  return Array.from(
    new Set([
      ...arr1.filter((item) => !arr2.includes(item)),
      ...arr2.filter((item) => !arr1.includes(item)),
    ])
  );
}

export function symmetricDifferenceBy(arr1, arr2, key) {
  return Array.from(
    new Set([
      ...arr1.filter((item) => !arr2.includes(item[key])),
      ...arr2.filter((item) => !arr1.includes(item[key])),
    ])
  );
}

export function symmetricDifferenceWith(arr1, arr2, compareFn) {
  return Array.from(
    new Set([
      ...arr1.filter((item) => !arr2.some((i) => compareFn(item, i))),
      ...arr2.filter((item) => !arr1.some((i) => compareFn(item, i))),
    ])
  );
}
