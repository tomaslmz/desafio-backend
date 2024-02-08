import UsuarioController from '../controller/UsuarioController';
import BaseRoutes from './base/BaseRouter';
import validate from '../middlewares/validateSchema';
import { createUsuarioSchema, updateUsuarioSchema } from '../schemas/UsuarioSchema';
import loginRequired from '../middlewares/loginRequired';

class UsuarioRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', validate(createUsuarioSchema), UsuarioController.create);
    this.router.patch('/update', loginRequired, validate(updateUsuarioSchema), UsuarioController.update);
    this.router.delete('/delete', loginRequired, UsuarioController.delete);
    this.router.get('/list', UsuarioController.getAll);
    this.router.get('/search', loginRequired, UsuarioController.get);
  }
}

export default new UsuarioRoutes().router;