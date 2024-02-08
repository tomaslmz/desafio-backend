import ProdutoController from '../controller/ProdutoController';
import loginRequired from '../middlewares/loginRequired';
import validate from '../middlewares/validateSchema';
import { 
  createProdutoSchema, 
  updateProdutoSchema, 
  deleteProdutoSchema, 
  getProdutoSchema 
} from '../schemas/ProdutoSchema';
import BaseRoutes from './base/BaseRouter';

class ProdutoRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', loginRequired, validate(createProdutoSchema), ProdutoController.create);
    this.router.patch('/update/:id', loginRequired, validate(updateProdutoSchema), ProdutoController.update);
    this.router.delete('/delete/:id', loginRequired, validate(deleteProdutoSchema), ProdutoController.delete);
    this.router.get('/list', ProdutoController.getAll);
    this.router.get('/search/:id', validate(getProdutoSchema), ProdutoController.get);
  }
}

export default new ProdutoRoutes().router;