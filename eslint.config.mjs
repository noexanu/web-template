import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginEslintComments from "eslint-plugin-eslint-comments";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginRegexp from "eslint-plugin-regexp";
import eslintPluginImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginSonar from "eslint-plugin-sonarjs";
import eslintPluginTailwind from "eslint-plugin-tailwindcss";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
// eslint-disable-next-line import/no-unresolved
import tsEslint from "typescript-eslint";

const getTailwindConfigPath = (relativePath) => {
  const workingDirection = process.env.PWD;
  const pathSegments = relativePath.replace("./", "").split("/");

  return workingDirection.endsWith(pathSegments[0])
    ? `${workingDirection}/${pathSegments[1]}`
    : relativePath;
};

export default tsEslint.config(
  {
    name: "global",
    extends: [
      tsEslint.configs.recommended,
      eslintPluginImport.flatConfigs.recommended,
      eslintPluginImport.flatConfigs.typescript,
      eslintPluginSonar.configs.recommended,
      eslintPluginUnicorn.configs["flat/recommended"],
      eslintPluginRegexp.configs["flat/recommended"],
    ],
    plugins: {
      "simple-import-sort": eslintPluginImportSort,
      "eslint-comments": eslintPluginEslintComments,
    },
    rules: {
      ...eslintPluginEslintComments.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // eslint-disable-next-line unicorn/prefer-string-raw
            ["^\\u0000.*", "^node:", "^react", "^@?\\w", "^@template/"],
            ["@/", "^utils/", "^public/", "^./", "^../"],
          ],
        },
      ],
    },
    languageOptions: {
      parserOptions: {
        project: true,
        projectService: true,
        tsconfigRootDir: ".",
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },

  {
    name: "frontend",
    files: ["frontend/**/*.{ts,tsx}"],
    extends: [
      eslintPluginReact.configs.flat.recommended,
      eslintPluginTailwind.configs["flat/recommended"],
    ],
    plugins: {
      "react-hooks": eslintPluginReactHooks,
      "@next/next": eslintPluginNext,
    },
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginNext.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      tailwindcss: {
        config: getTailwindConfigPath("frontend/tailwind.config.ts"),
        callees: ["className", "cva", "twMerge"],
      },
    },
  }
);
