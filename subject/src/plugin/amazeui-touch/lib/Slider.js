'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; }; /**
                                                                                                                                                                                                                                                   * @see https://github.com/react-bootstrap/react-bootstrap/blob/master/src/Carousel.js
                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ClassNameMixin = require('./mixins/ClassNameMixin');

var _ClassNameMixin2 = _interopRequireDefault(_ClassNameMixin);

var _TransitionEvents = require('./utils/TransitionEvents');

var _TransitionEvents2 = _interopRequireDefault(_TransitionEvents);

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

var _Touchable = require('./Touchable');

var _Touchable2 = _interopRequireDefault(_Touchable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Slider = _react2.default.createClass({
  displayName: 'Slider',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string,

    controls: _react.PropTypes.bool, // prev/next icon
    pager: _react.PropTypes.bool, // indicators or thumbs

    slide: _react.PropTypes.bool, // what is this?
    interval: _react.PropTypes.number, // interval
    autoPlay: _react.PropTypes.bool,
    loop: _react.PropTypes.bool, // loop slide

    pauseOnHover: _react.PropTypes.bool,
    // touch: PropTypes.bool,

    onAction: _react.PropTypes.func,
    onSlideEnd: _react.PropTypes.func,
    activeIndex: _react.PropTypes.number,
    defaultActiveIndex: _react.PropTypes.number,
    direction: _react.PropTypes.oneOf(['prev', 'next']),
    prevIcon: _react.PropTypes.node,
    nextIcon: _react.PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'slider',
      controls: true,
      pager: true,
      slide: true,
      interval: 5000,
      autoPlay: true,
      loop: true,
      pauseOnHover: true,
      prevIcon: _react2.default.createElement(_Icon2.default, { name: 'left-nav' }),
      nextIcon: _react2.default.createElement(_Icon2.default, { name: 'right-nav' })
    };
  },
  getInitialState: function getInitialState() {
    return {
      activeIndex: this.props.defaultActiveIndex == null ? 0 : this.props.defaultActiveIndex,
      previousActiveIndex: null,
      direction: null
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var activeIndex = this.getActiveIndex();

    if (nextProps.activeIndex != null && nextProps.activeIndex !== activeIndex) {
      clearTimeout(this.timeout);
      this.setState({
        previousActiveIndex: activeIndex,
        direction: nextProps.direction != null ? nextProps.direction : this.getDirection(activeIndex, nextProps.activeIndex)
      });
    }
  },
  componentDidMount: function componentDidMount() {
    this.props.autoPlay && this.waitForNext();
  },
  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.timeout);
  },
  getDirection: function getDirection(prevIndex, index) {
    if (prevIndex === index) {
      return null;
    }

    return prevIndex > index ? 'prev' : 'next';
  },
  next: function next(e) {
    e && e.preventDefault();

    var index = this.getActiveIndex() + 1;
    var count = _react2.default.Children.count(this.props.children);

    if (index > count - 1) {
      if (!this.props.loop) {
        return;
      }
      index = 0;
    }

    this.handleSelect(index, 'next');
  },
  prev: function prev(e) {
    e && e.preventDefault();

    var index = this.getActiveIndex() - 1;

    if (index < 0) {
      if (!this.props.loop) {
        return;
      }
      index = _react2.default.Children.count(this.props.children) - 1;
    }

    this.handleSelect(index, 'prev');
  },
  pause: function pause() {
    this.isPaused = true;
    clearTimeout(this.timeout);
  },
  play: function play() {
    this.isPaused = false;
    this.waitForNext();
  },
  waitForNext: function waitForNext() {
    if (!this.isPaused && this.props.slide && this.props.interval && this.props.activeIndex == null) {
      this.timeout = setTimeout(this.next, this.props.interval);
    }
  },
  handleMouseOver: function handleMouseOver() {
    if (this.props.pauseOnHover) {
      this.pause();
    }
  },
  handleMouseOut: function handleMouseOut() {
    if (this.isPaused) {
      this.play();
    }
  },
  handleSwipeLeft: function handleSwipeLeft(e) {
    // console.log('swipe left');
    this.next();
  },
  handleSwipeRight: function handleSwipeRight(e) {
    // console.log('swipe right....');
    this.prev();
  },
  getActiveIndex: function getActiveIndex() {
    return this.props.activeIndex != null ? this.props.activeIndex : this.state.activeIndex;
  },
  handleItemAnimateOutEnd: function handleItemAnimateOutEnd() {
    this.setState({
      previousActiveIndex: null,
      direction: null
    }, function () {
      this.waitForNext();

      if (this.props.onSlideEnd) {
        this.props.onSlideEnd();
      }
    });
  },
  handleSelect: function handleSelect(index, direction, e) {
    e && e.preventDefault();
    clearTimeout(this.timeout);

    var previousActiveIndex = this.getActiveIndex();

    direction = direction || this.getDirection(previousActiveIndex, index);

    if (this.props.onAction) {
      this.props.onAction(index, direction);
    }

    if (this.props.activeIndex == null && index !== previousActiveIndex) {
      if (this.state.previousActiveIndex != null) {
        // If currently animating don't activate the new index.
        // TODO: look into queuing this canceled call and
        // animating after the current animation has ended.
        return;
      }

      this.setState({
        activeIndex: index,
        previousActiveIndex: previousActiveIndex,
        direction: direction
      });
    }
  },
  renderControls: function renderControls() {
    return this.props.controls ? _react2.default.createElement(
      'div',
      { className: this.prefixClass('control') },
      _react2.default.createElement(
        _Touchable2.default,
        {
          className: this.prefixClass('control-prev'),
          onTap: this.prev,
          stopPropagation: true
        },
        this.props.prevIcon
      ),
      _react2.default.createElement(
        _Touchable2.default,
        {
          className: this.prefixClass('control-next'),
          onTap: this.next,
          stopPropagation: true
        },
        this.props.nextIcon
      )
    ) : null;
  },
  renderPager: function renderPager() {
    var _this = this;

    if (this.props.pager) {
      var _ret = function () {
        var isThumbnailNav = false;

        var children = _react2.default.Children.map(_this.props.children, function (child, i) {
          var className = i === _this.getActiveIndex() ? _this.setClassNS('active') : null;
          var thumb = child.props.thumbnail;

          if (!isThumbnailNav) {
            isThumbnailNav = !!thumb;
          }

          return _react2.default.createElement(
            _Touchable2.default,
            {
              component: 'li',
              className: className,
              key: i,
              onTap: _this.handleSelect.bind(_this, i, null)
            },
            thumb ? _react2.default.createElement('img', { src: thumb }) : null
          );
        });
        var pagerClassName = _this.prefixClass(isThumbnailNav ? 'thumbs' : 'indicators');

        return {
          v: _react2.default.createElement(
            'ol',
            {
              className: (0, _classnames2.default)(_this.prefixClass('pager'), pagerClassName)
            },
            children
          )
        };
      }();

      if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
    }

    return null;
  },
  renderItem: function renderItem(child, index) {
    var activeIndex = this.getActiveIndex();
    var isActive = index === activeIndex;
    var isPreviousActive = this.state.previousActiveIndex != null && this.state.previousActiveIndex === index && this.props.slide;
    var props = {
      active: isActive,
      ref: child.ref,
      key: child.key ? child.key : index,
      index: index,
      animateOut: isPreviousActive,
      animateIn: isActive && this.state.previousActiveIndex != null && this.props.slide,
      direction: this.state.direction,
      onAnimateOutEnd: isPreviousActive ? this.handleItemAnimateOutEnd : null
    };

    return _react2.default.cloneElement(child, props);
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['className', 'children']);

    delete props.classPrefix;
    delete props.onAction;
    delete props.pager;
    delete props.controls;
    delete props.slide;
    delete props.interval;
    delete props.pauseOnHover;
    delete props.prevIcon;
    delete props.nextIcon;

    // TODO: 优化 swipe，左右方向阻止默认事件，垂直方向不阻止
    return _react2.default.createElement(
      _Touchable2.default,
      _extends({}, props, {
        component: 'div',
        className: (0, _classnames2.default)(classSet, className),
        onMouseOver: this.handleMouseOver,
        onMouseOut: this.handleMouseOut,
        onSwipeLeft: this.handleSwipeLeft,
        onSwipeRight: this.handleSwipeRight,
        preventDefault: false,
        stopPropagation: true
      }),
      _react2.default.createElement(
        'ul',
        { className: this.prefixClass('slides') },
        _react2.default.Children.map(children, this.renderItem)
      ),
      this.renderControls(),
      this.renderPager()
    );
  }
});

var SliderItem = _react2.default.createClass({
  displayName: 'SliderItem',

  propTypes: {
    direction: _react.PropTypes.oneOf(['prev', 'next']),
    onAnimateOutEnd: _react.PropTypes.func,
    active: _react.PropTypes.bool,
    animateIn: _react.PropTypes.bool,
    animateOut: _react.PropTypes.bool,
    caption: _react.PropTypes.node,
    index: _react.PropTypes.number,
    thumbnail: _react.PropTypes.string
  },

  getInitialState: function getInitialState() {
    return {
      direction: null
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      animation: true
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (this.props.active !== nextProps.active) {
      this.setState({
        direction: null
      });
    }
  },
  componentDidUpdate: function componentDidUpdate(prevProps) {
    if (!this.props.active && prevProps.active) {
      _TransitionEvents2.default.on(_reactDom2.default.findDOMNode(this), this.handleAnimateOutEnd);
    }

    if (this.props.active !== prevProps.active) {
      setTimeout(this.startAnimation, 20);
    }
  },
  handleAnimateOutEnd: function handleAnimateOutEnd() {
    if (this.props.onAnimateOutEnd && this.isMounted()) {
      this.props.onAnimateOutEnd(this.props.index);
    }
  },
  startAnimation: function startAnimation() {
    if (!this.isMounted()) {
      return;
    }

    this.setState({
      direction: this.props.direction === 'prev' ? 'right' : 'left'
    });
  },
  render: function render() {
    var _props2 = this.props;
    var className = _props2.className;
    var active = _props2.active;
    var animateIn = _props2.animateIn;
    var animateOut = _props2.animateOut;
    var direction = _props2.direction;

    var classSet = {
      active: active && !animateIn || animateOut,
      next: active && animateIn && direction === 'next',
      prev: active && animateIn && direction === 'prev'
    };

    if (this.state.direction && (animateIn || animateOut)) {
      classSet[this.state.direction] = true;
    }

    return _react2.default.createElement(
      'li',
      {
        className: (0, _classnames2.default)(className, classSet)
      },
      this.props.children
    );
  }
});

Slider.Item = SliderItem;

exports.default = Slider;
module.exports = exports['default'];