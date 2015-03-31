var React = require('react');

// Build a tree from structured objects
// Wraps each node with a component

var TreeNode = React.createClass({
  propTypes: {
    cursor: React.PropTypes.object.isRequired,
    childKey: React.PropTypes.string.isRequired,
    Component: React.PropTypes.func.isRequired,
    idKey: React.PropTypes.string,
    level: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      idKey: 'id',
      childKey: 'kids'
    };
  },

  render() {
    var {
      idKey,
      level,
      cursor,
      childKey,
      Component,
      ...props } = this.props;

    if (!cursor || !cursor.get)
      return null;

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
      );
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