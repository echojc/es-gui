// polyfill fetch
require('whatwg-fetch');

// force bluebird
var Promise = require('bluebird');
Promise.config({
  cancellation: true,
  warnings: __DEV__ && { wForgottenReturn: false },
  longStackTraces: __DEV__,
  monitoring: __DEV__,
});
window.Promise = Promise;
