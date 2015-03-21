// you probably shouldn't use this in production
// it will bundle every UI component with your app.

// good for bootstrapping/demos though

module.exports = {
  // components
  Alert: require('./components/Alert'),
  Badge: require('./components/Badge'),
  Bar: require('./components/Bar'),
  BarItem: require('./components/BarItem'),
  Block: require('./components/Block'),
  Button: require('./components/Button'),
  ButtonGroup: require('./components/ButtonGroup'),
  Card: require('./components/Card'),
  CardList: require('./components/CardList'),
  Chat: require('./components/Chat'),
  ChatItem: require('./components/ChatItem'),
  Checkbox: require('./components/Checkbox'),
  Dots: require('./components/Dots'),
  Drawer: require('./components/Drawer'),
  Gallery: require('./components/Gallery'),
  Form: require('./components/Form'),
  Grid: require('./components/Grid'),
  Icon: require('./components/Icon'),
  Input: require('./components/Input'),
  Label: require('./components/Label'),
  List: require('./components/List'),
  ListItem: require('./components/ListItem'),
  Menu: require('./components/Menu'),
  Modal: require('./components/Modal'),
  ModalButton: require('./components/ModalButton'),
  Popover: require('./components/Popover'),
  PopoverLink: require('./components/PopoverLink'),
  Radio: require('./components/Radio'),
  SearchBar: require('./components/SearchBar'),
  Swiper: require('./components/Swiper'),
  TextArea: require('./components/TextArea'),
  Title: require('./components/Title'),
  TitleBar: require('./components/TitleBar'),

  // views
  DottedViewList: require('./views/DottedViewList'),
  NestedViewList: require('./views/NestedViewList'),
  DrawerView: require('./views/DrawerView'),
  LayoutLeftNav: require('./views/LayoutLeftNav'),
  ViewList: require('./views/ViewList'),
  View: require('./views/View')
};