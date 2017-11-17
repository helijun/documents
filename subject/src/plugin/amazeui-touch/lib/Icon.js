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

var Icon = _react2.default.createClass({
  displayName: 'Icon',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    component: _react.PropTypes.node.isRequired,
    name: _react.PropTypes.string.isRequired,
    href: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'icon',
      component: 'span'
    };
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var Component = _props.component;
    var className = _props.className;
    var name = _props.name;

    var props = _objectWithoutProperties(_props, ['component', 'className', 'name']);

    delete props.classPrefix;

    Component = props.href ? 'a' : Component;

    // icon-[iconName]
    classSet[this.prefixClass(name)] = true;

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      this.props.children
    );
  }
});

exports.default = Icon;
module.exports = exports['default'];