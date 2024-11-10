import { isTypeOf } from './isTypeOf'

/**
 * 是否是数字
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isNumber(123) // true
 * isNumber(Number('1')) // true
 * isNumber("abc") // false
 * ```
 *
 * @public
 */
export function isNumber (arg: any): boolean {
  return isTypeOf(arg) === 'number'
}
