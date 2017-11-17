import React from 'react';
import { Link } from 'react-router';
import {
    URL,
    Container,
    LI,
    SetTitle,
    SlideMask
} from '../common.config';
import './index.scss';

class Botany extends React.Component {
    constructor(){
        super();
        this.state = {
            isMaskOpen: false
        };
    }

    _handleOpenMask(event) {
        this.setState({
            isMaskOpen: true
        })
    }

    render() {
        let screenWidth = LI.screenWidth();
        let flowImgHeight = 955 * screenWidth / 750;
        let footImgHeight = 872 * screenWidth / 750 + 'px';
        let gameLink = 'https://hd.faisco.cn/13564198/9swl6pEaZ3azUt8_C3HkMQ/load.html?style=14';
        return(
            <div className="component-botany-index">
                <img src={require("../../img/botany/index-banner-gif.gif")}/>
                <img src={require("../../img/botany/index-text.jpg")} />
                
                <div className="m-flow" style={{ height: flowImgHeight + 'px'}}>
                    <div className="el-flow-bg" style={{ height: flowImgHeight + 'px' }}>
                        <Link 
                            style={{ height: flowImgHeight * 0.12 + 'px' }} 
                            to={'/BotanyOne'}>
                            <img className="el-guide el-guide1" src={require("../../img/botany/hand.png")} />
                        </Link>

                        <Link 
                            style={{ 'marginTop': flowImgHeight * 0.2 + 'px', height: flowImgHeight * 0.2 + 'px' }}
                            to={'/BotanyTwo'}>
                            <img className="el-guide el-guide2" src={require("../../img/botany/hand.png")} />
                        </Link>

                        <Link 
                            style={{ height: flowImgHeight * 0.2 + 'px' }}
                            to={'/BotanyFire'}>
                            <img className="el-guide el-guide3" src={require("../../img/botany/hand.png")} />
                        </Link>
                        
                        <Link 
                            style={{ 'marginTop': flowImgHeight * 0.08 + 'px', height: flowImgHeight * 0.2 + 'px' }}
                            href={gameLink}>
                            <img className="el-guide el-guide4" src={require("../../img/botany/hand.png")} />
                        </Link>
                    </div>
                </div>
                <div className="m-footer" style={{ height: footImgHeight }}>
                    <div 
                        className="el-footer-btn"
                        onClick={this._handleOpenMask.bind(this)}
                    ></div>
                </div>

                <SlideMask 
                    isMaskOpen={this.state.isMaskOpen}
                >
                    <img className="share-guide" src={require("../../img/common/share-guide.png")} />
                </SlideMask>
            </div>
        )
    }

    componentDidMount() {
        SetTitle('农泰金融')
    }
}

module.exports = Botany