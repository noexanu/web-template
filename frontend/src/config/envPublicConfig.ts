import { z } from "zod";

// Next.js can only expose variables prefixed with NEXT_PUBLIC to the browser
const envPublicSchema = z.object({
  NEXT_PUBLIC_SERVER_BASE_URL: z.string(),
});

type EnvPublicSchema = z.output<typeof envPublicSchema>;
type EnvPublicSchemaInput = {
  [K in keyof EnvPublicSchema]: string | undefined;
};

// During build step 'process.env.NEXT_PUBLIC_...' pattern is auto replaced with actual value
const loadedConfig: EnvPublicSchemaInput = {
  NEXT_PUBLIC_SERVER_BASE_URL: process.env.NEXT_PUBLIC_SERVER_BASE_URL,
};

export const envPublicConfig = envPublicSchema.parse(loadedConfig);
