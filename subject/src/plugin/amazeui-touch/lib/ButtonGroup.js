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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ButtonGroup = _react2.default.createClass({
  displayName: 'ButtonGroup',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    amStyle: _react.PropTypes.string,
    amSize: _react.PropTypes.string,
    hollow: _react.PropTypes.bool,
    justify: _react.PropTypes.bool,
    stacked: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'btn-group'
    };
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var className = _props.className;
    var amStyle = _props.amStyle;
    var amSize = _props.amSize;
    var hollow = _props.hollow;
    var stacked = _props.stacked;
    var justify = _props.justify;

    var props = _objectWithoutProperties(_props, ['className', 'amStyle', 'amSize', 'hollow', 'stacked', 'justify']);

    delete props.classPrefix;

    classSet[this.prefixClass('stacked')] = stacked;
    classSet[this.prefixClass('justify')] = justify;

    return _react2.default.createElement(
      'div',
      _extends({}, props, {
        className: (0, _classnames2.default)(className, classSet)
      }),
      _react2.default.Children.map(this.props.children, function (child, i) {
        return (0, _react.cloneElement)(child, _extends({
          amStyle: amStyle,
          amSize: amSize,
          hollow: hollow
        }, child.props));
      })
    );
  }
});

exports.default = ButtonGroup;
module.exports = exports['default'];