/**
 * 安全的类型检查
 * @param  arg - 判断的参数
 * @returns 返回类型字符串
 * @example
 * ```ts
 * isTypeOf(10);                  // "number"
 * isTypeOf("abc");               // "string"
 * isTypeOf(true);                // "boolean"
 * isTypeOf(null);                // "null"
 * isTypeOf(undefined);           // "undefined"
 * isTypeOf({a: 1});              // "object"
 * isTypeOf([1,2,3]);             // "array"
 * isTypeOf(new Date());          // "date"
 * isTypeOf(/^\d{6}$/);           // "regexp"
 * isTypeOf(Symbol('1'));         // "symbol"
 * isTypeOf(function(){});        // "function"
 * isTypeOf(new Error());         // "error"
 * isTypeOf(new Promise(()=>{})); // "promise"
 * isTypeOf(new Set());           // "set"
 * isTypeOf(new Map());           // "map"
 * isTypeOf(Math);                // "math"
 * ```
 * @public
 */
export function isTypeOf (arg: any): string {
  return Object.prototype.toString
    .call(arg)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase()
}
