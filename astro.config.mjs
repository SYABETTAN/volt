// @ts-check
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const configuredSite = process.env.PUBLIC_SITE_URL;

function publicSite() {
  if (!configuredSite) return undefined;
  try {
    const url = new URL(configuredSite);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

export default defineConfig({
  site: publicSite(),
  vite: {
    plugins: [tailwindcss()],
  },
  image: {
    layout: "full-width",
  },
});
