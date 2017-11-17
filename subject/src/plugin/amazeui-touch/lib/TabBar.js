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

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Badge = require('./Badge');

var _Badge2 = _interopRequireDefault(_Badge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// TODO: 默认的选中处理
var TabBar = _react2.default.createClass({
  displayName: 'TabBar',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string,
    component: _react.PropTypes.node,
    amStyle: _react.PropTypes.string,
    onAction: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'tabbar',
      component: 'nav',
      onAction: function onAction() {}
    };
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var Component = _props.component;
    var className = _props.className;
    var children = _props.children;
    var onAction = _props.onAction;

    var props = _objectWithoutProperties(_props, ['component', 'className', 'children', 'onAction']);

    delete props.classPrefix;
    delete props.amStyle;

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      _react2.default.Children.map(children, function (child, index) {
        var _child$props = child.props;
        var eventKey = _child$props.eventKey;
        var onClick = _child$props.onClick;

        var props = _objectWithoutProperties(_child$props, ['eventKey', 'onClick']);

        var clickHandler = onClick || onAction;
        var key = eventKey || index;
        eventKey = eventKey || key;

        return _react2.default.createElement(TabBar.Item, _extends({}, props, {
          onClick: clickHandler.bind(null, eventKey),
          key: key,
          eventKey: eventKey
        }));
      })
    );
  }
});

// TODO:
//   Icon 应该支持用户自定义：
//   React-native 采用 require('path/to/icon') 的形式，
//   这里可能需要再添加一个属性
var TabBarItem = _react2.default.createClass({
  displayName: 'TabBarItem',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string,
    component: _react.PropTypes.any,
    icon: _react.PropTypes.string, // icon name
    title: _react.PropTypes.string,
    href: _react.PropTypes.string,
    eventKey: _react.PropTypes.any,
    badge: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    badgeStyle: _react.PropTypes.string,
    selected: _react.PropTypes.bool, // alias of `active`
    selectedIcon: _react.PropTypes.node, // not supported now
    onAction: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'tabbar',
      component: 'span',
      onAction: function onAction() {}
    };
  },
  renderBadge: function renderBadge() {
    var _props2 = this.props;
    var badge = _props2.badge;
    var badgeStyle = _props2.badgeStyle;


    return badge ? _react2.default.createElement(
      _Badge2.default,
      {
        amStyle: badgeStyle || 'alert',
        rounded: true
      },
      badge
    ) : null;
  },
  renderIcon: function renderIcon() {
    var icon = this.props.icon;


    return icon ? _react2.default.createElement(
      _Icon2.default,
      { name: icon, key: 'tabbarIcon' },
      this.renderBadge()
    ) : null;
  },
  renderTitle: function renderTitle() {
    var labelClassName = this.prefixClass('label');
    var title = this.props.title;


    return title ? _react2.default.createElement(
      'span',
      {
        className: labelClassName,
        key: 'tabbarTitle'
      },
      title
    ) : null;
  },
  render: function render() {
    var classSet = this.getClassSet(true);
    var _props3 = this.props;
    var Component = _props3.component;
    var className = _props3.className;

    var props = _objectWithoutProperties(_props3, ['component', 'className']);

    delete props.classPrefix;
    delete props.badge;
    delete props.badgeStyle;
    delete props.eventKey;
    delete props.onAction;

    Component = this.props.href ? 'a' : Component;

    // TODO: how to display badge when icon not set?

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className, this.prefixClass('item'))
      }),
      [this.renderIcon(), this.renderTitle()]
    );
  }
});

TabBar.Item = TabBarItem;

exports.default = TabBar;
module.exports = exports['default'];