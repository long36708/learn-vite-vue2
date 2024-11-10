import { isTypeOf } from './isTypeOf'

/**
 * 是否是字符串
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isString(123) // false
 * isString("abc") // true
 * isString(String(1)) // true
 * ```
 *
 * @public
 */
export function isString (arg: any): boolean {
  return isTypeOf(arg) === 'string'
}
