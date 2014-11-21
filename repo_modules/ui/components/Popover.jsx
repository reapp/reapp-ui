var React = require('react');
var Component = require('ui/component');

require('./Popover.styl');

var Popover = Component('popover', {
  getDefaultProps() {
    return {
      edgePadding: 10
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

  componentWillUnmount() {
    window.removeEventListener(`popover-${this.props.id}`);
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

  handleClick(e) {
    this.setState({ open: false });
    e.preventDefault();
  },

  render() {
    var { listStyle, itemStyle, styleVars, ...props } = this.props;

    if (this.state.open) {
      this.addClass('open');
      this.addStyles({ visibility: 'visible', zIndex: 15000 });
    }

    this.addStyles('list', { top: this.state.top, left: this.state.left });
    this.addStyles('list', listStyle);
    this.addStyles('item', itemStyle);

    return (
      <div {...props} {...this.componentProps()}
        ref="bg"
        onClick={this.handleClick}>
        <ul
          ref="list"
          styles={this.getStyles('list')}>
          {React.Children.map(this.props.children, (li, i) => (
            <li key={i} styles={this.getStyles('item')}>
              {li}
            </li>
          ))}
        </ul>
      </div>
    );
  }
});

module.exports = Popover;