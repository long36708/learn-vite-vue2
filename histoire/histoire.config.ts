/**
 * @Author: longmo
 * @Date: 2025-01-04 16:03:18
 * @LastEditTime: 2025-01-05 00:14:27
 * @FilePath: histoire/histoire.config.ts
 * @Description:
 */
import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue2";

const logo = "../public/favicon.ico";
const favicon = "./favicon.ico";

const env = process.env.HISTOIRE_ENV || "development";
console.log("histoire %s", env);
export default defineConfig({
  plugins: [HstVue()],
  storyMatch: [
    "../src/components/**/*.story.vue",
    // "../src/components/AButton/Button.story.vue",
    // '@ui/packages/ui/src/components/**/*.story.vue', // does not work
    "./src/**/*.story.vue",
  ],
  // setupFile: "./histoire-setup.ts",
  theme: {
    title: "Longmo UI",
    logo: {
      square: logo,
      light: logo,
      dark: logo,
    },
    // favicon: "./favicon.ico",
    // logoHref: "#",
  },
  vite: {
    base: env === "development" ? "/" : "/docs/",
  },
  markdown: (md) => {
    md.use(require("markdown-it-anchor").default);
    md.use(require("markdown-it-table-of-contents"), {
      includeLevel: [1, 2, 3, 4, 5],
    });
  },
});