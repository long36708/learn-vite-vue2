/// <reference types="vite/client" />

/** Vue */

// declare module "*.vue" {
//   import { type defineComponent } from "vue";
//   const Component: ReturnType<typeof defineComponent>;
//   export default Component;
// }

declare module "*.vue" {
  import { DefineComponent } from "vue-demi";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

/** 声明 vite 环境变量的类型（如果未声明则默认是 any） */
interface ImportMetaEnv {
  // see https://vitejs.dev/guide/env-and-mode.html#env-files
  // add .env variables.
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_WEBSTORAGE_NAMESPACE: string;
}

// eslint-disable-next-line no-unused-vars
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
