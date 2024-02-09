import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
  NODE_PORT: z.coerce.number(),
  POSTGRES_DB: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_HOST: z.string(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  SECRET_TOKEN: z.string(),
  TOKEN_EXPIRATION: z.string(),
  ORIGIN: z.string()
});

const env = envSchema.parse(process.env);

export default env;
