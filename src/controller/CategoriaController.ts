import { Request, Response } from 'express';
import Categoria from '../models/Categoria';
import CategoriaRepo from '../repository/CategoriaRepo';

class CategoriaController {
  async create(req: Request, res: Response) {
    try {
      const novaCategoria = new Categoria({
        descricao: req.body.descricao
      });

      await new CategoriaRepo().save(novaCategoria);

      res.status(200).json({
        status: 'Categoria criada!',
        message: 'A categoria foi criada com sucesso!'
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
      const novaCategoria = new Categoria({
        id: req.params.id,
        descricao: req.body.descricao
      });

      await new CategoriaRepo().update(novaCategoria);

      res.status(200).json({
        status: 'Categoria atualizada!',
        message: 'A categoria foi atualizada com sucesso!'
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
      await new CategoriaRepo().delete(parseInt(req.params.id));

      res.status(200).json({
        status: 'Categoria deletada!',
        message: 'A categoria foi deletada com sucesso!'
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
      const categorias = await new CategoriaRepo().getAll();

      res.status(200).json({
        status: 'Dados obtidos!',
        message: 'Foi possível obter as categorias com o banco de dados!',
        data: categorias
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
      const categoria = await new CategoriaRepo().get(parseInt(req.params.id));

      res.status(200).json({
        status: 'Dado obtido!',
        message: 'Foi possível obter a categoria com o banco de dados!',
        data: categoria
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Erro interno do servidor!',
        message: err.message
      });
    }
  }
}

export default new CategoriaController();