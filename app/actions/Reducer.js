var id = 0;

function reduceArr(data) {
  return [].concat(data).reduce((acc, item) => {
    var clientId = item.id || uniqueId();
    acc[clientId] = { id: clientId, data: item, status: 'OK' };
    return acc;
  }, {});
}

function uniqueId() {
  return id++;
}

module.exports = reduceArr;