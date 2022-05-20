import { Router } from 'express';
import { UserController,} from '@controllers';
import { AuthMiddleware } from '@middlewares';
import multer, { Multer } from 'multer';

class UserRoutes {
  public router: Router;

  private multer: Multer;

  constructor() {
    this.router = Router();
    this.multer = multer();
  }

  getRoutes() {

    this.router.route('/signin').post(UserController.signIn);


    this.router
      .route('/forgot/send')
      .post(UserController.sendResetPassword);
    this.router.route('/forgot/validate').post(UserController.checkCodePassword);

    this.router
      .route('/forgot/reset')
      .post(UserController.resetPassword);

   
    this.router
      .route('/users')
      .get(AuthMiddleware.user, UserController.list)
      .post(AuthMiddleware.user, UserController.store)
      .put(
        AuthMiddleware.user,
        UserController.update
      )
      .patch(
        AuthMiddleware.user,
        UserController.update
      );
    this.router
      .route('/users/:userId')
      .get(AuthMiddleware.user, UserController.getById)

    return this.router;
  }
}

export default new UserRoutes();
