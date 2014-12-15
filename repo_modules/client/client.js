var Rest = require('rest');
var Mime = require('rest/interceptor/mime');
var Parseurl = require('parseurl');
var Request = require('superagent');
var { Promise } = require('bluebird');

require('superagent-bluebird-promise');

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
      return Request.get(this.getUrl(url)).promise().then(
        res => {
          cache[url] = res.body;
          return res.body;
        },
        err => error(err)
      );
  }
}

function error(err) {
  throw new Error(err);
}

module.exports = Client;