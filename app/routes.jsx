var { Routes, Route, DefaultRoute } = require('react-router');
var Home = require('./pages/HomePage');
var ImageRoll = require('./pages/ImageRollPage');
var Viewer = require('./pages/ViewerPage');
var ViewerRebound = require('./pages/ViewerReboundPage');
var List = require('./pages/ListPage');

module.exports = {
  init(App) {
    return (
      <Routes location="history">
        <Route name="app" path="/" handler={App}>
          <DefaultRoute handler={Home} />
          <Route name="viewer" handler={Viewer} />
          <Route name="list" handler={List} />
          <Route name="viewerRebound" handler={ViewerRebound} />
          <Route name="imageRoll" handler={ImageRoll} />
        </Route>
      </Routes>
    );
  }
};