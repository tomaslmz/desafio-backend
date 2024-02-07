import UsuarioController from '../controller/UsuarioController';
import BaseRoutes from './base/BaseRouter';
import validate from '../middlewares/validateSchema';
import { createUsuarioSchema, updateUsuarioSchema
  , deleteUsuarioSchema, getUsuarioSchema } from '../schemas/UsuarioSchema';

class UsuarioRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', validate(createUsuarioSchema), UsuarioController.create);
    this.router.patch('/update/:id', validate(updateUsuarioSchema), UsuarioController.update);
    this.router.delete('/delete/:id', validate(deleteUsuarioSchema), UsuarioController.delete);
    this.router.get('/list', UsuarioController.getAll);
    this.router.get('/search/:id', validate(getUsuarioSchema), UsuarioController.get);
  }
}

export default new UsuarioRoutes().router;