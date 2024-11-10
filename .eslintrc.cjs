/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");
import functional from "eslint-plugin-functional";
import tseslint from "typescript-eslint";
module.exports = {
  root: true,
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript/recommended",
    "@vue/eslint-config-prettier",
    functional.configs.externalTypeScriptRecommended,
    functional.configs.recommended,
    functional.configs.stylistic,
  ],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      projectService: true,
    },
  },
};
