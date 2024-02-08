import express, { type Application, type Request, type Response } from 'express';
import Database from './config/database';

import CategoriaRouter from './router/CategoriaRouter';
import UsuarioRouter from './router/UsuarioRouter';
import ProdutoRouter from './router/ProdutoRouter';
import TokenRouter from './router/TokenRouter';

class App {
  public app: Application;
  
  constructor() {
    this.app = express();
    this.connectDatabase();
    this.plugins();
    this.routes();
  }

  plugins(): void {
    this.app.use(express.json());
  }

  routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'Hello world!'
      });
    });

    this.app.use('/api/v1/categoria', CategoriaRouter);
    this.app.use('/api/v1/usuario', UsuarioRouter);
    this.app.use('/api/v1/produto', ProdutoRouter);
    this.app.use('/api/v1/token', TokenRouter);
  }

  connectDatabase(): void {
    const database = new Database();
    database.sequelize?.sync();
  }
}

export default new App().app;