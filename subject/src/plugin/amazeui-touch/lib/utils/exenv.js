'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * @licence https://github.com/JedWatson/exenv
 */

var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

var ExecutionEnvironment = {
  canUseDOM: canUseDOM,
  canUseWorkers: typeof Worker !== 'undefined',
  canUseEventListeners: canUseDOM && !!(window.addEventListener || window.attachEvent),
  canUseViewport: canUseDOM && !!window.screen
};

exports.default = ExecutionEnvironment;
module.exports = exports['default'];