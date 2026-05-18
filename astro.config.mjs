import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";

import cloudflare from "@astrojs/cloudflare";

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

  adapter: cloudflare(),
});