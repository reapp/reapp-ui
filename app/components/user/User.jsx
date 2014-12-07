var Component = require('component');
var View = require('ui/views/View');

module.exports = Component({
  render() {
    var { cursor } = this.props;
    var user = cursor.get('user') || { get: () => 'Loading' };

    return (
      <View title={user.get('id')}>
        <p dangerouslySetInnerHTML={{__html: user.get('about')}}></p>
        <ul>
          <li>{user.get('karma')}</li>
        </ul>
      </View>
    );
  }
});