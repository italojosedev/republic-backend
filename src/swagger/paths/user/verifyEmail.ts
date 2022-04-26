const store = {
  summary: 'Verify Email',
  tags: ['Users'],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/requests/users/verifyEmail',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'return email not exist',
      content: {
        'application/json': {
          schema: {
            message: 'Email não existe',
          },
        },
      },
    },
    '4xx': {
      description: 'Bad request',
      content: {
        'application/json': {
          schema: {
            message: 'Email já existe',
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
