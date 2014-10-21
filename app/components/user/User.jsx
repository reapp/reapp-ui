var Component = require('omniscient');
var ViewLeft = require('../ui/views/ViewLeft');
var TitleBar = require('../TitleBar');
var Drawer = require('../ui/views/Drawer');

module.exports = Component('User', cursor => {
  var user = cursor.get('user') || { get: () => 'Loading' };

  return (
    <Drawer>
      <TitleBar>{user.get('id')}</TitleBar>
      <ViewLeft>
        <p dangerouslySetInnerHTML={{__html: user.get('about')}}></p>
        <ul>
          <li>{user.get('karma')}</li>
        </ul>
      </ViewLeft>
    </Drawer>
  );
});