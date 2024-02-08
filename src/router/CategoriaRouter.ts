import CategoriaController from '../controller/CategoriaController';
import BaseRoutes from './base/BaseRouter';
import { createCategoriaSchema, updateCategoriaSchema, 
  deleteCategoriaSchema, getCategoriaSchema} from '../schemas/CategoriaSchema';
import validate from '../middlewares/validateSchema';
import loginRequired from '../middlewares/loginRequired';

class CategoriaRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', loginRequired, validate(createCategoriaSchema), CategoriaController.create);
    this.router.patch('/update/:id', loginRequired, validate(updateCategoriaSchema), CategoriaController.update);
    this.router.delete('/delete/:id', loginRequired, validate(deleteCategoriaSchema), CategoriaController.delete);
    this.router.get('/list', CategoriaController.getAll);
    this.router.get('/search/:id', validate(getCategoriaSchema),CategoriaController.get);
  }
}

export default new CategoriaRoutes().router;
