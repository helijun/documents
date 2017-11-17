'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _CSSCore = require('../utils/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _exenv = require('../utils/exenv');

var _bodyElement = require('../utils/bodyElement');

var _bodyElement2 = _interopRequireDefault(_bodyElement);

var _Modal = require('./Modal');

var _Modal2 = _interopRequireDefault(_Modal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyClassName = 'has-modal-open';

var ModalPortal = (0, _react.createClass)({
  propTypes: {
    isOpen: _react.PropTypes.bool.isRequired
  },

  getDefaultProps: function getDefaultProps() {
    return {
      isOpen: false
    };
  },
  componentDidMount: function componentDidMount() {
    this.node = document.createElement('div');
    this.node.className = '__modal-portal';
    _bodyElement2.default.appendChild(this.node);
    this.renderModal(this.props);
  },
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    this.renderModal(nextProps);
  },
  componentWillUnmount: function componentWillUnmount() {
    (0, _reactDom.unmountComponentAtNode)(this.node);
    _bodyElement2.default.removeChild(this.node);
    _CSSCore2.default.removeClass(_bodyElement2.default, bodyClassName);
  },
  renderModal: function renderModal(props) {
    _CSSCore2.default[(props.isOpen ? 'add' : 'remove') + 'Class'](_bodyElement2.default, bodyClassName);
    this.portal = (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, _react2.default.createElement(_Modal2.default, props), this.node);
  },
  render: function render() {
    return null;
  }
});

exports.default = ModalPortal;
module.exports = exports['default'];