import { useLegacyStore } from '@warp-drive/legacy';
import { JSONAPICache } from '@warp-drive/json-api';

const Store = useLegacyStore({
  linksMode: false,
  legacyRequests: true,
  cache: JSONAPICache,
  handlers: [
    // -- your handlers here
  ],
  schemas: [
    // -- your schemas here
  ],
});

export default Store;
