var { Routes, Route, DefaultRoute } = require('react-router');
var Home = require('./pages/home');
var Viewer = require('./pages/viewer');
var ViewerRebound = require('./pages/viewerRebound');

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