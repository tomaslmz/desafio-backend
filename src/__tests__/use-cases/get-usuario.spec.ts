import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Usuario from '../../models/Usuario';
import getRandomPhone from './utils/getRandomPhone';

describe('Obtendo dados de um usuário', () => {
  it('deve obter os dados de um usuário', async () => {
    const testeSenha = uuidv4();
    const testeEmail = `${uuidv4()}@test.com`;
    const testeTelefone = getRandomPhone();
    const testeNome = uuidv4();

    const novoUsuario = await Usuario.create({
      senha: testeSenha, email: testeEmail,
      telefone: testeTelefone, nome: testeNome
    });

    const response = await request(app)
      .get(`/api/v1/usuario/search/${novoUsuario.id}`)
      .expect(200);

    const { status, message, data } = response.body;

    expect(status).toEqual('Dado obtido!');
    expect(message).toEqual('Foi possível obter o usuário com o banco de dados!');
    expect(data).toBeInstanceOf(Object);

    const { id, senha, email, telefone, nome } = data;

    expect(id).toEqual(novoUsuario.id);
    expect(senha).toEqual(novoUsuario.senha);
    expect(email).toEqual(novoUsuario.email);
    expect(telefone).toEqual(novoUsuario.telefone);
    expect(nome).toEqual(novoUsuario.nome);

    novoUsuario.destroy();
  });
});