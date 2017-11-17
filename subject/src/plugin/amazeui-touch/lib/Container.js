'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } // @see https://github.com/JedWatson/react-container
// @license MIT Copyright (c) 2015 Jed Watson

function hasChildrenWithVerticalFill(children) {
  var result = false;

  _react2.default.Children.forEach(children, function (child) {
    if (result) {
      return; // early-exit
    }

    if (!child) {
      return;
    }

    if (!child.type) {
      return;
    }

    result = !!child.type.shouldFillVerticalSpace;
  });

  return result;
}

function initScrollable(defaultPos) {
  if (!defaultPos) {
    defaultPos = {};
  }

  var pos = void 0;
  var scrollable = {
    reset: function reset() {
      pos = { left: defaultPos.left || 0, top: defaultPos.top || 0 };
    },
    getPos: function getPos() {
      return { left: pos.left, top: pos.top };
    },
    mount: function mount(element) {
      var node = _react2.default.findDOMNode(element);
      node.scrollLeft = pos.left;
      node.scrollTop = pos.top;
    },
    unmount: function unmount(element) {
      var node = _react2.default.findDOMNode(element);
      pos.left = node.scrollLeft;
      pos.top = node.scrollTop;
    }
  };

  scrollable.reset();

  return scrollable;
}

var TRANSITION_TIMEOUT = 500;

var Container = _react2.default.createClass({
  displayName: 'Container',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string,
    component: _react.PropTypes.node,
    align: _react.PropTypes.oneOf(['end', 'center', 'start']),
    direction: _react.PropTypes.oneOf(['column', 'row']),
    fill: _react.PropTypes.bool,
    grow: _react.PropTypes.bool,
    justify: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.oneOf(['end', 'center', 'start'])]),
    scrollable: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object]),
    transition: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'container',
      component: 'div'
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.scrollable && this.props.scrollable.mount) {
      this.props.scrollable.mount(this);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (this.props.scrollable && this.props.scrollable.unmount) {
      this.props.scrollable.unmount(this);
    }
  },
  render: function render() {
    var _cx;

    var _props = this.props;
    var className = _props.className;
    var Component = _props.component;
    var children = _props.children;
    var direction = _props.direction;
    var fill = _props.fill;
    var align = _props.align;
    var justify = _props.justify;
    var scrollable = _props.scrollable;
    var transition = _props.transition;

    var props = _objectWithoutProperties(_props, ['className', 'component', 'children', 'direction', 'fill', 'align', 'justify', 'scrollable', 'transition']);

    var classSet = this.getClassSet();

    delete props.classPrefix;

    // As view transition container
    if (transition) {
      return _react2.default.createElement(
        _reactAddonsCssTransitionGroup2.default,
        _extends({
          component: 'div',
          className: (0, _classnames2.default)(this.setClassNS('views'), className),
          transitionName: this.setClassNS('view-transition-' + transition),
          transitionEnterTimeout: TRANSITION_TIMEOUT,
          transitionLeaveTimeout: TRANSITION_TIMEOUT
        }, props),
        children
      );
    }

    if (!direction) {
      if (hasChildrenWithVerticalFill(children)) {
        direction = 'column';
      }
    }

    if (direction === 'column' || scrollable) {
      fill = true;
    }

    if (direction === 'column' && align === 'top') {
      align = 'start';
    }

    if (direction === 'column' && align === 'bottom') {
      align = 'end';
    }

    if (direction === 'row' && align === 'left') {
      align = 'start';
    }

    if (direction === 'row' && align === 'right') {
      align = 'end';
    }

    var classes = (0, _classnames2.default)(classSet, className, (_cx = {}, _defineProperty(_cx, this.prefixClass('fill'), fill), _defineProperty(_cx, this.prefixClass('column'), direction === 'column'), _defineProperty(_cx, this.prefixClass('row'), direction === 'row'), _defineProperty(_cx, this.prefixClass('align-center'), align === 'center'), _defineProperty(_cx, this.prefixClass('align-start'), align === 'start'), _defineProperty(_cx, this.prefixClass('align-end'), align === 'end'), _defineProperty(_cx, this.prefixClass('justify-center'), justify === 'center'), _defineProperty(_cx, this.prefixClass('justify-start'), justify === 'start'), _defineProperty(_cx, this.prefixClass('justify-end'), justify === 'end'), _defineProperty(_cx, this.prefixClass('justified'), justify === true), _defineProperty(_cx, this.prefixClass('scrollable'), scrollable), _cx));

    return _react2.default.createElement(
      Component,
      _extends({
        className: classes
      }, props),
      children
    );
  }
});

Container.initScrollable = initScrollable;

exports.default = Container;
module.exports = exports['default'];