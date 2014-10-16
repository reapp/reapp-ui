ENV = module.exports = {
  CLIENT: typeof window !== 'undefined',
  SERVER: typeof window === 'undefined'
};

if (ENV.CLIENT) {
  window.ENV = ENV;
  window.debug = require('debug');
}