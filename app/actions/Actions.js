var Fynx = require('fynx');

module.exports = Fynx.createActions([
  'loadArticlesHot',
  'loadMoreHotArticles',
  'loadArticle',
  'loadUser'
]);

require('./ArticlesActions');
require('./UsersActions');