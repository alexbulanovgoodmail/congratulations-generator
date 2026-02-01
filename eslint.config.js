import js from "@eslint/js"
import globals from "globals"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import react from "eslint-plugin-react"
import tseslint from "typescript-eslint"
import prettier from "eslint-plugin-prettier"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([
	globalIgnores(["dist"]),
	{
		files: ["**/*.{ts,tsx}"],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			reactHooks.configs.flat.recommended,
			reactRefresh.configs.vite
		],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser
		},
		plugins: {
			prettier,
			react
		},
		rules: {
			"@typescript-eslint/no-explicit-any": "warn",
			"prettier/prettier": [
				"error",
				{
					singleQuote: false,
					jsxSingleQuote: false,
					printWidth: 120,
					tabWidth: 2,
					jsxBracketSameLine: false
				}
			],
			// Правило для переноса атрибутов JSX на новые строки
			"react/jsx-max-props-per-line": ["error", { maximum: 1, when: "multiline" }],
			"react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
			"react/jsx-closing-bracket-location": ["error", "tag-aligned"]
		}
	}
])
