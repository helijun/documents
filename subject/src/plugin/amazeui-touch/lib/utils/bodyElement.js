'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _exenv = require('./exenv');

var bodyElement = _exenv.canUseDOM ? document.body : {
  appendChild: function appendChild() {}
};

exports.default = bodyElement;
module.exports = exports['default'];