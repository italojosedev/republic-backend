import { JsonObject } from 'swagger-ui-express';
import schemas from './schemas';
import requests from './requests';
import responses from './responses';
import paths from './paths';
import tags from './tags';

const options: JsonObject = {
  openapi: '3.0.0',
  info: {
    title: 'Mami API',
    version: '1.0.0',
    description: 'Documentação da API do Mami',
  },
  servers: [
    {
      url: process.env.BASE_URL || 'http://localhost:3333/api',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'jwt',
      },
    },
    schemas,
    requests,
    responses,
  },
  paths,
  tags,
};

export default options;
