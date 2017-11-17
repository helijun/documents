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

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var List = _react2.default.createClass({
  displayName: 'List',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    inset: _react.PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'list'
    };
  },
  render: function render() {
    var classSet = this.getClassSet();
    var _props = this.props;
    var className = _props.className;
    var inset = _props.inset;

    var props = _objectWithoutProperties(_props, ['className', 'inset']);

    delete props.classPrefix;

    classSet[this.prefixClass('inset')] = inset;

    // TODO: 使用 ul 可能不是太好的选择，在一些需要定义 component 的场合缺乏灵活性
    return _react2.default.createElement('ul', _extends({}, props, {
      className: (0, _classnames2.default)(classSet, className)
    }));
  }
});

var ListItem = _react2.default.createClass({
  displayName: 'ListItem',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    role: _react.PropTypes.oneOf(['header', 'item']),
    title: _react.PropTypes.node,
    subTitle: _react.PropTypes.node,
    href: _react.PropTypes.string,
    linked: _react.PropTypes.bool, // linked flag for custom href like route Link
    linkComponent: _react.PropTypes.any,
    linkProps: _react.PropTypes.object,
    media: _react.PropTypes.node,
    after: _react.PropTypes.node,
    desc: _react.PropTypes.node,
    nested: _react.PropTypes.oneOf(['input', 'radio', 'checkbox']) },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'item',
      role: 'item'
    };
  },
  renderTitleRow: function renderTitleRow() {
    var _props2 = this.props;
    var title = _props2.title;
    var subTitle = _props2.subTitle;
    var href = _props2.href;
    var linkComponent = _props2.linkComponent;


    var itemTitle = title ? _react2.default.createElement(
      'h3',
      {
        key: 'itemTitle',
        className: this.prefixClass('title')
      },
      title
    ) : null;

    var titleChildren = [itemTitle, this.renderAddon('after'), href || linkComponent ? _react2.default.createElement(_Icon2.default, {
      className: this.prefixClass('icon'),
      name: 'right-nav',
      key: 'itemChevron'
    }) : null];

    return subTitle ? _react2.default.createElement(
      'div',
      {
        className: this.prefixClass('title-row'),
        key: 'itemTitleRow'
      },
      titleChildren
    ) : titleChildren;
  },
  renderMain: function renderMain() {
    var _props3 = this.props;
    var media = _props3.media;
    var subTitle = _props3.subTitle;
    var desc = _props3.desc;
    var children = _props3.children;

    var titleRow = this.renderTitleRow();
    var notJustTitle = media || subTitle || desc || children;

    // remove wrapper if without media/subTitle/children
    return notJustTitle ? _react2.default.createElement(
      'div',
      {
        key: 'itemMain',
        className: this.prefixClass('main')
      },
      titleRow,
      this.renderAddon('subTitle'),
      this.renderAddon('desc'),
      children
    ) : titleRow;
  },
  wrapLink: function wrapLink(children) {
    var _props4 = this.props;
    var linkComponent = _props4.linkComponent;
    var linkProps = _props4.linkProps;
    var href = _props4.href;
    var target = _props4.target;


    return linkComponent ? _react2.default.createElement(linkComponent, linkProps, children) : _react2.default.createElement(
      'a',
      {
        href: href,
        target: target
      },
      children
    );
  },
  renderAddon: function renderAddon(type) {
    return this.props[type] ? _react2.default.createElement(
      'div',
      {
        key: 'item-' + type,
        className: this.prefixClass(type.toLowerCase())
      },
      this.props[type]
    ) : null;
  },
  render: function render() {
    var _props5 = this.props;
    var className = _props5.className;
    var role = _props5.role;
    var subTitle = _props5.subTitle;
    var href = _props5.href;
    var media = _props5.media;
    var children = _props5.children;
    var linkComponent = _props5.linkComponent;
    var linked = _props5.linked;
    var nested = _props5.nested;

    var props = _objectWithoutProperties(_props5, ['className', 'role', 'subTitle', 'href', 'media', 'children', 'linkComponent', 'linked', 'nested']);

    delete props.classPrefix;
    delete props.title;
    delete props.after;
    delete props.linkProps;
    delete props.desc;

    var itemChildren = [this.renderAddon('media'), this.renderMain()];
    var classSet = this.getClassSet();

    classSet[this.prefixClass(nested)] = nested;
    classSet[this.prefixClass('header')] = role === 'header';
    classSet[this.prefixClass('linked')] = href || linkComponent || linked;
    subTitle && (classSet[this.prefixClass('content')] = true);

    return _react2.default.createElement(
      'li',
      _extends({}, props, {
        className: (0, _classnames2.default)(classSet, className)
      }),
      role === 'header' ? children : href || linkComponent ? this.wrapLink(itemChildren) : itemChildren
    );
  }
});

List.Item = ListItem;

exports.default = List;

/**
 * TODO:
 * - 可选择列表（嵌套 radio/checkbox）图文混排的列表，
 *   考虑的创建可选择列表时根据 nested 属性自动生产 input，而不用再去嵌套 Field，
 *   以便图文混排选择实现。
 * - UE：用户如何知道这个列表是可以选择的（增加相应的提示文字？）
 * - 易用性：链接如何以更好的方式传入类似 react-router Link 这样的组件？
 */

module.exports = exports['default'];