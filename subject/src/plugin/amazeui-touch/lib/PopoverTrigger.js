'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _TransitionEvents = require('./utils/TransitionEvents');

var _TransitionEvents2 = _interopRequireDefault(_TransitionEvents);

var _OverlayMixin = require('./mixins/OverlayMixin');

var _OverlayMixin2 = _interopRequireDefault(_OverlayMixin);

var _domUtils = require('./utils/domUtils');

var _domUtils2 = _interopRequireDefault(_domUtils);

var _createChainedFunction = require('./utils/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PopoverTrigger = _react2.default.createClass({
  displayName: 'PopoverTrigger',

  mixins: [_OverlayMixin2.default],

  propTypes: {
    defaultPopoverActive: _react.PropTypes.bool,
    popover: _react.PropTypes.node.isRequired,
    onOpen: _react.PropTypes.func,
    onClosed: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onOpen: function onOpen() {},
      onClosed: function onClosed() {}
    };
  },
  getInitialState: function getInitialState() {
    return {
      popoverActive: this.props.defaultPopoverActive == null ? false : this.props.defaultPopoverActive,
      isClosing: false,
      popoverLeft: null,
      popoverTop: null,
      placement: null
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.defaultPopoverActive) {
      this.updatePopoverPosition();
    }
  },
  open: function open() {
    if (this.state.popoverActive) {
      return;
    }

    this.setState({
      popoverActive: true,
      isClosing: false
    }, function () {
      this.updatePopoverPosition();
      this.props.onOpen();
    });
  },
  close: function close() {
    if (!this.state.popoverActive) {
      return;
    }

    this.setState({
      isClosing: true
    });
  },
  handleClosed: function handleClosed() {
    this.setState({
      popoverActive: false,
      isClosing: false
    });

    this.props.onClosed();
  },
  toggle: function toggle() {
    this.state.popoverActive ? this.close() : this.open();
  },
  updatePopoverPosition: function updatePopoverPosition() {
    if (!this.isMounted()) {
      return;
    }

    var position = this.calcPopoverPosition() || {};

    this.setState({
      popoverLeft: position.left,
      popoverTop: position.top,
      angleLeft: position.angleLeft,
      angleTop: position.angleTop,
      anglePosition: position.anglePosition,
      placement: position.placement
    });
  },
  calcPopoverPosition: function calcPopoverPosition() {
    var targetOffset = this.getTriggerOffset();
    var popoverNode = this.getOverlayDOMNode();

    if (!popoverNode) {
      return;
    }

    var popoverHeight = popoverNode.offsetHeight;
    var popoverWidth = popoverNode.offsetWidth;
    var targetHeight = targetOffset.height;
    var targetWidth = targetOffset.width;

    var windowHeight = window.innerHeight;
    var windowWidth = window.innerWidth;
    var anglePosition = void 0,
        angleLeft = void 0,
        angleTop = void 0;
    var popoverAngleSize = 8;
    var popoverTop = 0;
    var popoverLeft = 0;
    var diff = 0;
    var popoverPosition = 'top';
    var popoverTotalHeight = popoverHeight + popoverAngleSize;

    // Popover Horizontal position
    // Popover 高度小于 trigger 顶部偏移
    if (popoverTotalHeight < targetOffset.top) {
      // On top: trigger 顶部偏移 - Popover 高度
      popoverTop = targetOffset.top - popoverHeight - popoverAngleSize;
    } else if (popoverTotalHeight < windowHeight - targetOffset.top - targetHeight) {
      // On bottom: Popover 高度小于 trigger 下方空白位置
      popoverPosition = 'bottom';
      popoverTop = targetOffset.top + targetHeight + popoverAngleSize;
    } else {
      // On middle: Popover 位于 trigger 的水平位置
      popoverPosition = 'horizontal';
      popoverTop = targetHeight / 2 + targetOffset.top - popoverHeight / 2;
      diff = popoverTop;

      if (popoverTop <= 0) {
        popoverTop = 5;
      } else if (popoverTop + popoverHeight >= windowHeight) {
        popoverTop = windowHeight - popoverHeight - 5;
      }

      diff = diff - popoverTop;
    }

    // Popover Horizontal Position
    if (popoverPosition === 'top' || popoverPosition === 'bottom') {
      popoverLeft = targetWidth / 2 + targetOffset.left - popoverWidth / 2;
      diff = popoverLeft;

      if (popoverLeft < 5) {
        popoverLeft = 5;
      }

      if (popoverLeft + popoverWidth > windowWidth) {
        popoverLeft = windowWidth - popoverWidth - 5;
      }

      diff = diff - popoverLeft;
      angleLeft = popoverWidth / 2 - popoverAngleSize + diff;
      angleLeft = Math.max(Math.min(angleLeft, popoverWidth - popoverAngleSize * 2 - 6), 6);
      anglePosition = popoverPosition === 'top' ? 'bottom' : 'top';
    } else if (popoverPosition === 'horizontal') {
      popoverLeft = targetOffset.left - popoverWidth - popoverAngleSize;
      anglePosition = 'right';

      if (popoverLeft < 5 || popoverLeft + popoverWidth > windowWidth) {
        if (popoverLeft < 5) {
          popoverLeft = targetOffset.left + targetWidth + popoverAngleSize;
        }

        if (popoverLeft + popoverWidth > windowWidth) {
          popoverLeft = windowWidth - popoverWidth - 5;
        }

        anglePosition = 'left';
      }
      angleTop = popoverHeight / 2 - popoverAngleSize + diff;
      angleTop = Math.max(Math.min(angleTop, popoverHeight - popoverAngleSize * 2 - 6), 6);
    }

    return {
      top: popoverTop,
      left: popoverLeft,
      placement: popoverPosition,
      angleLeft: angleLeft,
      angleTop: angleTop,
      anglePosition: anglePosition
    };
  },
  getTriggerOffset: function getTriggerOffset() {
    var node = _reactDom2.default.findDOMNode(this);
    var container = this.getContainerDOMNode();
    var offset = container.tagName === 'BODY' ? _domUtils2.default.offset(node) : _domUtils2.default.position(node, container);

    return _extends({}, offset, {
      height: node.offsetHeight,
      width: node.offsetWidth
    });
  },


  // used by Mixin
  renderOverlay: function renderOverlay() {
    var _this = this;

    if (!this.state.popoverActive) {
      return _react2.default.createElement('span', null);
    }

    var popover = this.props.popover;
    var _state = this.state;
    var isClosing = _state.isClosing;
    var positionLeft = _state.popoverLeft;
    var positionTop = _state.popoverTop;
    var anglePosition = _state.anglePosition;
    var angleLeft = _state.angleLeft;
    var angleTop = _state.angleTop;
    var placement = _state.placement;


    if (isClosing) {
      (function () {
        var node = _this.getOverlayDOMNode();
        if (node) {
          (function () {
            var closedHandler = function closedHandler(e) {
              if (e && e.target !== node) {
                return;
              }

              _TransitionEvents2.default.off(node, closedHandler);
              _this.handleClosed();
            };

            _TransitionEvents2.default.on(node, closedHandler);
          })();
        }
      })();
    }

    return (0, _react.cloneElement)(popover, {
      positionLeft: positionLeft,
      positionTop: positionTop,
      angleLeft: angleLeft,
      angleTop: angleTop,
      anglePosition: anglePosition,
      placement: placement,
      isClosing: isClosing,
      onDismiss: this.close
    });
  },
  render: function render() {
    var child = _react2.default.Children.only(this.props.children);
    var props = {
      onClick: (0, _createChainedFunction2.default)(child.props.onClick, this.props.onClick)
    };

    props.onClick = (0, _createChainedFunction2.default)(this.toggle, props.onClick);

    return (0, _react.cloneElement)(child, props);
  }
});

exports.default = PopoverTrigger;
module.exports = exports['default'];