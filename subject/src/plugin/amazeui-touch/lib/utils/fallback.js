'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var fallback = {
  detectionRegex: {
    uc: /ucbrowser/i,
    zuoku: /zuoku build/i,
    coolpad: /coolpad/i
  },

  addHook: function addHook() {
    // Android browsers legacy flexbox fallback
    try {
      (function () {
        var ua = navigator.userAgent.toLowerCase();
        var fbNeeded = false;

        // TODO: - add version detecting when UC supports flexbox
        if (/android/i.test(ua)) {
          Object.keys(fallback.detectionRegex).forEach(function (key) {
            !fbNeeded && (fbNeeded = fallback.detectionRegex[key].test(ua));
          });

          fbNeeded && (document.documentElement.className += ' fb-legacy-flexbox');
        }
      })();
    } catch (e) {}
  }
};

fallback.addHook();

exports.default = fallback;
module.exports = exports['default'];