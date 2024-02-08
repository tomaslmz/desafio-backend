import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';
import Produto from '../../models/Produto';
import getRandomBarcode from './utils/getRandomBarcode';
import getRandomNumber from './utils/getRandomNumber';
import getRandomUnit from './utils/getRandomUnit';
import Usuario from '../../models/Usuario';
import getToken from './utils/getToken';
import getRandomPhone from './utils/getRandomPhone';

describe('Criando um produto com categoria', () => {
  it('deve criar um produto com categoria', async () => {
    const senha = uuidv4();
    const email = `${uuidv4()}@test.com`;
    const telefone = getRandomPhone();
    const nome = uuidv4();

    const novoUsuario = await Usuario.create({
      senha, email, telefone, nome
    });

    const novaCategoria = await Categoria.create({
      descricao: uuidv4()
    });

    const codigo_barras = getRandomBarcode();
    const descricao = uuidv4();
    const caracteristicas = uuidv4();
    const preco = getRandomNumber(1, 500);
    const unidade_medida = getRandomUnit();
    const categoria_id = novaCategoria.id;

    const token = await getToken(email, senha);

    const response = await request(app)
      .post('/api/v1/produto/create')
      .set('Authorization', `Bearer ${token}`)
      .send({ 
        codigo_barras, 
        descricao, 
        caracteristicas, 
        preco, 
        unidade_medida, 
        categoria_id 
      })
      .expect(200);

    const { status, message } = response.body;

    expect(status).toEqual('Produto criado!');
    expect(message).toEqual('O produto foi criado com sucesso!');

    await Produto.destroy({
      where: {
        descricao
      }
    });

    await novaCategoria.destroy();
    await novoUsuario.destroy();
  });
});