var DataStore = require('./DataStore');

class ListStore extends DataStore  {
  constructor(name, actions) {
    super(name, actions);
  }

  get(id) {
    return this.data[id];
  }
}

module.exports = ListStore;