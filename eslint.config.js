/*
    This script is used to configure the ESLint config, to ensure the code is clean
 */
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import solid from "eslint-plugin-solid/configs/typescript";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig(
    { ignores: ["dist", "src-tauri", "node_modules"] },
    js.configs.recommended,
    ...tseslint.configs.recommended,
    {
        files: ["src/**/*.{ts,tsx}"],
        ...solid,
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: { project: "./tsconfig.json" },
            globals: globals.browser,
        },
    },
);
