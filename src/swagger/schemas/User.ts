const User = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      format: 'email',
      example: 'admin@admin.com',
    },
    firstName: {
      type: 'string',
      example: 'test',
    },
    lastName: {
      type: 'string',
      example: 'admin',
    },
    fullName: {
      type: 'string',
      example: 'test admin',
    },
    bornDate: {
      type: 'string',
      format: 'date',
      example: '2000-01-01',
    },
    profileImage: {
      type: 'string',
      format: 'binary',
      example: 'aws.com/profile-images/1.png',
    },
    
    phone: {
      type: 'string',
      example: '(xx) xxxxx-xxxx',
    },
    code: {
      type: 'integer',
      example: 1234,
    },
    
  
    country: {
      type: 'string',
      example: 'Lorem ipsum dolor sit amet.',
    },
    state: {
      type: 'string',
      example: 'Lorem ipsum dolor sit amet.',
    },
    city: {
      type: 'string',
      example: 'Lorem ipsum dolor sit amet.',
    },
   
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
};

export default User;
