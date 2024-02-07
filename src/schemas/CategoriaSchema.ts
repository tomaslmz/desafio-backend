import { z } from 'zod';

export const createCategoriaSchema = z.object({
  body: z.object({
    descricao: z.string().min(3, { message: 'A descrição deve ser maior que 3 letras!' })
  })
});

export const updateCategoriaSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  }),
  body: z.object({
    descricao: z.string().min(3, { message: 'A descrição deve ser maior que 3 letras!' })
  })
});

export const deleteCategoriaSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  })
});

export const getCategoriaSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  })
});