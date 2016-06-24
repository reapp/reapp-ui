var React = require('react');
var Component = require('../component');
var clone = require('../lib/niceClone');
var TabItem = require('./TabItem');

var Tabs = Component({
  name: 'Tabs',

  propTypes: {

    activeIndex: React.PropTypes.number,

    // pass props to List.Item
    itemProps: React.PropTypes.object,

    // set the initial active tab item
    initialActiveIndex: React.PropTypes.number,

    // Automatically wrap children with Tab.Item
    wrap: React.PropTypes.bool,

    // Don't add padding
    nopad: React.PropTypes.bool

  },

  getDefaultProps() {
    return {
      activeIndex: 0
    };
  },

  getInitialState() {
    return {
      activeIndex: this.props.activeIndex,
      inkBarWidth: null,
      inkBarLeft: null
    };
  },

  componentWillReceiveProps(newProps) {
    if (newProps.initialActiveIndex) {
      this.setState({activeIndex: newProps.initialActiveIndex});
    }
    if (newProps.activeIndex) {
      this.setState({activeIndex: newProps.activeIndex});
    }
  },

  componentDidMount() {
    var inkBarLeft = 0;
    for (var t = 0; t < this.state.activeIndex; t++) {
      inkBarLeft = this.refs[`Tab_${t}`].refs.self.offsetWidth + inkBarLeft;
    }
    
    var inkBarWidth = this.refs[`Tab_${this.state.activeIndex}`].refs.self.offsetWidth;

    if (this.state.inkBarWidth !== inkBarWidth || this.state.inkBarLeft !== inkBarLeft) {
      this.setState({ inkBarWidth: inkBarWidth, inkBarLeft: inkBarLeft });
    }
  },

  componentDidUpdate() {
    var inkBarLeft = 0;
    for (var t = 0; t < this.state.activeIndex; t++) {
      inkBarLeft = this.refs[`Tab_${t}`].refs.self.offsetWidth + inkBarLeft;
    }

    var inkBarWidth = this.refs[`Tab_${this.state.activeIndex}`].refs.self.offsetWidth;

    if (this.state.inkBarWidth !== inkBarWidth || this.state.inkBarLeft !== inkBarLeft) {
      this.setState({ inkBarWidth: inkBarWidth, inkBarLeft: inkBarLeft });
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
        width: `${this.state.inkBarWidth}px`,
        left: `${this.state.inkBarLeft}px`
      });
    }

    var onTapProp = [];
    let tabItems = React.Children.map(children, (tab, i) => {
      var active = false;
      onTapProp[i] = function() {
        return null;
      };
      if (i === this.state.activeIndex) {
        active = true;
      }
      if (this.state.inkBarWidth !== null && this.state.inkBarLeft !== null) {
        onTapProp[i] = this.setActiveIndex;
      }
      if (wrap)
        return (
          <TabItem {...itemProps}
            index={i}
            onTap={onTapProp[i]}
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