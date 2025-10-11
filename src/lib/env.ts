import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    BETTER_AUTH_URL: z.string().url().optional(),
    GITHUB_ID: z.string().min(1),
    GITHUB_SECRET: z.string().min(1),
    EMAIL_API_KEY: z.string().min(1),
    ARCJET_KEY: z.string().min(1),
    AWS_ACCESS_KEY_ID: z.string().min(1),
    AWS_SECRET_ACCESS_KEY: z.string().min(1),
    AWS_ENDPOINT_URL_S3: z.string().url().min(1),
    AWS_ENDPOINT_URL_IAM: z.string().url().min(1),
    AWS_REGION: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_AWS_BUCKET_NAME: z.string().min(1),
  },
  clientPrefix: "NEXT_PUBLIC_", // Add this line
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
