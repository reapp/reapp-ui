var React = require('react/addons');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

require('./Popover.styl');

var Popover = React.createClass({
  getDefaultProps() {
    return {
      edgePadding: 10,
      styleVars: {
        bg: 'rgba(0,0,0,0.3)',
        listBg: 'rgba(255,255,255,0.95)',
        borderColor: '#ccc'
      }
    };
  },

  getInitialState() {
    return {
      open: this.props.open || false
    };
  },

  componentWillReceiveProps(nextProps) {
    var nextState = {};

    if (nextProps.left && nextProps.top)
      nextState = Object.assign(nextState, { left: nextProps.left, top: nextProps.top });
    if (nextProps.open)
      nextState = Object.assign(nextState, { open: nextProps.open });

    this.setState(nextProps);
  },

  componentDidMount() {
    window.addEventListener(`popover-${this.props.id}`, e => {
      var target = e.detail.boundingRect;
      var list = this.refs.list.getDOMNode();

      this.setState({
        open: true,
        left: this.getLeft(list, target),
        top: this.getTop(list, target)
      });
    });
  },

  getLeft(list, target) {
    var targetLeft = target.left - window.scrollX;
    var targetCenter =  targetLeft + target.width / 2;
    var listCenter = list.clientWidth / 2;
    var left = targetCenter - listCenter;
    var pad = this.props.edgePadding;
    return Math.max(
      pad,
      Math.min(left, window.innerWidth - pad - list.clientWidth)
    );
  },

  getTop(list, target) {
    var targetTop = target.top - window.scrollY;
    var targetCenter = targetTop + target.height / 2;
    var windowCenter = window.innerHeight / 2;
    var arrowOnBottom = targetCenter > windowCenter;
    var pad = this.props.edgePadding;
    var top = arrowOnBottom ?
      targetTop - list.clientHeight :
      targetTop + target.height;
    return arrowOnBottom ?
      Math.min(top, window.innerHeight - pad - list.clientHeight) :
      Math.max(top, pad);
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

  handleClick(e) {
    this.setState({ open: false });
    e.preventDefault();
  },

  render() {
    var { className, listStyle, itemStyle, style, styleVars, ...props } = this.props;
    var styles = this.styles(styleVars, this.state);
    var classes = { Popover: true, open: this.state.open };

    classes[className] = !!className;

    return (
      <div
        {...props}
        ref="bg"
        styles={[styles.bg, style].map(ReactStyle)}
        className={cx(classes)}
        onClick={this.handleClick}>
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