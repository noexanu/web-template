import { type Config } from "tailwindcss";
import tailwindAnimations from "tailwindcss-animated";
import reactAriaSelectors from "tailwindcss-react-aria-components";

import {
  firstChildSelectorPlugin,
  lastChildSelectorPlugin,
} from "./plugins/childSelectors";

/**
 * Before modifying please make sure that:
 * 1 - Your changes don't brakes existing code;
 * 2 - You really need to make them in shared configuration.
 */
export const tailwindSharedConfig: Partial<Config> = {
  theme: {
    extend: {
      backgroundColor: {
        test: "#ff0000",
      },
    },
  },
  plugins: [
    tailwindAnimations,
    reactAriaSelectors,
    firstChildSelectorPlugin,
    lastChildSelectorPlugin,
  ],
};
