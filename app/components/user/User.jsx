var Component = require('omniscient');
var TitleView = require('../ui/views/TitleView');
var TitleBar = require('../TitleBar');
var Drawer = require('../ui/views/Drawer');

module.exports = Component('User', cursor => {
  console.log('render user', cursor.get('user'))
  var user = cursor.get('user') || { get: () => 'Loading' };

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