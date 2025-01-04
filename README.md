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
