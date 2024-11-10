import { isTypeOf } from './isTypeOf'

/**
 * 是否是undefined
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isUndefined(undefined) // true
 * isUndefined(a) // true a未定义
 * isUndefined(void 0) // true
 * ```
 *
 * @public
 */
export function isUndefined (arg: any): boolean {
  return typeof arg === String(void 0)
}
