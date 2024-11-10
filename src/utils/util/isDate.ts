import { isTypeOf } from './isTypeOf'

/**
 * 是否是日期对象
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isDate(new Date()) // true
 * ```
 *
 * @public
 */
export function isDate (arg: any): boolean {
  return isTypeOf(arg) === 'date'
}
