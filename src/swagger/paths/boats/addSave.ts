const AddSave = {
  summary: 'AddSave boats',
  tags: ['boat'],
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
          userId: { type: "number" },
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'AddSave boats',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              $ref: '#/components/schemas/BoatSave',
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

export default AddSave;
