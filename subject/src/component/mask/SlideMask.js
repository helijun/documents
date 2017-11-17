
import React from 'react';
import classNames from 'classnames';

import './SlideMask.scss';


const SlideMask=React.createClass({
    getInitialState(){
      return {
          isActive:false
      }
    },
    _closeMask(){
        this.setState({
            isActive:false
        },function(){
            this.props.onClosed && this.props.onClosed();
        }.bind(this));
    },
    render(){
       let slideMaskClass=classNames({
           "slide-mask":true,
           active: this.state.isActive
       });
       return (
           <div className={slideMaskClass} onClick={!this.props.cancelDismissOnGlobal && this._closeMask}>
               {this.props.children}
           </div>
       )
    },
    componentWillReceiveProps(nextProps){
        this.setState({
            isActive:nextProps.isMaskOpen
        })
    }
});

SlideMask.contextTypes = {
    router:React.PropTypes.object.isRequired
};


export default SlideMask;