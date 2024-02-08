import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';
import Produto from '../../models/Produto';
import getRandomBarcode from './utils/getRandomBarcode';
import getRandomNumber from './utils/getRandomNumber';
import getRandomUnit from './utils/getRandomUnit';
import getToken from './utils/getToken';
import Usuario from '../../models/Usuario';
import getRandomPhone from './utils/getRandomPhone';

describe('Deletando um produto com categoria', () => {
  it('deve deletar um produto com categoria', async () => {
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

    const novoProduto = await Produto.create({
      codigo_barras: getRandomBarcode(),
      descricao: uuidv4(),
      caracteristicas: uuidv4(),
      preco: getRandomNumber(1, 500),
      unidade_medida: getRandomUnit(),
    });

    const token = await getToken(email, senha);

    const response = await request(app)
      .delete(`/api/v1/produto/delete/${novoProduto.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    const { status, message } = response.body;

    expect(status).toEqual('Produto deletado!');
    expect(message).toEqual('O produto foi deletado com sucesso!');

    const testeProduto = await Produto.findByPk(novoProduto.id);
    expect(testeProduto).toBeNull();

    await novaCategoria.destroy();
    await novoUsuario.destroy();
  });
});