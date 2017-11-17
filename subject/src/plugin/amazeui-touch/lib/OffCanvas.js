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

var _BackdropMixin = require('./mixins/BackdropMixin');

var _BackdropMixin2 = _interopRequireDefault(_BackdropMixin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * @see https://github.com/negomi/react-burger-menu
                                                                                                                                                                                                                              */

var OffCanvas = _react2.default.createClass({
  displayName: 'OffCanvas',

  mixins: [_ClassNameMixin2.default, _BackdropMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string,
    placement: _react.PropTypes.oneOf(['left', 'right']),
    onDismiss: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'offcanvas',
      placement: 'left'
    };
  },
  handleBackdropClick: function handleBackdropClick(e) {
    if (e && e.target === this.refs.backdrop) {
      var onDismiss = this.props.onDismiss;


      onDismiss && onDismiss();
    }
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var placement = _props.placement;
    var animation = _props.animation;
    var className = _props.className;
    var children = _props.children;
    var isClosing = _props.isClosing;

    var props = _objectWithoutProperties(_props, ['placement', 'animation', 'className', 'children', 'isClosing']);

    delete props.classPrefix;
    delete props.onDismiss;

    classSet[this.prefixClass('out')] = isClosing;
    classSet[this.prefixClass(placement)] = !!placement;
    classSet[this.prefixClass(animation)] = !!animation;

    var offCanvas = _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className),
        ref: 'overlay'
      }),
      children
    );

    return this.renderBackdrop(offCanvas);
  }
});

exports.default = OffCanvas;
module.exports = exports['default'];