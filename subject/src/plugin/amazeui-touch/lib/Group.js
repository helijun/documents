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

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Group = _react2.default.createClass({
  displayName: 'Group',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    component: _react.PropTypes.node.isRequired,
    header: _react.PropTypes.node,
    footer: _react.PropTypes.node,
    noPadded: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'group',
      component: 'div'
    };
  },
  renderAddon: function renderAddon(role) {
    role = role || 'header';
    return this.props[role] ? _react2.default.createElement(role, {
      className: this.prefixClass(role)
    }, this.props[role]) : null;
  },
  render: function render() {
    var _props = this.props;
    var Component = _props.component;
    var className = _props.className;
    var noPadded = _props.noPadded;

    var props = _objectWithoutProperties(_props, ['component', 'className', 'noPadded']);

    var classSet = this.getClassSet();

    delete props.classPrefix;
    delete props.header;
    delete props.footer;

    classSet[this.prefixClass('no-padded')] = noPadded;

    var bodyClasses = _defineProperty({}, this.prefixClass('body'), true);

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: (0, _classnames2.default)(className, classSet)
      }),
      this.renderAddon('header'),
      _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(bodyClasses) },
        this.props.children
      ),
      this.renderAddon('footer')
    );
  }
});

exports.default = Group;
module.exports = exports['default'];