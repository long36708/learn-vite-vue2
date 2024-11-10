import { isTypeOf } from './isTypeOf'

/**
 * 是否是符号
 * @param arg - 参数
 * @returns `true|false`
 * @example
 * ```ts
 * isSymbol(Symbol(1)) // true
 * ```
 *
 * @public
 */
export function isSymbol (arg: any): boolean {
  return isTypeOf(arg) === 'symbol'
}
