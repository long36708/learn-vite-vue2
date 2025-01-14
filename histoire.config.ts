/**
 * @Author: longmo
 * @Date: 2025-01-04 16:03:18
 * @LastEditTime: 2025-01-14 10:36:25
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
  },
});
