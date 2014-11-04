var React = require('react/addons');
var cx = React.addons.classSet;

var Badge = React.createClass({
  getDefaultProps() {
    return {
      styles: {
        background: '#777',
        color: '#fff',
        borderRadius: 100,
        fontWeight: 'bold',

        text: {
          margin: 'auto'
        }
      }
    };
  },

  style: (size) => ({
    width: size,
    height: size,
  }),

  render() {
    var { className, size, styles, ...props } = this.props;
    var { text, ...styles } = styles;
    var classes = { Badge: true };
    classes[className] = !!className;

    return (
      <div {...props}
        className={cx(classes)}
        style={this.style(size)}
        styles={styles}>
        <span styles={[text].map(ReactStyle)}>
          {this.props.children}
        </span>
      </div>
    );
  }

});

module.exports = Badge;