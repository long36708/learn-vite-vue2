import { isTypeOf } from './isTypeOf'

/**
 * 是否是错误对象
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isError(new Error('122')) // true
 * ```
 *
 * @public
 */
export function isError (arg: any): boolean {
  return isTypeOf(arg) === 'error'
}
