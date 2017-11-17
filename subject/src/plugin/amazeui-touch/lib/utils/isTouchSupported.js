'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var supportTouch = !!('ontouchstart' in global || global.DocumentTouch && document instanceof DocumentTouch);

exports.default = supportTouch;
module.exports = exports['default'];