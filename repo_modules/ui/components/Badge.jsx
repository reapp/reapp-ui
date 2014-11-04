var React = require('react/addons');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

var Badge = React.createClass({
  getDefaultProps() {
    return {
      styles: {
        badge: {
          background: '#999',
          color: '#fff',
          borderRadius: 100,
          fontWeight: 'bold',
        },

        text: {
          margin: 'auto 6px',
          fontSize: '14px',
          lineHeight: '20px',
          fontWeight: 'normal'
        }
      }
    };
  },

  render() {
    var { children, value, className, size, styles, ...props } = this.props;
    var classes = { Badge: true };
    classes[className] = !!className;

    return (
      <div {...props}
        className={cx(classes)}
        styles={[styles.badge].map(ReactStyle)}>
        <span styles={[styles.text].map(ReactStyle)}>
          {value || children}
        </span>
      </div>
    );
  }

});

module.exports = Badge;