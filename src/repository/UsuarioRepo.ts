import Usuario from '../models/Usuario';

interface IUsuarioRepo {
  save(usuario: Usuario): Promise<void>;
  update(usuario: Usuario): Promise<void>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Usuario[]>;
  get(id: number): Promise<Usuario>;
}

export default class UsuarioRepo implements IUsuarioRepo {
  async save(usuario: Usuario): Promise<void> {
    try {
      const { nome, telefone, email, senha } = usuario;
      await Usuario.create({
        nome,
        telefone,
        email,
        senha
      });
    } catch(err: any) {
      throw new Error(`Ocorreu um erro ao salvar o usuário: ${err.message}`);
    }
  }

  async update(usuario: Usuario): Promise<void> {
    try {
      const novoUsuario = await Usuario.findByPk(usuario.id);

      if(!novoUsuario) {
        throw new Error('Esse usuário não existe para ser atualizado!');
      }

      const { nome, telefone, email, senha } = usuario;

      novoUsuario.nome = nome;
      novoUsuario.telefone = telefone;
      novoUsuario.email = email;
      novoUsuario.senha = senha;

      await novoUsuario.save();
    } catch(err: any) {
      throw new Error(`Ocorreu um erro ao atualizar o usuário: ${err.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const novoUsuario = await Usuario.findByPk(id);

      if(!novoUsuario) {
        throw new Error('Esse usuário não existe para ser deletado!');
      }

      await novoUsuario.destroy();
    } catch(err: any) {
      throw new Error(`Ocorreu um erro ao deletar o usuário: ${err.message}`);
    }
  }

  async getAll(): Promise<Usuario[]> {
    try {
      return await Usuario.findAll({
        order: [['id', 'ASC']]
      });
    } catch(err: any) {
      throw new Error(`Houve um erro para listar todos os usuários: ${err.message}`);
    }
  }

  async get(id: number): Promise<Usuario> {
    try {
      const usuario = await Usuario.findByPk(id);

      if(!usuario) {
        throw new Error('Este usuário não existe!');
      }

      return usuario;
    } catch(err: any) {
      throw new Error(`Houve um erro para listar esta categoria: ${err.message}`);
    }
  }
}