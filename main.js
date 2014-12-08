require('./lib/init');

require('./app/mixins');
require('./app/stores');
require('./app/actions');

require('./lib/run')(require('./app/routes'));