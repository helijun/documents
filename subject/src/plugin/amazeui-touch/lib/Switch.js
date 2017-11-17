'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Switch = _react2.default.createClass({
  displayName: 'Switch',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    name: _react.PropTypes.string,
    amStyle: _react.PropTypes.string,
    disabled: _react.PropTypes.bool,
    value: _react.PropTypes.bool,
    onValueChange: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'switch',
      onValueChange: function onValueChange() {}
    };
  },
  getValue: function getValue() {
    return this.refs.field.checked;
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var name = _props.name;
    var className = _props.className;
    var onValueChange = _props.onValueChange;
    var value = _props.value;
    var disabled = _props.disabled;

    var props = _objectWithoutProperties(_props, ['name', 'className', 'onValueChange', 'value', 'disabled']);

    delete props.classPrefix;

    return _react2.default.createElement(
      'label',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      _react2.default.createElement('input', {
        onChange: onValueChange.bind(this),
        name: name,
        type: 'checkbox',
        ref: 'field',
        defaultChecked: value,
        disabled: disabled
      }),
      _react2.default.createElement('span', { className: this.prefixClass('label') })
    );
  }
});

exports.default = Switch;
module.exports = exports['default'];