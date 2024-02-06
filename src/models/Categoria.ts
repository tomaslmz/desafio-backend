import { Model, Table, DataType, Column } from 'sequelize-typescript';

@Table({
  tableName: Categoria.CATEGORIA_TABLE_NAME
})

export default class Categoria extends Model {
  public static CATEGORIA_TABLE_NAME = 'Categoria';
  public static CATEGORIA_ID = 'id';
  public static CATEGORIA_DESCRICAO = 'descricao';

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  }) id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false
  }) descricao!: string;
}