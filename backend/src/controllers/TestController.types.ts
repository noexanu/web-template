import { z } from "zod";

export const testSchema = z.object({
  text: z.string().optional(),
});

export type TestData = z.output<typeof testSchema>;
