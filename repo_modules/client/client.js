var Rest = require('rest');
var Mime = require('rest/interceptor/mime');
var Parseurl = require('parseurl');

class Client {
  constructor({ base }) {
    this.rest = Rest.wrap(Mime);
    this.base = base;
    this.requests = {}; // todo: caching
  }

  setBase(url) {
    this.base = url;
  }

  getUrl(url) {
    var host = new Parseurl(url).host;
    return host ? url : this.base + url;
  }

  get(url, opts) {
    return this.rest(this.getUrl(url)).then(
      res => res.entity,
      res => res
    );
  }

  dispatcher(dispatcher) {
    this.dispatcher = dispatcher;
  }
}

module.exports = Client;