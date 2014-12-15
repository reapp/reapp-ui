var React = require('react');
var { Route, DefaultRoute } = require('react-router');
var { route, routes } = require('react-router-generator');

module.exports = generate(routes(
  { dir: 'components/' },
  route({ name: 'app', path: '/', dir: '' },
    route('articles', '/',
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
      route('dotted-view-lists'),
      route('view-frosted'),
      route('grids'),
      route('forms')
    ),
    route('viewer')
  )
));

function generate(props) {
  props.children = props.children ? props.children.map(generate) : null;
  props.handler = require(props.handlerPath);

  return props.defaultRoute ?
    <DefaultRoute {...props} /> :
    <Route {...props} />;
}