import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class StationsShowRoute extends Route {
  @service store;
  async model(params) {
    return this.store.findRecord('station', params.station_id);
  }

}
