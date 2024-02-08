import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_PORT: z.coerce.number(),
  TEST_POSTGRES_DB: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_HOST: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  TEST_TOKEN: z.string()
});

const env = envSchema.parse(process.env);

export default env;
