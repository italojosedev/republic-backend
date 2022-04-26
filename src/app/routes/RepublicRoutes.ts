import { Router } from 'express';
import { RepublicController,} from '@controllers';
import { AuthMiddleware } from '@middlewares';
import multer, { Multer } from 'multer';

class RepublicRoutes {
  public router: Router;

  private multer: Multer;

  constructor() {
    this.router = Router();
    this.multer = multer();
  }

  getRoutes() {
    this.router
      .route('/republic')
      .post( RepublicController.store);

    return this.router;
  }
}

export default new RepublicRoutes();
