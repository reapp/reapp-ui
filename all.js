// you probably shouldn't use this in production
// it will bundle every UI component with your app.

// good for bootstrapping/demos though

module.exports = {
  // components
  Badge: require('./components/Badge'),
  Bar: require('./components/Bar'),
  BarItem: require('./components/BarItem'),
  Button: require('./components/Button'),
  ButtonRow: require('./components/ButtonRow'),
  Card: require('./components/Card'),
  CardList: require('./components/CardList'),
  Checkbox: require('./components/Checkbox'),
  Dots: require('./components/Dots'),
  Drawer: require('./components/Drawer'),
  Form: require('./components/Form'),
  Grid: require('./components/Grid'),
  Icon: require('./components/Icon'),
  Input: require('./components/Input'),
  Label: require('./components/Label'),
  List: require('./components/List'),
  ListItem: require('./components/ListItem'),
  Menu: require('./components/Menu'),
  Modal: require('./components/Modal'),
  Popover: require('./components/Popover'),
  PopoverLink: require('./components/PopoverLink'),
  Radio: require('./components/Radio'),
  SearchBar: require('./components/SearchBar'),
  Slider: require('./components/Slider'),
  Title: require('./components/Title'),
  TitleBar: require('./components/TitleBar'),

  // views
  DottedViewList: require('./views/DottedViewList'),
  DrawerView: require('./views/DrawerView'),
  FrostedGlassView: require('./views/FrostedGlassView'),
  LayoutLeftNav: require('./views/LayoutLeftNav'),
  NestedViewList: require('./views/NestedViewList'),
  View: require('./views/View')
};