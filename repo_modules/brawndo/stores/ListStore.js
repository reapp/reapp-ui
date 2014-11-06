var DataStore = require('./DataStore');

class ListStore extends DataStore  {
  get(id) {
    return this.data[id];
  }
}

module.exports = ListStore;