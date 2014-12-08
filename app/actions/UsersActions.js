var Component = require('component');
var API = require('./API');

var { UsersStore } = Component.stores;
var { actions } = Component;

actions.userLoad.listen(id => {
  API.get(`user/${id}.json`).then(UsersStore);
});