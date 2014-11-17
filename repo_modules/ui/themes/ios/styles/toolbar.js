module.exports = function(props) {
  return Object.assign({}, {
    fontSize: '16px',
    backgroundColor: '#fff',
    textAlign: 'center',
    borderBottom: '1px solid #ccc',
    zIndex: 1000,
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: 44
  }, props);
};