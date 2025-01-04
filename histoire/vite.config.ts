// todo
// /// <reference types="histoire" />
import vue from "@vitejs/plugin-vue2";
import { defineConfig } from "vite";
import { src } from "../build/plugins";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": src,
    },
  },
  server: {
    fs: {
      allow: ["../.."], // TODO: this is necessary to make alias import import work
    },
  },
  // histoire: {
  //   // Histoire config can also go here
  // },
});
