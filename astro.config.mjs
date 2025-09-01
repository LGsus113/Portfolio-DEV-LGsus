// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from '@tailwindcss/vite';
import netlify from "@astrojs/netlify/functions";
import { resolve } from "path";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify({}),
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": resolve("./src"),
        "@public": resolve("./public"),
        "@cv": resolve("./src/cv.json"),
      },
    },
  },
});
