import EmberRouter from '@embroider/router';
import config from 'bicloo-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('stations', function() {
    this.route('show', { path: '/:station_id' });
  })
});
