import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsParser from "@typescript-eslint/parser";
import react from "eslint-plugin-react";
import security from "eslint-plugin-security";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default [
  {
    ignores: [
      "**/.next",
      "**/build/",
      "**/dist/",
      "**/node_modules/",
      "**/.snapshots/",
      "**/*.min.js"
    ]
  },
  ...compat.extends(
    "eslint:recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:react/recommended"
  ),
  {
    plugins: {
      react,
      security
    },

    languageOptions: {
      globals: {
        ...globals.browser
      },

      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },

    settings: {
      react: {
        version: "18"
      }
    },

    rules: {
      // Conflicts with TypeScript checker on default event handlers
      "react/prop-types": 0,
      // Conflicts with TypeScript checker on function declarations
      "no-unused-vars": "off",

      "react/jsx-sort-props": [
        1,
        {
          callbacksLast: true,
          shorthandFirst: true,
          shorthandLast: false,
          multiline: "ignore",
          ignoreCase: true,
          noSortAlphabetically: false,
          reservedFirst: true,
          locale: "auto"
        }
      ]
    }
  },
  {
    files: ["**/*.config.js"],

    rules: {
      "no-undef": "off"
    }
  }
];
