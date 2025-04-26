/// <reference types="vitest" />
import path from 'node:path'
import {fileURLToPath, URL} from "node:url";
import vue2 from "@vitejs/plugin-vue2";
import vue2Jsx from "@vitejs/plugin-vue2-jsx";
import legacy from "@vitejs/plugin-legacy";
import Compression from "unplugin-compression/vite";
import {codeInspectorPlugin} from "code-inspector-plugin";
import {viteCommonjs} from "@originjs/vite-plugin-commonjs";
import requireTransform from "vite-plugin-require-transform";
import tsconfigPaths from 'vite-tsconfig-paths'
import Info from 'unplugin-info/vite'
import {webUpdateNotice} from '@plugin-web-update-notification/vite'
// import VueRouter from 'unplugin-vue-router/vite' // @vue-macros/common
import MetaLayouts from 'vite-plugin-vue-meta-layouts'
import Icons from 'unplugin-icons/vite'
import {FileSystemIconLoader} from 'unplugin-icons/loaders';
import {promises as fs} from "fs";

/**
 * @Author: longmo
 * @Date: 2025-01-04 12:11:37
 * @LastEditTime: 2025-02-24 10:36:36
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
         * unplugin-vue-router
         * File based typed routing for Vue Router
         * only for vue3
         * ⚠️ Vue must be placed after VueRouter()
         * import { routes } from "vue-router/auto-routes";
         * @link https://github.com/posva/unplugin-vue-router
         */
        // VueRouter({
        //     routesFolder: 'src/views',
        //     // dts: '../types/typed-router.d.ts',
        //     dts: getTypesPath('./typed-router.d.ts'),
        // }),

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
         * 因为原来的 vite-plugin-vue-layouts 在 layout 组件中修改css 热更新不生效，故而换成这个
         * @link https://github.com/dishait/vite-plugin-vue-meta-layouts
         */
        MetaLayouts({
            // 打开修复 https://github.com/JohnCampionJr/vite-plugin-vue-layouts/issues/134，默认为 false 关闭
            skipTopLevelRouteLayout: true,
        }),

        /**
         * svg组件自动导入
         * @link https://github.com/jevon617/unplugin-svg-component
         */
        // UnpluginSvgComponent({
        //     iconDir: getFilePath("assets/svgIcons"),
        //     scanStrategy: "component",
        //     dts: true,
        //     dtsDir: types,
        //     preserveColor: /colorfull.*\.svg$/,
        //     // componentStyle:
        //     //   "width: 1em; height: 1em; fill:currentColor; scale: 1.2",
        // }),

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
        // TurboConsole({
        //     extendedPathFileNames: ["index"],
        // }),

        /**
         * A vite plugin that support commonjs to esm in vite
         * @link https://github.com/originjs/vite-plugins/tree/main/packages/vite-plugin-commonjs
         */
        viteCommonjs(),

        /**
         * Transform require to import 让vite支持require
         * @link https://github.com/WarrenJones/vite-plugin-require-transform
         */
        requireTransform({fileRegex: /.ts$|.vue$|.png$|.tsx$|.jpg$/}),

        /**
         * Compress dist to zip, tar, taz
         * @link https://github.com/KeJunMao/unplugin-compression
         */
        Compression({
            adapter: 'zip',
            source: path.join('./', `dist-${process.env.npm_package_version}`),
            // source: path.join('./', `dist`),
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

        Icons({
            compiler: 'vue3',
            // autoInstall: true,
            customCollections: {
                'my-yet-other-icons': FileSystemIconLoader(getFilePath('./assets/svgIcons/my-yet-other-icons'), (svg) => {
                        return svg.replace(/^<svg /, '<svg fill="currentColor" ')
                    }
                ),
                'custom': {
                    download: () => fs.readFile(getFilePath('./assets/svgIcons/custom/download.svg'), 'utf8'),
                },
                // key as the collection name
                'my-icons': {
                    'discord': `<svg class="homeIcon-AaowEC" aria-hidden="false" viewBox="0 0 28 20">
						  <path fill="currentColor"
							  d="M23.0212 1.67671C21.3107 0.879656 19.5079 0.318797 17.6584 0C17.4062 0.461742 17.1749 0.934541 16.9708 1.4184C15.003 1.12145 12.9974 1.12145 11.0283 1.4184C10.819 0.934541 10.589 0.461744 10.3368 0.00546311C8.48074 0.324393 6.67795 0.885118 4.96746 1.68231C1.56727 6.77853 0.649666 11.7538 1.11108 16.652C3.10102 18.1418 5.3262 19.2743 7.69177 20C8.22338 19.2743 8.69519 18.4993 9.09812 17.691C8.32996 17.3997 7.58522 17.0424 6.87684 16.6135C7.06531 16.4762 7.24726 16.3387 7.42403 16.1847C11.5911 18.1749 16.408 18.1749 20.5763 16.1847C20.7531 16.3332 20.9351 16.4762 21.1171 16.6135C20.41 17.0369 19.6639 17.3997 18.897 17.691C19.3052 18.4993 19.7718 19.2689 20.3021 19.9945C22.6677 19.2689 24.8929 18.1364 26.8828 16.6466H26.8893C27.43 10.9731 25.9665 6.04728 23.0212 1.67671ZM9.68041 13.6383C8.39754 13.6383 7.34085 12.4453 7.34085 10.994C7.34085 9.54272 8.37155 8.34973 9.68041 8.34973C10.9893 8.34973 12.0395 9.54272 12.0187 10.994C12.0187 12.4453 10.9828 13.6383 9.68041 13.6383ZM18.3161 13.6383C17.0332 13.6383 15.9765 12.4453 15.9765 10.994C15.9765 9.54272 17.0124 8.34973 18.3161 8.34973C19.6184 8.34973 20.6751 9.54272 20.6543 10.994C20.6543 12.4453 19.6184 13.6383 18.3161 13.6383Z">
						  </path>
					  </svg>`,
                    'logo': () => fs.readFile(getFilePath('./assets/svgIcons/logo.svg'), 'utf8'),
                    'download': () => fs.readFile(getFilePath('./assets/svgIcons/custom/download.svg'), 'utf8'),
                },
            },
        }),
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
