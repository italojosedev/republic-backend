const updateToLessee = {
  summary: 'Update To Lessee',
  tags: ['Users'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [],
  responses: {
    '200': {
      description: 'Returns user Lessee',
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

export default updateToLessee;
