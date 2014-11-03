var React = require('react/addons');
var ReactStyle = require('react-style');
var cx = React.addons.classSet;

require('./Popover.styl');

var Popover = React.createClass({
  getInitialState() {
    return { open: this.props.open || false };
  },

  componentDidMount() {
    window.addEventListener(`popover-${this.props.id}`, e => {
      this.setState({ open: true });
    });
  },

  componentWillUnmount() {
    window.removeEventListener(`popover-${this.props.id}`);
  },

  styles: {
    background: '#fff',
    margin: 0,
    padding: 0,
    borderRadius: 10
  },

  render() {
    if (!this.state.open) return null;

    var classes = { Popover: true };
    classes[this.props.className] = !!this.props.className;

    return (
      <ul className={cx(classes)} styles={[this.styles, this.props.style].map(ReactStyle)}>
        {React.Children.map(this.props.children, (li, i) => (
          <li key={i}>
            {li}
          </li>
        ))}
      </ul>
    );
  }
});

module.exports = Popover;