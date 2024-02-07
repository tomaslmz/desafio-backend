import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';

describe('Deletando uma categoria', () => {
  it('deve deletar uma categoria', async () => {
    const descricao = uuidv4();

    const novaCategoria = await Categoria.create({
      descricao
    });

    expect(novaCategoria).toBeInstanceOf(Categoria);

    const response = await request(app)
      .delete(`/api/v1/categoria/delete/${novaCategoria.id}`)
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Categoria deletada!');
    expect(message).toEqual('A categoria foi deletada com sucesso!');

    const testeCategoria = await Categoria.findOne({
      where: {
        descricao
      }
    });

    expect(testeCategoria).toBeNull();
  });
});
