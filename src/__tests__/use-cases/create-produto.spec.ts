import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';
import Produto from '../../models/Produto';
import getRandomBarcode from './utils/getRandomBarcode';
import getRandomNumber from './utils/getRandomNumber';
import getRandomUnit from './utils/getRandomUnit';

describe('Criando um produto com categoria', () => {
  it('deve criar um produto com categoria', async () => {
    const novaCategoria = await Categoria.create({
      descricao: uuidv4()
    });

    const codigo_barras = getRandomBarcode();
    const descricao = uuidv4();
    const caracteristicas = uuidv4();
    const preco = getRandomNumber(1, 500);
    const unidade_medida = getRandomUnit();
    const categoria_id = novaCategoria.id;

    const response = await request(app)
      .post('/api/v1/produto/create')
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
  });
});