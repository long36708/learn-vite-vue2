import { isTypeOf } from './isTypeOf'

/**
 * 是否是布尔值
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isBoolean(123) // false
 * isBoolean(Boolean('1')) // true
 * isBoolean(true) // true
 * ```
 *
 * @public
 */
export function isBoolean (arg: any): boolean {
  return isTypeOf(arg) === 'boolean'
}
