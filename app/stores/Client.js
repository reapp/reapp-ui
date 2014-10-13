var Superagent = require('superagent');

var Client = {
  load(url, success, error) {
    Superagent
      .get(url)
      .end((err, res) => {
        if (err) error();
        else success(res.body);
      });
  }
};

module.exports = Client;