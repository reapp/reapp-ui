var id = 0;

// Simple reducer for use with flux / immutable data
// reduces an array into an object with keys set to either
// the ID of each array item, or a unique generated ID

// status is given first so we can allow currying, ex:
// doSomething().then(reduceArr.bind(this, 'LOADED'))
//
// but it's optional, so if you just do this and still get
// the default status of 'OK' (see the !data check)
// doSomething().then(reduceArr)

function reduceArr(status, data) {
  if (!data) {
    data = status;
    status = null;
  }

  status = status || 'OK';

  return [].concat(data).reduce((acc, item) => {
    var clientId = item.id || uniqueId();
    acc[clientId] = { id: clientId, data: item, status: status };
    return acc;
  }, {});
}

function uniqueId() {
  return id++;
}

module.exports = reduceArr;