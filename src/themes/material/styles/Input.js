module.exports = c => ({
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center'
  },
  input: {
    color: c.inputColor,
    background: c.inputBG,
    border: 'none',
    borderRadius: '3px',
    padding: '12px',
    fontSize: '16px',
    lineHeight: '24px',
    width: '100%'
  },
  leftPad: {
    paddingLeft: '64px'
  },
  leftIconWrapper: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: '0 0 0 16px',
  },
  rightPad: {
    paddingRight: '56px'
  },
  rightIconWrapper: {
    position: 'absolute',
    right: '0',
    top: '50%',
    transform: 'translateY(-50%)',
    margin: '0 16px 0 0',
  }
});