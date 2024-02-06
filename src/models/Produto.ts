import { Model, Table, DataType, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Categoria from './Categoria';

@Table({
  tableName: Produto.PRODUTO_TABLE_NAME
})

export default class Produto extends Model {
  public static PRODUTO_TABLE_NAME = 'Produtos';
  public static PRODUTO_ID = 'id';
  public static PRODUTO_CODIGO_BARRAS = 'codigo_barras';
  public static PRODUTO_DESCRICAO = 'descricao';
  public static PRODUTO_CARACTERISTICAS = 'caracteristicas';
  public static PRODUTO_PRECO = 'preco';
  public static PRODUTO_UNIDADE_MEDIDA = 'unidade_medida';
  public static PRODUTO_CATEGORIA_ID = 'categoria_id';
 
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: Produto.PRODUTO_ID
  }) id!: number;

  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    field: Produto.PRODUTO_CODIGO_BARRAS
  }) codigo_barras!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: Produto.PRODUTO_DESCRICAO
  }) descricao!: string;

  @Column({
    type: DataType.STRING(1000),
    allowNull: false,
    field: Produto.PRODUTO_CARACTERISTICAS
  }) caracteristicas!: string;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
    field: Produto.PRODUTO_PRECO
  }) preco!: number;

  @Column({
    type: DataType.STRING(3),
    allowNull: false,
    field: Produto.PRODUTO_UNIDADE_MEDIDA
  }) unidade_medida!: string;
  
  @ForeignKey(() => Categoria)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
    field: Produto.PRODUTO_CATEGORIA_ID
  }) categoria_id!: number;

  @BelongsTo(() => Categoria) 
    categoria!: Categoria;
}