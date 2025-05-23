/// <reference types="vitest/config" />
import { fileURLToPath, URL } from "node:url";
import { defineConfig, type UserConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import { esbuildCommonjs } from "@originjs/vite-plugin-commonjs";
import { definePlugins } from "./build/plugins";
import process from "node:process";
import { version } from "./package.json";

console.log(
  "%c Line:16🍷 npm_package_version",
  "color:#3f7cff",
  process.env.npm_package_version
);
/**
 * Vite Configure
 *
 * @see {@link https://vitejs.dev/config/}
 */
export default defineConfig(({ command, mode }): UserConfig => {
  const config = {
    // https://vitejs.dev/config/shared-options.html#base
    base: "./",
    server: {
      /** 设置 host: true 才可以使用 Network 的形式，以 IP 访问项目 */
      host: true,
      // host: "0.0.0.0",
      /** 跨域设置允许 */
      cors: true,
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
    plugins: definePlugins(),
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
      api: "modern-compiler", // 使用了现代编译器 API 来处理 SCSS 文件，否则控制台会报错
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "@/styles/variables.scss";`,
          api: "modern-compiler", // 使用了现代编译器 API 来处理 SCSS 文件，否则控制台会报错
        },
      },
    },
    define: {
      __LM__VERSION__: JSON.stringify(version),
    },
    build: {
      outDir: `dist-${process.env.npm_package_version}`,
      // https://vitejs.dev/config/build-options.html#build-target
      target: "es2015",
      /** 消除打包大小超过 500kb 警告 */
      chunkSizeWarningLimit: 2000,
      /** 打包后静态资源目录 */
      assetsDir: "static",
      sourcemap: true,
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
    /**
     *  Vitest 单元测试配置
     * @link https://cn.vitest.dev/config
     */
    test: {
      include: ["tests/**/*.test.ts", "*/**/__tests__/**/*.ts"],
      environment: "jsdom",
      globals: true, // 使用类似 jest 中的全局 API
    },
  };
  return config as UserConfig;
});
