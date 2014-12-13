var Component = require('ui/component');
var ViewListMixin = require('../mixins/ViewListMixin');
var Dots = require('../components/Dots');

module.exports = Component({
  name: 'DottedViewList',

  mixins: [
    ViewListMixin
  ],

  getDefaultProps() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      resizeWithWindow: true,
      scrollToStep: 0,
      scrollerProps: {
        animationDuration: 400,
        paging: true,
        bouncing: false,
        scrollingY: false
      },
      animations: [
        { name: 'viewSideBySide', source: 'viewList' }
      ],
      titleBarProps: {
        height: 48,
        styles: {
          mid: {
            position: 'relative',
            top: -4
          }
        }
      },
      touchStartBoundsX: {
        from: 20,
        to: window.innerWidth
      }
    };
  },

  getInitialState() {
    return this.getViewListInitialState({
      activeViewIndex: 0
    });
  },

  handleViewEntered(index) {
    if (this.props.onViewEntered)
      this.props.onViewEntered(index);

    if (this.state.activeViewIndex !== index)
      this.setState({ activeViewIndex: index });
  },

  render() {
    return this.renderViewList(Object.assign(
      this.componentProps(),
      this.props,
      {
        onViewEntered: this.handleViewEntered,
        initialStep: this.state.activeViewIndex,
        after: (
          <Dots
            total={this.props.children.length}
            active={this.state.activeViewIndex}
            styles={this.getStyles('dots')} />
        )
      }
    ));
  }
});