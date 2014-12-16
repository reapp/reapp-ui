var { createStore } = require('fynx');
var { List } = require('immutable');

module.exports = {
  ArticlesStore: createStore(),
  HotArticlesStore: createStore(List()),
  UsersStore: createStore(List()),
  SavedArticlesStore: createStore(List())
};