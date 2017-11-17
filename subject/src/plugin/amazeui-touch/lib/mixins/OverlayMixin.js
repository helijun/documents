'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Overlay Mixin
 *
 * @desc `overlay` is something like Popover, OffCavans, etc.
 */

exports.default = {
  propTypes: {
    container: _react2.default.PropTypes.node
  },

  componentDidMount: function componentDidMount() {
    this._renderOverlay();
  },
  componentDidUpdate: function componentDidUpdate() {
    this._renderOverlay();
  },


  // Remove Overlay related DOM node
  componentWillUnmount: function componentWillUnmount() {
    this._unmountOverlay();

    if (this._node) {
      this.getContainerDOMNode().removeChild(this._node);
      this._node = null;
    }
  },


  // Create Overlay wrapper
  _createPortal: function _createPortal() {
    this._node = document.createElement('div');
    this._node.className = '__overlay-portal';
    this.getContainerDOMNode().appendChild(this._node);
  },


  // Render Overlay to wrapper
  _renderOverlay: function _renderOverlay() {
    if (!this._node) {
      this._createPortal();
    }

    var overlay = this.renderOverlay();

    if (overlay !== null) {
      this._overlayInstance = (0, _reactDom.unstable_renderSubtreeIntoContainer)(this, overlay, this._node);
    } else {
      // Unmount if the component is null for transitions to null
      this._unmountOverlay();
    }
  },


  // Remove a mounted Overlay from wrapper
  _unmountOverlay: function _unmountOverlay() {
    (0, _reactDom.unmountComponentAtNode)(this._node);
    this._overlayInstance = null;
  },
  getOverlayDOMNode: function getOverlayDOMNode() {
    if (!this.isMounted()) {
      throw new Error('getOverlayDOMNode(): A component must be mounted to\n        have a DOM node.');
    }

    if (this._overlayInstance) {
      // 包含 backdrop 时通过 refer 返回 overlay DOM 节点
      return (0, _reactDom.findDOMNode)(this._overlayInstance.refs && this._overlayInstance.refs.overlay || this._overlayInstance);
    }

    return null;
  },
  getContainerDOMNode: function getContainerDOMNode() {
    return (0, _reactDom.findDOMNode)(this.props.container) || document.body;
  }
};
module.exports = exports['default'];