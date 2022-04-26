const Search = {
  summary: 'Search boats',
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
          boatName: { type: "string" },
          locationName: { type: "string" },
          boatCategory: { type: 'number' },
          amountOfPeople: { type: 'number' },
          daily: { type: 'number' }
        },
      },
    },
  },
  responses: {
    '200': {
      description: 'Search boats',
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

export default Search;
