import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
	NODE_PORT: z.string()
});

const env = envSchema.parse(process.env);

export default env;
