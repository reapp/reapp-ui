var React = require('react');

module.exports = React.createClass({
  statics: {
    didTransitionTo(params, query, setProps) {
      var todos = [];
      setProps({ data: { todos: todos }});
    },

    shouldRenderWithProps(props) {
      return !!props.data;
    }
  },

  getInitialState() {
    return this.props.data;
  },

  render() {
    return (
      <div id='TodoPage'>
      </div>
    );
  }

});