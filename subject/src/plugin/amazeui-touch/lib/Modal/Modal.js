'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactAddonsCssTransitionGroup = require('react-addons-css-transition-group');

var _reactAddonsCssTransitionGroup2 = _interopRequireDefault(_reactAddonsCssTransitionGroup);

var _ClassNameMixin = require('../mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _TransitionEvents = require('../utils/TransitionEvents');

var _TransitionEvents2 = _interopRequireDefault(_TransitionEvents);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _Icon = require('../Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Loader = require('../Loader');

var _Loader2 = _interopRequireDefault(_Loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * @see https://github.com/yuanyan/boron
                                                                                                                                                                                                                              */

// MUST be equal to $modal-duration in _modal.scss
var TRANSITION_TIMEOUT = 300;

function noop() {}

var Modal = (0, _react.createClass)({
  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string,
    role: _react.PropTypes.oneOf(['alert', 'confirm', 'prompt', 'loading', 'actions', 'popup']),
    title: _react.PropTypes.node,
    confirmText: _react.PropTypes.string,
    cancelText: _react.PropTypes.string,
    closeBtn: _react.PropTypes.bool,
    closeViaBackdrop: _react.PropTypes.bool,
    onAction: _react.PropTypes.func,
    onOpen: _react.PropTypes.func,
    onClosed: _react.PropTypes.func,
    onDismiss: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'modal',
      confirmText: '确定',
      cancelText: '取消',
      closeBtn: true,
      onAction: noop,
      onOpen: noop,
      onClosed: noop,
      onDismiss: noop
    };
  },
  getInitialState: function getInitialState() {
    return {
      closed: true,
      isClosing: false
    };
  },
  componentDidMount: function componentDidMount() {
    if (this.props.isOpen) {
      this.open();
    }
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var isOpen = this.props.isOpen;

    if (!isOpen && nextProps.isOpen) {
      this.open();
    } else if (isOpen && !nextProps.isOpen) {
      this.close();
    }
  },
  isClosed: function isClosed() {
    return this.state.closed;
  },
  isPopup: function isPopup() {
    return this.props.role === 'popup';
  },
  isActions: function isActions() {
    return this.props.role === 'actions';
  },


  // Get input data for prompt modal
  getFieldData: function getFieldData() {
    var data = [];
    var inputs = _reactDom2.default.findDOMNode(this).querySelectorAll('input[type=text]');

    if (inputs) {
      for (var i = 0; i < inputs.length; i++) {
        data.push(inputs[i].value);
      }
    }

    return data.length === 0 ? null : data.length === 1 ? data[0] : data;
  },


  // data === null: prompt -> canceled
  // data === true: confirm -> confirmed
  // data === false: confirm -> canceled
  handleAction: function handleAction(data, e) {
    var _props = this.props;
    var role = _props.role;
    var onAction = _props.onAction;

    var willClose = true;

    if (role === 'prompt' && data) {
      data = this.getFieldData();

      willClose = onAction.call(this, data, e);
    } else {
      onAction.call(this, data, e);
    }

    willClose && this.requestClose(e);
  },
  handleBackdropClick: function handleBackdropClick(e) {
    if (e.target !== e.currentTarget || !this.props.closeViaBackdrop) {
      return;
    }

    this.requestClose(e);
  },
  open: function open() {
    if (this.isClosed()) {
      this.setState({
        isClosing: false,
        closed: false
      });

      this.props.onOpen();
    }
  },


  // Only for instance self calling
  close: function close() {
    if (this.isClosed() || this.state.isClosing) {
      return;
    }

    this.setState({
      isClosing: true
    });
  },


  // for user actions
  requestClose: function requestClose(e) {
    this.props.onDismiss(e);
  },
  handleClosed: function handleClosed() {
    this.setState({
      closed: true,
      isClosing: false
    });
    this.props.onClosed();
  },
  removeUnknownProp: function removeUnknownProp(props) {
    delete props.isOpen;
    delete props.onDismiss;
    delete props.onOpen;
    delete props.onClosed;
    delete props.onAction;
    delete props.classPrefix;
    delete props.confirmText;
    delete props.cancelText;
    delete props.closeBtn;

    return props;
  },
  renderActions: function renderActions(classSet) {
    classSet[this.props.classPrefix] = false;

    return _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(this.props.className, classSet),
        key: 'modalActions',
        ref: 'modal'
      },
      this.props.children,
      _react2.default.createElement(
        'div',
        { className: this.prefixClass('actions-group') },
        _react2.default.createElement(
          _Button2.default,
          {
            onClick: this.requestClose,
            block: true,
            amStyle: this.props.btnStyle || 'secondary'
          },
          this.props.cancelText
        )
      )
    );
  },
  renderPopup: function renderPopup(classSet) {
    classSet[this.props.classPrefix] = false;

    var _props2 = this.props;
    var className = _props2.className;
    var title = _props2.title;
    var children = _props2.children;

    var props = _objectWithoutProperties(_props2, ['className', 'title', 'children']);

    return _react2.default.createElement(
      'div',
      _extends({}, this.removeUnknownProp(props), {
        className: (0, _classnames2.default)(className, classSet, this.setClassNS('popup')),
        key: 'modalPopup',
        ref: 'modal'
      }),
      _react2.default.createElement(
        'div',
        { className: this.setClassNS('popup-inner') },
        _react2.default.createElement(
          'div',
          { className: this.setClassNS('popup-header') },
          title ? _react2.default.createElement(
            'h4',
            { className: this.setClassNS('popup-title') },
            title
          ) : null,
          _react2.default.createElement(_Icon2.default, {
            name: 'close',
            className: this.setClassNS('popup-icon'),
            onClick: this.requestClose
          })
        ),
        _react2.default.createElement(
          'div',
          { className: this.setClassNS('popup-body') },
          children
        )
      )
    );
  },
  renderHeader: function renderHeader() {
    var _props3 = this.props;
    var title = _props3.title;
    var closeBtn = _props3.closeBtn;
    var role = _props3.role;

    var closeIcon = closeBtn && !role ? _react2.default.createElement(_Icon2.default, {
      name: 'close',
      className: this.prefixClass('icon'),
      onClick: this.requestClose
    }) : null;

    return title || closeIcon ? _react2.default.createElement(
      'div',
      {
        className: this.prefixClass('header'),
        key: 'modalHeader'
      },
      title ? _react2.default.createElement(
        'h4',
        {
          className: this.prefixClass('title')
        },
        title
      ) : null,
      closeIcon
    ) : null;
  },


  // Render alert/confirm/prompt buttons
  renderFooter: function renderFooter() {
    var _this = this;

    var buttons = void 0;
    var btnClass = this.prefixClass('btn');
    var _props4 = this.props;
    var role = _props4.role;
    var confirmText = _props4.confirmText;
    var cancelText = _props4.cancelText;

    (function () {

      switch (role) {
        case 'alert':
          buttons = _react2.default.createElement(
            'span',
            {
              key: 'modalBtn',
              onClick: _this.handleAction.bind(_this, null),
              className: btnClass
            },
            confirmText
          );
          break;
        case 'confirm':
        case 'prompt':
          var cancel = role === 'prompt' ? null : false;
          buttons = [cancelText, confirmText].map(function (text, i) {
            return _react2.default.createElement(
              'span',
              {
                key: 'modalBtn' + i,
                onClick: _this.handleAction.bind(_this, i === 0 ? cancel : true),
                className: btnClass
              },
              text
            );
          });
          break;
        default:
          buttons = null;
      }
    })();

    return buttons ? _react2.default.createElement(
      'div',
      { className: this.prefixClass('footer') },
      buttons
    ) : null;
  },


  // Using transition appear to fix animation issue on iOS Safari
  // @see https://github.com/amazeui/amazeui-touch/issues/11
  renderTransition: function renderTransition(children) {
    return _react2.default.createElement(
      _reactAddonsCssTransitionGroup2.default,
      {
        transitionName: this.prefixClass('transition'),
        transitionAppear: true,
        transitionAppearTimeout: TRANSITION_TIMEOUT,
        transitionEnterTimeout: TRANSITION_TIMEOUT,
        transitionLeaveTimeout: TRANSITION_TIMEOUT
      },
      children
    );
  },
  renderBackdrop: function renderBackdrop(children) {
    var onClick = this.handleBackdropClick || null;
    var preventDefault = function preventDefault(e) {
      // prevent window scroll when touch backdrop
      e.preventDefault();
    };

    var classSet = {};

    classSet[this.prefixClass('backdrop')] = true;
    classSet[this.setClassNS('active')] = true;
    classSet[this.prefixClass('backdrop-out')] = this.state.isClosing;

    return _react2.default.createElement(
      'span',
      null,
      children,
      _react2.default.createElement('div', {
        className: (0, _classnames2.default)(classSet),
        style: { height: window.innerHeight },
        ref: 'backdrop',
        onClick: onClick,
        onTouchMove: preventDefault
      })
    );
  },
  render: function render() {
    var _this2 = this;

    var _state = this.state;
    var closed = _state.closed;
    var isClosing = _state.isClosing;


    if (closed) {
      return null;
    }

    // listen out animation end envent
    if (isClosing) {
      (function () {
        var node = _this2.refs.modal;

        if (node) {
          (function () {
            var closedHandler = function closedHandler(e) {
              if (e && e.target !== node) {
                return;
              }

              _TransitionEvents2.default.off(node, closedHandler);
              _this2.handleClosed();
            };

            _TransitionEvents2.default.on(node, closedHandler);
          })();
        }
      })();
    }

    var classSet = this.getClassSet();
    var _props5 = this.props;
    var role = _props5.role;
    var className = _props5.className;
    var title = _props5.title;
    var children = _props5.children;
    var modalWidth = _props5.modalWidth;
    var modalHeight = _props5.modalHeight;

    var props = _objectWithoutProperties(_props5, ['role', 'className', 'title', 'children', 'modalWidth', 'modalHeight']);

    var modal = void 0;

    classSet[this.prefixClass('out')] = isClosing;
    role && (classSet[this.prefixClass(role)] = true);

    if (this.isActions()) {
      modal = this.renderTransition(this.renderActions(classSet));
    } else if (this.isPopup()) {
      modal = this.renderTransition(this.renderPopup(classSet));
    } else {
      var style = {
        width: modalWidth,
        height: modalHeight
      };

      modal = _react2.default.createElement(
        'div',
        _extends({}, this.removeUnknownProp(props), {
          style: style,
          ref: 'modalContainer',
          className: (0, _classnames2.default)(classSet, className)
        }),
        _react2.default.createElement(
          'div',
          {
            className: 'modal-inner',
            ref: 'modal'
          },
          _react2.default.createElement(
            'div',
            {
              className: this.prefixClass('dialog')
            },
            this.renderHeader(),
            _react2.default.createElement(
              'div',
              {
                className: this.prefixClass('body'),
                ref: 'modalBody'
              },
              role === 'loading' ? children ? children : _react2.default.createElement(_Loader2.default, null) : children
            ),
            this.renderFooter()
          )
        )
      );
    }

    return this.renderBackdrop(modal);
  }
});

exports.default = Modal;
module.exports = exports['default'];