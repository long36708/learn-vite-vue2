import { isTypeOf } from './isTypeOf'

/**
 * 是否是对象
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isObject({}) // true
 * isObject(1) // false
 * isObject([]) // false
 * ```
 *
 * @public
 */
export function isObject (arg: any): boolean {
  return isTypeOf(arg) === 'object'
}
