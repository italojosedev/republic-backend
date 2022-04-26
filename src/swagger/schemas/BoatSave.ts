const BoatSave = {
  type: 'object',
  properties: {

    "boat": {
      type: 'object',
      properties: {
        $ref: '#/components/schemas/Boat'
      }
    },
    "user": {
      type: 'object',
      properties: {
        $ref: '#/components/schemas/User'
      }
    },
    "id": {
      type: 'number',
    },

    chekinHour: { type: 'Time' },
    checkoutHour: { type: 'Time' },
  },
};

export default BoatSave;
