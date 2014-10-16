ENV = module.exports = {
  CLIENT: typeof window !== 'undefined',
  SERVER: typeof window === 'undefined'
};

var debug = require('debug');

if (ENV.CLIENT) {
  window.ENV = ENV;
  window.debug = debug;
}