var React = require('react');
var { Route, DefaultRoute } = require('react-router');
var { route, routes } = require('react-router-generator');

var generate = props => {
  if (props.children)
    props.children = props.children.map(generate);

  console.log(props.handlerPath)
  var path = props.handlerPath.replace('app', 'components');
  console.log(path);
  props.handler = require(path);

  return props.defaultRoute ?
    <DefaultRoute {...props} /> :
    <Route {...props} />;
};

module.exports = generate(routes(
  route('app', '/',
    route('articles',
      route({ name: 'article', path: '/article/:id', addHandlerKey: true }),
      route({ name: 'user', path: '/user/:id', addHandlerKey: true })
    ),
    route('kitchen',
      route('controls'),
      route('modals'),
      route('popovers'),
      route('tabs'),
      route('cards'),
      route('panels'),
      route('lists'),
      route('view-lists'),
      route('dotted-view-list'),
      route('view-frosted'),
      route('grids'),
      route('forms')
    ),
    route('viewer')
  )
));