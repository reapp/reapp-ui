var React = require('react');
var Component = require('ui/component');

module.exports = Component({
  name: 'Popover',

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

  withinEdgePadding(pos, max, extra) {
    return Math.min(max - this.props.edgePadding - extra,
      Math.max(this.props.edgePadding, pos));
  },

  getLeft(popover, target) {
    var targetLeft = target.left - window.scrollX;
    var targetCenter =  target.left + target.width / 2;
    var popoverCenter = popover.clientWidth / 2;
    var left = targetCenter - popoverCenter;
    return {
      arrowLeft: this.withinEdgePadding(targetCenter, window.innerWidth, this.props.arrowSize * 2),
      popoverLeft: this.withinEdgePadding(left, window.innerWidth, popover.clientWidth)
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
    return {
      arrowTop: this.withinEdgePadding(top, window.innerHeight, this.props.arrowSize),
      popoverTop: this.withinEdgePadding(top, window.innerHeight, popover.clientHeight)
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