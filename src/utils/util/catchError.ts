/**
 * 添加全局异常捕获, 修改 wpk-reporter 配置
 * 该方法，已做他用，用于修改wpk异常捕获配置
 * @param vueConfig - vue2 送 Vue.config vue3 送 app.config
 * @example
 *
 * ```ts
 * catchError(Vue.config) // vue 2.x
 * catchError(app.config) // vue 3.x
 * ```
 *
 * @public
 */
export function catchError(vueConfig = {}): void {
  // 捕获js异常
  window.addEventListener(
    "error",
    (e) => {
      console.log("%c [全局捕获异常] ", "color: red", e);
      return true;
    },
    true
  );
  // 处理未捕获的异常，主要是promise内部异常，统一抛给 onerror
  window.addEventListener("unhandledrejection", (e) => {
    console.log("%c [unhandledrejection] ", "color: red", e);
    e.preventDefault();
  });
  vueConfig.errorHandler = (err) => {
    console.log(`%c [vue error] ` + err.stack, "color: red");
  };
  vueConfig.warnHandler = function name(err, vm, trace) {
    console.log("%c [vue warn] " + err + trace, "color: red");
  };
}
