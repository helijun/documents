import React from 'react';
import './tips.scss';

class Tips extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isShow: this.props.isShow
        };
    }
    
    timer(time, callback){
        let self = this;
        setTimeout(() => {
            this.setState({
                isShow: false,
            }, ()=> {
                this.callback(callback);
            });
        }, time)
    }

    callback(callback) {
        callback && callback();
    }

    render() {
        let {
            text,
            time,
            top,
            callback,
            isShow
        } = this.props;

        if(this.state.isShow){
            this.timer(time || 2000, callback);
        }
        return(
            <div 
                className={'component-tips ' + (this.state.isShow? '' : 'li-none')}
                style={{top: top + '%'}}
            >
                <p>{text}</p>
            </div>
        )
    }

    componentWillUnmount() {
        
    }

    //当props变更的时候触发
    componentWillReceiveProps (nextProps){
        this.state.isShow = nextProps.isShow;
    }
}

export default Tips