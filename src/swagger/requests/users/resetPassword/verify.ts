const verify = {
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
    code: {
      type: 'number',
      example: 1111,
    },
  },
};

export default verify;
