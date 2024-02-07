import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';

describe('Criando uma categoria', () => {
  it('deve criar uma categoria', async () => {
    const descricao = uuidv4();

    const response = await request(app)
      .post('/api/v1/categoria/create')
      .send({ descricao })
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Categoria criada!');
    expect(message).toEqual('A categoria foi criada com sucesso!');

    await Categoria.destroy({
      where: {
        descricao
      }
    });

    const testeCategoria = await Categoria.findOne({
      where: {
        descricao
      }
    });

    expect(testeCategoria).toBeNull();
  });
});
