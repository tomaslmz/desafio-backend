import { z } from 'zod';

export const createTokenSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Insira um e-mail válido!' }),
    senha: z.string().min(5, { message: 'A senha deve ser maior que 4 caracteres!'})
  })
});