import express, { type Application, type Request, type Response } from 'express';
import Database from './config/databaseTest.setup';

import CategoriaRouter from '../router/CategoriaRouter';

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
  }

  connectDatabase(): void {
    const database = new Database();
    database.sequelize?.sync();
  }
}

export default new App().app;