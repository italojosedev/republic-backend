const getById = {
  summary: 'Get user by id',
  tags: ['Users'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      in: 'path',
      name: 'userId',
      schema: {
        type: 'string',
        description: 'user id',
      },
    },
  ],
  responses: {
    '200': {
      description: 'User data',
      content: {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/User',
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
  },
};

export default getById;
