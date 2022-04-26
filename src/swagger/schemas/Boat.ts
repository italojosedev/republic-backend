const Boat = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
    description: { type: 'string' },
    maximumCapacity: { type: 'number' },
    pricePerDay: { type: 'number' },
    promotion: { type: 'boolean' },
    priceOff: { type: 'number' },
    percentageOff: { type: 'number' },
    city: { type: 'string' },
    state: { type: 'string' },
    beach: { type: 'string' },
    image: { type: 'string' },
    images: [{
      id: { type: 'number' },
      imageUrl: { type: 'number' }
    }],
    typeLicense: {
      id: { type: 'number' },
      title: { type: 'string' },
      description: { type: 'string' }
    },
    // localization: object,
    boatAttributes: { type: 'string' },
    boatPackage: { type: 'number' },
    chekinHour: { type: 'Time' },
    checkoutHour: { type: 'Time' },
  },
};

export default Boat;
