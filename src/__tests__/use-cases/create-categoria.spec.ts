import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';
import getToken from './utils/getToken';
import Usuario from '../../models/Usuario';
import getRandomPhone from './utils/getRandomPhone';

describe('Criando uma categoria', () => {
  it('deve criar uma categoria', async () => {
    const senha = uuidv4();
    const email = `${uuidv4()}@test.com`;
    const telefone = getRandomPhone();
    const nome = uuidv4();

    const novoUsuario = await Usuario.create({
      senha, email, telefone, nome
    });


    const descricao = uuidv4();


    const token = await getToken(email, senha);

    const response = await request(app)
      .post('/api/v1/categoria/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ descricao })
      .expect(200);

    const { status, message } = await response.body;

    expect(status).toEqual('Categoria criada!');
    expect(message).toEqual('A categoria foi criada com sucesso!');

    await Categoria.destroy({
      where: {
        descricao
      }
    });

    const testeCategoria = await Categoria.findOne({
      where: {
        descricao
      }
    });

    expect(testeCategoria).toBeNull();

    await novoUsuario.destroy();
  });
});
