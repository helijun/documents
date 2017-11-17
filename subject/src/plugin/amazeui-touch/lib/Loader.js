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

var Loader = _react2.default.createClass({
  displayName: 'Loader',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string,
    component: _react.PropTypes.node,
    amStyle: _react.PropTypes.string,
    rounded: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'loader',
      component: 'div'
    };
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var className = _props.className;
    var Component = _props.component;

    var props = _objectWithoutProperties(_props, ['className', 'component']);

    delete props.classPrefix;
    delete props.amStyle;
    delete props.rounded;

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      _react2.default.createElement('div', { className: this.prefixClass('bounce1') }),
      _react2.default.createElement('div', { className: this.prefixClass('bounce2') }),
      _react2.default.createElement('div', { className: this.prefixClass('bounce3') })
    );
  }
});

exports.default = Loader;
module.exports = exports['default'];