import React from 'react';
import './button.scss';

class Button extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {}
        };
    }
    
    clickCallback(callback) {
        callback && callback();
    }

    render() {
        let {
            click,
            className,
            text,
            id
        } = this.props;
        return(
            <div className='component-form-button'>
                <div 
                    className={'li-btn ' + className}
                    onClick={click}
                    id={id}
                >{text}</div>
            </div>
        )
    }

    componentDidMount() {

        
    }
}

export default Button