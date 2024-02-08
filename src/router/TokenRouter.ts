import TokenController from '../controller/TokenController';
import validate from '../middlewares/validateSchema';
import { createTokenSchema } from '../schemas/TokenSchema';
import BaseRoutes from './base/BaseRouter';

class TokenRoutes extends BaseRoutes {
  public routes(): void {
    this.router.post('/create', validate(createTokenSchema), TokenController.create);
  }
}

export default new TokenRoutes().router;