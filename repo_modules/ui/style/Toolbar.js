var Merge = require('react/lib/merge');

module.exports = function(props) {
  return Merge({
    fontSize: '16px',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    zIndex: 100,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: 44
  }, props);
};