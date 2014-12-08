var Component = require('component');
var API = require('./API');
var { UsersStore } = require('../stores');
var Actions = require('../actions');

Actions.userLoad.listen(id => {
  API.get(`user/${id}.json`).then(UsersStore);
});