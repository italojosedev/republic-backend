const getById = {
  summary: 'show boat by id',
  tags: ['boat'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'show boat by id',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              $ref: '#/components/schemas/Boat',
            }
          },
        },
      },
    },
  },
  '4xx': {
    description: 'Bad request',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/responses/4xx',
        },
      },
    },
  },
  '5xx': {
    description: 'Internal server error',
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/responses/5xx',
        },
      },
    },
  },
};

export default getById;
