import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";
import jsxA11y from "eslint-plugin-jsx-a11y";
import perfectionist from "eslint-plugin-perfectionist";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import { defineConfig, globalIgnores } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig(
  globalIgnores(["dist", "coverage"]),

  // Core: language recommendations for JS + TS
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React: hooks correctness + HMR-friendly exports.
  // eslint-plugin-react has no ESLint 10-compatible preset yet (crashes in its
  // version detection), so instead of flat.recommended we enable the subset of
  // rules that matter in TS — prop-types/display-name are JS-React relics.
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
  {
    plugins: { react },
    settings: { react: { version: "19.3" } },
    rules: {
      "react/jsx-key": "error",
      "react/jsx-no-duplicate-props": "error",
      "react/jsx-no-target-blank": "error",
      "react/no-children-prop": "error",
    },
  },

  // Airbnb-style discipline: accessibility + import hygiene
  jsxA11y.flatConfigs.recommended,
  importPlugin.flatConfigs.typescript,

  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      "import/resolver": { typescript: true },
    },
  },

  // Import order: groups first (type → external → internal → relative), then
  // natural alphabetical within each group. Side-effect imports like CSS are
  // left unsorted so cascade order is never changed by a fix.
  {
    plugins: { perfectionist },
    rules: {
      "perfectionist/sort-imports": ["error", { type: "natural" }],
      "perfectionist/sort-exports": ["error", { type: "natural" }],
      "perfectionist/sort-named-imports": ["error", { type: "natural" }],
      "perfectionist/sort-named-exports": ["error", { type: "natural" }],
    },
  },

  // Test files: vitest runs with `globals: true` (see vite.config.ts)
  {
    files: ["src/**/*.{test,spec}.{ts,tsx}"],
    languageOptions: {
      globals: {
        vi: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
      },
    },
  },

  // Must be last: disable stylistic rules that Prettier owns
  prettier,
);
