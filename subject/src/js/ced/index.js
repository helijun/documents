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

class Ced extends React.Component {
    constructor(){
        super();
    }

    _handleBuy(event) {
        if (LI.screenWidth() > 750) {//pc端
            window.location.href = 'https://www.ntjrchina.com/front/investmentList.html?type=ced';
            return;
        }
        try {
            var u = navigator.userAgent,
                isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;

            var json = {};

            if (isIOS) {
                json.type = "ced";
                window.webkit.messageHandlers.callApp.postMessage(JSON.stringify(json));//WKWebView
            } else if (isAndroid) {
                json.type = "ced";
                window.webView.callApp(JSON.stringify(json))
            }
        } catch (e) {
            var ua = window.navigator.userAgent.toLowerCase(),
                isWechat = ua.match(/MicroMessenger/i) == 'micromessenger';

            if (isWechat) {
                window.location.href = 'https://www.ntjrchina.com/weixin/#/productList';
            } else {
                alert('调起失败');//没有更新版本
            }
        }
    }

    render() {
        return(
            <div className="component-ced-index">
                <div className="module-banner">
                    <img className="li-full-img mobile-hide" src={require("../../img/ced/banner.jpg")} />
                    <img className="li-full-img pc-hide" src={require("../../img/ced/banner-mobile.jpg")} />
                </div>

                <div className="module-ced-introduce mobile-hide">
                    <p>车e贷是饭米粒理财推出的一款车辆抵押类网贷产品。车e贷产品是基于汽车金融的二手车抵押业务，借款者将车辆进行抵押融资，饭米粒理财平台风控人员严格审查，并且每一个项目均由第三方承担连带责任担保，资金全程由平安银行存管，多重保障投资人资金安全。饭米粒理财首次引进等额本息的还款方式，部分车e贷项目使用24期的等额本息方式回款，流动性、安全性更高。</p>
                </div>
                <div className="module-ced-mobile pc-hide">
                    <img src={require("../../img/ced/ced-introduce-mobile.png")} />
                </div>

                <div className="module-ced-feature mobile-hide">
                    <img src="li-full-img" src={require("../../img/ced/feature.png")} />
                </div>
                <div className="module-ced-mobile module-ced-feature-mobile pc-hide">
                    <img src="li-full-img" src={require("../../img/ced/feature-mobile.png")} />
                </div>
                 
                <div className="module-ced-what mobile-hide">
                    <div className="el-ced-what">
                        <p className="el-title">
                            等额本息回款方式是用户每月收到同等数额的回款（本金+利息）
                        </p>
                        <div
                            className="li-row li-item-center li-align-center"
                        >
                            <div className="li-col-33">
                                <p className="el-sub-title">
                                    资金流动性高
                                </p>
                                <p className="el-content">
                                    每月归还一次本金与利息<br/>
                                    投资人能获得充分的流动资金
                                </p>
                            </div>
                            <div className="li-col-33">
                                <p className="el-sub-title">
                                    投资收益最大化
                                </p>
                                <p className="el-content">
                                    把回收的本息进行复投<br />
                                    综合收益将有很大的提高
                                </p>
                            </div>
                            <div className="li-col-33">
                                <p className="el-sub-title">
                                    投资风险低
                                </p>
                                <p className="el-content">
                                    每月都有部分本金和利息回款<br />
                                    极大保证投资人的收益和本金<br />
                                    大大降低投资风险
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="module-ced-how">
                    <div className="el-ced-how">
                        <img className="li-auto-img" src={require("../../img/ced/how.png")} />
                        <img className="li-auto-img" src={require("../../img/ced/equation.png")} />

                        <p className="table-title">
                            举个栗子
                        </p>
                        <p className="table-sub-title">
                            小王投资了10000元的车e贷，年化利率为9.8%，期限12个月，采用等额本息的还款方式，每月可拿到回款约878.23元。
                        </p>

                        <table className="el-table">
                            <thead>
                                <tr>
                                    <td>
                                        预期回款时间
                                    </td>
                                    <td>
                                        回款本金
                                    </td>
                                    <td>
                                        回款利息
                                    </td>
                                    <td>
                                        回款总额
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        2018-1-8
                                    </td>
                                    <td>
                                        796.56
                                    </td>
                                    <td>
                                        81.67
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2018-2-8
                                    </td>
                                    <td>
                                        803.07
                                    </td>
                                    <td>
                                        75.16
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2018-3-8
                                    </td>
                                    <td>
                                        809.63
                                    </td>
                                    <td>
                                        68.60
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2018-4-8
                                    </td>
                                    <td>
                                        816.24
                                    </td>
                                    <td>
                                        61.99
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2018-5-8
                                    </td>
                                    <td>
                                        822.90
                                    </td>
                                    <td>
                                        55.33
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2018-6-8
                                    </td>
                                    <td>
                                        829.62
                                    </td>
                                    <td>
                                        48.60
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2018-7-8
                                    </td>
                                    <td>
                                        836.40
                                    </td>
                                    <td>
                                        41.83
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        2018-8-8
                                    </td>
                                    <td>
                                        843.23
                                    </td>
                                    <td>
                                        35.00
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2018-9-8
                                    </td>
                                    <td>
                                        850.12
                                    </td>
                                    <td>
                                        28.11
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>
                                
                                <tr>
                                    <td>
                                        2018-10-8
                                    </td>
                                    <td>
                                        857.06
                                    </td>
                                    <td>
                                        21.17
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2018-11-8
                                    </td>
                                    <td>
                                        864.06
                                    </td>
                                    <td>
                                        14.17
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        2018-12-8
                                    </td>
                                    <td>
                                        871.11
                                    </td>
                                    <td>
                                        7.11
                                    </td>
                                    <td>
                                        878.23
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="module-footer">
                    <div className="module-ced-suitable mobile-hide">
                        <div className="el-ced-suitable">
                            <div
                                className="li-row li-item-center li-align-center"
                            >
                                <div className="li-col-50">
                                    <img src="li-full-img" src={require("../../img/ced/lb.png")} />
                                    <p className="el-content">
                                        <span>创业老板、中高层人群</span><br />
                                        理财高手、实力雄厚、土豪任性
                                </p>
                                </div>
                                <div className="li-col-50">
                                    <img src="li-full-img" src={require("../../img/ced/bl.png")} />
                                    <p className="el-content">
                                        <span>白领、学生族</span><br />
                                        精打细算、月光族、剁手党
                                </p>
                                </div>
                                <div className="li-col-100">
                                    <img src="li-full-img" src={require("../../img/ced/fn.png")} />
                                    <p className="el-content">
                                        <span>房奴</span><br />
                                        假如你有闲置资金准备用于还房贷<br />不如投到车e贷，每月可拿部分本金<br />和高收益用于还贷
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="module-ced-suitable-mobile pc-hide">
                        <img src="li-full-img" src={require("../../img/ced/suitable-mobile.png")} />
                    </div>

                    <div className="module-buy">
                        <div className="el-buy">
                            <p className="el-title">正确玩转等额本息回款方式，你学会了吗？</p>
                            <a 
                                className="el-goto-buy" 
                                onClick={this._handleBuy.bind(this)}
                            >立即投资</a>
                            <p className="el-tips">市场有风险 投资需谨慎</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        SetTitle('车e贷震撼来袭')
    }
}

module.exports = Ced