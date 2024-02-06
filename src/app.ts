import express, { type Application, type Request, type Response } from 'express';
import Database from './config/database';

class App {
  public app: Application;
  
  constructor() {
    this.app = express();
    this.connectDatabase();
    this.routes();
  }

  routes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.status(200).json({
        message: 'Hello world!'
      });
    });
  }

  connectDatabase(): void {
    const database = new Database();
    database.sequelize?.sync();
  }
}

export default new App().app;