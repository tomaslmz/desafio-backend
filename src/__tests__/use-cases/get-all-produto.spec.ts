import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';

describe('Obtendo todos os produtos', () => {
  it('deve obter todos os produtos', async () => {
    const response = await request(app)
      .get('/api/v1/produto/list')
      .expect(200);

    const { status, message, data } = response.body;

    expect(status).toEqual('Dados obtidos!');
    expect(message).toEqual('Foi possível obter os produtos com o banco de dados!');
    expect(data).toBeInstanceOf(Object);
  });
});