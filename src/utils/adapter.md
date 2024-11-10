---
title: 适配器
lang: zh-CN
---

# 适配器

适配器方法意义抹平Vue2、Vue3的语法差异，统一方法调用

## getModelAdapter() 双向绑定兼容

v-model 适配器

- 用法

```js
import { defineComponent } from 'vue-demi'
import { getModelAdapter } from "@longmo/components";
const modelAdapter = getModelAdapter()
defineComponent({
    props: {
        // v-model
        // vue2 = value
        // vue3 = modelValue
        [modelAdapter.modelValue]: {
            type: [String, Number],
            default: ''
        }
    },
    emits: [modelAdapter.modelEvent],
    setup (props, {emit}) {
        // vue2=input 
        // vue3=update:modelValue
        emit([modelAdapter.modelEvent], '...')
    }
})
```

## getVNodeOptions(options) 渲染函数参数兼容处理

兼容处理`createElement()`参数差异

vue2 [createElement](https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0)
```js
// vue2
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
```
vue3 [createElement](https://v3.cn.vuejs.org/guide/render-function.html#h-%E5%8F%82%E6%95%B0)
```js
// 3.x 语法
{
    class: ['button', { 'is-outlined': isOutlined }],
    style: [{ color: '#34495E' }, { backgroundColor: buttonColor }],
    id: 'submit',
    innerHTML: '',
    onClick: submitForm,
    key: 'submit-button'
}
```

- 用法

```js 
import { defineComponent } from 'vue-demi'
import { getVNodeOptions } from "@longmo/components";
defineComponent({
    render () {
        const props = getVNodeOptions({
            ref: 'ref1',
            props: {
                name: 'zhangs'
            },
            class: ['class-1']
            on: {
                click () {
                    // ...
                }
            }
        })
        return <component-1 {...props}></component-1>
    }
})
```


## h(type, options, chidren) 渲染函数

支持组件外部调用

兼容`vue2` `vue3` 的 `h`(createElement的别名)函数

内部对`options`使用`getVNodeOptions`进行了兼容处理

- 用法

```js
import { defineComponent } from 'vue-demi'
import { h } from "@longmo/components";
import CompA from 'module-a'
defineComponent({
    render () {
        const props = {
            ref: 'ref1',
            props: {
                name: 'zhangs'
            },
            class: ['class-1']
            on: {
                click () {
                    // ...
                }
            }
        }
        return h(CompA, props)
    }
})
```

## getSlots(name, [$slots]) 获取插槽

兼容处理插槽

- 用法

`$slots`可选，不送则从`this.$slots`取    

```js
import { defineComponent } from 'vue-demi'
import { getSlots } from '@longmo/components'
defineComponent({
    render () {
        // 或者 getSlots('default', this.$slots)
        const defaultSlot = getSlots.call(this, 'default') 
        
        // vue2 = this.$slots.default
        // vue3 = this.$slots.default()
        return h('div', {}, [ defaultSlot ] )
        // jsx 语法
        return <div>{ defaultSlot }</div>
    }
})
```

## getScopedSlots(name, $scopedslots) 获取作用域插槽

`$slots`可选，不送则从`this.$slots`取    

```js
import { defineComponent } from 'vue-demi'
import { getScopedSlots } from '@longmo/components'
defineComponent({
    render () {
        // 或者 getScopedSlots('default', this.$slots)
        const defaultScopedSlot = getScopedSlots.call(this, 'default') 
        
        // vue2 = this.scopedSlots.default
        // vue3 = this.$slots.default
        return h('div', {}, [ defaultScopedSlot('args') ] )
        // jsx 语法
        return <div>{ defaultScopedSlot('args') }</div>
    }
})
```

## compileComponent(componentDefinition, props = {}) 编译组件

传入组件定义，返回组件渲染后的`html`

- 用法

CompA.vue 

```vue
<template>
    <div>
        <span>{{ name }}</span>：<span>{{ age }}</span>
    </div>
</template>
<script>
export default {
    props: {
        name: {
            type: String,
            default: ''
        },
        age: {
            type: NUmber,
            default: 0
        }
    }
}
</script>
```

组件外调用

```js

import { compileComponent } from '@longmo/components'
import CompA from './CompA.vue'
const compiledHtml = compileComponent(CompA, {name, 'zhangs'， age: 18})

/**
  *compiledHtml =  `<div>
        <span>zhangs</span>：<span>18</span>
    </div>`
 */

```

## createInstance(componentDefinition[, props][, rootEl]) 创建组件实例

使用传入的组件定义，动态创建组件实例，写命令式API时用

- 参数
    - `componentDefinition`：组件定义
    - `props`：可选，组件props
    - `rootEl`：可选，挂载组件的DOM或选择器字符串


- 用法

简单用法

```js
import { createInstance } from '@longmo/components'
import DialogA from './DialogA.vue'

const showDialog = () => {
    return {
        show (props) {
            // 传入挂载的dom
            const root = document.body
            const { instance, unmount } = createInstance(DialogA, {
                type: 1,
                onClose () {
                    unmount()
                }
            }, root)
            instance.show()
        }
    }
}

```

自定义挂载卸载方法

```js
import { createInstance } from '@longmo/components'
import DialogA from './DialogA.vue'

const showDialog = () => {
    return {
        app: null,
        instance: null,
        el: null,
        show (props) {
            const { app, instance, el } = createInstance(DialogA, {
                type: 1,
                onClose () {
                    this.hide()
                }
            })
            this.instance = instance
            this.el = el 
            this.app = app
            document.body.appendChild(this.el)    
            this.instance.show()
        },
        hide () {
            if (this.app) {
                document.body.removeChild(this.el)
                this.app.unmount()
                this.instance = null
            }
        }
    }
}

```
