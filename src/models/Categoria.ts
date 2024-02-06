import { Model, Table, DataType, Column, HasMany } from 'sequelize-typescript';
import Produto from './Produto';

@Table({
  tableName: Categoria.CATEGORIA_TABLE_NAME
})

export default class Categoria extends Model {
  public static CATEGORIA_TABLE_NAME = 'Categorias';
  public static CATEGORIA_ID = 'id';
  public static CATEGORIA_DESCRICAO = 'descricao';

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: Categoria.CATEGORIA_ID
  }) id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: Categoria.CATEGORIA_DESCRICAO
  }) descricao!: string;

  @HasMany(() => Produto)
    produto!: Produto[]; 
}