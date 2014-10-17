var Rest = require('rest');
var Mime = require('rest/interceptor/mime');
var debug = require('debug')('g:client');

var rest = Rest.wrap(Mime);

var Client = {
  get(url, success, failure) {
    // callback style
    if (success && failure) {
      debug('callback');
      rest(url).then((res) => {
        return (res.status.code >= 300) ?
          failure(res.status) :
          success(res.entity)
      })
    }

    // promise style
    else {
      debug('promise');
      return rest(url).then(
        (res) => res.entity,
        (res) => res
      );
    }
  }
};

module.exports = Client;