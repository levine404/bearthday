const appConfig = {
  MAX_ATTEMPTS: 31,
  apis: {
    EPIC: 'https://api.nasa.gov/EPIC/api',
    EPIC_LAST_RECORDED_IMAGE: new Date('2019-06-27'),
    EPIC_API_KEY: 'd87njLUn4dfhUsb9LQ3Wd2vPe1l2Q6RJ7I4kX5QV'
  },
  resources: {
    EPIC: 'https://epic.gsfc.nasa.gov/archive/enhanced'
  }
};

export default appConfig;
