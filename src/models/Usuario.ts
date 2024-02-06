import { compare, hash } from 'bcrypt';
import { Model, Table, DataType, Column, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';

@Table({
  tableName: Usuario.USUARIO_TABLE_NAME
})

export default class Usuario extends Model {
  public static USUARIO_TABLE_NAME = 'Usuario';
  public static USUARIO_ID = 'id';
  public static USUARIO_EMAIL = 'email';
  public static USUARIO_NOME = 'nome';
  public static USUARIO_TELEFONE = 'telefone';
  public static USUARIO_SENHA = 'senha';

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: Usuario.USUARIO_ID
  }) id!: number;

  @Column({
    type: DataType.STRING(100),
    unique: true,
    allowNull: false,
    field: Usuario.USUARIO_EMAIL
  }) email!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    field: Usuario.USUARIO_NOME
  }) nome!: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
    field: Usuario.USUARIO_TELEFONE
  }) telefone!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: Usuario.USUARIO_SENHA
  }) senha!: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(usuario: Usuario) {
    const passwordHash = await hash(usuario.senha, 8);
    usuario.senha = passwordHash;
  }

  async comparePassword(senha: string) {
    return await compare(senha, this.senha);
  }
}