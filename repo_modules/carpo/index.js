var Omniscient = require('omniscient');
var React = require('react');

// Integrates Omniscinet with react-router

function Component(struct) {
  // react style
  if (typeof struct === 'object' && struct.render) {
    var { name, mixins, render } = struct;
    var args = [name, mixins, render].filter(x => x !== undefined);
    return Omniscient.apply(this, args);
  }
  // omniscient style
  else {
    return Omniscient.apply(this, arguments);
  }
}

function Page(struct) {
  var { mixins, render, getDefaultProps, ...restOfPage } = struct;

  return React.createClass({
    mixins: [].concat(restOfPage, mixins),

    statics: {
      getAsyncProps(params) {
        return { asyncProps: getDefaultProps(params) };
      }
    },

    getInitialState: () => ({ version: 0 }),

    componentWillReceiveProps(nextProps) {
      if (nextProps.asyncProps.data) {
        this.structure = nextProps.asyncProps.data;

        // expects immstruct
        this.structure.on('next-animation-frame', () => {
          // todo: forceUpdate instead
          this.setState({ version: ++this.state.version });
        });
      }
    },

    render() {
      if (!this.structure) return <span />;
      var cursor = this.structure.cursor().set('handler', this.props.activeRouteHandler);
      return render(cursor);
    }
  });
}

module.exports = { Page, Component };