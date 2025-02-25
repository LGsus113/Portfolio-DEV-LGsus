// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify/functions";
import { resolve } from "path";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: netlify({}),
  integrations: [tailwind()],
  vite: {
    resolve: {
      alias: {
        "@": resolve("./src"),
        "@public": resolve("./public"),
      },
    },
  },
});
