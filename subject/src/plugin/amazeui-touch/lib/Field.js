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

var _Icon = require('./Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var Field = _react2.default.createClass({
  displayName: 'Field',

  mixins: [_ClassNameMixin2.default],

  propTypes: {
    classPrefix: _react.PropTypes.string.isRequired,
    type: _react.PropTypes.string,
    label: _react.PropTypes.node,
    btnBefore: _react.PropTypes.node,
    btnAfter: _react.PropTypes.node,
    labelBefore: _react.PropTypes.node,
    labelAfter: _react.PropTypes.node,
    containerClassName: _react.PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      classPrefix: 'field',
      type: 'text'
    };
  },
  getFieldDOMNode: function getFieldDOMNode() {
    return this.refs.field;
  },
  getValue: function getValue() {
    if (this.props.type === 'select' && this.props.multiple) {
      return this.getSelectedOptions();
    } else {
      return this.getFieldDOMNode().value;
    }
  },
  getChecked: function getChecked() {
    return this.getFieldDOMNode().checked;
  },
  getSelectedOptions: function getSelectedOptions() {
    var values = [];
    // see http://www.w3schools.com/jsref/coll_select_options.asp
    var options = this.getFieldDOMNode().options;

    Array.from(options).forEach(function (option) {
      if (option.selected) {
        var value = option.getAttribute('value') || option.innerHtml;

        values.push(value);
      }
    });

    return values;
  },
  isCheckboxOrRadio: function isCheckboxOrRadio() {
    return this.props.type === 'radio' || this.props.type === 'checkbox';
  },
  isFile: function isFile() {
    return this.props.type === 'file';
  },


  // convert `value`/`defaultValue` to `checked`/`defaultChecked` when `type` is `radio`/checkbox``
  convertValueToChecked: function convertValueToChecked() {
    var _this = this;

    var checkedProps = {};

    if (this.isCheckboxOrRadio()) {
      (function () {
        var propsMap = {
          checked: 'value',
          defaultChecked: 'defaultValue'
        };

        Object.keys(propsMap).forEach(function (checked) {
          var value = propsMap[checked];

          if (!_this.props[checked] && _this.props[value]) {
            checkedProps[checked] = value;
          }
        });
      })();
    }

    return checkedProps;
  },
  renderField: function renderField() {
    var field = null;
    var fieldClassName = this.isCheckboxOrRadio() || this.isFile() ? '' : this.getClassSet();
    var classes = (0, _classnames2.default)(this.props.className, fieldClassName);
    var commonProps = {
      ref: 'field',
      key: 'formField',
      className: classes
    };
    var assignedProps = _extends({}, this.props, commonProps);

    delete assignedProps.classPrefix;
    delete assignedProps.containerClassName;
    delete assignedProps.label;
    delete assignedProps.btnBefore;
    delete assignedProps.btnAfter;
    delete assignedProps.labelBefore;
    delete assignedProps.labelAfter;

    switch (this.props.type) {
      case 'select':
        field = _react2.default.createElement(
          'select',
          assignedProps,
          this.props.children
        );
        break;
      case 'textarea':
        field = _react2.default.createElement('textarea', assignedProps);
        break;
      case 'submit':
      case 'reset':
        var _props = this.props;
        var classPrefix = _props.classPrefix;

        var others = _objectWithoutProperties(_props, ['classPrefix']);

        field = _react2.default.createElement(_Button2.default, _extends({}, commonProps, {
          className: null
        }, others, {
          component: 'input'
        }));
        break;
      default:
        field = _react2.default.createElement('input', _extends({}, assignedProps, this.convertValueToChecked()));
    }

    return field;
  },
  renderContainer: function renderContainer(children) {
    var _props2 = this.props;
    var id = _props2.id;
    var label = _props2.label;
    var containerClassName = _props2.containerClassName;

    return label ? _react2.default.createElement(
      'label',
      {
        htmlFor: id,
        className: (0, _classnames2.default)(this.prefixClass('container'), containerClassName),
        key: 'label'
      },
      _react2.default.createElement(
        'span',
        { className: this.prefixClass('label') },
        label
      ),
      children,
      this.isCheckboxOrRadio() ? _react2.default.createElement(_Icon2.default, {
        className: this.prefixClass('icon'),
        name: 'check'
      }) : null
    ) : children;
  },
  renderFieldGroup: function renderFieldGroup(children) {
    var _this2 = this;

    var groupPrefix = this.setClassNS('field-group');
    var labelClassName = groupPrefix + '-label';
    var _props3 = this.props;
    var labelBefore = _props3.labelBefore;
    var labelAfter = _props3.labelAfter;
    var btnBefore = _props3.btnBefore;
    var btnAfter = _props3.btnAfter;
    var containerClassName = _props3.containerClassName;

    var renderFiledLabel = function renderFiledLabel(type) {
      return _this2.props[type] ? _react2.default.createElement(
        'span',
        {
          className: labelClassName,
          key: type
        },
        _this2.props[type]
      ) : null;
    };

    return labelBefore || labelAfter || btnBefore || btnAfter ? _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(groupPrefix, containerClassName),
        key: 'fieldGroup'
      },
      renderFiledLabel('labelBefore'),
      btnBefore,
      children,
      renderFiledLabel('labelAfter'),
      btnAfter
    ) : children;
  },
  render: function render() {
    var field = this.renderField();

    if (this.props.label) {
      return this.renderContainer(field);
    }

    return this.renderFieldGroup(field);
  }
});

exports.default = Field;
module.exports = exports['default'];