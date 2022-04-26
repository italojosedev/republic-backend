const send = {
  summary: 'Generate reset code to User (email or phone)',
  tags: ['Users'],
  requestBody: {
    content: {
      'application/json': {
        schema: {
          $ref: '#/components/requests/users/resetPassword/send',
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Returns message',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                example: 'Sent code',
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

export default send;
