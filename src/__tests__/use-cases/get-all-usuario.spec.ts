import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';

describe('Obtendo todos os usuários existentes', () => {
  it('deve obter todos os usuários existentes', async () => {
    const response = await request(app)
      .get('/api/v1/usuario/list')
      .expect(200);

    const { status, message, data } = response.body;

    expect(status).toEqual('Dados obtidos!');
    expect(message).toEqual('Foi possível obter os usuários com o banco de dados!');
    expect(data).toBeInstanceOf(Object);
  });
});