import eslintPluginNext from "@next/eslint-plugin-next";
import eslintPluginEslintComments from "eslint-plugin-eslint-comments";
import eslintPluginImport from "eslint-plugin-import";
import eslintPluginReact from "eslint-plugin-react";
import eslintPluginReactHooks from "eslint-plugin-react-hooks";
import eslintPluginRegexp from "eslint-plugin-regexp";
import eslintPluginImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginSonar from "eslint-plugin-sonarjs";
import eslintPluginStorybook from "eslint-plugin-storybook";
import eslintPluginTailwind from "eslint-plugin-tailwindcss";
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
      eslintPluginRegexp.configs["flat/recommended"],
    ],
    plugins: {
      "@next/next": eslintPluginNext,
      "react-hooks": eslintPluginReactHooks,
      "simple-import-sort": eslintPluginImportSort,
      "eslint-comments": eslintPluginEslintComments,
    },
    rules: {
      ...eslintPluginEslintComments.configs.recommended.rules,
      "@typescript-eslint/consistent-type-imports": "warn",
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
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
  },

  {
    name: "components",
    files: ["libs/components/**/*.{ts,tsx}"],
    extends: [
      eslintPluginReact.configs.flat.recommended,
      eslintPluginTailwind.configs["flat/recommended"],
    ],
    rules: {
      ...eslintPluginReactHooks.configs.recommended.rules,
      ...eslintPluginNext.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      tailwindcss: {
        config: getTailwindConfigPath("libs/components/tailwind.config.ts"),
        callees: ["className", "cva", "twMerge"],
      },
    },
  },

  {
    name: "stories",
    files: ["libs/components/**/*.stories.{ts,tsx}"],
    extends: [eslintPluginStorybook.configs["flat/recommended"]],
  }
);
