import { Sequelize } from 'sequelize-typescript';
import env from '../schemas/envTest';
import Categoria from '../../models/Categoria';
import Usuario from '../../models/Usuario';
import Produto from '../../models/Produto';

export default class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = env.TEST_POSTGRES_DB;
  private POSTGRES_PORT = env.POSTGRES_PORT;
  private POSTGRES_HOST = env.POSTGRES_HOST;
  private POSTGRES_USER = env.POSTGRES_USER;
  private POSTGRES_PASSWORD = env.POSTGRES_PASSWORD;

  constructor() {
    this.connect();
  }

  connect(): void {
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      port: this.POSTGRES_PORT,
      host: this.POSTGRES_HOST,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      dialect: 'postgres',
      models: [Categoria, Usuario, Produto],
      logging: false
    });

    this.sequelize.authenticate();
  }
}