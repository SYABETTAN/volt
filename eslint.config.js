import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      ".astro/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      "coverage/**",
      ".lighthouseci/**",
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.recommended,
  astro.configs["flat/recommended"],
  {
    files: ["**/*.{mjs,cjs,js}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
);
