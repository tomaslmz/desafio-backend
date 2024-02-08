import { z } from 'zod';

export const createProdutoSchema = z.object({
  body: z.object({
    codigo_barras: z.string().max(20, { message: 'O código de barras deve ser menor que 20' }),
    descricao: z.string().max(100, { message: 'A descrição deve ser menor que 100 caracteres' }),
    caracteristicas: z.string().max(100, { message: 'A característica do produto deve ser menor que 100 caracteres' }),
    preco: z.number().min(0, 'O preço deve ser maior que 0!'),
    unidade_medida: z.string().max(3, { message: 'A unidade de medida deve ter no máximo 3 caracteres!' }),
    categoria_id: z.coerce.number().min(1, { message: 'A categoria selecionada é inválida!' }).nullable()
  })
});

export const updateProdutoSchema = z.object({
  params: z.object({
    id: z.coerce.number()
  }),
  body: z.object({
    codigo_barras: z.string().max(20, { message: 'O código de barras deve ser menor que 20' }),
    descricao: z.string().max(100, { message: 'A descrição deve ser menor que 100 caracteres' }),
    caracteristicas: z.string().max(100, { message: 'A característica do produto deve ser menor que 100 caracteres' }),
    preco: z.number().min(0, { message: 'O preço deve ser maior que 0! '}),
    unidade_medida: z.string().max(3, { message: 'A unidade de medida deve ter no máximo 3 caracteres!' }),
    categoria_id: z.coerce.number().min(1, { message: 'A categoria selecionada é inválida!' }).nullable()
  })
});

export const deleteProdutoSchema = z.object({
  params: z.object({
    id: z.coerce.number().min(1, { message: 'Selecione um produto válido!' })
  })
});

export const getProdutoSchema = z.object({
  params: z.object({
    id: z.coerce.number().min(1, { message: 'Selecione um produto válido!' })
  })
});