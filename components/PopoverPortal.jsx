var React = require('react');
var TweenState = require('react-tween-state');
var Component = require('../component');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'PopoverPortal',

  mixins: [
    TweenState.Mixin
  ],

  propTypes: {
    target: React.PropTypes.object.isRequired,
    open: React.PropTypes.bool,
    edgePadding: React.PropTypes.number,
    arrowSize: React.PropTypes.number,
    onClose: React.PropTypes.func,
    animationDuration: React.PropTypes.number,
    animations: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      open: true,
      edgePadding: 3,
      arrowSize: 26,
      animationDuration: 200,
      animations: {
        popover: ['fade', 'scaleDown'],
        bg: 'fade'
      }
    };
  },

  getInitialState() {
    return {
      step: 0,
      index: 1
    };
  },

  componentDidMount() {
    var popover = this.refs.popover.getDOMNode();
    var position = this.getPositionState(popover, this.props.target);
    this.setState(position);

    // animate open
    setTimeout(() =>
      this.tweenState('step', {
        endValue: 1,
        duration: this.props.animationDuration
      })
    );
  },

  componentWillReceiveProps(nextProps) {
    var nextState = {};

    if (nextProps.left && nextProps.top)
      nextState = Object.assign(nextState, {
          popoverLeft: nextProps.left,
          popoverTop: nextProps.top
        });
    if (nextProps.open)
      nextState = Object.assign(nextState,
        { open: nextProps.open });

    this.setState(nextState);
  },

  getPositionState(popover, target) {
    var targetRect = target.getBoundingClientRect();
    var tops = this.getTop(popover, targetRect);
    var lefts = this.getLeft(popover, targetRect);
    return Object.assign({}, tops, lefts);
  },

  ensureEdgePadding(pos, max, width) {
    return Math.min(
      // upper limit
      max - this.props.edgePadding - width,
      // lower limit
      Math.max(this.props.edgePadding, pos)
    );
  },

  getLeft(popover, targetRect) {
    var targetCenter = targetRect.left + targetRect.width / 2;
    var popoverHalfWidth = popover.clientWidth / 2;
    var popoverLeft = targetCenter - popoverHalfWidth;

    popoverLeft = this.ensureEdgePadding(popoverLeft, window.innerWidth, popover.clientWidth);

    var arrowLeft = 0;
    var arrowCenter = window.innerWidth - popoverHalfWidth;

    // adjust arrow when close to edge
    if (targetCenter < popoverHalfWidth)
      arrowLeft = - popoverHalfWidth - targetCenter;
    else if (targetCenter > arrowCenter)
      arrowLeft = targetCenter - arrowCenter;

    arrowLeft = this.ensureEdgePadding(arrowLeft, window.innerWidth, this.props.arrowSize / 2 + 10);

    return { arrowLeft, popoverLeft };
  },

  getTop(popover, targetRect) {
    var targetTop = targetRect.top - window.scrollY;
    var targetCenter = targetRect.top + targetRect.height / 2;
    var windowHalfWidth = window.innerHeight / 2;
    var arrowOnBottom = targetCenter > windowHalfWidth;
    var top = arrowOnBottom ?
      targetTop - popover.clientHeight - this.props.arrowSize :
      targetTop + targetRect.height + this.props.arrowSize;

    var arrowTop = arrowOnBottom ?
      popover.clientHeight :
      - this.props.arrowSize;

    // since its rotated 45deg, the real height is less 1/4 of set height
    var arrowHeight = this.props.arrowSize - this.props.arrowSize / 4;
    var arrowInnerTop = arrowHeight * (arrowOnBottom ? -1 : 1);
    var popoverTop = this.ensureEdgePadding(top, window.innerHeight, popover.clientHeight);

    return { arrowInnerTop, arrowTop, popoverTop };
  },

  handlePopoverSelect(e, cb) {
    if (!this.state.isClosing) {
      this.setState({ isClosing: true });
      this.tweenState('step', {
        endValue: 2,
        duration: this.props.animationDuration,
        onEnd: this.afterClose.bind(this, e, cb)
      });
    }
  },

  afterClose(e, cb) {
    setTimeout(() => {
      if (this.props.onClose) {
        if (cb) cb();
        this.props.onClose(e);
      }
    })
  },

  addPositionStyles() {
    this.addStyles('popover', {
      top: this.state.popoverTop,
      left: this.state.popoverLeft
    });

    this.addStyles('arrow', {
      top: this.state.arrowTop,
      width: this.props.arrowSize,
      height: this.props.arrowSize,
      marginLeft: -(this.props.arrowSize / 2) + this.state.arrowLeft
    });

    this.addStyles('arrowInner', {
      top: this.state.arrowInnerTop,
      width: this.props.arrowSize,
      height: this.props.arrowSize
    });
  },

  render() {
    var { children, open, ...props } = this.props;

    if (open) {
      this.addClass('open');
      this.addStyles('open');
    }

    this.addPositionStyles();

    return (
      <div {...this.componentProps()} {...props}>
        <div
          {...this.componentProps('bg')}
          onClick={this.handlePopoverSelect}
        />
        <div {...this.componentProps('popover')}>
          <div {...this.componentProps('arrow')}>
            <div {...this.componentProps('arrowInner')} />
          </div>
          <ul {...this.componentProps('list')}>
            {React.Children.map(children, (li, i) => (
              <li key={i} styles={this.getStyles('item', i)}>
                {clone(li, (item, i) => {
                  return {
                    styles: this.getStyles('link'),
                    onClick: (e) => {
                      this.handlePopoverSelect(e, item.props.onClick)
                    }
                  }
                })}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
});