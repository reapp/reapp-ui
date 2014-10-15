var { Routes, Route, DefaultRoute } = require('react-router');
var Home = require('./pages/HomePage');
var ImageRoll = require('./pages/ImageRollPage');
var Viewer = require('./pages/ViewerPage');
var ViewerRebound = require('./pages/ViewerReboundPage');
var List = require('./pages/ListPage');
var ArticleView = require('./components/home/ArticleView');

module.exports = {
  init(App) {
    return (
      <Routes location="history">
        <Route name="app" path="/" handler={App}>
          <DefaultRoute handler={Home} />

          <Route name="article" handler={Home}>
            <Route name="articleView" path=":id" handler={ArticleView} addHandlerKey={true} />
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