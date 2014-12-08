var route = function(opts, ...children) {
  if (typeof opts === 'string') {
    opts = { name: opts };

    if (typeof children[0] === 'string')
      opts.path = children.shift();
  }

  if (!children.length)
    children = null;

  return Object.assign({ children, isRoute: true }, opts);
};

var capitalize = s => s[0].toUpperCase() + s.slice(1);
var proper = name => name.split('-').map(capitalize).join('');

var routes = function(opts, route) {
  // if no opts given
  if (opts.isRoute) {
    route = opts;
    opts = {};
  }

  // default opts
  opts = Object.assign({
    filename: name => proper(name),
    prefix: ''
  });

  return routesGenerator(opts, route, '');
};

var routesGenerator = (opts, route, parentsPath) => {
  var children;

  if (route.children)
    children = route.children.map(child => (
      routesGenerator(opts, child, parentsPath + route.name + '/')
    ));

  var handlerPath = './' + (opts.prefix || '') + parentsPath +
    (opts.handler ? opts.handler :
      (opts.filename ? opts.filename(route.name) : route.name));

  var props = {
    name: route.name,
    path: route.path,
    handlerPath,
    children
  };

  if (route.opts)
    Object.assign(props, route.opts);

  return props;
};

module.exports = { route, routes };