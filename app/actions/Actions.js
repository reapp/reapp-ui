var Fynx = require('fynx');

module.exports = Fynx.createActions([
  'loadArticlesHot',
  'loadArticle',
  'loadUser'
]);

require('./ArticlesActions');
require('./UsersActions');