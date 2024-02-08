import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Usuario from '../../models/Usuario';
import getRandomPhone from './utils/getRandomPhone';
import getToken from './utils/getToken';

describe('Atualizando um usuário', () => {
  it('deve atualizar um usuário', async () => {
    const senha = uuidv4();
    const email = `${uuidv4()}@test.com`;
    const telefone = getRandomPhone();
    const nome = uuidv4();

    const novoUsuario = await Usuario.create({
      senha, email, telefone, nome
    });

    expect(novoUsuario).toBeInstanceOf(Usuario);

    const novaSenha = uuidv4();
    const novoEmail = `${uuidv4()}@test.com`;
    const novoTelefone = getRandomPhone();
    const novoNome = uuidv4();

    const token = await getToken(email, senha);

    const response = await request(app)
      .patch('/api/v1/usuario/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ senha: novaSenha, email: novoEmail, 
        telefone: novoTelefone,
        nome: novoNome })
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Usuário atualizado!');
    expect(message).toEqual('O usuário foi atualizado com sucesso!');

    const usuarioAtualizado = await Usuario.findOne({
      where: {
        email: novoEmail
      }
    });

    expect(usuarioAtualizado).toBeInstanceOf(Usuario);

    expect(usuarioAtualizado?.email).toEqual(novoEmail);
    expect(usuarioAtualizado?.nome).toEqual(novoNome);
    expect(usuarioAtualizado?.email).toEqual(novoEmail);
    expect(usuarioAtualizado?.telefone).toEqual(novoTelefone);

    await usuarioAtualizado?.destroy();
  });
});
