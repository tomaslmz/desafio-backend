import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';
import Produto from '../../models/Produto';
import getRandomBarcode from './utils/getRandomBarcode';
import getRandomNumber from './utils/getRandomNumber';
import getRandomUnit from './utils/getRandomUnit';

describe('Deletando um produto com categoria', () => {
  it('deve deletar um produto com categoria', async () => {
    const novaCategoria = await Categoria.create({
      descricao: uuidv4()
    });

    const novoProduto = await Produto.create({
      codigo_barras: getRandomBarcode(),
      descricao: uuidv4(),
      caracteristicas: uuidv4(),
      preco: getRandomNumber(1, 500),
      unidade_medida: getRandomUnit(),
    });

    const response = await request(app)
      .delete(`/api/v1/produto/delete/${novoProduto.id}`)
      .expect(200);

    const { status, message } = response.body;

    expect(status).toEqual('Produto deletado!');
    expect(message).toEqual('O produto foi deletado com sucesso!');

    const testeProduto = await Produto.findByPk(novoProduto.id);
    expect(testeProduto).toBeNull();

    await novaCategoria.destroy();
  });
});