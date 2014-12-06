var Rest = require('rest');
var Mime = require('rest/interceptor/mime');
var Parseurl = require('parseurl');
var When = require('when');

var cache = window.cache = {};

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
    opts = opts || {};
    if (!opts.nocache && cache[url])
      return When(cache[url]);
    else
      return this.rest(this.getUrl(url)).then(
        res => {
          cache[url] = res.entity;
          return res.entity;
        },
        res => res
      );
  }

  dispatcher(dispatcher) {
    this.dispatcher = dispatcher;
  }
}

module.exports = Client;