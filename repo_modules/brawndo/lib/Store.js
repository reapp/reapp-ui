var Fluxxor = require('fluxxor');
var _ = require('lodash-node');

class Store {
  constructor(name, actions) {
    var self = this;
    this.name = name;
    this.loading = false;
    this.data = {};
    this.emit = this.noop;

    this.storeActions = {};
    this.storeActions[`LOAD_${name}`] = this.onLoading;

    this.flux = Fluxxor.createStore({
      initialize() {
        self.emit = this.emit;
        this.bindActions(_.merge(self.storeActions, actions));
      }
    });
  }

  onLoading() {
    this.loading = true;
    this.emit('change');
  }

  getFlux() {
    return this.flux;
  }

  noop() {}
}

module.exports = Store;