import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import env from '../schemas/env';

declare module 'express-serve-static-core' {
  interface Request {
    user: {
      id: number,
    }
  }
}

const loginRequired = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if(!authorization) {
      throw new Error('O token não pode ser vazio!');
    }

    const [, token] = authorization.split(' ');

    const data = jwt.verify(token, env.SECRET_TOKEN) as JwtPayload;

    const { id } = data;

    req.user = { id };

    next();
  } catch(err: any) {
    res.status(500).json({
      status: 'Erro interno do servidor!',
      message: err.message
    });
  }
};

export default loginRequired;