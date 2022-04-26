const serverError = {
  type: 'object',
  properties: {
    error: {
      type: 'object',
      default: 'Internal server error',
    },
  },
};

export default serverError;
