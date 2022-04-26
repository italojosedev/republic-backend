const update = {
  summary: 'Update user by id',
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
  requestBody: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          $ref: '#/components/requests/users/update',
        },
      },
      'application/json': {
        schema: {
          $ref: '#/components/requests/users/update',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Returns new user',
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

export default update;
