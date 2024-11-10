
/**
 * 是否是空对象
 * @remarks
 * ```
 * 1、校验结果和`jquery.isEmptyObject()`一致
 * 2、只有可枚举对象并且有枚举的值才返回false
 * 3、不可枚举值，始终返回true
 * ```
 * @param arg
 * @returns `true|false`
 * @example
 * ```ts
 * isEmptyObject('') // true 不可枚举
 * isEmptyObject(null) // true 不可枚举
 * isEmptyObject(undefined) // true 不可枚举
 * isEmptyObject({}) // true 可枚举，没有枚举属性
 * isEmptyObject({a:1}) // false 可枚举，有枚举属性
 * isEmptyObject(new Object()) // true 可枚举，没有属性
 * isEmptyObject([]) // true 可枚举，没有枚举属性
 * isEmptyObject([1]) // false 可枚举，有枚举属性
 * ```
 * @public
 */
export function isEmptyObject (arg: any): boolean {
  for (let key in arg) {
    return false;
  }
  return true;
}
