# learn-vite-vue2

这个模板应该可以帮助您开始在Vite中使用Vue 2进行开发。

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and
disable
Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript不能处理'的类型信息。所以我们用‘ vue-tsc ’来代替‘ tsc
’命令行进行类型检查。在编辑器中，我们需要[TypeScript Vue Plugin (Volar)]（https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin）来让TypeScript语言服务意识到'。vue的类型。

如果你觉得独立的TypeScript插件不够快，Volar还实现了一个性能更高的[接管模式]（https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669）。您可以通过以下步骤启用它：

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint
```

## 笔记

创建一个vue2的项目(已经不推荐使用vue-cli,推荐create-vue)

```shell
npm create vue@legacy
```

## Troubleshooting 故障排除

When adding or deleting files, an error may occur and even if the error is corrected, it may not be reflected in
devServer.

在添加或删除文件时，可能会出现错误，即使错误得到纠正，也可能不会在devServer中反映出来。

In that case, stop devServer and delete all the files in the `node_modules/.vite` directory. You can also run it with
the `clean` command.

在这种情况下，请停止devServer并删除node_modules目录下的`.vite`中的所有文件”目录。
您也可以使用`clean`命令运行它.

## 技术栈

- vxe-table
    - https://vxetable.cn/v3/#/demo/list
- vue-query
    - https://tanstack.com/query/latest/docs/framework/vue/overview
- vue-use
    - https://github.com/vueuse/vueuse#readme
    - https://vueuse.org/
- vee-validate@3
    - https://vee-validate.logaretm.com/v3

- histoire
    - https://histoire.dev/

## 组件封装技巧

- 使用下划线开头标识是内部属性,例如 _pageSize
- 父组件优先处理逻辑
    - 通过先触发 `emit` 事件，可以让父组件有机会首先处理这个值的变化。父组件可能会根据新的值执行一些额外的逻辑或验证。
    - 如果先更新本地状态，然后再触发事件，可能会导致组件内部的状态和父组件传递的状态不同步，尤其是在父组件有复杂的状态管理或验证逻辑时。
    - 在 Vue 的双向绑定场景中（如 `v-model`），确保父组件的状态总是最先被更新，可以避免潜在的竞争条件和不一致问题。

- 绑定属性和事件：
    - functional 组件 v-bind="data.attrs" v-on="listeners"
        - 通过v-bind="data.attrs"和v-on="listeners"将父组件传递的属性和事件绑定到根元素上
        - 这里的 `data.attrs` 是由 Vue 的 functional 组件上下文提供的对象，包含了父组件传递的所有属性（props、class、style
          等）。
        - 通过这种方式，可以确保所有父组件传递的属性都能正确绑定到当前元素上。
        - 因为 functional 组件没有实例，所以不能直接使用 `$attrs`
    - 普通组件 v-bind="$attrs" v-on="$listeners"
        - `$attrs` 是 Vue 提供的一个特殊变量，包含父组件传递的所有非 prop 属性（如 class、style、事件监听器等），但不包括
          props。
        - 它通常用于将这些属性传递给子组件或更深层次的组件。

- node_modules/histoire/dist/node/vite.js
  line: 197

```text
    <script>
   // Define global variable
   IconifyProviders = {
       // Empty prefix: overwrite default API provider configuration
       '': {
           // Use custom API first, use Iconify public API as backup
           resources: [
               'http://localhost:3000',
               'https://api.iconify.design',
           ],
           // Wait for 1 second before switching API hosts
           rotate: 1000,
       },
   };
</script>
```

## 若是npm
直接修改 histoire 的node_modules中的内容
```shell
npx patch-package histoire
```
生成 patch 文件，提交到远程
在package.json中
```json
{
	"scripts": {
		"postinstall": "patch-package"
	}
}
```
### 若是pnpm
先执行 `pnpm patch-package histoire@0.17.17`

然后根据提示，修改 `node_modules/.pnpm/histoire@0.17.17/node_modules/histoire/dist/node/vite.js`

最后执行 `pnpm patch-commit <path>`

```ts
import {createHighlighter} from 'shiki'
import {createOnigurumaEngine} from 'shiki/engine/oniguruma'

const highlighter = await createHighlighter({
    themes: ['dracula', 'one-dark-pro', 'github-dark', 'slack-dark'],
    engine: createOnigurumaEngine(() => import('shiki/wasm')),
});

const md = new MarkdownIt({
    highlight: (code, lang) => `<div class="htw-relative htw-not-prose __histoire-code"><div class="htw-absolute htw-top-0 htw-right-0 htw-text-xs htw-text-white/40">${lang}</div>${highlighter.codeToHtml(code, {
        themes: {
            light: 'github-light',
            dark: 'github-dark',
            dim: 'github-dimmed',
        },
        lang,
    })}</div>`,
    linkify: true,
    html: true,
    breaks: false,
});
```
