import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';

describe('Obtendo dados de uma categoria', () => {
  it('deve obter os dados de uma categoria', async () => {
    const testeDescricao = uuidv4();

    const novaCategoria = await Categoria.create({
      descricao: testeDescricao
    });

    const response = await request(app)
      .get(`/api/v1/categoria/search/${novaCategoria.id}`)
      .expect(200);

    const { status, message, data } = response.body;

    expect(status).toEqual('Dado obtido!');
    expect(message).toEqual('Foi possível obter a categoria com o banco de dados!');
    expect(data).toBeInstanceOf(Object);

    const { id, descricao } = data;

    expect(id).toEqual(novaCategoria.id);
    expect(descricao).toEqual(novaCategoria.descricao);

    novaCategoria.destroy();
  });
});