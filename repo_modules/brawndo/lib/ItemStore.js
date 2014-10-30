var DataStore = require('./DataStore');

class ItemStore extends DataStore  {
  constructor(name, actions) {
    super(name, actions);
  }

  onLoadingSuccess(payload) {
    super([payload]);
  }
}

module.exports = ItemStore;