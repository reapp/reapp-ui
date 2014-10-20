var Component = require('omniscient');
var DraggableView = require('../../components/ui/views/DraggableView');
var TitleView = require('../ui/views/TitleView');
var TitleBar = require('../TitleBar');

module.exports = Component('User', cursor => {
  var user = cursor.get('user');
  var Drawer = DraggableView.bind(this, {
    className: 'article drawer',
    layer: 2, // todo integrate into app state to manage index
    viewProps: { style: { paddingTop: 0 } }
  });

  console.log('user', user)
  if (!user) return <Drawer />;

  return (
    <Drawer>
      <TitleBar>{user.get('id')}</TitleBar>
      <TitleView>
        <p dangerouslySetInnerHTML={{__html: user.get('about')}}></p>
        <ul>
          <li>{user.get('karma')}</li>
        </ul>
      </TitleView>
    </Drawer>
  );
});