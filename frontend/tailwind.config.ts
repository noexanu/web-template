import { type Config } from "tailwindcss";
import { tailwindSharedConfig } from "@template/tailwind-config";

const tailwindConfig: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
    "../libs/components/src/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [tailwindSharedConfig],
};

export default tailwindConfig;
