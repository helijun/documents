'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TouchableMixin = {
  propTypes: {
    moveThreshold: _react.PropTypes.number,
    tapDelay: _react.PropTypes.number,
    pressDelay: _react.PropTypes.number,
    preventDefault: _react.PropTypes.bool,
    stopPropagation: _react.PropTypes.bool,

    onSwipe: _react.PropTypes.func,
    onSwipeLeft: _react.PropTypes.func,
    onSwipeUp: _react.PropTypes.func,
    onSwipeRight: _react.PropTypes.func,
    onSwipeDown: _react.PropTypes.func,
    onTap: _react.PropTypes.func,
    onSingleTap: _react.PropTypes.func,
    onDoubleTap: _react.PropTypes.func,
    onPress: _react.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      moveThreshold: 30,
      tapDelay: 250,
      pressDelay: 750,
      preventDefault: true
    };
  },
  getInitialState: function getInitialState() {
    return {
      startTouch: null,
      endTouch: null,
      touch: {},
      deltaX: 0,
      deltaY: 0
    };
  },
  componentWillUnmount: function componentWillUnmount() {
    this._cancelAll();
  },
  handleTouchStart: function handleTouchStart(e) {
    // console.log('handle touchstart');
    this.processEvent(e);

    if (!e.touches) {
      return;
    }

    var touch = this.state.touch;
    var startTouch = e.touches[0];

    if (e.touches.length === 1 && touch.x2) {
      // Clear out touch movement data if we have it sticking around
      // This can occur if touchcancel doesn't fire due to preventDefault, etc.
      touch.x2 = undefined;
      touch.y2 = undefined;
    }

    var now = Date.now();
    var delta = now - (touch.last || now);

    this._touchTimeout && clearTimeout(this._touchTimeout);

    touch.x1 = startTouch.pageX;
    touch.y1 = startTouch.pageY;

    // if touchstart interval less than 250, handle as doubleTap
    if (delta > 0 && delta <= this.props.tapDelay) {
      touch.isDoubleTap = true;
    }

    // record last touch start time
    touch.last = now;

    // handle as `press` after 750ms
    this._pressTimeout = setTimeout(this._handlePress, this.props.pressDelay);

    this.setState({
      startTouch: startTouch,
      touch: touch
    });
  },
  handleTouchMove: function handleTouchMove(e) {
    // console.log('touch move');
    this.processEvent(e);

    var endTouch = e.touches[0];
    var _state = this.state;
    var touch = _state.touch;
    var deltaX = _state.deltaX;
    var deltaY = _state.deltaY;


    this._cancelPress();

    touch.x2 = endTouch.pageX;
    touch.y2 = endTouch.pageY;

    // finger moving distance
    deltaX += Math.abs(touch.x1 - touch.x2);
    deltaY += Math.abs(touch.y1 - touch.y2);

    this.setState({
      deltaX: deltaX,
      deltaY: deltaY,
      touch: touch,
      endTouch: endTouch
    });
  },
  handleTouchEnd: function handleTouchEnd(e) {
    var _this = this;

    // console.log('touch end..');
    this.processEvent(e);

    this._cancelPress();

    var _props = this.props;
    var tapDelay = _props.tapDelay;
    var moveThreshold = _props.moveThreshold;
    var _state2 = this.state;
    var touch = _state2.touch;
    var startTouch = _state2.startTouch;
    var endTouch = _state2.endTouch;
    var deltaX = _state2.deltaX;
    var deltaY = _state2.deltaY;

    var event = {
      touch: touch,
      startTouch: startTouch,
      endTouch: endTouch,
      preventDefault: function preventDefault() {}
    };

    // handle as swipe event
    if (touch.x2 && Math.abs(touch.x1 - touch.x2) > moveThreshold || touch.y2 && Math.abs(touch.y1 - touch.y2) > moveThreshold) {

      event.type = 'swipe';

      this._swipeTimeout = setTimeout(function () {
        _this._handleEvent(event);

        event.type += _this._getSwipeDirection();
        _this._handleEvent(event);
        _this._resetTouch();
      }, 0);
    }
    // normal tap
    else if ('last' in touch) {
        // don't fire tap when delta position changed by more than 30 pixels,
        // for instance when moving to a point and back to origin
        if (deltaX < moveThreshold && deltaY < moveThreshold) {
          // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
          // ('tap' fires before 'scroll')
          this._tapTimeout = setTimeout(function () {
            // trigger universal 'tap' with the option to cancelTouch()
            // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
            event.type = 'tap';
            // event.cancelTouch = cancelAll;
            _this._handleEvent(event);

            // trigger double tap immediately
            if (touch.isDoubleTap) {
              event.type = 'doubleTap';
              _this._handleEvent(event);
              _this._resetTouch();
            }
            // trigger single tap after 250ms of inactivity
            else {
                _this._touchTimeout = setTimeout(function () {
                  _this._touchTimeout = null;
                  event.type = 'singleTap';
                  _this._handleEvent(event);
                  _this._resetTouch();
                }, tapDelay);
              }
          }, 0);
        } else {
          this._resetTouch();
        }
      }
  },
  handleTouchCancel: function handleTouchCancel() {
    this._cancelAll();
  },
  processEvent: function processEvent(e) {
    this.props.preventDefault && e.preventDefault();
    this.props.stopPropagation && e.stopPropagation();
  },
  _handlePress: function _handlePress() {
    this._pressTimeout = null;
    if (this.state.touch.last) {
      this.props.onPress && this.props.onPress();
      this._resetTouch();
    }
  },
  _cancelPress: function _cancelPress() {
    if (this._pressTimeout) {
      clearTimeout(this._pressTimeout);
    }

    this._pressTimeout = null;
  },
  _cancelAll: function _cancelAll() {
    if (this._touchTimeout) {
      clearTimeout(this._touchTimeout);
    }

    if (this._tapTimeout) {
      clearTimeout(this._tapTimeout);
    }

    if (this._swipeTimeout) {
      clearTimeout(this._swipeTimeout);
    }

    if (this._pressTimeout) {
      clearTimeout(this._pressTimeout);
    }

    this._touchTimeout = this._tapTimeout = this._swipeTimeout = this._pressTimeout = null;
    this._resetTouch();
  },
  _getSwipeDirection: function _getSwipeDirection() {
    var _state$touch = this.state.touch;
    var x1 = _state$touch.x1;
    var x2 = _state$touch.x2;
    var y1 = _state$touch.y1;
    var y2 = _state$touch.y2;

    // 水平方向：水平距离大于等于垂直距离
    // 垂直方向：

    return Math.abs(x1 - x2) >= Math.abs(y1 - y2) ? x1 - x2 > 0 ? 'Left' : 'Right' : y1 - y2 > 0 ? 'Up' : 'Down';
  },
  _resetTouch: function _resetTouch() {
    this.setState(this.getInitialState());
  },
  _getEventMethodName: function _getEventMethodName(type) {
    return 'on' + type.charAt(0).toUpperCase() + type.slice(1);
  },
  _handleEvent: function _handleEvent(event) {
    var method = this._getEventMethodName(event.type);
    this.props[method] && this.props[method](event);
  },
  getTouchHandlers: function getTouchHandlers() {
    return {
      onTouchStart: this.handleTouchStart,
      onTouchEnd: this.handleTouchEnd,
      onTouchCancel: this.handleTouchCancel,
      onTouchMove: this.handleTouchMove
    };
  }
};

exports.default = TouchableMixin;
module.exports = exports['default'];