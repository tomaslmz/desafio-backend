import { z } from 'zod';

export const createUsuarioSchema = z.object({
  body: z.object({
    email: z.string().email({ message: 'Insira um e-mail válido!' }),
    nome: z.string().min(3, { message: 'O nome precisa ser maior 2 caracteres!'}),
    telefone: z
      .string().max(12, { message: 'O seu número de telefone deve conter no máximo 12 caracteres!' })
      .min(11, { message: 'O seu número de telefone deve conter no mínimo 11 caracteres!' })
      .refine((value) => /^[0-9]*$/g.test(value)),
    senha: z.string().min(5, { message: 'A senha deve ser maior que 4 caracteres!'})
  })
});

export const updateUsuarioSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  }),
  body: z.object({
    email: z.string().email({ message: 'Insira um e-mail válido!' }),
    nome: z.string().min(3, { message: 'O nome precisa ser maior 2 caracteres!'}),
    telefone: z
      .string().max(12, { message: 'O seu número de telefone deve conter no máximo 12 caracteres!' })
      .min(11, { message: 'O seu número de telefone deve conter no mínimo 11 caracteres!' })
      .refine((value) => /^[0-9]*$/g.test(value)),
    senha: z.string().min(5, { message: 'A senha deve ser maior que 4 caracteres!'})
  })
});

export const deleteUsuarioSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  })
});

export const getUsuarioSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  })
});