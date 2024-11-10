import { isTypeOf } from './isTypeOf'

/**
 * 是否是正则
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isRegExp(/^\d+/) // true
 * isRegExp(new RegExp("\w")) // true
 * ```
 *
 * @public
 */
export function isRegExp (arg: any): boolean {
  return isTypeOf(arg) === 'regexp'
}
