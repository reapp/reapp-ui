var Flux = require('bootstrap');

Flux
  .collectionStore('Articles')
  .gets('/articles/{id}')
  .extend({
    initialize() {

    },
    otherAction() {

    }
  });