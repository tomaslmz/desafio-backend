import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';

describe('Obtendo todas as categorias', () => {
  it('deve obter todas as categorias existentes', async () => {
    const response = await request(app)
      .get('/api/v1/categoria/list')
      .expect(200);

    const { status, message, data } = response.body;

    expect(status).toEqual('Dados obtidos!');
    expect(message).toEqual('Foi possível obter as categorias com o banco de dados!');
    expect(data).toBeInstanceOf(Object);
  });
});