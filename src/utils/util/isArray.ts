import { isTypeOf } from './isTypeOf'

/**
 * 是否是数组
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isArray({}) // false
 * isArray(1) // false
 * isArray([]) // true
 * ```
 *
 * @public
 */
export function isArray (arg: any): boolean {
  return isTypeOf(arg) === 'array'
}
