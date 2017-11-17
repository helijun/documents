'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = {
  renderBackdrop: function renderBackdrop(children) {
    var _classSet;

    var onClick = this.handleBackdropClick || null;
    var classSet = (_classSet = {}, _defineProperty(_classSet, this.setClassNS('modal-backdrop'), true), _defineProperty(_classSet, this.setClassNS('modal-backdrop-out'), this.props.isClosing), _classSet);

    return _react2.default.createElement(
      'span',
      null,
      children,
      _react2.default.createElement('div', {
        onClick: onClick,
        ref: 'backdrop',
        className: (0, _classnames2.default)(classSet)
      })
    );
  }
};
module.exports = exports['default'];