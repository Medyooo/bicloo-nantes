'use strict';

module.exports = function (environment) {
  const ENV = {
    modulePrefix: 'bicloo-app',
    environment,
    rootURL: '/',
    locationType: 'history',
    EmberENV: {
      EXTEND_PROTOTYPES: false,
      FEATURES: {},
    },

    APP: {
      apiUrl:
        environment === 'development'
          ? process.env.API_URL || 'http://localhost:3000'
          : process.env.API_URL,
    },
  };

  if (environment === 'development') {
  }

  if (environment === 'test') {
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
    ENV.APP.apiUrl = '';
  }

  if (environment === 'production') {
  }

  return ENV;
};
