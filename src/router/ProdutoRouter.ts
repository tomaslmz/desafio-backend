import ProdutoController from '../controller/ProdutoController';
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
    this.router.post('/create', validate(createProdutoSchema), ProdutoController.create);
    this.router.patch('/update/:id', validate(updateProdutoSchema), ProdutoController.update);
    this.router.delete('/delete/:id', validate(deleteProdutoSchema), ProdutoController.delete);
    this.router.get('/list', ProdutoController.getAll);
    this.router.get('/search/:id', validate(getProdutoSchema), ProdutoController.get);
  }
}

export default new ProdutoRoutes().router;