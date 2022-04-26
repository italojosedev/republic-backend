const list = {
  summary: 'Send code sms for register user',
  tags: ['Users - Register'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          phone: {
            type: 'string',
            example: '11999999999'
          },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'send code',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              phone: {
                type: 'string',
                example: '1199999999'
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

export default list;
