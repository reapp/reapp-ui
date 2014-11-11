var Brawndo = require('brawndo');

var ArticleStore = Brawndo.createStore({
  name: 'Article',
  state: {
    data: {}
  },
  actions: {},
});

module.exports = ArticleStore;