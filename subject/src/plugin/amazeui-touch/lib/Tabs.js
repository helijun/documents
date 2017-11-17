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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _ButtonGroup = require('./ButtonGroup');

var _ButtonGroup2 = _interopRequireDefault(_ButtonGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Tabs = _react2.default.createClass({
  displayName: 'Tabs',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string,
    activeKey: _react.PropTypes.any,
    defaultActiveKey: _react.PropTypes.any,
    onAction: _react.PropTypes.func,
    inset: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'tabs'
    };
  },
  getInitialState: function getInitialState() {
    return {
      activeKey: this.getDefaultActiveKey(),
      previousActiveKey: null
    };
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var nextActiveKey = nextProps.activeKey;

    // update controlled Tabs' state
    if (nextActiveKey != null && nextActiveKey !== this.props.activeKey) {
      this.setState({
        activeKey: nextActiveKey,
        previousActiveKey: this.props.activeKey
      });
    }
  },
  getDefaultActiveKey: function getDefaultActiveKey(children) {
    var defaultActiveKey = this.props.defaultActiveKey;

    if (defaultActiveKey != null) {
      return defaultActiveKey;
    }

    _react2.default.Children.forEach(children, function (child) {
      if (defaultActiveKey == null) {
        defaultActiveKey = child.props.eventKey;
      }
    });

    return defaultActiveKey != null ? defaultActiveKey : 0;
  },
  getActiveKey: function getActiveKey() {
    return this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;
  },
  handleClick: function handleClick(key, disabled, e) {
    e.preventDefault();
    var activeKey = this.state.activeKey;

    if (disabled) {
      return;
    }

    if (this.props.onAction) {
      this.props.onAction(key);
    }

    // uncontrolled
    if (this.props.activeKey == null && activeKey !== key) {
      this.setState({
        activeKey: key,
        previousActiveKey: activeKey
      });
    }
  },
  renderNav: function renderNav() {
    var _this = this;

    var activeKey = this.getActiveKey();

    var navs = _react2.default.Children.map(this.props.children, function (child, index) {
      var _child$props = child.props;
      var eventKey = _child$props.eventKey;
      var disabled = _child$props.disabled;
      var navSize = _child$props.navSize;
      var navStyle = _child$props.navStyle;

      var key = index;

      eventKey = eventKey !== undefined ? eventKey : index;
      var active = eventKey === activeKey;

      return _react2.default.createElement(
        _Button2.default,
        {
          ref: 'tabNav' + key,
          key: key,
          onClick: _this.handleClick.bind(_this, key, disabled),
          active: active,
          disabled: disabled,
          className: active ? 'active' : null,
          amSize: navSize || 'sm',
          amStyle: navStyle || 'primary',
          hollow: true
        },
        child.props.title
      );
    });

    return _react2.default.createElement(
      _ButtonGroup2.default,
      {
        className: this.prefixClass('nav'),
        justify: true
      },
      navs
    );
  },
  renderTabPanels: function renderTabPanels() {
    var activeKey = this.getActiveKey();
    var panels = _react2.default.Children.map(this.props.children, function (child, index) {
      var _child$props2 = child.props;
      var eventKey = _child$props2.eventKey;
      var children = _child$props2.children;

      var props = _objectWithoutProperties(_child$props2, ['eventKey', 'children']);

      if (eventKey === undefined) {
        eventKey = index;
      }

      return _react2.default.createElement(
        Tabs.Item,
        _extends({
          active: eventKey === activeKey,
          eventKey: eventKey,
          key: 'tabPanel' + index
        }, props),
        children
      );
    });

    return _react2.default.createElement(
      'div',
      {
        className: this.prefixClass('body')
      },
      panels
    );
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    delete props.classPrefix;
    delete props.activeKey;
    delete props.defaultActiveKey;
    delete props.inset;
    delete props.onAction;

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      this.renderNav(),
      this.renderTabPanels()
    );
  }
});

var TabsItem = _react2.default.createClass({
  displayName: 'TabsItem',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string,
    title: _react.PropTypes.node,
    eventKey: _react.PropTypes.any,
    disabled: _react.PropTypes.bool,
    active: _react.PropTypes.bool,
    noPadded: _react.PropTypes.bool,
    navSize: _react.PropTypes.string,
    navStyle: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'tab'
    };
  },
  render: function render() {
    var classSet = this.getClassSet(true);
    var _props2 = this.props;
    var className = _props2.className;
    var children = _props2.children;
    var noPadded = _props2.noPadded;

    var props = _objectWithoutProperties(_props2, ['className', 'children', 'noPadded']);

    var elementName = 'panel';

    delete props.classPrefix;
    delete props.eventKey;
    delete props.active;
    delete props.noPadded;
    delete props.navSize;
    delete props.navStyle;

    classSet[this.prefixClass(elementName)] = true;
    classSet[this.prefixClass(elementName + '-no-padded')] = noPadded;

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      children
    );
  }
});

Tabs.Item = TabsItem;

exports.default = Tabs;

// TODO: Nav 的可定制性，如允许传入 Router 的 Link 组件

module.exports = exports['default'];