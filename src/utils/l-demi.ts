import { isRef, unref } from "vue-demi";

/**
 * 将值、refs 或 getters 规范化为值。
 * 这与 unref() 类似，不同的是此函数也会规范化 getter 函数。
 * 如果参数是一个 getter，它将会被调用并且返回它的返回值。
 */
export function toValue(value) {
  if (isRef(value)) {
    // 如果是 ref 对象，返回其 .value
    return unref(value);
  } else if (typeof value === "function") {
    // 如果是函数（getter），调用该函数并返回结果
    return value();
  } else {
    // 如果是普通值，直接返回
    return value;
  }
}
