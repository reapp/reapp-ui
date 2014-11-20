var Actions = require('./Actions');
var API = require('./API');
var UsersStore = require('stores/UsersStore');

Actions.loadUser.listen(id => {
  API.get(`user/${id}.json`).then(UsersStore);
});