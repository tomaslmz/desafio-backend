import { Request, Response } from 'express';
import Produto from '../models/Produto';
import ProdutoRepo from '../repository/ProdutoRepo';
import Categoria from '../models/Categoria';

class ProdutoController {
  async create(req: Request, res: Response) {
    try {
      const { 
        codigo_barras,
        descricao,
        caracteristicas,
        preco,
        unidade_medida,
        categoria_id 
      } = req.body;

      const novoProduto = new Produto({
        codigo_barras,
        descricao,
        caracteristicas,
        preco,
        unidade_medida,
      });

      if(categoria_id) {
        const categoriaExistente = await Categoria.findByPk(parseInt(categoria_id));

        if (!categoriaExistente) {
          throw new Error('Categoria não encontrada!');
        }

        novoProduto.categoria_id = parseInt(categoria_id);
      }

      await new ProdutoRepo().save(novoProduto);

      res.status(200).json({
        status: 'Produto criado!',
        message: 'O produto foi criado com sucesso!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Erro interno do servidor!',
        message: err.message
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { 
        codigo_barras,
        descricao,
        caracteristicas,
        preco,
        unidade_medida,
        categoria_id 
      } = req.body;

      const novoProduto = new Produto({
        id: parseInt(req.params.id),
        codigo_barras,
        descricao,
        caracteristicas,
        preco,
        unidade_medida,
      });

      if(categoria_id) {
        const categoriaExistente = await Categoria.findByPk(parseInt(categoria_id));

        if (!categoriaExistente) {
          throw new Error('Categoria não encontrada!');
        }

        novoProduto.categoria_id = parseInt(categoria_id);
      }

      await new ProdutoRepo().update(novoProduto);

      res.status(200).json({
        status: 'Produto atualizado!',
        message: 'O produto foi atualizado com sucesso!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Erro interno do servidor!',
        message: err.message
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await new ProdutoRepo().delete(parseInt(req.params.id));

      res.status(200).json({
        status: 'Produto deletado!',
        message: 'O produto foi deletado com sucesso!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Erro interno do servidor!',
        message: err.message
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const produtos = await new ProdutoRepo().getAll();

      res.status(200).json({
        status: 'Dados obtidos!',
        message: 'Foi possível obter os produtos com o banco de dados!',
        data: produtos
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Erro interno do servidor!',
        message: err.message
      });
    }
  }

  async get(req: Request, res: Response) {
    try {
      const produto = await new ProdutoRepo().get(parseInt(req.params.id));

      res.status(200).json({
        status: 'Dado obtido!',
        message: 'Foi possível obter o produto com o banco de dados!',
        data: produto
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Erro interno do servidor',
        message: err.message
      });
    }
  }
}

export default new ProdutoController();