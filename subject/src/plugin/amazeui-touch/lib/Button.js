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

var Button = _react2.default.createClass({
  displayName: 'Button',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    component: _react.PropTypes.node,
    href: _react.PropTypes.string,
    target: _react.PropTypes.string,
    amStyle: _react.PropTypes.string,
    amSize: _react.PropTypes.string,
    hollow: _react.PropTypes.bool,
    block: _react.PropTypes.bool,
    active: _react.PropTypes.bool,
    disabled: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'btn'
    };
  },
  removeUnknownProp: function removeUnknownProp(props) {
    delete props.classPrefix;
    delete props.amStyle;
    delete props.amSize;
    delete props.hollow;
    delete props.block;
    delete props.active;

    return props;
  },
  renderAnchor: function renderAnchor(classes) {
    var _props = this.props;
    var href = _props.href;
    var Component = _props.component;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['href', 'component', 'children']);

    Component = Component || 'a';

    href = href || '#';

    return _react2.default.createElement(
      Component,
      _extends({}, this.removeUnknownProp(props), {
        href: href,
        className: classes,
        role: 'button'
      }),
      children
    );
  },
  renderButton: function renderButton(classes) {
    var _props2 = this.props;
    var Component = _props2.component;
    var children = _props2.children;

    var props = _objectWithoutProperties(_props2, ['component', 'children']);

    Component = Component || 'button';

    return _react2.default.createElement(
      Component,
      _extends({}, this.removeUnknownProp(props), {
        className: classes
      }),
      children
    );
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props3 = this.props;
    var href = _props3.href;
    var target = _props3.target;
    var block = _props3.block;
    var className = _props3.className;

    var renderType = href || target ? 'renderAnchor' : 'renderButton';

    // block button
    classSet[this.prefixClass('block')] = block;

    return this[renderType]((0, _classnames2.default)(classSet, className));
  }
});

exports.default = Button;
module.exports = exports['default'];