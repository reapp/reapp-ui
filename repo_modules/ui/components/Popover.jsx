var React = require('react');
var Component = require('ui/component');

// todo: pass this to styles
var ARROW_SIZE = 19;

module.exports = Component('Popover', {
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

  componentDidMount() {
    var popover = this.refs.popover.getDOMNode();

    this.setState({
      open: true,
      left: this.getLeft(popover, this.props.target),
      top: this.getTop(popover, this.props.target)
    });
  },

  componentWillReceiveProps(nextProps) {
    var nextState = {};

    if (nextProps.left && nextProps.top)
      nextState = Object.assign(nextState, { left: nextProps.left, top: nextProps.top });
    if (nextProps.open)
      nextState = Object.assign(nextState, { open: nextProps.open });

    this.setState(nextState);
  },

  getLeft(popover, target) {
    var targetLeft = target.left - window.scrollX;
    var targetCenter =  targetLeft + target.width / 2;
    var popoverCenter = popover.clientWidth / 2;
    var left = targetCenter - popoverCenter;
    var pad = this.props.edgePadding;
    return Math.max(
      pad,
      Math.min(left, window.innerWidth - pad - popover.clientWidth)
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
    var { itemStyle, children, ...props } = this.props;

    if (this.state.open) {
      this.addClass('open');
      this.addStyles(this.styles.open);
    }

    this.addStyles('popover', { top: this.state.top, left: this.state.left });
    this.addStyles('item', itemStyle);

    return (
      <div {...props} {...this.componentProps()}
        onClick={this.handleClose}>
        <div {...this.componentProps('popover')}>
          <div {...this.componentProps('arrow')}>
            <div {...this.componentProps('arrowInner')} />
          </div>
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