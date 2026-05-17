import Model, { attr } from '@warp-drive/legacy/model';

export default class StationModel extends Model {
  @attr('string') lastUpdate;
  @attr('number') availableBikes;
  @attr('number') availableBikeStands;
  @attr('number') bikeStands;
  @attr('string') name;
  @attr('string') address;
  @attr rentalMethods;
  @attr position;
  @attr('boolean') isOpen;
}
