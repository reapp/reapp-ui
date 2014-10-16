var Request = require('then-request');

var Client = {
  get(url, success, error) {
    Request('GET', url).done(function(res, err) {
      success(JSON.parse(res.body));
    });
  }
};

module.exports = Client;