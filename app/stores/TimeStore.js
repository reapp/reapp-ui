var Fluxxor = require('fluxxor');

var TimeStore = Fluxxor.createStore({
  autoBind: ['theTime'],

  initialize() {
    this.theTime = new Date().toString();

    setInterval(function() {
      this.theTime = new Date().toString();
      this.emit('change');
    }.bind(this), 1000);
  }
});

module.exports = TimeStore;