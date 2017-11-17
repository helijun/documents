'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get ownerDocument
 * @param {ReactComponent|HTMLElement} componentOrElement
 * @returns {HTMLDocument}
 */
function ownerDocument(componentOrElement) {
  var element = _reactDom2.default.findDOMNode(componentOrElement);

  return element && element.ownerDocument || document;
}

/**
 * Get ownerWindow
 * @param {HTMLElement} element
 * @returns {DocumentView|Window}
 * @see https://github.com/jquery/jquery/blob/6df669f0fb87cd9975a18bf6bbe3c3548afa4fee/src/event.js#L294-L297
 */
function ownerWindow(element) {
  var doc = ownerDocument(element);

  return doc.defaultView || doc.parentWindow || window;
}

exports.default = {
  ownerDocument: ownerDocument,

  ownerWindow: ownerWindow,

  scrollTop: function scrollTop(element, value) {
    if (!element) {
      return;
    }

    var hasScrollTop = 'scrollTop' in element;

    if (value === undefined) {
      return hasScrollTop ? element.scrollTop : element.pageYOffset;
    }

    hasScrollTop ? element.scrollTop = value : element.scrollTo(element.scrollX, value);
  },
  offset: function offset(element) {
    if (element) {
      var rect = element.getBoundingClientRect();
      var body = document.body;
      var clientTop = element.clientTop || body.clientTop || 0;
      var clientLeft = element.clientLeft || body.clientLeft || 0;
      var scrollTop = window.pageYOffset || element.scrollTop;
      var scrollLeft = window.pageXOffset || element.scrollLeft;

      return {
        top: rect.top + scrollTop - clientTop,
        left: rect.left + scrollLeft - clientLeft
      };
    }

    return null;
  },
  position: function position(element) {
    return {
      left: element.offsetLeft,
      top: element.offsetTop
    };
  }
};
module.exports = exports['default'];