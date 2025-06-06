import globals from "globals";
import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.node
      },
      ecmaVersion: "latest"
    },
    plugins: {
      "@stylistic/js": stylisticJs
    },
    rules: {
      eqeqeq: "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { before: true, after: true }],
      "no-console": "off",
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/linebreak-style": ["error", "windows"],
      "@stylistic/js/quotes": ["error", "double"]
    }
  },
  {
    // eslint was trying to lint this file as well, maybe it should, but I don't want to go through and reformat all the indents
    ignores: ["dist/**", "build/**", "eslint.config.js"]
  }
];
