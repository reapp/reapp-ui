var React = require('react');
var Component = require('../component');

module.exports = Component({
  name: 'Popover',

  propTypes: {
    open: React.PropTypes.bool,
    edgePadding: React.PropTypes.number,
    arrowSize: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      edgePadding: 3,
      arrowSize: 19
    };
  },

  getInitialState() {
    return {
      open: this.props.open || false
    };
  },

  componentDidMount() {
    var popover = this.refs.popover.getDOMNode();
    this.setState(this.getPositionState(popover, this.props.target));
    this.setState({ open: true });
  },

  componentWillReceiveProps(nextProps) {
    var nextState = {};

    if (nextProps.left && nextProps.top)
      nextState = Object.assign(nextState, { popoverLeft: nextProps.left, popoverTop: nextProps.top });
    if (nextProps.open)
      nextState = Object.assign(nextState, { open: nextProps.open });

    this.setState(nextState);
  },

  getPositionState(popover, target) {
    var { arrowTop, popoverTop } = this.getTop(popover, target);
    var { arrowLeft, popoverLeft } = this.getLeft(popover, target);
    return { popoverTop, popoverLeft, arrowTop, arrowLeft };
  },

  ensureEdgePadding(pos, max, width) {
    return Math.min(
      // upper limit
      max - this.props.edgePadding - width,
      // lower limit
      Math.max(this.props.edgePadding, pos)
    );
  },

  getLeft(popover, target) {
    var borderRadiusSize = 10; // todo: integrate with constants
    var targetLeft = target.left - window.scrollX;
    var targetCenter =  target.left + target.width / 2;
    var popoverCenter = popover.clientWidth / 2;
    var left = targetCenter - popoverCenter;

    return {
      arrowLeft: this.ensureEdgePadding(targetCenter - this.props.arrowSize / 2, window.innerWidth, this.props.arrowSize + borderRadiusSize),
      popoverLeft: this.ensureEdgePadding(left, window.innerWidth, popover.clientWidth)
    };
  },

  getTop(popover, target) {
    var targetTop = target.top - window.scrollY;
    var targetCenter = target.top + target.height / 2;
    var windowCenter = window.innerHeight / 2;
    var arrowOnBottom = targetCenter > windowCenter;
    var top = arrowOnBottom ?
      targetTop - popover.clientHeight - this.props.arrowSize :
      targetTop + target.height + this.props.arrowSize;

    // todo: get it working on the bottom side as well
    // probably need to use css position from bottom which
    // may need a little rethink of how this is done
    var arrowTop = top;

    return {
      arrowTop: this.ensureEdgePadding(arrowTop, window.innerHeight, this.props.arrowSize),
      popoverTop: this.ensureEdgePadding(top, window.innerHeight, popover.clientHeight)
    };
  },

  handleClose(e) {
    this.setState({ open: false });
    e.preventDefault();

    if (this.props.handleClose)
      this.props.handleClose(e);
  },

  render() {
    var { children, ...props } = this.props;

    if (this.state.open) {
      this.addClass('open');
      this.addStyles('open');
    }

    this.addStyles('popover',
      { top: this.state.popoverTop, left: this.state.popoverLeft });

    this.addStyles('arrow',
      { top: this.state.arrowTop, left: this.state.arrowLeft });

    return (
      <div {...this.componentProps()} {...props}
        onClick={this.handleClose}>
        <div {...this.componentProps('arrow')}>
          <div {...this.componentProps('arrowInner')} />
        </div>
        <div {...this.componentProps('popover')}>
          <ul {...this.componentProps('list')}>
            {React.Children.map(children, (li, i) => (
              <li key={i} styles={this.getStyles('item', i)}>
                {React.addons.cloneWithProps(li, { styles: this.getStyles('link') })}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
});