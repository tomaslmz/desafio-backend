import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';
import getRandomPhone from './utils/getRandomPhone';
import Usuario from '../../models/Usuario';
import getToken from './utils/getToken';

describe('Deletando uma categoria', () => {
  it('deve deletar uma categoria', async () => {
    const senha = uuidv4();
    const email = `${uuidv4()}@test.com`;
    const telefone = getRandomPhone();
    const nome = uuidv4();

    const novoUsuario = await Usuario.create({
      senha, email, telefone, nome
    });

    const descricao = uuidv4();

    const novaCategoria = await Categoria.create({
      descricao
    });

    expect(novaCategoria).toBeInstanceOf(Categoria);

    const token = await getToken(email, senha);

    const response = await request(app)
      .delete(`/api/v1/categoria/delete/${novaCategoria.id}`)
      .set('Authorization', `Bearer ${token}`)
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

    await novoUsuario.destroy();
  });
});
