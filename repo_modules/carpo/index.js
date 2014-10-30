var Omniscient = require('omniscient');
var React = require('react/addons');
var Immstruct = require('immstruct');
var { FluxMixin, GetStores } = require('brawndo');

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
  return React.createClass({
    displayName: struct.name,
    mixins: [FluxMixin],

    statics: {
      store(name) {
        return new GetStores(undefined, ['articles']);
      },

      getAsyncProps(params) {
        return struct.getProps(params);
      }
    },

    getInitialState: () => ({ version: 0 }),

    componentWillReceiveProps(nextProps) {
      this.structure = this.makeStructure(nextProps);
      this.structure.on('next-animation-frame', () => {
        this.setState({ version: ++this.state.version });
      });
    },

    makeStructure(props) {
      return new Immstruct(props);
    },

    render() {
      if (!this.structure) return <span />;
      return struct.render(this.structure.cursor());
    }
  });
}

module.exports = {
  Page: Page,
  Component: Component
};