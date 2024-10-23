import "dotenv/config";

import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export type ServerEnv = typeof env;

// check if linked to the env file and if the db link is correct to sqlite3

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    FRONTEND_URL: z.coerce.string(),
    PORT: z.coerce.number().default(3999),
    DATABASE_URL: z.string().endsWith(".db"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
