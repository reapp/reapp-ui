var Client = require('client');

var opts = {
  base: 'https://hacker-news.firebaseio.com/v0/'
};

module.exports = new Client(opts);