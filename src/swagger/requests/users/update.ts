const update = {
  type: 'object',
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
    bornDate: {
      type: 'string',
      format: 'date',
      example: '2000-01-01',
    },
    profileImage: {
      type: 'string',
      format: 'binary',
    },
    
    joinType: {
      type: 'number',
      example: 1,
      description: 'join type id',
    },
    joinReason: {
      type: 'string',
      example: 'Lorem ipsum dolor sit amet.',
    },
  },
};

export default update;
