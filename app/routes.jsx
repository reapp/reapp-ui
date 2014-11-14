var { Route, DefaultRoute } = require('react-router');
var Layout = require('./components/Layout');
var Articles = require('./pages/ArticlesPage');
var Article = require('./pages/Articles/ArticlePage');
var User = require('./pages/UserPage');
var ImageRoll = require('./pages/ImageRollPage');
var Viewer = require('./pages/ViewerPage');
var Kitchen = require('./pages/KitchenPage');
var ViewLists = require('./pages/Kitchen/ViewListsPage');
var ViewFrosted = require('./pages/Kitchen/ViewFrostedPage');
var Modals = require('./pages/Kitchen/ModalsPage');
var Popovers = require('./pages/Kitchen/PopoversPage');
var Tabs = require('./pages/Kitchen/TabsPage');
var Panels = require('./pages/Kitchen/PanelsPage');
var Lists = require('./pages/Kitchen/ListsPage');
var Controls = require('./pages/Kitchen/ControlsPage');
var Grids = require('./pages/Kitchen/GridsPage');
var Forms = require('./pages/Kitchen/FormsPage');

module.exports = (
  <Route name="app" path="/" handler={Layout}>
    <Route name="articles" path="/" handler={Articles}>
      <Route name="article" path="/article/:id" handler={Article} addHandlerKey={true} />
      <Route name="user" path="/user/:id" handler={User} addHandlerKey={true} />
    </Route>

    <Route name="kitchen" handler={Kitchen}>
      <Route name="controls" handler={Controls} />
      <Route name="modals" handler={Modals} />
      <Route name="popovers" handler={Popovers} />
      <Route name="tabs" handler={Tabs} />
      <Route name="panels" handler={Panels} />
      <Route name="lists" handler={Lists} />
      <Route name="viewLists" handler={ViewLists} />
      <Route name="viewFrosted" handler={ViewFrosted} />
      <Route name="grids" handler={Grids} />
      <Route name="forms" handler={Forms} />
    </Route>

    <Route name="viewer" handler={Viewer} />
    <Route name="imageRoll" handler={ImageRoll} />
  </Route>
);