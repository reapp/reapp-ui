var React = require('react');

// Build a tree from structured immutable objects
// Wraps each node with a component
// <ImmutableTreeNode renderComponent={Comment} childKey="kids" data={immutableObject} />

var ImmutableTreeNode = React.createClass({
  render() {
    var props = this.props;
    var level = props.level || 0;
    var children = props.data.get(props.childKey);
    var Component = props.renderComponent || React.DOM.div;

    var childNodes;
    if (children) {
      var i = 0;
      var childLevel = level + 1;

      childNodes = children.map((child) => (
        <ImmutableTreeNode
          key={`${childLevel}-${i++}`}
          renderComponent={props.renderComponent}
          childKey={props.childKey}
          data={child}
          level={childLevel} />
      )).toArray();
    }

    return (
      <Component level={level} data={props.data}>
        {childNodes}
      </Component>
    );
  }
});

module.exports = ImmutableTreeNode;