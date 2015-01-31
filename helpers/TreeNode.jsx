var React = require('react');

// Build a tree from structured objects
// Wraps each node with a component

var TreeNode = React.createClass({
  propTypes: {
    idKey: React.PropTypes.string.isRequired,
    cursor: React.PropTypes.object.isRequired,
    childKey: React.PropTypes.string.isRequired,
    Component: React.PropTypes.node.isRequired,
    level: React.PropTypes.number
  },

  render() {
    var {
      idKey,
      level,
      cursor,
      childKey,
      Component,
      ...props } = this.props;

    level = level || 0;
    var children = cursor.get(childKey);
    var childNodes;

    if (children) {
      var i = 0;
      level++;

      childNodes = children.map(child =>
        <TreeNode
          key={`treenode-${level}-${++i}`}
          Component={Component}
          childKey={childKey}
          cursor={child}
          level={level} />
      ).toArray();
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

module.exports = TreeNode;