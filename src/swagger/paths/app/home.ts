const homeApp = {
  summary: 'home app',
  tags: ['home'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    '200': {
      description: 'send code',
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              offers: {
                type: 'object',
                properties: {
                  title: { type: "string" },
                  subTitle: { type: "string" },
                  discount: 1,
                  imageUrl: { type: "string" },
                  backgroundColor: { type: "string" }
                },
                highlights: {
                  type: 'object',
                  properties: {
                    imageUrl: { type: "string" },
                    boatId: 1,
                    title: { type: "string" },
                  }
                },
                boatCategories: {
                  type: 'object',
                  properties: {
                    title: { type: "string" },
                    id: { type: "number" }
                  }
                },
                recommendedBoats: {
                  type: 'object',
                  properties: {
                    name: { type: "string" },
                    city: { type: "string" },
                    state: { type: "string" },
                    pricePerDay: { type: 'number' },
                    stars: { type: 'number' },
                    id: { type: 'number' }
                  }
                },
                isLocator: { type: 'boolean' },
                isMariner: { type: 'boolean' }
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
  },
};

export default homeApp;
