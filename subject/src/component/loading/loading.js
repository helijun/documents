import React from 'react';
import './loading.scss';

class Loading extends React.Component {
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
        console.log('loading')
        return(
            <div 
                className={'component-loading ' + (this.state.isShow?'' : 'li-none')}
            >
                <div className='loading-mask'></div>
                <div className="loading-content">
                    <div className='loading-content-animation'>
                        <i className='li-icon-loading'></i>
                    </div>      
                    <p className='loading-content-text'>{'正在加载中...'}</p>
                </div>
            </div>
        )
    }

    //当props变更的时候触发
    componentWillReceiveProps (nextProps){
        this.state.isShow = nextProps.isShow;
    }
}

export default Loading