var Rest = require('rest');
var Mime = require('rest/interceptor/mime');
var Parseurl = require('parseurl');
var HttpInvoke = require('httpinvoke');
var { Promise } = require('bluebird');

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
      return Promise.resolve(cache[url]);
    else
      return HttpInvoke(this.getUrl(url), 'GET').then(
        res => {
          cache[url] = res.body;
          return res.body;
        },
        err => error(err)
      );
  }

  dispatcher(dispatcher) {
    this.dispatcher = dispatcher;
  }
}

function error(err) {
  throw new Error(err);
}

module.exports = Client;