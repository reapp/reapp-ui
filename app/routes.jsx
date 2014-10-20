var { Routes, Route, DefaultRoute } = require('react-router');
var Articles = require('./pages/ArticlesPage');
var Article = require('./pages/Articles/ArticlePage');
var ImageRoll = require('./pages/ImageRollPage');
var Viewer = require('./pages/ViewerPage');
var ViewerRebound = require('./pages/ViewerReboundPage');
var List = require('./pages/ListPage');

module.exports = {
  init(App) {
    return (
      <Routes location="history">
        <Route name="app" path="/" handler={App}>
          <DefaultRoute name="home" handler={Articles} />

          <Route name="articles" handler={Articles}>
            <Route name="article" path=":id" handler={Article} addHandlerKey={true} />
          </Route>

          <Route name="viewer" handler={Viewer} />
          <Route name="list" handler={List} />
          <Route name="viewerRebound" handler={ViewerRebound} />
          <Route name="imageRoll" handler={ImageRoll} />
        </Route>
      </Routes>
    );
  }
};