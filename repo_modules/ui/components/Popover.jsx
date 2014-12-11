var React = require('react');
var Component = require('ui/component');

// todo: pass this to styles
var ARROW_SIZE = 19;

module.exports = Component({
  name: 'Popover',

  getDefaultProps() {
    return {
      edgePadding: 3
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
      nextState = Object.assign(nextState, { left: nextProps.left, top: nextProps.top });
    if (nextProps.open)
      nextState = Object.assign(nextState, { open: nextProps.open });

    this.setState(nextState);
  },

  getPositionState(popover, target) {
    var top = this.getTop(popover, target);
    var left = this.getLeft(popover, target);
    var arrowTop = 1;
    var arrowLeft = arrowLeft;
    return { top, left, arrowTop, arrowLeft };
  },

  getLeft(popover, target) {
    var targetLeft = target.left - window.scrollX;
    var targetCenter =  targetLeft + target.width / 2;
    var popoverCenter = popover.clientWidth / 2;
    var left = targetCenter - popoverCenter;
    return Math.max(
      this.props.edgePadding,
      Math.min(
        left,
        window.innerWidth - this.props.edgePadding - popover.clientWidth
      )
    );
  },

  getTop(popover, target) {
    var targetTop = target.top - window.scrollY;
    var targetCenter = targetTop + target.height / 2;
    var windowCenter = window.innerHeight / 2;
    var arrowOnBottom = targetCenter > windowCenter;
    var pad = this.props.edgePadding;
    var top = arrowOnBottom ?
      targetTop - popover.clientHeight - ARROW_SIZE :
      targetTop + target.height + ARROW_SIZE;
    return arrowOnBottom ?
      Math.min(top, window.innerHeight - pad - popover.clientHeight) :
      Math.max(top, pad);
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
      { top: this.state.top, left: this.state.left });

    this.addStyles('arrow',
      { top: this.state.arrowTop, left: this.state.arrowLeft });

    return (
      <div {...props} {...this.componentProps()}
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