'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _exenv = require('./utils/exenv');

var _bodyElement = require('./utils/bodyElement');

var _bodyElement2 = _interopRequireDefault(_bodyElement);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// @see https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html
// To improve reliability, CSSTransitionGroup will no longer listen to
// transition events. Instead, you should specify transition durations
// manually using props such as `transitionEnterTimeout={500}`.
// NOTE: It should less than CSS animation duration, if not, the animation
// be not smooth. It maybe a bug of React.
var TRANSITION_TIMEOUT = 250;

var Notification = _react2.default.createClass({
  displayName: 'Notification',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    title: _react.PropTypes.string,
    amStyle: _react.PropTypes.string,
    closeBtn: _react.PropTypes.bool,
    animated: _react.PropTypes.bool,
    visible: _react.PropTypes.bool,
    onDismiss: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'notification',
      closeBtn: true,
      onDismiss: function onDismiss() {}
    };
  },
  renderCloseBtn: function renderCloseBtn() {
    return this.props.closeBtn ? _react2.default.createElement(_Icon2.default, {
      className: this.prefixClass('icon'),
      name: 'close',
      onClick: this.props.onDismiss
    }) : null;
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var title = _props.title;
    var className = _props.className;
    var animated = _props.animated;
    var visible = _props.visible;

    var props = _objectWithoutProperties(_props, ['title', 'className', 'animated', 'visible']);

    delete props.classPrefix;
    delete props.amStyle;
    delete props.static;
    delete props.closeBtn;
    delete props.onDismiss;

    classSet[this.prefixClass('animated')] = animated;

    var notificationBar = visible ? _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className),
        key: 'notification'
      }),
      _react2.default.createElement(
        'div',
        { className: this.prefixClass('content') },
        title ? _react2.default.createElement(
          'h3',
          { className: this.prefixClass('title') },
          title
        ) : null,
        this.props.children
      ),
      this.renderCloseBtn()
    ) : null;

    return animated ? _react2.default.createElement(
      _reactAddonsCssTransitionGroup2.default,
      {
        component: 'div',
        transitionName: 'notification',
        transitionEnterTimeout: TRANSITION_TIMEOUT,
        transitionLeaveTimeout: TRANSITION_TIMEOUT
      },
      notificationBar
    ) : notificationBar;
  }
});

var NotificationPortal = _react2.default.createClass({
  displayName: 'NotificationPortal',

  propTypes: {
    visible: _react.PropTypes.bool.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      visible: false
    };
  },
  componentDidMount: function componentDidMount() {
    if (!this.isStatic()) {
      this.node = document.createElement('div');
      this.node.className = '__notification-portal';
      _bodyElement2.default.appendChild(this.node);
      this.renderNotification(this.props);
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (!this.isStatic()) {
      this.renderNotification(nextProps);
    }
  },
  componentWillUnmount: function componentWillUnmount() {
    if (!this.isStatic()) {
      (0, _reactDom.unmountComponentAtNode)(this.node);
      _bodyElement2.default.removeChild(this.node);
    }
  },
  isStatic: function isStatic() {
    return this.props.static;
  },
  renderNotification: function renderNotification(props) {
    this.portal = (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, _react2.default.createElement(Notification, props), this.node);
  },
  render: function render() {
    return this.isStatic() ? _react2.default.createElement(Notification, this.props) : null;
  }
});

exports.default = NotificationPortal;
module.exports = exports['default'];