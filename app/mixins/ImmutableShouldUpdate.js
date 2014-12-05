module.exports = { shouldComponentUpdate };

function shouldComponentUpdate (nextProps, nextState) {
  var isEqualState  = module.exports.isEqualState;

  var isNotIgnorable = not(or(isStatics, isChildren));

  var nextCursors    = filterKeyValue(guaranteeObject(nextProps), isNotIgnorable),
      currentCursors = filterKeyValue(guaranteeObject(this.props), isNotIgnorable);

  var nextCursorsKeys    = Object.keys(nextCursors),
      currentCursorsKeys = Object.keys(currentCursors);

  if (currentCursorsKeys.length !== nextCursorsKeys.length) {
    if (debug) debug.call(this, 'shouldComponentUpdate => true (number of cursors differ)');
    return true;
  }

  if (hasDifferentKeys(currentCursorsKeys, currentCursors, nextCursors)) {
    if (debug) debug.call(this, 'shouldComponentUpdate => true (cursors have different keys)');
    return true;
  }

  if (hasChangedCursors(currentCursors, nextCursors)) {
    if (debug) debug.call(this, 'shouldComponentUpdate => true (cursors have changed)');
    return true;
  }

  if (!isEqualState(this.state, nextState)) {
    if (debug) debug.call(this, 'shouldComponentUpdate => true (state has changed)');
    return true;
  }

  if (hasChangedProperties(currentCursors, nextCursors)) {
    if (debug) debug.call(this, 'shouldComponentUpdate => true (properties have changed)');
    return true;
  }

  if (debug) debug.call(this, 'shouldComponentUpdate => false');

  return false;
}

function guaranteeObject (prop) {
  if (!prop) {
    return {};
  }

  if (isCursor(prop)) {
    return { _dummy_key: prop };
  }

  if (typeof prop !== 'object') {
    return { _dummy_key: prop };
  }

  return prop;
}

function hasDifferentKeys (currentCursorsKeys, currentCursors, nextCursors) {
  return !currentCursorsKeys.every(function existsInBoth (key) {
    return typeof currentCursors[key] !== 'undefined' && typeof nextCursors[key] !== 'undefined';
  });
}

function hasChangedCursors (current, next) {
  current = filterKeyValue(current, isCursor);
  next    = filterKeyValue(next, isCursor);

  var isEqualCursor = module.exports.isEqualCursor;

  for (var key in current)
    if (!isEqualCursor(current[key], next[key]))
      return true;
  return false;
}

function hasChangedProperties (current, next) {
  current = filterKeyValue(current, not(isCursor));
  next    = filterKeyValue(next, not(isCursor));

  for (var key in current)
    if (!deepEqual(current[key], next[key]))
      return true;
  return false;
}

function hasShouldComponentUpdate (mixins) {
  return !!mixins.filter(function (mixin) {
    return !!mixin.shouldComponentUpdate;
  }).length;
}

function isCursor (potential) {
  return potential &&
    ((typeof potential.deref === 'function') || (typeof potential.__deref === 'function'));
}

function filterKeyValue (object, predicate) {
  var key, filtered = {};
  for (key in object)
    if (predicate(object[key], key))
      filtered[key] = object[key];
  return filtered;
}

function not (fn) {
  return function () {
    return !fn.apply(fn, arguments);
  };
}

function isStatics (val, key) {
  return key === 'statics';
}

function isChildren (val, key) {
  return key === 'children';
}

function or (fn1, fn2) {
  return function () {
    return fn1.apply(null, arguments) || fn2.apply(null, arguments);
  };
}
