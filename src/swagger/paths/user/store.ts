const store = {
  summary: 'Create a new User',
  tags: ['Users - Register'],
  requestBody: {
    required: true,
    content: {
      'multipart/form-data': {
        schema: {
          $ref: '#/components/requests/users/store',
        },
      },
      'application/json': {
        schema: {
          $ref: '#/components/requests/users/store',
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

export default store;
