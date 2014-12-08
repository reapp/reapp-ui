require('./lib/init');

require('ui/themes/ios/all');
require('./app/mixins');

require('./lib/run')(require('./app/routes'));