import Categoria from '../models/Categoria';
import Produto from '../models/Produto';

interface IProdutoRepo {
  save(produto: Produto): Promise<void>;
  update(produto: Produto): Promise<void>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Produto[]>;
  get(id: number): Promise<Produto>;
}

export default class ProdutoRepo implements IProdutoRepo {
  async save(produto: Produto): Promise<void> {
    try {
      const { codigo_barras, descricao, caracteristicas, preco, unidade_medida, categoria_id } = produto;

      await Produto.create({
        codigo_barras,
        descricao,
        caracteristicas,
        preco,
        unidade_medida,
        categoria_id
      });
    } catch(err: any) {
      throw new Error(`Ocorreu um erro ao tentar salvar o produto: ${err.message}`);
    }
  }

  async update(produto: Produto): Promise<void> {
    try {
      const novoProduto = await Produto.findByPk(produto.id);

      if(!novoProduto) {
        throw new Error('Produto não encontrado!');
      }

      const { codigo_barras, descricao, caracteristicas, preco, unidade_medida, categoria_id } = produto;

      novoProduto.codigo_barras = codigo_barras;
      novoProduto.descricao = descricao;
      novoProduto.caracteristicas = caracteristicas;
      novoProduto.preco = preco;
      novoProduto.unidade_medida = unidade_medida;
      novoProduto.categoria_id = categoria_id;

      await novoProduto.save();
    } catch(err: any) {
      throw new Error(`Houve um erro ao tentar atualizar este produto: ${err.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const novoProduto = await Produto.findByPk(id);

      if(!novoProduto) {
        throw new Error('Produto não encontrado!');
      }

      await novoProduto.destroy();
    } catch(err: any) {
      throw new Error(`Houve um erro ao tentar deletar este produto: ${err.message}`);
    }
  }

  async getAll(): Promise<Produto[]> {
    try {
      const produtos = await Produto.findAll({
        order: [['id', 'ASC']],
        include: {
          model: Categoria,
          as: 'categoria'
        },
        attributes: {
          exclude: ['categoria_id']
        }
      });

      return produtos;
    } catch(err: any) {
      throw new Error(`Houve um erro ao tentar listar todos os produtos: ${err.message}`);
    }
  }

  async get(id: number): Promise<Produto> {
    try {
      const novoProduto = await Produto.findByPk(id, {
        include: {
          model: Categoria,
          as: 'categoria'
        },
        attributes: {
          exclude: ['categoria_id']
        }
      });

      if(!novoProduto) {
        throw new Error('Este produto não foi encontrado!');
      }

      return novoProduto;
    } catch(err: any) {
      throw new Error(`Houve um erro ao listar este produto: ${err.message}`);
    }
  }
}