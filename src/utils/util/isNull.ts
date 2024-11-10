import { isTypeOf } from './isTypeOf'

/**
 * 是否是null
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isNull(null) // true
 * isNull(1) // false
 * ```
 *
 * @public
 */
export function isNull (arg: any): boolean {
  return isTypeOf(arg) === 'null'
}
