var { Routes, Route, DefaultRoute } = require('react-router');
var Home = require('./pages/HomePage');
var Viewer = require('./pages/ViewerPage');
var ViewerRebound = require('./pages/ViewerReboundPage');

module.exports = {
  init(App) {
    return (
      <Routes location="history">
        <Route name="app" path="/" handler={App}>
          <DefaultRoute handler={Home} />
          <Route name="viewer" handler={Viewer} />
          <Route name="viewerRebound" handler={ViewerRebound} />
        </Route>
      </Routes>
    );
  }
};