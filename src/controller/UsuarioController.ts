import { Request, Response } from 'express';
import Usuario from '../models/Usuario';
import UsuarioRepo from '../repository/UsuarioRepo';

class UsuarioController {
  async create(req: Request, res: Response) {
    try {
      const { email, nome, telefone, senha } = req.body;

      const novoUsuario = new Usuario({
        email,
        nome,
        telefone, 
        senha,
      });

      await new UsuarioRepo().save(novoUsuario);

      res.status(200).json({
        status: 'Usuário criado!',
        message: 'O usuário foi criado com sucesso!'
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
      const { email, nome, telefone, senha } = req.body;

      const novoUsuario = new Usuario({
        id: req.user.id,
        email,
        nome,
        telefone, 
        senha,
      });

      await new UsuarioRepo().update(novoUsuario);

      res.status(200).json({
        status: 'Usuário atualizado!',
        message: 'O usuário foi atualizado com sucesso!',
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
      await new UsuarioRepo().delete(req.user.id);

      res.status(200).json({
        status: 'Usuário deletado!',
        message: 'O usuário foi deletado com sucesso!',
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
      const usuarios = await new UsuarioRepo().getAll();

      res.status(200).json({
        status: 'Dados obtidos!',
        message: 'Foi possível obter os usuários com o banco de dados!',
        data: usuarios
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
      const usuario = await new UsuarioRepo().get(req.user.id);

      res.status(200).json({
        status: 'Dado obtido!',
        message: 'Foi possível obter o usuário com o banco de dados!',
        data: usuario
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Erro interno do servidor!',
        message: err.message
      });
    }
  }
}

export default new UsuarioController();