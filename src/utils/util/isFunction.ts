import { isTypeOf } from './isTypeOf'

/**
 * 是否是函数
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isFunction(function(){}) // true
 * ```
 *
 * @public
 */
export function isFunction (arg: any): boolean {
  return isTypeOf(arg) === 'function'
}
