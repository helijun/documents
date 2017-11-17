'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * modified version of:
 * https://github.com/react-bootstrap/react-bootstrap/blob/master/src/utils/createChainedFunction.js
 */

/**
 * Safe chained function
 *
 * Will only create a new function if needed,
 * otherwise will pass back existing functions or null.
 *
 * @param {function} one
 * @param {function} two
 * @returns {function|null}
 */

function createChainedFunction(one, two) {
  var hasOne = typeof one === 'function';
  var hasTwo = typeof two === 'function';

  if (!hasOne && !hasTwo) {
    return null;
  }

  if (!hasOne) {
    return two;
  }

  if (!hasTwo) {
    return one;
  }

  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

exports.default = createChainedFunction;
module.exports = exports['default'];