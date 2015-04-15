var React = require('react/addons');
var Component = require('../component');
var Icon = require('./Icon');
var Tappable = require('../mixins/Tappable');
var clone = require('../lib/niceClone');

module.exports = Component({
  name: 'ChatItem',

  mixins: [
    React.addons.PureRenderMixin,
    Tappable
  ],

  propTypes: {
    name: React.PropTypes.string,
    date: React.PropTypes.object,
    avatar: React.PropTypes.node,
    own: React.PropTypes.bool,
    plain: React.PropTypes.bool
  },

  render() {
    var {
      children,
      name,
      date,
      avatar,
      own,
      plain,
      ...props } = this.props;

    if (own) {
      this.addStyles('own');
      this.addStyles('arrow', 'arrowOwn');
      this.addClass('own');
    }
    else {
      this.addClass('them');
    }

    var tapProps;
    if (this.props.onTap) {
      tapProps = this.tappableProps();
      this.addClass(tapProps.className);
    }

    return (
      <div {...tapProps} {...props} {...this.componentProps()}>
        <p {...this.componentProps('inner')}>
          {children}
        </p>
        {!plain &&
          <div {...this.componentProps('arrow')} />
        }
      </div>
    );
  }
});