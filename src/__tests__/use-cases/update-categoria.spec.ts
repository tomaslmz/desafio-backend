import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';
import getRandomPhone from './utils/getRandomPhone';
import Usuario from '../../models/Usuario';
import getToken from './utils/getToken';

describe('Atualizando uma categoria', () => {
  it('deve atualizar uma categoria', async () => {
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

    const novaDescricao = uuidv4();

    const token = await getToken(email, senha);

    const response = await request(app)
      .patch(`/api/v1/categoria/update/${novaCategoria.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ descricao: novaDescricao })
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Categoria atualizada!');
    expect(message).toEqual('A categoria foi atualizada com sucesso!');

    const categoriaAtualizada = await Categoria.findOne({
      where: {
        descricao: novaDescricao
      }
    });

    expect(categoriaAtualizada).toBeInstanceOf(Categoria);

    expect(categoriaAtualizada?.descricao).toEqual(novaDescricao);

    await categoriaAtualizada?.destroy();

    await novoUsuario.destroy();
  });
});
