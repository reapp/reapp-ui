var React = require('react');
var Component = require('../component');
var StaticContainer = require('../helpers/StaticContainer');
var SVG = require('./SVG');

module.exports = Component({
  name: 'Icon',

  propTypes: {
    // width x height in pixels
    size: React.PropTypes.number,

    // an SVG file
    file: React.PropTypes.string,

    // props passed to svg
    stroke: React.PropTypes.number,
    shapeRendering: React.PropTypes.string,
    viewBox: React.PropTypes.string,
    crisp: React.PropTypes.bool,

    // internal props used for special styles
    isInTitleBar: React.PropTypes.bool,
    isInViewList: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      size: 32,
      stroke: 1,
      viewBox: '0 0 64 64',
      conditionalAnimations: {
        isInViewList: {
          self: 'iconTitleBar'
        }
      }
    };
  },

  render() {
    var {
      isInTitleBar,
      isInViewList,
      ...props
    } = this.props;

    const shouldUpdate = isInViewList ? !this.isAnimating('viewList') : true;

    this.addStyles({
      width: this.props.size,
      height: this.props.size
    });

    const color = this.props.color ||
      this.getConstant(isInTitleBar ? 'iconColorTitleBar' : 'iconColor');

    if (isInTitleBar)
      this.addStyles('isInTitleBar');

    return (
      <div {...this.componentProps()}>
        <StaticContainer update={shouldUpdate} styles={this.getStyles('static')} scrollingEnabled={false}>
          <SVG {...props} color={color} />
        </StaticContainer>
      </div>
    );
  }

});