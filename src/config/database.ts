import { Sequelize } from 'sequelize-typescript';
import env from '../schemas/env';

export default class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = env.POSTGRES_DB;
  private POSTGRES_PORT = env.POSTGRES_PORT;
  private POSTGRES_HOST = env.POSTGRES_HOST;
  private POSTGRES_USER = env.POSTGRES_USER;
  private POSTGRES_PASSWORD = env.POSTGRES_PASSWORD;

  constructor() {

  }

  connect(): void {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      port: this.POSTGRES_PORT,
      host: this.POSTGRES_HOST,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      dialect: 'postgres'
    });

    this.sequelize.authenticate().then(() => {
      console.log('O banco de dados foi conectado com sucesso!');
    });
  }
}