const list = {
  summary: 'Returns the list of all users',
  tags: ['Users'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  parameters: [
    {
      in: 'query',
      name: 'page',
      schema: {
        type: 'integer',
      },
      description: 'The current page of pagination',
      default: 0,
    },
    {
      in: 'query',
      name: 'itemsPerPage',
      schema: {
        type: 'integer',
      },
      description: 'The items per page of pagination',
      default: 20,
    },
  ],
  responses: {
    '200': {
      description: 'Get all users',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              users: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/User',
                },
              },
              total: {
                type: 'object',
                properties: {
                  items: {
                    type: 'integer',
                    example: 1,
                  },
                  pages: {
                    type: 'integer',
                    example: 1,
                  },
                },
              },
              currentPage: {
                type: 'integer',
                default: 0,
              },
              itemsPerPage: {
                type: 'integer',
                default: 20,
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
