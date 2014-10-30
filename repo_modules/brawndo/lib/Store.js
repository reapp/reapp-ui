var Fluxxor = require('fluxxor');

class Store {
  constructor(name, actions) {
    var self = this;
    this.name = name;
    this.emit = this.noop;

    this.flux = Fluxxor.createStore({
      initialize() {
        self.emit = this.emit;
        this.bindActions(actions);
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