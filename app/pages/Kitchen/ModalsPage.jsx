var React = require('react');
var Immstruct = require('immstruct');
var Layout = require('../../components/ui/views/Layout');
var DrawerView = require('../../components/ui/views/DrawerView');

require('./Modals.styl');

var Modals = React.createClass({
  render() {
    var content = [
      <div className="content">Example of a deeply nested thing</div>,
      <div className="content">This is the first nested drawer</div>,
      <div className="content">This is the second deeply nested</div>,
      <div className="content">Final deeply nested view</div>
    ];

    var views = Immstruct([
      { title: 'One',   content: content[0], type: 'Draggable' },
      { title: 'Two',   content: content[1], type: 'Draggable' },
      { title: 'Three', content: content[2], type: 'Draggable' },
      { title: 'Four',  content: content[3], type: 'Draggable' }
    ]).cursor();

    var titles = views.map(x => x.title).toArray();

    function makeViews(views, index) {
      var view = views.get(index);
      if (!view) return null;
      return (
        <DrawerView title={view.get('title')}>
          {view.get('content')}
          {makeViews(views, ++index)}
        </DrawerView>
      );
    }

    return (
      <Layout titles={titles}>
        {makeViews(views, 0)}
      </Layout>
    );
  }
});

module.exports = Modals;