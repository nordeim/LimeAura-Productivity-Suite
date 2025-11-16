{
  "$schema": "https://json.schemastore.org/eslintrc",
  "root": true,
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react",
    "react-hooks",
    "jsx-a11y"
  ],
  "settings": {
    "react": {
      "version": "detect"
    }
  },
  "rules": {
    // --- General ---
    "no-console": [
      "warn",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ],
    "no-unused-vars": "off",
    // --- TypeScript ---
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    // --- React ---
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    // --- Accessibility ---
    "jsx-a11y/anchor-is-valid": "warn"
  },
  "ignorePatterns": [
    "node_modules/",
    "dist/",
    "build/",
    "coverage/",
    "*.js"
  ]
}
