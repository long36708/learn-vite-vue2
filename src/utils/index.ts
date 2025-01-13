// util
export * from "./util/isTypeOf";
export * from "./util/isArray";
export * from "./util/isObject";
export * from "./util/isNumber";
export * from "./util/isString";
export * from "./util/isBoolean";
export * from "./util/isNull";
export * from "./util/isUndefined";
export * from "./util/isDate";
export * from "./util/isRegExp";
export * from "./util/isSymbol";
export * from "./util/isFunction";
export * from "./util/isError";
export * from "./util/isPromise";
export * from "./util/isSet";
export * from "./util/isMap";
export * from "./util/isEmptyObject";
export * from "./util/isNil";
export * from "./util/catchError";

/**
 * 判断一个数值落在给定的哪个区间内
 *
 * @param value 要判断的数值
 * @param interval 包含多个区间的数组，每个区间由一个二元组表示
 * @returns 如果找到符合条件的区间，则返回该区间；否则返回undefined
 */
export function judge(
  value: number,
  interval: Array<[number, number]>
): [number, number] | undefined {
  return interval.find((item) => {
    if (value > item[0] && value <= item[1]) {
      return true;
    }
    return false;
  });
}
