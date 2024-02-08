import { expect, it, describe } from 'vitest';
import request from 'supertest';
import app from '../appTest.setup';
import { v4 as uuidv4 } from 'uuid';
import Categoria from '../../models/Categoria';
import Produto from '../../models/Produto';
import getRandomBarcode from './utils/getRandomBarcode';
import getRandomNumber from './utils/getRandomNumber';
import getRandomUnit from './utils/getRandomUnit';
import getRandomPhone from './utils/getRandomPhone';
import Usuario from '../../models/Usuario';
import getToken from './utils/getToken';

describe('Atualizando um produto com categoria', () => {
  it('deve atualizar um produto com categoria', async () => {
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

    const codigo_barras = getRandomBarcode();
    const descricao = uuidv4();
    const caracteristicas = uuidv4();
    const preco = getRandomNumber(1, 500);
    const unidade_medida = getRandomUnit();
    const categoria_id = novaCategoria.id;

    const token = await getToken(email, senha);

    const response = await request(app)
      .patch(`/api/v1/produto/update/${novoProduto.id}`)
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

    expect(status).toEqual('Produto atualizado!');
    expect(message).toEqual('O produto foi atualizado com sucesso!');

    const testeProduto = await Produto.findByPk(novoProduto.id);

    expect(testeProduto?.codigo_barras).toEqual(codigo_barras);
    expect(testeProduto?.descricao).toEqual(descricao);
    expect(testeProduto?.caracteristicas).toEqual(caracteristicas);
    if(testeProduto) {
      expect(parseFloat(testeProduto?.preco.toString())).toEqual(preco);
    }
    expect(testeProduto?.unidade_medida).toEqual(unidade_medida);
    expect(testeProduto?.categoria_id).toEqual(categoria_id);

    await Produto.destroy({
      where: {
        descricao
      }
    });

    await novaCategoria.destroy();
    await novoUsuario.destroy();
  });
});