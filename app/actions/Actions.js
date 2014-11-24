var Fynx = require('fynx');

var actions = Fynx.createActions([
  'loadArticlesHot',
  'loadMoreHotArticles',
  'loadArticle',
  'loadUser'
]);

module.exports = actions;

// Required here so actions are bundled with the app
require('./ArticlesActions');
require('./UsersActions');