import React, { Component, PropTypes } from 'react';

import Picker from "./Picker";
import cityMap from "./ProvinceAndCityMap";

const provinceList=cityMap.getProvinceList();

class CityPicker extends Component {

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
                province:"广东",
                city:"深圳市"
            },
            optionGroups:{
                province:provinceList,
                city:cityMap.getCityListBy("广东")
            }
        }
    }

    _handleChange=(name,value) => {
          this.setState(({ valueGroups }) => {
            if (name === "province") {
                let nextCityList =cityMap.getCityListBy(value);
                return {
                    valueGroups: {
                        ...valueGroups,
                        province: value,
                        city: nextCityList[0]
                    },
                    optionGroups: {
                        province: provinceList,
                        city: nextCityList
                    }
                }
            } else {
                return {
                    valueGroups: {
                        ...valueGroups,
                        [name]: value
                    }
                }

            }

        });
    }

    _handleFinished=() => {
        this.setState({
            isOpen:false
        },() => {
            let {
                province,
                city
            }=this.state.valueGroups;

            this.props.onFinished && this.props.onFinished(province,city);
        })
    }

    _handleCancel = () => {
        this.setState({
            isOpen: false
        }, () => {
            let {
                province,
                city
            } = this.state.valueGroups;
            this.props.onCancel && this.props.onCancel(province, city);
        })
        //给父组件传值 TODO
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

export default CityPicker;