import CategoriaController from '../controller/CategoriaController';
import BaseRoutes from './base/BaseRouter';
import { createCategoriaSchema, updateCategoriaSchema, 
  deleteCategoriaSchema, getCategoriaSchema} from '../schemas/CategoriaSchema';
import validate from '../middlewares/validateSchema';

class CategoriaRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', validate(createCategoriaSchema), CategoriaController.create);
    this.router.patch('/update/:id', validate(updateCategoriaSchema), CategoriaController.update);
    this.router.delete('/delete/:id', validate(deleteCategoriaSchema), CategoriaController.delete);
    this.router.get('/list', CategoriaController.getAll);
    this.router.get('/search/:id', validate(getCategoriaSchema),CategoriaController.get);
  }
}

export default new CategoriaRoutes().router;
