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

var Grid = _react2.default.createClass({
  displayName: 'Grid',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    component: _react.PropTypes.node.isRequired,
    collapse: _react.PropTypes.bool,
    avg: _react.PropTypes.number,
    align: _react.PropTypes.oneOf(['right', 'center', 'between', 'around']),
    wrap: _react.PropTypes.oneOf(['wrap', 'wrap-reverse']),
    bordered: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'g',
      component: 'div'
    };
  },


  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var Component = _props.component;
    var className = _props.className;
    var collapse = _props.collapse;
    var bordered = _props.bordered;
    var avg = _props.avg;
    var align = _props.align;
    var wrap = _props.wrap;

    var props = _objectWithoutProperties(_props, ['component', 'className', 'collapse', 'bordered', 'avg', 'align', 'wrap']);

    delete props.classPrefix;

    // .g-collapse
    classSet[this.prefixClass('collapse')] = collapse;

    // .g-bordered
    classSet[this.prefixClass('bordered')] = bordered;

    // .g-wrap
    classSet[this.prefixClass(wrap)] = wrap;

    if (avg) {
      classSet[this.prefixClass('avg-' + avg)] = true;
    }

    if (align) {
      classSet[this.prefixClass(align)] = true;
    }

    return _react2.default.createElement(
      Component,
      _extends({}, props, {
        className: (0, _classnames2.default)(className, classSet)
      }),
      this.props.children
    );
  }
});

exports.default = Grid;
module.exports = exports['default'];