var Flux = require('bootstrap');

Flux
  .list('Articles')
  .from('/articles')
  .does({
    initialize() {},
    otherAction() {}
  });

Flux
  .single('Article')
  .from('/articles/{id}')
  .does({
    initialize() {},
    otherAction() {}
  });