import React from 'react';
import {
    LI_Button
} from '../../js/common.config';
import './input.scss';

class Input extends React.Component {
    constructor(){
        super();
        this.state = {
            data: {}
        };
    }

    render() {
        let {
            colEnd,
            colEndClick,
            iconClass,
            endBtnClass,
            endBtnText,
            endBtnId,
            endIconClass,
            iconAlign,
            ...data
        } = this.props;

        //判断col属性
        let colTwoClass = 'li-col-80';
        let colEndClass = 'li-col-20';
        if(colEnd){
            colTwoClass = 'li-col-60';

            if(colEnd == 'btn'){
                colTwoClass = 'li-col-50';
                colEndClass = 'li-col-30';
            }
        }
        return(
            <div 
                className='component-form-input li-row li-items-center'
            >
                <div className={'li-col-20 ' + iconAlign}>
                    <i className={iconClass}></i>
                </div>
                <div className={colTwoClass}>
                    <input className='li-input' {...data} />
                </div>
                {
                    colEnd? 
                    <div className={colEndClass + ' li-align-center'} >
                        {
                            colEnd == 'btn'?
                            <LI_Button 
                                className={endBtnClass} 
                                text={endBtnText} 
                                id={endBtnId}
                                click={colEndClick}
                            />
                            :
                            <i 
                                className={endIconClass} 
                                onClick={colEndClick}
                            ></i>
                        }
                    </div> 
                    : 
                    ''
                }
            </div>
        )
    }

    componentDidMount() {

    }
}

export default Input