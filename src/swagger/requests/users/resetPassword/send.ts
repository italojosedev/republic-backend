const send = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      example: 'admin@admin.com',
    },
    phone: {
      type: 'string',
      example: '(xx) xxxxx-xxxx',
    },
  },
};

export default send;
