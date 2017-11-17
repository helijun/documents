/**
 * 这个specialModal是复制于Modal组件，然后基于这个组件来修改，
 * 使得满足专业页面的需要自定义的modal组件的需求
 */

import React, {
  PropTypes,
  createClass,
} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import ClassNameMixin from '../mixins/ClassNameMixin';
import TransitionEvents from '../utils/TransitionEvents';
import Button from '../Button';
import Icon from '../Icon';
import Loader from '../Loader';

// MUST be equal to $modal-duration in _modal.scss
const TRANSITION_TIMEOUT = 300;

function noop() {
}

const Modal = createClass({
  mixins: [ClassNameMixin],

  propTypes: {
    classPrefix: PropTypes.string,
    role: PropTypes.oneOf(['alert', 'confirm', 'prompt', 'loading',
      'actions', 'popup','customize']),
    title: PropTypes.node,
    confirmText: PropTypes.string,
    cancelText: PropTypes.string,
    closeBtn: PropTypes.bool,
    closeViaBackdrop: PropTypes.bool,
    onAction: PropTypes.func,
    onOpen: PropTypes.func,
    onClosed: PropTypes.func,
    onDismiss: PropTypes.func,
  },

  getDefaultProps() {
    return {
      classPrefix: 'modal',
      confirmText: '确定',
      cancelText: '取消',
      closeBtn: true,
      onAction: noop,
      onOpen: noop,
      onClosed: noop,
      onDismiss: noop,
    };
  },

  getInitialState() {
    return {
      closed: true,
      isClosing: false,
    };
  },

  componentDidMount() {
    if (this.props.isOpen) {
      this.open();
    }
  },

  componentWillReceiveProps(nextProps) {

    let isOpen = this.props.isOpen;
    if (!isOpen && nextProps.isOpen) {
      this.open();
    } else if (isOpen && !nextProps.isOpen) {
      this.close();
    }
  },

  isClosed() {
    return this.state.closed;
  },

  isPopup() {
    return this.props.role === 'popup';
  },

  isActions() {
    return this.props.role === 'actions';
  },

  // Get input data for prompt modal
  getFieldData() {
    let data = [];
    let inputs = ReactDOM.findDOMNode(this)
      .querySelectorAll('input[type=text]');

    if (inputs) {
      for (let i = 0; i < inputs.length; i++) {
        data.push(inputs[i].value);
      }
    }

    return (data.length === 0) ? null : ((data.length === 1) ? data[0] : data);
  },

  // data === null: prompt -> canceled
  // data === true: confirm -> confirmed
  // data === false: confirm -> canceled
  handleAction(data, e) {
    let {
      role,
      onAction,
    } = this.props;
    let willClose = true;

    if (role === 'prompt' && data) {
      data = this.getFieldData();

      willClose = onAction.call(this, data, e);
    } else {
      onAction.call(this, data, e);
    }

    willClose && this.requestClose(e);
  },

  handleBackdropClick(e) {
    
    if (e.target !== e.currentTarget || !this.props.closeViaBackdrop) {
      return;
    }

    this.requestClose(e);
  },

  open() {
    if (this.isClosed()) {
      this.setState({
        isClosing: false,
        closed: false
      });

      this.props.onOpen();
    }
  },

  // Only for instance self calling
  close() {
    if (this.isClosed() || this.state.isClosing) {
      return;
    }

    this.setState({
      isClosing: true
    });
  },

  // for user actions
  requestClose(e) {
    this.props.onDismiss(e);
  },

  handleClosed() {
    this.setState({
      closed: true,
      isClosing: false,
    });
    this.props.onClosed();
  },

  renderActions(classSet) {
    classSet[this.props.classPrefix] = false;

    return (
      <div
        className={classNames(this.props.className, classSet)}
        key="modalActions"
        ref="modal"
      >
        {this.props.children}
        <div className={this.prefixClass('actions-group')}>
          <Button
            onClick={this.requestClose}
            block
            amStyle={this.props.btnStyle || 'secondary'}
          >
            {this.props.cancelText}
          </Button>
        </div>
      </div>
    );
  },

  renderPopup(classSet) {
    classSet[this.props.classPrefix] = false;

    let {
      className,
      title,
      children,
      ...props
    } = this.props;

    return (
      <div
        {...props}
        className={classNames(className, classSet, this.setClassNS('popup'))}
        key="modalPopup"
        ref="modal"
      >
        <div className={this.setClassNS('popup-inner')}>
          <div className={this.setClassNS('popup-header')}>
            {title ? (
              <h4 className={this.setClassNS('popup-title')}>
                {title}
              </h4>
            ) : null}
            <Icon
              name="close"
              className={this.setClassNS('popup-icon')}
              onClick={this.requestClose}
            />
          </div>
          <div className={this.setClassNS('popup-body')}>
            {children}
          </div>
        </div>
      </div>
    );
  },

  renderHeader() {
    let {
      title,
      closeBtn,
      role
    } = this.props;
    let closeIcon = closeBtn && !role ? (
      <Icon
        name="close"
        className={this.prefixClass('icon')}
        onClick={this.requestClose}
      />
    ) : null;

    return (title || closeIcon) ? (
      <div
        className={this.prefixClass('header')}
        key="modalHeader"
      >
        {title ? (
          <h4
            className={this.prefixClass('title')}
          >
            {title}
          </h4>) : null}
        {closeIcon}
      </div>) : null;
  },

  // Render alert/confirm/prompt buttons
  renderFooter() {
    let buttons;
    let btnClass = this.prefixClass('btn');
    let {
      role,
      confirmText,
      cancelText,
    } = this.props;

    switch (role) {
      case 'alert':
        buttons = (
          <span
            key="modalBtn"
            onClick={this.handleAction.bind(this, null)}
            className={btnClass}
          >
            {confirmText}
          </span>);
        break;
      case 'confirm':
      case 'prompt':
        let cancel = (role === 'prompt') ? null : false;
        buttons = [cancelText, confirmText].map((text, i) => {
          return (
            <span
              key={'modalBtn' + i}
              onClick={this.handleAction.bind(this, i === 0 ? cancel : true)}
              className={btnClass}
            >
              {text}
            </span>
          );
        });
        break;
      default:
        buttons = null;
    }

    return buttons ? (
      <div className={this.prefixClass('footer')}>
        {buttons}
      </div>
    ) : null;
  },

  // Using transition appear to fix animation issue on iOS Safari
  // @see https://github.com/amazeui/amazeui-touch/issues/11
  renderTransition(children) {
    return (
      <CSSTransitionGroup
        transitionName={this.prefixClass('transition')}
        transitionAppear={true}
        transitionAppearTimeout={TRANSITION_TIMEOUT}
        transitionEnterTimeout={TRANSITION_TIMEOUT}
        transitionLeaveTimeout={TRANSITION_TIMEOUT}
      >
        {children}
      </CSSTransitionGroup>
    );
  },

  renderBackdrop(children) {
    const onClick = this.handleBackdropClick || null;
    const preventDefault = (e) => {
      // prevent window scroll when touch backdrop
      e.preventDefault();
    };

    let classSet = {};

    classSet[this.prefixClass('backdrop')] = true;
    classSet[this.setClassNS('active')] = true;
    classSet[this.prefixClass('backdrop-out')] = this.state.isClosing;
    //note:原代码中，backdrop的height是通过window.innerHeight来设置，
    //后来在微信浏览器中，由于height的高度检测不准确，我将height设置为100%来解决这个问题。
    return (
      <span>
        {children}
        <div
          className={classNames(classSet)}
          style={{height: "100%"}}
          ref="backdrop"
          onClick={onClick}
          onTouchMove={preventDefault}
        ></div>
      </span>
    );
  },

  render() {

    let {
      closed,
      isClosing,
    } = this.state;

    if (closed) {
      return null;
    }

    // listen out animation end envent
    if (isClosing) {
      let node = this.refs.modal;

      if (node) {
        let closedHandler = (e) => {
          if (e && e.target !== node) {
            return;
          }

          TransitionEvents.off(node, closedHandler);
          this.handleClosed();
        };

        TransitionEvents.on(node, closedHandler);
      }
    }

    let classSet = this.getClassSet();
    let {
      role,
      className,
      title,
      children,
      modalWidth,
      modalHeight,
      ...props
    } = this.props;
    let modal;

    classSet[this.prefixClass('out')] = isClosing;
    role && (classSet[this.prefixClass(role)] = true);

    if (this.isActions()) {
      modal = this.renderTransition(this.renderActions(classSet));
    } else if (this.isPopup()) {
      modal = this.renderTransition(this.renderPopup(classSet));
    } else {
      let style = {
        width: modalWidth,
        height: modalHeight
      };

      modal = (
        <div
          {...props}
          style={style}
          ref="modalContainer"
          className={classNames(classSet, className)}
        >
          <div
            className="modal-inner"
            ref="modal"
          >
            {this.props.children}
          </div>
        </div>
      );
    }

    return this.renderBackdrop(modal);
  }
});

export default Modal;
