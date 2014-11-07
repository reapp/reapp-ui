var Swarm = require('swarm');
var Store = require('./Store');
var DataStore = require('./DataStoreMixin');

class SwarmStore extends Store {

  mixins: [DataStoreMixin]

}