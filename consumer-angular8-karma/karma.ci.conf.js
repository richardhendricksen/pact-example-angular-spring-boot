// import settings from default config file
var properties = null;
var originalConfigFn = require('./karma.conf.js');
originalConfigFn({ set: function(arg) { properties = arg; } });

// alter settings here:
properties.browsers = ['ChromeHeadless'];

// export settings
module.exports = function (config) {
  config.set(properties);
};
