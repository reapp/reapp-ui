var StoreFactory = require('./StoreFactory');
var DataStoreMixin = require('./DataStoreMixin');

module.exports = StoreFactory('ListStore', [DataStoreMixin]);