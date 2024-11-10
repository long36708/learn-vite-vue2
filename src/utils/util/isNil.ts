import { isNull } from "./isNull";
import { isUndefined } from "./isUndefined";

/**
 * 检测`value`是否是`null`或`undefined`
 * @param value - 待检测值
 * @returns boolean
 * @example 
 * ```ts
 * isNil(null); // => true
 * isNil(void 0); // => true
 * isNil(NaN); // => false
 * ```
 */
export function isNil (value: any): boolean {
    if (isUndefined(value)) {
        return true
    } else {
        return isNull(value)
    }
}