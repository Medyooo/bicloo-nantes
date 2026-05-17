import loadConfigFromMeta from '@embroider/config-meta-loader';
import { assert } from '@ember/debug';

const meta = loadConfigFromMeta('bicloo-app');

assert(
  'config is not an object',
  typeof meta === 'object' && meta !== null,
);
assert(
  'modulePrefix was not detected on your config',
  'modulePrefix' in meta && typeof meta.modulePrefix === 'string',
);
assert(
  'locationType was not detected on your config',
  'locationType' in meta && typeof meta.locationType === 'string',
);
assert(
  'rootURL was not detected on your config',
  'rootURL' in meta && typeof meta.rootURL === 'string',
);
assert(
  'APP was not detected on your config',
  'APP' in meta && typeof meta.APP === 'object',
);

const apiUrl =
  meta.environment === 'test'
    ? ''
    : meta.APP.apiUrl ||
      (meta.environment === 'development' ? 'http://localhost:3000' : '');

const config = Object.assign({}, meta, {
  APP: Object.assign({}, meta.APP, { apiUrl }),
});

export default config;
