import { JSONAPIAdapter } from '@warp-drive/legacy/adapter/json-api';
import config from 'bicloo-app/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = config.APP.apiUrl;
}
