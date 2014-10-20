var Component = require('omniscient');
var TitleView = require('../ui/views/TitleView');
var TitleBar = require('../TitleBar');

module.exports = Component('User', cursor => {
  var user = cursor.get('user');
  if (!user) return <div />;

  return (
    <div>
      <TitleBar>{user.get('id')}</TitleBar>
      <TitleView>
        <p dangerouslySetInnerHTML={{__html: user.get('about')}}></p>
        <ul>
          <li>{user.get('karma')}</li>
        </ul>
      </TitleView>
    </div>
  );
});