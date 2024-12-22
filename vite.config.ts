import { fileURLToPath, URL } from "node:url";

import { defineConfig, type UserConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue2 from "@vitejs/plugin-vue2";
import vue2Jsx from "@vitejs/plugin-vue2-jsx";
import { visualizer } from "rollup-plugin-visualizer";
import requireTransform from "vite-plugin-require-transform";
import { viteCommonjs, esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import UnpluginSvgComponent from "unplugin-svg-component/vite";

/**
 * Vite Configure
 *
 * @see {@link https://vitejs.dev/config/}
 */
export default defineConfig(({ command, mode }): UserConfig => {
  const config: UserConfig = {
    // https://vitejs.dev/config/shared-options.html#base
    base: "./",
    server: {
      host: "0.0.0.0",
      // 指定服务器应该监听哪个IP 地址
      port: 8082, // 端口号
      open: true, // 是否自动打开浏览器
      strictPort: false, // 当true时，若端口被占用，则会直接退出
      https: false, // 是否启用 TLS + HTTP/2
      proxy: {
        // 配置自定义代理规则
        "/api": {
          target: "http://jsonplaceholder.typicode.com",
          changeOrigin: true,
          cors: true, // 允许跨域
          rewrite: (path) => path.replace(/^\/api/, ""),
          configure: (proxy, options) => {
            // 配置此项可在响应头中看到请求的真实地址
            proxy.on("proxyRes", (proxyRes, req) => {
              proxyRes.headers["x-real-url"] =
                new URL(req.url || "", options.target as string)?.href || "";
            });
          },
        },
      },
    },
    plugins: [
      // Vue2
      // https://github.com/vitejs/vite-plugin-vue2
      vue2(),
      vue2Jsx(),
      legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"], // 添加 polyfill
      }),
      // compress assets
      // https://github.com/vbenjs/vite-plugin-compression
      // viteCompression(),
      UnpluginSvgComponent({
        iconDir: "src/assets/svgIlcons",
        dts: true,
        dtsDir: "src/types",
        // componentStyle:
        //   "width: 1em; height: 1em; fill:currentColor; scale: 1.2",
      }),
      viteCommonjs(),
      requireTransform({ fileRegex: /.ts$|.vue$|.png$|.tsx$|.jpg$/ }),
    ],
    optimizeDeps: {
      exclude: ["vue-demi"],
      esbuildOptions: {
        plugins: [esbuildCommonjs(["react-calendar", "react-date-picker"])],
      },
    },
    resolve: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~": fileURLToPath(new URL("./node_modules", import.meta.url)),
      },
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
    },
    build: {
      // https://vitejs.dev/config/build-options.html#build-target
      target: "es2015",
      // Minify option
      // https://vitejs.dev/config/build-options.html#build-minify
      minify: "esbuild",
      // Rollup Options
      // https://vitejs.dev/config/build-options.html#build-rollupoptions
      rollupOptions: {
        output: {
          manualChunks: {
            // Split external library from transpiled code.
            vue: [
              "vue",
              "vue-router",
              "vue-router/composables",
              // "vuex",
              // 'vuex-persist',
              // 'deepmerge'
            ],
          },
          plugins: [
            mode === "analyze"
              ? // rollup-plugin-visualizer
                // https://github.com/btd/rollup-plugin-visualizer
                visualizer({
                  open: true,
                  filename: "dist/stats.html",
                  // gzipSize: true,
                  // brotliSize: true,
                })
              : undefined,
          ],
        },
      },
    },
    esbuild: {
      // Drop console when production build.
      drop: command === "serve" ? [] : ["console"],
    },
  };
  return config;
});
