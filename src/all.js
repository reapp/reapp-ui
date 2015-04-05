// you probably shouldn't use this in production
// it will bundle every UI component with your app.

// good for bootstrapping/demos though

module.exports = Object.assign(
  require('./components/Form'), {
  // components
  Alert: require('./components/Alert'),
  Badge: require('./components/Badge'),
  Bar: require('./components/Bar'),
  Block: require('./components/Block'),
  Button: require('./components/Button'),
  ButtonGroup: require('./components/ButtonGroup'),
  Card: require('./components/Card'),
  Chat: require('./components/Chat'),
  Dots: require('./components/Dots'),
  Drawer: require('./components/Drawer'),
  Gallery: require('./components/Gallery'),
  Grid: require('./components/Grid'),
  Icon: require('./components/Icon'),
  List: require('./components/List'),
  Menu: require('./components/Menu'),
  Modal: require('./components/Modal'),
  Popover: require('./components/Popover'),
  SearchBar: require('./components/SearchBar'),
  Title: require('./components/Title'),
  TitleBar: require('./components/TitleBar'),

  // decorators
  Tweenable: require('./decorators/Tweenable'),

  // buttons
  BackButton: require('./components/buttons/BackButton'),

  // helpers
  AnimationLoop: require('./helpers/AnimationLoop'),
  Swiper: require('./helpers/Swiper'),
  Tappable: require('./helpers/Tappable'),
  Theme: require('./helpers/Theme'),
  TouchableArea: require('./helpers/TouchableArea'),
  TreeNode: require('./helpers/TreeNode'),

  // behaviors
  NestedViewListBehavior: require('./behaviors/NestedViewListBehavior'),
  DottedViewListBehavior: require('./behaviors/DottedViewListBehavior'),
  DrawerViewListBehavior: require('./behaviors/DrawerViewListBehavior'),

  // views
  ViewList: require('./views/ViewList'),
  NestedViewList: require('./views/NestedViewList'),
  DottedViewList: require('./views/DottedViewList'),
  LayoutLeftNav: require('./views/LayoutLeftNav'),
  View: require('./views/View')
});