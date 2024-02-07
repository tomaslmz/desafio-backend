import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Usuario from '../../models/Usuario';
import getRandomPhone from './utils/getRandomPhone';

describe('Criando um usuário', () => {
  it('deve criar um usuário', async () => {
    const senha = uuidv4();
    const email = `${uuidv4()}@test.com`;
    const telefone = getRandomPhone();
    const nome = uuidv4();

    const response = await request(app)
      .post('/api/v1/usuario/create')
      .send({ senha, email, telefone, nome })
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Usuário criado!');
    expect(message).toEqual('O usuário foi criado com sucesso!');

    await Usuario.destroy({
      where: {
        email
      }
    });

    const testeUsuario = await Usuario.findOne({
      where: {
        email
      }
    });

    expect(testeUsuario).toBeNull();
  });
});
