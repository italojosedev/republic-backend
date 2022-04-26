const signIn = {
  summary: 'Sign in user',
  tags: ['Sign In'],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/schemas/SignIn',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Returns token to authenticate user',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              user: {
                $ref: '#/components/schemas/User',
              },
              token: {
                type: 'string',
              },
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
  },
};

export default signIn;
