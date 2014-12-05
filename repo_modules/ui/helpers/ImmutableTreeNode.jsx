var React = require('react');

// Build a tree from structured immutable objects
// Wraps each node with a component
//
// <ImmutableTreeNode
//    renderComponent={Comment}
//    childKey="kids"
//    cursor={immutableObject} />

var ImmutableTreeNode = module.exports = React.createClass({
  render() {
    var { idKey, level, cursor, childKey, renderComponent, ...props } = this.props;

    level = level || 0;
    var children = cursor.get(childKey);
    var Component = renderComponent;
    var childNodes;

    if (children) {
      var i = 0;
      var childLevel = `child-${level}`;

      childNodes = children.map(child => (
        <ImmutableTreeNode
          key={`${childLevel}-${++i}`}
          renderComponent={renderComponent}
          childKey={childKey}
          cursor={child}
          level={childLevel} />
      )).toArray();
    }

    return (
      <Component {...props}
        key={cursor.get(idKey)}
        level={level}
        cursor={cursor}>
        {childNodes}
      </Component>
    );
  }
});