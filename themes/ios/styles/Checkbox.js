module.exports = {
  self: {
    position: 'relative'
  },

  input: {
    display: 'none'
  },

  toggle: {
    position: 'relative',
    width: '52px',
    borderRadius: '16px',
    height: '32px',
    background: '#e5e5e5',
    appearance: 'none',
    border: 'none',
    cursor: 'pointer',
    transitionDuration: '300ms',
    zIndex: 0,
    margin: 0,
    padding: 0
  },

  toggleIsChecked: {
    background: '#4cd964'
  },

  toggleSwitch: {
    content: ' ',
    height: '28px',
    width: '28px',
    borderRadius: '28px',
    background: '#fff',
    position: 'absolute',
    zIndex: 2,
    top: 2,
    left: 2,
    boxShadow: '0 2px 5px rgba(0,0,0,0.35)',
    transform: 'translateX(0px)',
    transitionDuration: '300ms'
  },

  toggleSwitchIsChecked: {
    transform: 'translateX(22px)',
    WebkitTransform: 'translateX(22px)'
  }
};