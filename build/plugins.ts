/// <reference types="vitest" />
import path from 'node:path'
import {fileURLToPath, URL} from "node:url";
import vue2 from "@vitejs/plugin-vue2";
import vue2Jsx from "@vitejs/plugin-vue2-jsx";
import legacy from "@vitejs/plugin-legacy";
import Compression from "unplugin-compression/vite";
import UnpluginSvgComponent from "unplugin-svg-component/vite";
import {codeInspectorPlugin} from "code-inspector-plugin";
import TurboConsole from "unplugin-turbo-console/vite";
import {viteCommonjs} from "@originjs/vite-plugin-commonjs";
import requireTransform from "vite-plugin-require-transform";
import tsconfigPaths from 'vite-tsconfig-paths'
import Info from 'unplugin-info/vite'
import {webUpdateNotice} from '@plugin-web-update-notification/vite'

/**
 * @Author: longmo
 * @Date: 2025-01-04 12:11:37
 * @LastEditTime: 2025-01-04 12:59:50
 * @FilePath: build/plugins.ts
 * @Description:
 */

export const src = fileURLToPath(new URL('../src', import.meta.url))
export const types = fileURLToPath(new URL('../types', import.meta.url))

const getFilePath = (_path: string) => path.join(src, _path)
const getTypesPath = (_path: string) => path.join(types, _path)

export function definePlugins() {
    return [
        /**
         * Vue2 plugin
         * @link https://github.com/vitejs/vite-plugin-vue2
         */
        vue2(),
        /**
         * Vue2Jsx plugin
         * @link https://github.com/vitejs/plugin-vue2-jsx
         */
        vue2Jsx(),
        /**
         * legacy plugin
         * @link https://github.com/vitejs/vite/tree/main/packages/plugin-legacy
         */
        legacy({
            targets: ["ie >= 11"],
            additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // 添加 polyfill
        }),

        /**
         * compress assets
         * @link https://github.com/vbenjs/vite-plugin-compression
         */
        // viteCompression(),

        /**
         * svg组件自动导入
         * @link https://github.com/jevon617/unplugin-svg-component
         */
        UnpluginSvgComponent({
            iconDir: getFilePath("assets/svgIcons"),
            scanStrategy: "component",
            dts: true,
            dtsDir: types,
            preserveColor: /colorfull.*\.svg$/,
            // componentStyle:
            //   "width: 1em; height: 1em; fill:currentColor; scale: 1.2",
        }),

        /**
         * Code Inspector Plugin
         * @link https://github.com/zh-lx/code-inspector
         */
        codeInspectorPlugin({
            bundler: "vite",
        }),

        /**
         * Turbo Console
         * @link https://github.com/unplugin/unplugin-turbo-console
         */
        TurboConsole({
            extendedPathFileNames: ["index"],
        }),

        /**
         * A vite plugin that support commonjs to esm in vite
         * @link https://github.com/originjs/vite-plugins/tree/main/packages/vite-plugin-commonjs
         */
        viteCommonjs(),

        /**
         * Transform require to import
         * @link https://github.com/WarrenJones/vite-plugin-require-transform
         */
        requireTransform({fileRegex: /.ts$|.vue$|.png$|.tsx$|.jpg$/}),

        /**
         * Compress dist to zip, tar, taz
         * @link https://github.com/KeJunMao/unplugin-compression
         */
        Compression({
            adapter: 'zip',
            // source: path.join('./', `dist-${process.env.npm_package_version}`),
            source: path.join('./', `dist`),
            outDir: path.join('./'),
        }),

        /**
         * Give vite the ability to resolve imports using TypeScript's path mapping.
         * @link https://github.com/aleclarson/vite-tsconfig-paths
         */
        tsconfigPaths(),

        /**
         * Export build information as virutal module.
         * This plugin helps you add build timestamp / commit SHA / CI environment / package.json / ... to your application. So you can easily check whether the production version meets your expectations, or config your application.
         * @link https://github.com/yjl9903/unplugin-info
         */
        Info(),

        /**
         * Detect webpage updates and notify user to reload. support vite, umijs and webpack.
         * @link https://github.com/GreatAuk/plugin-web-update-notification
         */
        webUpdateNotice({
            locale: 'zh_CN',
            logVersion: true,
        }),
    ]
}
