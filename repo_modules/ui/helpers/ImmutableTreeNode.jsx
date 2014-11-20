var React = require('react');

// Build a tree from structured immutable objects
// Wraps each node with a component
// <ImmutableTreeNode renderComponent={Comment} childKey="kids" data={immutableObject} />

var ImmutableTreeNode = React.createClass({
  render() {
    var {
      idKey,
      level,
      data,
      childKey,
      renderComponent } = this.props;

    level = level || 0;
    var children = data.get(childKey);
    var Component = renderComponent || React.createElement('div');

    var childNodes;
    if (children) {
      var i = 0;
      var childLevel = level + 1;

      childNodes = children.map(child => (
        <ImmutableTreeNode
          key={`${childLevel}-${i++}`}
          renderComponent={renderComponent}
          childKey={childKey}
          data={child}
          level={childLevel} />
      )).toArray();
    }

    return Component(
      `treenode-${data.get(idKey)}`,
      { level: level, data: data },
      childNodes
    );
  }
});

module.exports = ImmutableTreeNode;