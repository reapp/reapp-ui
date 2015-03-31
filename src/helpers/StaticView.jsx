var React = require('react');
var View = require('../views/View');

// Simple helper for creating view pages
// ... why do we have this?
// If you're using a ViewList with animations, your animations
// will repeatedly call a View's render in order to animate the
// title and view.

// But, Views are smart enough that they will disable rendering of
// all their children.

// This little helper just saves you a few lines of code if you
// follow the right format

// Just pass in a composite class that has title set in statics

var index = 0;

module.exports = function(ViewClass) {
  index++;

  // React.createClass on passed in class if necessary
  if (!React.isValidElement(ViewClass)) {
    ViewClass.displayName = ViewClass.displayName || 'ViewClass' + index;
    ViewClass = React.createClass(ViewClass);
  }

  return React.createClass({
    displayName: 'StaticView' + index,

    render() {
      return (
        <View {...this.props} title={ViewClass.title}>
          <ViewClass {...this.props} title={ViewClass.title} />
        </View>
      );
    }
  });
};