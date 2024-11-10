/// <reference types="vite/client" />

/** Vue */

declare module "*.vue" {
  import { type defineComponent } from "vue";
  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

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
