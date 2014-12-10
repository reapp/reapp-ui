var Client = require('client');
var Immutable = require('immutable');

class API extends Client {
  get(url, opts) {
    return super(url, opts).then(Immutable.fromJS);
  }
}

var opts = {
  base: 'https://hacker-news.firebaseio.com/v0/'
};

module.exports = new API(opts);