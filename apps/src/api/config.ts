import { z } from "zod/v4";

const schema = z.object({
  NODE_ENV: z.string().default("development"),
  TRIGGER_ENV: z.enum(["development", "production"]).default("development"),
  TRIGGER_SECRET_KEY: z.string().min(10),
  PORT: z.coerce.number().default(3333),
  LOG_LEVEL: z.enum(["fatal","error","warn","info","debug","trace"]).default("info")
});

export const env = schema.parse(process.env);