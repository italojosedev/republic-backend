import SwaggerUI from 'swagger-ui-express';
import config from './config';

class Swagger {
  setup(app: any) {
    app.use('/api-docs', SwaggerUI.serve, SwaggerUI.setup(config));
  }
}

export default new Swagger();
