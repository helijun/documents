import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Picker from "./Picker";

class LoanTypePicker extends Component {

    static propTypes = {
        isOpen:PropTypes.bool,
        onFinished:PropTypes.func.isRequired
    }

    static state ={
        isOpen:PropTypes.bool,
        optionGroups:PropTypes.object,
        valueGroups:PropTypes.object
    }

    constructor(props){
        super(props);
        this.state={
            isOpen:false || props.isOpen,
            valueGroups:{
                bankName: '经销商',
            },
            optionGroups:{
                bankName: ['经销商', '零售商', '厂家', '农户', '其他'],
            }
        }
    }

    _handleChange = (name, value) => {
        this.setState(({valueGroups}) => {
            return {
                valueGroups:{
                    ...valueGroups,
                    [name]:value
                }
            }
        })
    }

    _handleFinished=() => {
        this.setState({
            isOpen:false
        },() => {
            let {
                bankName
            } = this.state.valueGroups;
            console.log('onFinished')
            this.props.onFinished && this.props.onFinished(bankName);
        })
    }

    _handleCancel=() => {
        console.log('onCancel')
        this.setState({
            isOpen:false
        },() => {
            console.log('onCancel')
            this.props.onCancel && this.props.onCancel();
        })
    }
    
    render() {
        let {
            isOpen,
            optionGroups,
            valueGroups
        }=this.state;

        return (
             <Picker
                isOpen={isOpen}
                optionGroups={optionGroups}
                valueGroups={valueGroups}
                onChange={this._handleChange}
                onFinished={this._handleFinished}
                onCancel={this._handleCancel}
            />
        );
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isOpen !== this.state.isOpen){
            this.setState({
                isOpen:nextProps.isOpen
            })
        }
    }
}

export default LoanTypePicker;