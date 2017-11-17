'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// UC browser UI controller

var controller = global.navigator && global.navigator.control || {};

/**
 * ucUIControl
 * @param {string} feature - 'gesture' or 'longpressMenu'
 * @param {boolean} state
 * @returns {boolean}
 */
function ucUIControl(feature, state) {
  return controller[feature] && controller[feature](state);
}

// disable gesture
ucUIControl('gesture', false);

exports.default = ucUIControl;
module.exports = exports['default'];