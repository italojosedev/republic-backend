const update = {
  type: 'object',
  required: ['email', 'password', 'firstName', 'lastName', 'bornDate', 'documentNumber'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: 'admin@admin.com',
    },
    password: {
      type: 'string',
      example: 'password123',
    },
    firstName: {
      type: 'string',
      example: 'test',
    },
    lastName: {
      type: 'string',
      example: 'admin',
    },
    documentNumber: {
      type: 'string',
      example: '12345678901',
    },
    phone: {
      type: 'string',
      example: '123456768',
    },
    bornDate: {
      type: 'string',
      format: 'date',
      example: '2000-01-01',
    },
    profileImage: {
      type: 'string',
      format: 'binary',
    },
  },
};

export default update;