import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import vue2 from "@vitejs/plugin-vue2";
import vue2Jsx from "@vitejs/plugin-vue2-jsx";
import { visualizer } from "rollup-plugin-visualizer";
/**
 * Vite Configure
 *
 * @see {@link https://vitejs.dev/config/}
 */
export default defineConfig(({ command, mode }): UserConfig => {
  const config: UserConfig = {
    // https://vitejs.dev/config/shared-options.html#base
    base: "./",
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
    ],
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
              "vuex",
              // 'vuex-persist',
              // 'deepmerge',
              // "@logue/vue2-helpers",
              // "@logue/vue2-helpers/teleport",
              // "@logue/vue2-helpers/vue-router",
              // "@logue/vue2-helpers/vuex",
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
  };
  return config;
});
