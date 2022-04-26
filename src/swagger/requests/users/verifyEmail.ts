const verifyEmail = {
  type: 'object',
  required: ['email'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: 'admin@admin.com',
    },
  },
};

export default verifyEmail;
