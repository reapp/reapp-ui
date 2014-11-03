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
      var el = e.detail.boundingRect;
      var list = this.refs.list.getDOMNode();

      this.setState({
        open: true,
        left: el.width / 2 + (el.left - window.scrollX) - (list.clientWidth / 2),
        top: el.height + (el.top - window.scrollY),
      });
    });
  },

  componentWillUnmount() {
    window.removeEventListener(`popover-${this.props.id}`);
  },

  styles: (STYLE, state) => ({
    bg: {
      visibility: state.open ? 'visible' : 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: state.open ? 15000 : -1,
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

      position: 'absolute',
      top: state.top,
      left: state.left,
      fontSize: '16px',
      background: STYLE.listBg,
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
    var { className, listStyle, itemStyle, style, styleVars, ...props } = this.props;
    var styles = this.styles(styleVars, this.state);
    var classes = { Popover: true };

    classes[className] = !!className;

    return (
      <div
        {...props}
        ref="bg"
        styles={[styles.bg, style].map(ReactStyle)}
        className={cx(classes)}>
        <ul
          ref="list"
          styles={[styles.list, listStyle].map(ReactStyle)}>
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