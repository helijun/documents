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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Card = _react2.default.createClass({
  displayName: 'Card',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    title: _react.PropTypes.string,
    header: _react.PropTypes.node,
    footer: _react.PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'card'
    };
  },
  renderItem: function renderItem(element, role) {
    if (!element) {
      return null;
    }

    return element.type && element.type === Card.Child ? element : _react2.default.createElement(
      Card.Child,
      { role: role },
      element
    );
  },
  renderTitle: function renderTitle(title) {
    return _react2.default.createElement(
      'h2',
      { className: this.prefixClass('title') },
      title
    );
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var children = _props.children;
    var className = _props.className;
    var title = _props.title;
    var header = _props.header;
    var footer = _props.footer;

    var props = _objectWithoutProperties(_props, ['children', 'className', 'title', 'header', 'footer']);

    delete props.classPrefix;

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      title ? this.renderItem(this.renderTitle(title)) : this.renderItem(header),
      _react2.default.createElement(
        'div',
        { className: this.prefixClass('body') },
        children
      ),
      this.renderItem(footer, 'footer')
    );
  }
});

var CardChild = _react2.default.createClass({
  displayName: 'CardChild',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    role: _react.PropTypes.oneOf(['header', 'footer']),
    cover: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'card',
      role: 'header'
    };
  },
  render: function render() {
    var _classSet;

    var _props2 = this.props;
    var role = _props2.role;
    var className = _props2.className;
    var cover = _props2.cover;

    var props = _objectWithoutProperties(_props2, ['role', 'className', 'cover']);

    var classSet = (_classSet = {}, _defineProperty(_classSet, this.prefixClass(role), true), _defineProperty(_classSet, this.prefixClass('cover'), cover), _classSet);
    var style = null;

    if (cover) {
      style = {
        backgroundImage: 'url(' + cover + ')'
      };
    }

    delete props.classPrefix;

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(className, classSet),
        role: 'card-' + role,
        style: style
      }),
      this.props.children
    );
  }
});

Card.Child = CardChild;

exports.default = Card;
module.exports = exports['default'];