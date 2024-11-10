import { isTypeOf } from './isTypeOf'

/**
 * 是否是Set
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isSet(new Set([1,2,3])) // true
 * ```
 *
 * @public
 */
export function isSet (arg: any): boolean {
  return isTypeOf(arg) === 'set'
}
