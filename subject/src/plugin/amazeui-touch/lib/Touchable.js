'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mixin = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TouchableMixin = require('./mixins/TouchableMixin');

var _TouchableMixin2 = _interopRequireDefault(_TouchableMixin);

var _createChainedFunction = require('./utils/createChainedFunction');

var _createChainedFunction2 = _interopRequireDefault(_createChainedFunction);

var _isTouchSupported = require('./utils/isTouchSupported');

var _isTouchSupported2 = _interopRequireDefault(_isTouchSupported);

require('./utils/ucUIControl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * React port of Zepto touch.
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              * @see https://github.com/joakimbeng/react-swiper
                                                                                                                                                                                                                              * @see https://github.com/dogfessional/react-swipeable
                                                                                                                                                                                                                              * @see https://github.com/damusnet/react-swipe-views
                                                                                                                                                                                                                              * @see http://www.javascriptkit.com/javatutors/touchevents3.shtml
                                                                                                                                                                                                                              * @see https://github.com/JedWatson/react-tappable
                                                                                                                                                                                                                              * @see https://github.com/madrobby/zepto/blob/master/src/touch.js
                                                                                                                                                                                                                              */

var Touchable = _react2.default.createClass({
  displayName: 'Touchable',

  mixins: [_TouchableMixin2.default],

  propTypes: {
    component: _react.PropTypes.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      component: 'span'
    };
  },
  render: function render() {
    var _props = this.props;
    var Component = _props.component;
    var onTap = _props.onTap;

    var props = _objectWithoutProperties(_props, ['component', 'onTap']);

    if (_isTouchSupported2.default) {
      _extends(props, this.getTouchHandlers());
    } else {
      // handle `tap` as `click` on non-touch devices
      props.onClick = (0, _createChainedFunction2.default)(props.onClick, onTap);
    }

    delete props.moveThreshold;
    delete props.tapDelay;
    delete props.pressDelay;
    delete props.preventDefault;
    delete props.stopPropagation;
    delete props.onSwipe;
    delete props.onSwipeLeft;
    delete props.onSwipeUp;
    delete props.onSwipeRight;
    delete props.onSwipeDown;
    delete props.onTap;
    delete props.onSingleTap;
    delete props.onDoubleTap;
    delete props.onPress;

    return _react2.default.createElement(
      Component,
      props,
      this.props.children
    );
  }
});

exports.default = Touchable;
exports.Mixin = _TouchableMixin2.default;

// TODO: Mixin 里似乎没必要使用 state 记录事件相关信息
// TODO: 添加 touch active className