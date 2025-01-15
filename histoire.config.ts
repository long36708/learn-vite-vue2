/**
 * @Author: longmo
 * @Date: 2025-01-04 16:03:18
 * @LastEditTime: 2025-01-15 20:27:54
 * @FilePath: histoire.config.ts
 * @Description:
 */
import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue2";

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: [
    // "../src/components/**/*.story.vue",
    // "../src/components/AButton/Button.story.vue",
    // '@ui/packages/ui/src/components/**/*.story.vue', // does not work
    "./src/**/*.story.vue",
  ],
  setupFile: "./histoire.setup.ts", // does not work
  markdown: (md) => {
    md.use(require("markdown-it-anchor").default);
    md.use(require("markdown-it-table-of-contents"), {
      includeLevel: [1, 2, 3, 4, 5],
    });
  },
  vite: {
    server: {
      host: true, // 或者  host: '0.0.0.0',
    },
    css: {
      preprocessorOptions: {
        scss: {
          // additionalData: `@import "@/styles/variables.scss";`,
          api: "modern-compiler", // 使用了现代编译器 API 来处理 SCSS 文件，否则控制台会报错
        },
      },
    },
  },
});
