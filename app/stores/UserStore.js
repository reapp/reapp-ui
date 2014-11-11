var Brawndo = require('brawndo');

var UserStore = Brawndo.createStore({
  name: 'User',
  state: {
    data: {}
  },
  actions: {},
});

module.exports = UserStore;