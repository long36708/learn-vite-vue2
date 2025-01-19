/**
 * @Author: longmo
 * @Date: 2025-01-04 16:03:18
 * @LastEditTime: 2025-01-19 22:50:11
 * @FilePath: histoire.config.ts
 * @Description:
 */
import { defineConfig } from "histoire";
import { HstVue } from "@histoire/plugin-vue2";
import Shiki from "@shikijs/markdown-it";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";

export default defineConfig({
  plugins: [HstVue()],
  storyMatch: [
    // "../src/components/**/*.story.vue",
    // "../src/components/AButton/Button.story.vue",
    // '@ui/packages/ui/src/components/**/*.story.vue', // does not work
    "./src/**/*.story.vue",
  ],
  setupFile: "./histoire.setup.ts", // does not work
  markdown: async (md) => {
    md.use(require("markdown-it-anchor").default);
    md.use(require("markdown-it-table-of-contents"), {
      includeLevel: [1, 2, 3, 4, 5],
    });
    md.use(
      await Shiki({
        themes: {
          light: "dracula",
          dark: "one-dark-pro",
        },
        transformers: [
          /**
           * twoslash 用于让编译器处理错误消息并提供丰富的突出显示信息
           * 不建议与 histoire 共同使用,因其对ts严格，且生成的代码有问题
           */
          // transformerTwoslash({ explicitTrigger: true }),
          /**
           * VSCode 风格彩色括号转换器
           */
          transformerColorizedBrackets({
            explicitTrigger: true,
          }),
          /**
           * 使用 [!code ++] 和 [!code --] 来标记增删的行
           */
          transformerNotationDiff(),
          /**
           * 使用 [!code highlight] 来高亮显示行
           */
          transformerNotationHighlight(),
          /**
           * 使用 [!code word:Hello] 在接下来的代码高亮所有的 Hello
           */
          transformerNotationWordHighlight(),
          /**
           * 使用 [!code focus] 来聚焦显示行
           */
          transformerNotationFocus(),
          /**
           * 使用 [!code error] 和 [!code warning] 来指定行的日志等级
           */
          transformerNotationErrorLevel(),
          /**
           * 根据代码片段上提供的元字符串，高亮显示行
           */
          transformerMetaHighlight(),
        ],
      })
    );
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
