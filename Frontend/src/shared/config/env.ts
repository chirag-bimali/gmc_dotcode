import { z } from "zod";

const envSchema = z.object({
  VITE_APP_NAME: z.string().min(1),
  VITE_API_BASE_URL: z.string().url().or(z.string().regex(/^https?:\/\//)),
  VITE_ENV: z.enum(["development", "staging", "production"]),
});

export const env = envSchema.parse({
  VITE_APP_NAME: import.meta.env.VITE_APP_NAME,
  VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
  VITE_ENV: import.meta.env.VITE_ENV,
});
