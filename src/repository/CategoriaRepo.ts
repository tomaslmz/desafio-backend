import Categoria from '../models/Categoria';

interface ICategoriaRepo {
  save(categoria: Categoria): Promise<void>;
  update(categoria: Categoria): Promise<void>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Categoria[]>;
  get(id: number): Promise<Categoria>;
}

export default class CategoriaRepo implements ICategoriaRepo {
  async save(categoria: Categoria): Promise<void> {
    try {
      await Categoria.create({
        descricao: categoria.descricao
      });
    } catch(err: any) {
      throw new Error(`Ocorreu um erro ao salvar a categoria: ${err.message}`);
    }
  }

  async update(categoria: Categoria): Promise<void> {
    try {
      const novaCategoria = await Categoria.findByPk(categoria.id);

      if(!novaCategoria) {
        throw new Error('Essa categoria não existe para ser atualizada!');
      }

      novaCategoria.descricao = categoria.descricao;

      await novaCategoria.save();
    } catch(err: any) {
      throw new Error(`Ocorreu um erro ao atualizar a categoria: ${err.message}`);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      const novaCategoria = await Categoria.findByPk(id);

      if(!novaCategoria) {
        throw new Error('Essa categoria não existe para ser deletada!');
      }

      await novaCategoria.destroy();
    } catch(err: any) {
      throw new Error(`Ocorreu um erro ao deletar a categoria: ${err.message}`);
    }
  }

  async getAll(): Promise<Categoria[]> {
    try {
      return await Categoria.findAll();
    } catch(err: any) {
      throw new Error(`Houve um erro para listar todas as categorias: ${err.message}`);
    }
  }

  async get(id: number): Promise<Categoria> {
    try {
      const categoria = await Categoria.findByPk(id);

      if(!categoria) {
        throw new Error('Esta categoria não existe!');
      }

      return categoria;
    } catch(err: any) {
      throw new Error(`Houve um erro para listar esta categoria: ${err.message}`);
    }
  }
}