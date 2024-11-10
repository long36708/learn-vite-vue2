import { isObject, isString } from ".";
import { isVue2, h as createElement, createApp } from "vue-demi";

/**
 * v-model 适配器
 * @returns
 */
const getModelAdapter = () => {
  return {
    modelValue: isVue2 ? "value" : "modelValue",
    modelEvent: isVue2 ? "input" : "update:modelValue",
  };
};

/**
 * 适配事件绑定
 * @param {*} ons
 * @returns
 */
const adaptOnsV3 = (ons) => {
  if (!ons) return null;
  return Object.entries(ons).reduce((ret, [key, handler]) => {
    key = key.charAt(0).toUpperCase() + key.slice(1);
    key = `on${key}`;
    return { ...ret, [key]: handler };
  }, {});
};

/**
 * 兼容vue2 vue3 的 h函数
 * @param {*} type
 * @param {*} options Vue2 格式
 * @param {*} chidren
 * @returns
 */
const h = (type, options, chidren) => {
  if (isVue2) return createElement(type, options, chidren);
  const params = getVNodeOptions(options);
  return createElement(type, params, chidren);
};

/**
 * 处理vue2 vue3 的 createElement参数
 * @param {*} options
 * ```
 *
 * // vue2 https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0
    {
      staticClass: 'button',
      class: { 'is-outlined': isOutlined },
      staticStyle: { color: '#34495E' },
      style: { backgroundColor: buttonColor },
      attrs: { id: 'submit' },
      domProps: { innerHTML: '' },
      on: { click: submitForm },
      nativeOn: {change: onChange}
      key: 'submit-button'
    }
 * // vue3 https://v3.cn.vuejs.org/guide/render-function.html#h-%E5%8F%82%E6%95%B0
    // 3.x 语法
    {
      class: ['button', { 'is-outlined': isOutlined }],
      style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
      id: 'submit',
      innerHTML: '',
      onClick: submitForm,
      key: 'submit-button'
    }
 * ```
 */
const getVNodeOptions = (options) => {
  if (isVue2) {
    return options;
  } else {
    const { props, domProps, on, nativeOn, attrs, ...extraOptions } = options;
    const ons = adaptOnsV3(on);
    const nativeOns = adaptOnsV3(nativeOn);
    return {
      ...extraOptions,
      ...attrs,
      ...props,
      ...domProps,
      ...ons,
      ...nativeOns,
    };
  }
};

/**
 * 适配获取插槽
 * @param {*} name 插槽的名称
 * @param {*} $slots 可选参数，默认从this中获取
 * ```
 * render () {
 *  // 设置上下文 修改this指向
 *  const defaultSlot = getSlots.call(this, 'default')
 *  // or 传入 $slots
 *  const defaultSlot = getSlots('default', this.$slots)
 * }
 * ```
 */
const getSlots = function (name, $slots) {
  let slot = null;
  if ($slots) {
    slot = $slots[name];
  } else {
    slot = this.$slots ? this.$slots[name] : null;
  }
  return isVue2 ? slot : slot && slot();
};

/**
 * 适配获取命名插槽
 * @param {*} name 插槽的名称
 * @param {*} $scopedslots 可选
 * ```
 * const scopedSlotDefault = getScopedSlots.call(this, 'default')
 * scopedSlotDefault({}) // 调用插槽传参
 * ```
 */
const getScopedSlots = function (name, $scopedslots) {
  let scopedSlot = null;
  if ($scopedslots) {
    scopedSlot = $scopedslots[name];
  } else {
    if (isVue2) {
      scopedSlot = this.$scopedSlots ? this.$scopedSlots[name] : null;
    } else {
      scopedSlot = this.$slots ? this.$slots[name] : null;
    }
  }
  return scopedSlot;
};

/**
 * 传入组件 返回组件编译后的html
 * @param {*} componentDefinition
 * @param {*} props
 * @returns html
 */
const compileComponent = function (componentDefinition, props = {}) {
  const appElWrapper = document.createElement("div");
  const appEl = document.createElement("div");
  appElWrapper.appendChild(appEl);
  const app = createApp(componentDefinition, props);
  app.mount(appEl);
  // vue2 会把挂载的el给替换了，vue3则会添加到挂载el里
  return isVue2 ? appElWrapper.innerHTML : appEl.innerHTML;
};

/**
 * 基于一个组件定义，动态创建组件实例
 * @param {*} componentDefinition
 * @param {*} props
 * @returns {el: HTMLElement, instance: Object}
 */
const createInstance = function (componentDefinition, props = {}, root = null) {
  const appElWrapper = document.createElement("div");
  const appEl = document.createElement("div");
  appElWrapper.appendChild(appEl);
  const app = createApp(componentDefinition, props);
  let instance = app.mount(appEl);
  const el = isVue2 ? appElWrapper : appEl;
  let rootEl = null;
  if (root) {
    if (isString(root)) {
      rootEl = document.querySelector(root);
    } else {
      rootEl = root;
    }
  }
  if (rootEl) {
    rootEl.appendChild(el);
  }
  return {
    app,
    instance: instance,
    el,
    unmount: () => {
      if (instance) {
        isVue2 && instance.$destroy();
        instance = null;
      }
      if (app) {
        app.unmount();
      }
      if (rootEl) {
        rootEl.removeChild(el);
      }
    },
  };
};

export {
  getModelAdapter,
  h,
  getSlots,
  getScopedSlots,
  getVNodeOptions,
  compileComponent,
  createInstance,
};
