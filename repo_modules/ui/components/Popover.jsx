var React = require('react/addons');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

require('./Popover.styl');

var Popover = React.createClass({
  getDefaultProps() {
    return {
      styleVars: {
        bg: 'rgba(0,0,0,0.3)',
        listBg: 'rgba(255,255,255,0.95)',
        borderColor: '#ccc'
      }
    };
  },

  getInitialState() {
    return { open: this.props.open || false };
  },

  componentDidMount() {
    window.addEventListener(`popover-${this.props.id}`, e => {
      this.setState({ open: true });
    });
  },

  componentWillUnmount() {
    window.removeEventListener(`popover-${this.props.id}`);
  },

  styles: (STYLE) => ({
    bg: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 15000,
      background: STYLE.bg
    },

    list: {
      ':before': {
        content: ' ',
        background: STYLE.listBg,
        width: 26,
        height: 26,
        position: 'absolute',
        left: 0,
        top: 0,
        borderRadius: 3,
        transform: 'rotate(45deg)',
      },

      fontSize: '16px',
      background: STYLE.listBg,
      margin: 'auto',
      padding: 0,
      borderRadius: 5,
      textAlign: 'center'
    },

    item: {
      ':first': {
        borderTop: 'none'
      },

      minWidth: 120,
      borderTop: `1px solid ${STYLE.borderColor}`,
    }
  }),

  render() {
    if (!this.state.open) return null;
    var { className, listStyle, itemStyle, style, styleVars, ...props } = this.props;
    var styles = this.styles(styleVars);
    var classes = { Popover: true };

    classes[className] = !!className;

    return (
      <div
        {...props}
        styles={[styles.bg, style].map(ReactStyle)}
        className={cx(classes)}>
        <ul styles={[styles.list, listStyle].map(ReactStyle)}>
          {React.Children.map(this.props.children, (li, i) => (
            <li key={i} styles={[styles.item, itemStyle].map(ReactStyle)}>
              {li}
            </li>
          ))}
        </ul>
      </div>
    );
  }
});

module.exports = Popover;