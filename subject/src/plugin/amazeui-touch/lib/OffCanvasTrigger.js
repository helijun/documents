'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _OverlayMixin = require('./mixins/OverlayMixin');

var _OverlayMixin2 = _interopRequireDefault(_OverlayMixin);

var _CSSCore = require('./utils/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _TransitionEvents = require('./utils/TransitionEvents');

var _TransitionEvents2 = _interopRequireDefault(_TransitionEvents);

var _createChainedFunction = require('./utils/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OffCanvasTrigger = _react2.default.createClass({
  displayName: 'OffCanvasTrigger',

  mixins: [_OverlayMixin2.default, _ClassNameMixin2.default],

  propTypes: {
    defaultOffCanvasActive: _react.PropTypes.bool,
    placement: _react.PropTypes.oneOf(['left', 'right']),
    animation: _react.PropTypes.oneOf(['slide', 'push']),
    offCanvas: _react.PropTypes.node.isRequired,
    pageContainer: _react.PropTypes.node,
    onOpen: _react.PropTypes.func,
    onClosed: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    console.log('propTypes', this.propTypes);
    return {
      placement: 'left',
      animation: 'slide',
      onOpen: function onOpen() {},
      onClosed: function onClosed() {}
    };
  },
  getInitialState: function getInitialState() {
    return {
      offCanvasActive: this.props.defaultOffCanvasActive == null ? false : this.props.defaultOffCanvasActive,
      isClosing: false
    };
  },
  componentDidMount: function componentDidMount() {
    this.setPageContainer();
  },
  open: function open() {
    if (this.state.offCanvasActive) {
      return;
    }

    this.setState({
      offCanvasActive: true,
      isClosing: false
    }, function () {
      this.props.onOpen();
    });

    if (this.isPush()) {
      _CSSCore2.default.addClass(this.getContainerDOMNode(), this.getWithClassName());
    }
  },
  close: function close() {
    if (!this.state.offCanvasActive || this.state.isClosing) {
      return;
    }

    this.setState({
      isClosing: true
    });

    if (this.isPush()) {
      var container = this.getContainerDOMNode();
      _CSSCore2.default.removeClass(container, this.getWithClassName());
      _CSSCore2.default.addClass(container, this.getClosingClassName());
    }
  },
  handleClosed: function handleClosed() {
    this.setState({
      offCanvasActive: false,
      isClosing: false
    });

    this.props.onClosed();

    if (this.isPush()) {
      _CSSCore2.default.removeClass(this.getContainerDOMNode(), this.getClosingClassName());
    }
  },
  toggle: function toggle() {
    this.state.offCanvasActive ? this.close() : this.open();
  },
  isPush: function isPush() {
    return this.props.animation === 'push';
  },
  getPageContainer: function getPageContainer() {
    var pageContainer = this.props.pageContainer;


    return typeof pageContainer === 'string' ? document.querySelector(pageContainer) : (0, _reactDom.findDOMNode)(pageContainer);
  },
  setPageContainer: function setPageContainer() {
    var pageContainer = this.getPageContainer();

    if (pageContainer && this.isPush()) {
      _CSSCore2.default.addClass(pageContainer, this.setClassNS('offcanvas-push-target'));
    }
  },
  getWithClassName: function getWithClassName() {
    return 'with-offcanvas-' + this.props.placement;
  },
  getClosingClassName: function getClosingClassName() {
    return 'with-offcanvas-closing';
  },


  // used by Mixin
  renderOverlay: function renderOverlay() {
    var _this = this;

    if (!this.state.offCanvasActive) {
      return _react2.default.createElement('span', null);
    }

    var offCanvas = this.props.offCanvas;
    var isClosing = this.state.isClosing;


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
        } else {
          _this.handleClosed();
        }
      })();
    }

    return (0, _react.cloneElement)(offCanvas, {
      placement: this.props.placement,
      animation: this.props.animation,
      isClosing: isClosing,
      onDismiss: this.close
    });
  },

  componentWillReceiveProps: function(nextProps){
    console.log('componentWillReceiveProps',nextProps)
      this.state.offCanvasActive = nextProps.defaultOffCanvasActive
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

exports.default = OffCanvasTrigger;
module.exports = exports['default'];