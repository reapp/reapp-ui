var React = require('react');

// Build a tree from well structured immutable objects
// Wraps each node with a component
// <ImmutableTreeNode renderComponent={Comment} childKey="kids" data={immutableObject} />

var ImmutableTreeNode = React.createClass({
  render() {
    var props = this.props;
    var level = props.level || 0;
    var children = props.data.get(props.childKey);
    var Component = props.renderComponent;
    var childNodes;

    if (children) {
      childNodes = children.map((child, i) => {
        return (
          <ImmutableTreeNode
            key={`${level}-${i}`}
            renderComponent={props.renderComponent}
            childKey={props.childKey}
            data={child}
            dataKey={props.dataKey}
            level={++level} />
        );
      }).toArray();
    }

    return (
      <Component data={props.data.toJS()}>
        {childNodes}
      </Component>
    );
  }
});

module.exports = ImmutableTreeNode;