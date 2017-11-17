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

var Col = _react2.default.createClass({
  displayName: 'Col',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    component: _react.PropTypes.node.isRequired,
    cols: _react.PropTypes.number,
    offset: _react.PropTypes.number,
    shrink: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'col',
      component: 'div'
    };
  },
  render: function render() {
    var _props = this.props;
    var Component = _props.component;
    var cols = _props.cols;
    var offset = _props.offset;
    var shrink = _props.shrink;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['component', 'cols', 'offset', 'shrink', 'className']);

    var classSet = this.getClassSet();

    delete props.classPrefix;

    if (cols) {
      classSet[this.prefixClass(cols)] = true;
    }

    if (offset) {
      classSet[this.prefixClass('offset-' + offset)] = true;
    }

    classSet[this.prefixClass('shrink')] = shrink;

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: (0, _classnames2.default)(className, classSet)
      }),
      this.props.children
    );
  }
});

exports.default = Col;
module.exports = exports['default'];