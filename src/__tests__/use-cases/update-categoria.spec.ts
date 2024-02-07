import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';

describe('Atualizando uma categoria', () => {
  it('deve atualizar uma categoria', async () => {
    const descricao = uuidv4();

    const novaCategoria = await Categoria.create({
      descricao
    });

    expect(novaCategoria).toBeInstanceOf(Categoria);

    const novaDescricao = uuidv4();

    const response = await request(app)
      .patch(`/api/v1/categoria/update/${novaCategoria.id}`)
      .send({ descricao: novaDescricao })
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Categoria atualizada!');
    expect(message).toEqual('A categoria foi atualizada com sucesso!');

    const categoriaAtualizada = await Categoria.findOne({
      where: {
        descricao: novaDescricao
      }
    });

    expect(categoriaAtualizada).toBeInstanceOf(Categoria);

    expect(categoriaAtualizada?.descricao).toEqual(novaDescricao);

    await categoriaAtualizada?.destroy();
  });
});
