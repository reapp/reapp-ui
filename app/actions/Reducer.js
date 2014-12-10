var { List, Map } = require('immutable');

// Simple reducer for use with flux / immutable data
// reduces an List or Map into a List of Maps with keys:

// { id, data, status }

// status is given first so we can allow currying, ex:
// doSomething().then(reducer.bind(null, 'LOADED'))

// status is optional, default value is 'OK'
// doSomething().then(reducer)

function reducer(status, obj) {
  if (!obj) {
    obj = status;
    status = 'OK';
  }

  if (!(obj instanceof List))
    obj = List([obj]);

  return obj.reduce((acc, data) => {
    var id = data.get('id') || '' + uniqueId();
    return acc.push(Map({ id, data, status }));
  }, List());
}

var id = 0;
function uniqueId() {
  return id++;
}

module.exports = reducer;