import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

export default defineConfig({
  integrations: [
    mdx(),
    sitemap(),
    svelte(),
  ],
  markdown: {
    shikiConfig: {
      theme: "monokai",
      wrap: true,
    },
  },
});
