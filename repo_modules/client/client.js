var Rest = require('rest');
var Mime = require('rest/interceptor/mime');

var rest = Rest.wrap(Mime);
var base = '';

var Client = {
  setBase(url) {
    base = url;
  },

  get(url, success, failure) {
    // callback style
    if (success && failure)
      rest(base + url).then((res) => (
        (res.status.code >= 300) ?
          failure(res.status) :
          success(res.entity)
      ));

    // promise style
    else
      return rest(base + url).then(
        (res) => res.entity,
        (res) => res
      );
  }
};

module.exports = Client;