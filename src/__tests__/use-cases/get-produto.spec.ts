import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';
import Produto from '../../models/Produto';
import getRandomBarcode from './utils/getRandomBarcode';
import getRandomNumber from './utils/getRandomNumber';
import getRandomUnit from './utils/getRandomUnit';

describe('Obtendo um produto com categoria', () => {
  it('deve obter um produto com categoria', async () => {
    const novaCategoria = await Categoria.create({
      descricao: uuidv4()
    });


    const novoProduto = await Produto.create({
      codigo_barras: getRandomBarcode(),
      descricao: uuidv4(),
      caracteristicas: uuidv4(),
      preco: getRandomNumber(1, 500),
      unidade_medida: getRandomUnit(),
      categoria_id: novaCategoria.id
    });

    const response = await request(app)
      .get(`/api/v1/produto/search/${novoProduto.id}`)
      .expect(200);

    const { status, message, data } = response.body;

    expect(status).toEqual('Dado obtido!');
    expect(message).toEqual('Foi possível obter o produto com o banco de dados!');

    const { codigo_barras, descricao, caracteristicas, preco, unidade_medida, categoria } = data;

    expect(novoProduto.codigo_barras).toEqual(codigo_barras);
    expect(novoProduto.descricao).toEqual(descricao);
    expect(novoProduto.caracteristicas).toEqual(caracteristicas);
    expect(novoProduto.preco).toEqual(preco);
    expect(novoProduto.unidade_medida).toEqual(unidade_medida);
    expect(novoProduto.categoria_id).toEqual(categoria.id);

    await novoProduto.destroy();

    await novaCategoria.destroy();
  });
});