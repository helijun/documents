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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var NavBar = _react2.default.createClass({
  displayName: 'NavBar',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string,
    amStyle: _react.PropTypes.oneOf(['primary', 'secondary', 'success', 'warning', 'alert', 'dark']),
    title: _react.PropTypes.node,
    leftNav: _react.PropTypes.array,
    rightNav: _react.PropTypes.array,
    titleOnLeft: _react.PropTypes.bool,
    onAction: _react.PropTypes.func,
    changeCanvasActive: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'navbar',
      onAction: function onAction() {}
    };
  },
  renderTitle: function renderTitle() {
    var _props = this.props;
    var titleOnLeft = _props.titleOnLeft;
    var title = _props.title;

    var titlePosition = this.prefixClass(titleOnLeft ? 'left' : 'center');

    return title ? _react2.default.createElement(
      'h2',
      {
        className: (0, _classnames2.default)(this.prefixClass('title'), titlePosition)
      },
      title
    ) : this.props.children;
  },
  renderNav: function renderNav(position) {
    var nav = this.props[position + 'Nav'];
    this._navPosition = position;

    return nav && Array.isArray(nav) ? _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(this.prefixClass('nav'), this.prefixClass(position))
      },
      nav.map(this.renderNavItem)
    ) : null;
  },
  renderNavItem: function renderNavItem(item, index) {
    var _iconClassName;

    var Component = item.component;
    var title = item.title;
    var customIcon = item.customIcon;
    var icon = item.icon;
    var isClone = item.isClone;
    var className = item.className;

    var otherProps = _objectWithoutProperties(item, ['component', 'title', 'customIcon', 'icon', 'isClone', 'className']);

    var children = [];
    var itemClassName = (0, _classnames2.default)(this.prefixClass('nav-item'), className);
    var itemProps = _extends({
      key: 'navbarNavItem' + index,
      onClick: this.props.onAction.bind(this, item)
    }, otherProps, {
      className: itemClassName
    });

    Component = Component || 'a';

    title && children.push(_react2.default.createElement(
      'span',
      {
        className: this.prefixClass('nav-title'),
        key: 'title'
      },
      title
    ));

    var navIconKey = 'icon';
    var iconClassName = (_iconClassName = {}, _defineProperty(_iconClassName, this.prefixClass('icon'), true), _defineProperty(_iconClassName, this.prefixClass('icon-sibling-of-title'), !!title), _iconClassName);
    var navIcon = customIcon ? _react2.default.createElement('img', {
      src: customIcon,
      className: (0, _classnames2.default)(iconClassName),
      alt: title || null,
      key: navIconKey
    }) : icon ? _react2.default.createElement(_Icon2.default, {
      className: (0, _classnames2.default)(iconClassName),
      name: icon,
      key: navIconKey
    }) : null;

    // adjust title and icon order for Android UC
    // @see ../scss/helper/_mixins.scss `navbar-item-android-uc-fallback` mixin
    if (navIcon) {
      var action = this._navPosition === 'left' ? 'unshift' : 'push';
      Array.prototype[action].call(children, navIcon);
    }
    // navIcon && children.push(navIcon);

    var renderChildren = function renderChildren() {
      // #40
      // if `Component` is a clone type like OffCanvasTrigger,
      // this should return a element with the className.
      // TBC: should other props be transferred to the span element?
      return isClone ? _react2.default.createElement(
        'span',
        {
          className: itemClassName
        },
        children
      ) : children;
    };

    return _react2.default.createElement(
      Component,
      itemProps,
      renderChildren()
    );
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props2 = this.props;
    var className = _props2.className;

    var props = _objectWithoutProperties(_props2, ['className']);

    delete props.title;
    delete props.classPrefix;
    delete props.leftNav;
    delete props.rightNav;
    delete props.amStyle;
    delete props.onAction;
    delete props.titleOnLeft;

    return _react2.default.createElement(
      'header',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      this.renderTitle(),
      this.renderNav('left'),
      this.renderNav('right')
    );
  }
});

exports.default = NavBar;
module.exports = exports['default'];