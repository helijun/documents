import React from 'react';
import { Link } from 'react-router';
import {
    URL,
    Container,
    SetTitle,
    LI
} from '../common.config';

import './two.scss';

class Botany extends React.Component {
    constructor() {
        super();
    }

    render() {
        let screenWidth = LI.screenWidth();
        let headerHeight = 464 * screenWidth / 750 + 'px';
        let articleHeight = 2100 * screenWidth / 750 + 'px';
        let footerHeight = 233 * screenWidth / 750 + 'px';

        return (
            <Container className="component-botany-two">
                <div
                    className="m-header"
                    style={{ height: headerHeight }}
                >

                </div>
                <div
                    className="m-article"
                >
                    <div
                        className="el-article"
                    >
                        <img src={require("../../img/botany/title2.png")} />
                        <div className="el-solid">
                            <div className="el-solid-xl"></div>
                            <div className="el-solid-l"></div>
                        </div>
                        <Container className="el-text">
                            <p>波涛蓄势，起于深海。农村，是一片热土，96年前，中华民族伟大复兴的光明前景从这里起步。观察近年来的三农图景，改革是其中最为鲜明的标识。教育、医疗、金融……谁能打响新农村改革的第一枪？</p>

                            <p>在金融服务农业产业的实践中，国家频频释放的政策利好已经成为农村金融的一剂强心针，而农泰金融的“定制”化产业链服务无疑成为行业的一个亮点与刚需。</p>

                            <p>农泰金融以土地为载体，从农资生产供应环节切入，以金融服务将各个节点有机串联，整合形成
                                
                            <strong>“互联网+金融＋农资、植保、土地、收购、消费、理财、支付”</strong>
                            的一站式服务，增强产品粘性，最终目的是
                            <strong>为农产品创造更好的生长环境和销售渠道，为农民提高收入，从而实现在金融服务参与下的全产业链共赢。</strong>
                            </p>

                            <p>从投资人资金安全角度来说，依托于农泰金融实力雄厚的合作伙伴，辐射到下游经销商、零售店、种植户乃至农户，进行产业链闭环的服务，服务的过程中也加强了风险控制，

                            <strong>从源头上确保了投资人的权益。</strong>
                            </p>

                            <p>重农固本，安民之基。随着乡村振兴战略的实施，农村改革迎来了全新的使命，农泰人必将付出更多的智慧和努力，砥砺奋进、勠力同心，让乡村成为圆梦的地方。</p>
                        </Container>
                    </div>
                </div>
                <div
                    className="m-footer"
                    style={{ height: footerHeight }}
                >

                </div>
            </Container>
        )
    }

    componentWillMount() {
        window.scrollTo(0, 0)
        SetTitle('打响第一枪-全产业链金融模式')
    }

    componentDidMount() {
        
    }
}

module.exports = Botany