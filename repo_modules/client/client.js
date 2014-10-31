var Rest = require('rest');
var Mime = require('rest/interceptor/mime');
var Parseurl = require('parseurl');

var rest = Rest.wrap(Mime);

class Client {
  constructor() {
    this.base = '';
    this.requests = {}; // todo: caching
  }

  setBase(url) {
    this.base = url;
  }

  getUrl(url) {
    return new Parseurl(url).base !== null ?
      url :
      this.base + url;
  }

  get(url, opts) {
    url = this.getUrl(url);

    return rest(url).then(
      (res) => res.entity,
      (res) => res
    );
  }

  dispatcher(dispatcher) {
    this.dispatcher = dispatcher;
  }
}

module.exports = Client;