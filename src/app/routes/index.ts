import { Application } from 'express';

import UserRoutes from './UserRoutes';
import RepublicRoutes from './RepublicRoutes';

const API = '/api';

class Routes {
  public setRoutes(app: Application): void {
    app.use(API, UserRoutes.getRoutes());
    app.use(API, RepublicRoutes.getRoutes());
  }
}

export default new Routes();
