var superagent = require('superagent');

var Client = {
  load(url, success, error) {
    superagent
      .get(url)
      .end(function(err, response) {
        if (err) error();
        else success(response.body);
      });
  }
};

module.exports = Client;