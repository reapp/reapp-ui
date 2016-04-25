export default c => ({
  self: {
    position: 'relative',
    color: c.buttonColor,
    fontWeight: c.typography.fontWeightMedium,
    border: '10px',
    fontSize: '14px',
    textTransform: 'uppercase',
    letterSpacing: '0',
    background: 'none',
    borderRadius: '2px',
    transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px',
    textAlign: 'center',
    padding: '0px 0px',
    height: '36px',
    minWidth: '88px',
    zoom: 1,
    lineHeight: '36px',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    cursor: 'pointer',
    outline: 'none',
    overflow: 'hidden',
    flexFlow: 'row',
    flexAlign: 'center',
    alignItems: 'center',
    margin: 0,
    transform: 'translate3d(0, 0, 0)',
  },

  rippleGroup: {

  },

  ripple: {
    opacity: '0.16'
  },

  rippleLight: {
    backgroundColor: '#FFF'
  },

  rippleDark: {
    backgroundColor: '#000'
  },

  inner: {
    position: 'relative',
    margin: 'auto',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    width: '100%',
    height: '100%'
  },

  isInTitleBar: {
    color: c.buttonColorTitleBar
  },

  chromeless: {
    border: 'none',
    boxShadow: 'none',
    borderRadius: 0
  },

  fullscreen: {
    border: 'none',
    borderRadius: 0,
    margin: '0 -20px'
  },

  rounded: {
    borderRadius: '100px'
  },

  filled: {
    background: c.buttonFilledBG,
    color: c.buttonFilledColor,
  },

  inactive: {
    background: c.inactiveBG,
    color: c.inactiveColor,
    opacity: 0.2,
    pointerEvents: 'none'
  },

  tapActive: {
    boxShadow: 'rgba(0,0,0,0.156863) 0px 3px 10px, rgba(0,0,0,0.227451) 0px 3px 10px'
  },

  tapActiveFilled: {
    boxShadow: 'rgba(0,0,0,0.156863) 0px 3px 10px, rgba(0,0,0,0.227451) 0px 3px 10px'
  },

  tapActiveChromeless: {
    boxShadow: 'none'
  },

  tapActiveTitleBar: {
    opacity: 0.2
  }
});