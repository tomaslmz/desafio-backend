import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario';
import env from '../schemas/env';

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      id: number,
    }
  }
}

class TokenController {
  async create(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      const novoUsuario = await Usuario.findOne({
        where: {
          email
        }
      });

      if(!novoUsuario) {
        throw new Error('O usuário não foi encontrado!');
      }

      const isCorrectPassword = await novoUsuario.comparePassword(senha);

      if(!isCorrectPassword) {
        throw new Error('A senha está incorreta!');
      }

      const { id, nome } = novoUsuario;

      const token = jwt.sign({ id, email, senha }, env.SECRET_TOKEN, {
        expiresIn: env.TOKEN_EXPIRATION
      });

      req.user = { id };

      res.cookie('auth', token, {
        maxAge: 15000 * 60 * 60 *24
      });

      res.status(200).json({
        status: 'Usuário autenticado!',
        message: 'O token foi criado com sucesso!',
        data: {
          token,
          usuario: {
            id,
            nome,
            email
          }
        }
      });

    } catch(err: any) {
      res.status(500).json({
        status: 'Erro interno do servidor!',
        message: err.message
      });
    }
  }

  async logout(req: Request, res: Response) {
    try {
      res.clearCookie('auth');

      res.status(200).json({
        status: 'Logout realizado!',
        message: 'O logout foi realizado com sucesso!'
      });
    } catch(err: any) {
      res.status(500).json({
        status: 'Erro interno do servidor!',
        message: err.message
      });
    }
  }
}

export default new TokenController();