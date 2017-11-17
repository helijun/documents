import React from 'react';
import classNames from 'classnames';
import './radio.scss';

class Radio extends React.Component {
    constructor(){
        super();
        this.state = {
            selected: false
        };
    }
    
    clickCallback(callback) {
        callback && callback();
    }

    _handleChange(unselect, selected) {
        this.setState({
            selected: !this.state.selected
        })

        this.state.selected ? unselect() : selected() 
    }

    render() {
        let {
            click,
            type,
            text,
            selected,
            unselect,
            id
        } = this.props;

        let radioClass = classNames({
            'li-radio': true,
            'select': this.state.selected ? true : false,
            'unselect': this.state.selected ? false : true
        });

        return(
            <div 
                className='component-form-radio'
                onClick={this._handleChange.bind(this, unselect, selected)}
            >
                <span 
                    className={radioClass + ' li-radio-' + type}
                    id={id}
                ></span>
                <span
                    className={'radio-text-' + type}
                >{text}</span>
            </div>
        )
    }

    componentWillMount() {
        this.setState({
            selected: this.props.status == 'select'
        })
    }

    componentDidMount() {
        
    }

    //当props变更的时候触发
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps.status)
        this.state.selected = nextProps.status == 'select';
    }
}

export default Radio