import plugin from "tailwindcss/plugin";

export const firstChildSelectorPlugin = plugin((creator) => {
  creator.addVariant("first-child", "&>:first-child");
});

export const lastChildSelectorPlugin = plugin((creator) => {
  creator.addVariant("last-child", "&>:last-child");
});
