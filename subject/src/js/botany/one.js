import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import {
    URL,
    Container,
    SetTitle,
    LI
} from '../common.config';

import './one.scss';

class BotanyOne extends React.Component {
    render() {
        let screenWidth = LI.screenWidth();
        let headerHeight = 464 * screenWidth / 750 + 'px';
        let articleHeight = 2100 * screenWidth / 750 + 'px';
        let footerHeight = 233 * screenWidth / 750 + 'px';

        return (
            <Container className="component-botany-one">
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
                        <img src={require("../../img/botany/title.png")} />
                        <div className="el-solid">
                            <div className="el-solid-xl"></div>
                            <div className="el-solid-l"></div>
                        </div>
                        <Container className="el-text">
                            <p>
                                1927<br />
                                是一个颠覆者的时代<br />
                                东方传来雄狮残喘的怒吼<br />
                                一声枪响刺破沉闷的夜空<br />
                                他们拿起枪支弹药<br />
                                探寻革命的真理<br />
                            </p>

                            <p>
                                2017<br />
                                也是一个颠覆者的时代<br />
                                新技术如猛虎一般带来商业变革<br />
                                一场潮流席卷神州大地<br />
                                我们穿上农业的灵魂<br />
                                领悟金融创新的生命<br />
                            </p>

                            <p>
                                时代在变，初心不变<br />
                                720天<br />
                                我们从未忘记出发的理由<br />
                                每一株旺盛的作物<br />
                                每一张淳朴的笑脸<br />
                                都是途中最动人的风景<br />
                            </p>

                            <p>
                                时代的巨轮滚滚向前<br />
                                黎明的曙光<br />
                                已经铺开我们前进的道路<br />
                                <strong>2017年11月21日</strong><br />
                                <strong>江西南昌</strong><br />
                                <strong>农泰金融饭米粒理财平台全新升级</strong><br />
                            </p>

                            <p>
                                那个时代已经过去<br />
                                我们的时代，开场了！<br />
                            </p>
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
        SetTitle('黎明曙光-你好，我是饭米粒');
    }

    componentDidMount() {
        
    }
}

module.exports = BotanyOne