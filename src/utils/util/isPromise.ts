import { isTypeOf } from './isTypeOf'

/**
 * 是否是Promise
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isError(new Promise(()=>{})) // true
 * ```
 *
 * @public
 */
export function isPromise (arg: any): boolean {
  return isTypeOf(arg) === 'promise'
}
