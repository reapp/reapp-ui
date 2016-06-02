var React = require('react');
var Component = require('../component');
var clone = require('../lib/niceClone');
var TabItem = require('./TabItem');

var Tabs = Component({
  name: 'Tabs',

  propTypes: {

    // pass props to List.Item
    itemProps: React.PropTypes.object,

    // set the initial active tab item
    initialActiveIndex: React.PropTypes.number,

    // Automatically wrap children with Tab.Item
    wrap: React.PropTypes.bool,

    // Don't add padding
    nopad: React.PropTypes.bool

  },

  getInitialState() {
    return {
      activeIndex: 0
    };
  },

  componentWillReceiveProps(newProps) {
    if (newProps.initialActiveIndex) {
      this.stateState({activeIndex: newProps.initialActiveIndex});
    }
  },

  componentDidMount() {
    var stri = this.refs[`Tab_${this.state.activeIndex}`].refs.self.getDOMNode().offsetWidth;
    var padd = this.refs[`Tab_${this.state.activeIndex}`].refs.self.getDOMNode().offsetLeft;
    if (this.state.inkBarWidth !== (stri + padd)) {
      this.setState({inkBarWidth: stri + padd});
    }
  },

  componentDidUpdate() {
    console.log('updated');
    var stri = this.refs[`Tab_${this.state.activeIndex}`].refs.self.getDOMNode().offsetWidth;
    var padd = this.refs[`Tab_${this.state.activeIndex}`].refs.self.getDOMNode().offsetLeft;

    if (this.state.inkBarWidth !== (stri+ padd)) {
      this.setState({inkBarWidth: stri + padd});
    }
  },

  setActiveIndex(index) {
    if (this.state.activeIndex !== index) {
      this.setState({activeIndex: index});
    }
  },

  render() {
    var {
      children,
      itemProps,
      wrap,
      nopad,
      ...props } = this.props;

    var inkBarStyle = [];
    if (children.constructor === Array && children.length > 0) {
      inkBarStyle = this.componentProps('inkBar').style;
      inkBarStyle.push({
        width: this.state.inkBarWidth,
        left: `${((this.state.activeIndex) * ((100 / children.length).toPrecision(4)))}%`
      });
    }

    let tabItems = React.Children.map(children, (tab, i) => {
      var active = false;
      if (i == this.state.activeIndex) {
        active = true;
      }
      if (wrap)
        return (
          <TabItem {...itemProps}
            index={i}
            onTap={this.setActiveIndex}
            key={i}
            ref={`Tab_${i}`}
            active={active}
            wrapped={wrap}>
            {tab.content || tab}
          </TabItem>
        );

      return clone(tab, { key: i, index: i, nopad });
    });

    return (
      <div {...this.componentProps()} {...props}>
        <div {...this.componentProps('inner')}>
          {tabItems}
        </div>
        <div style={inkBarStyle} />
      </div>
    );
  }
});

Tabs.Item = require('./TabItem');

module.exports = Tabs;