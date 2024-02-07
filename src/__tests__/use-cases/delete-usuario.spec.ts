import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Usuario from '../../models/Usuario';
import getRandomPhone from './utils/getRandomPhone';

describe('Deletando um usuário', () => {
  it('deve deletar um usuário', async () => {
    const senha = uuidv4();
    const email = `${uuidv4()}@test.com`;
    const telefone = getRandomPhone();
    const nome = uuidv4();

    const novoUsuario = await Usuario.create({
      senha,
      email,
      telefone,
      nome
    });

    expect(novoUsuario).toBeInstanceOf(Usuario);

    const response = await request(app)
      .delete(`/api/v1/usuario/delete/${novoUsuario.id}`)
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Usuário deletado!');
    expect(message).toEqual('O usuário foi deletado com sucesso!');

    const testeUsuario = await Usuario.findOne({
      where: {
        email
      }
    });

    expect(testeUsuario).toBeNull();
  });
});
