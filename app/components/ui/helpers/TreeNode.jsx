var React = require('react');
var _ = require('lodash-node');
var invariant = require('react/lib/invariant');

// Build a tree from well structured objects
// Wraps each node with a component
// <TreeNode renderComponent={Comment} childKey="kids" data={article} />

var TreeNode = React.createClass({
  render() {
    var props = this.props;
    var level = props.level || 0;
    var children = props.data[props.childKey];
    var Component = props.renderComponent;
    var childNodes;

    if (children) {
      childNodes = _.map(children, (child, i) => {
        return (
          <TreeNode
            key={`${level}-${i}`}
            renderComponent={props.renderComponent}
            childKey={props.childKey}
            data={child}
            level={++level} />
        );
      })
    }

    return (
      <Component data={props.data}>
        {childNodes}
      </Component>
    );
  }
});

module.exports = TreeNode;