import './fire.scss';
import React from 'react';
import { Link } from 'react-router';
import {
    URL,
    Container,
    Picker,
    CityPicker,
    LoanTypePicker,
    SetTitle,
    LI,
    LI_Radio,
    LI_Tips,
    List,
    Field,
    Icon,
    Grid,
    Col,
    SpecialModal
} from '../common.config';
import FireAction from './fireAction.js';
import FireStore from './fireStore.js';

class Botany extends React.Component {
    constructor(){
        super();
        this.state = {
            isRedbagModalOpen: false,
            tipsShow: false,
            tipsText: '',
            isCityPickOpen: false,
            isLoanTypePickOpen: false,
            company: 'select',
            owner: 'unselect',
            data: FireStore.getAll()
        }
    }

    _handleSubmit(){
        let loanType = FireStore.getAll().userType;

        let data = {
            registrant: this.refs.loanType.getValue(),
            amount: this.refs.amount.getValue(),
            illustrate: this.refs.illustrate.getValue(),
            remark: this.refs.remark.getValue()
        }
        if(loanType == 2){
            let companyUserTel = this.refs.companyUserTel.getValue();
            let companyUserName =this.refs.companyUserName.getValue();
            let companyName = this.refs.companyName.getValue();

            if (!companyName) {
                this.setState({
                    tipsShow: true,
                    tipsText: "公司全称不能为空"
                })
                return
            }

            if (companyName && companyName.length > 30){
                this.setState({
                    tipsShow: true,
                    tipsText: "公司全称过长"
                })
                return
            }

            if (!companyUserName) {
                this.setState({
                    tipsShow: true,
                    tipsText: "实际控制人姓名不能为空"
                })
                return
            }
            if (companyUserName && companyUserName.length > 10) {
                this.setState({
                    tipsShow: true,
                    tipsText: "实际控制人姓名过长"
                })
                return
            }

            if (!companyUserTel) {
                this.setState({
                    tipsShow: true,
                    tipsText: "实际控制人手机不能为空"
                })
                return
            }

            if (!(/1\d{10}$/i).test(companyUserTel)) {
                this.setState({
                    tipsShow: true,
                    tipsText: "实际控制人手机格式有误，请检查"
                })
                return
            }


            data.name = this.refs.companyUserName.getValue()
            data.companyName = this.refs.companyName.getValue()
            data.mobile = companyUserTel
            
        }else{
            let userMobile = this.refs.userMobile.getValue();
            let name = this.refs.userName.getValue();

            if (!name) {
                this.setState({
                    tipsShow: true,
                    tipsText: "姓名不能为空"
                })
                return
            }
            if (name && name.length > 10) {
                this.setState({
                    tipsShow: true,
                    tipsText: "姓名过长"
                })
                return
            }

            if (!userMobile) {
                this.setState({
                    tipsShow: true,
                    tipsText: "手机号码不能为空"
                })
                return
            }
            if (!(/1\d{10}$/i).test(userMobile)) {
                this.setState({
                    tipsShow: true,
                    tipsText: "手机号码格式有误，请检查"
                })
                return
            }

            data.name = name
            data.mobile = userMobile
        }
        
        FireAction.submitFireForm(data);
    }

    _handleSelectLoanType(){
        this.setState({
            isLoanTypePickOpen: true
        })
    }
    _handleLoanTypeSelected(LoanType){
        this.setState({
            isLoanTypePickOpen: false
        })
        FireAction.changeLoanTypeSelect(LoanType)
    }
    _handleLoanTypeCancel() {
        console.log('_handleLoanTypeCancel this state', this.state)
        this.setState({
            isLoanTypePickOpen: false
        })
    }

    _handleSelectCity(){
        this.setState({
            isCityPickOpen: true
        })
    }
    _handleCitySelected(province, city){
        this.setState({
            isCityPickOpen: false
        })
        FireAction.changeCitySelect(province, city)
    }
    _handleCityCancel() {
        console.log('_handleCityCancel this state', this.state)
        this.setState({
            isCityPickOpen: false
        })
    }

    _handleRadioSelected(type){
        FireAction.changeRadioSelected(type)
    }

    _handleRadioUnSelect(type) {
        FireAction.changeRadioUnSelect(type)
    }

    _handleTipsHide(){
        this.setState({
            tipsShow: false
        })
    }

    render() {
        let screenWidth = LI.screenWidth();
        let { 
            userType, 
            selectShow, 
            selectText,
            loanTypeText,
            company,
            owner
        } = this.state.data;

        let {
            tipsText,
            tipsShow,
            isRedbagModalOpen
        } = this.state;

        return(
            <div className="component-botany-fire">
                <img className="el-title-text" src={require("../../img/botany/fire-text.jpg")}/>
                
                <div className="m-article">
                    <div className="el-article">
                        <img className="el-title-img" src={require("../../img/botany/dengji.png")} />
                        <div className="el-solid">
                            <div className="el-solid-xl"></div>
                            <div className="el-solid-l"></div>
                        </div>

                        <div className="li-row">
                            <div
                                className="li-col-33 label-title-special"
                            >
                            *借款人：
                            </div>
                            <div
                                className="li-col-33"
                            >
                                <LI_Radio
                                    type="fire"
                                    text="公司"
                                    status={company}
                                    unselect={this._handleRadioUnSelect.bind(this, 'company')}
                                    selected={this._handleRadioSelected.bind(this, 'company')}
                                />
                            </div>

                            <div
                                className="li-col-33"
                            >
                                <LI_Radio
                                    type="fire"
                                    text="个人"
                                    status={owner}
                                    unselect={this._handleRadioUnSelect.bind(this, 'owner')}
                                    selected={this._handleRadioSelected.bind(this, 'owner')}
                                />
                            </div>
                            
                        </div>

                        <List>
                            {
                                userType == 1 ?
                                <div className="">
                                    <List.Item
                                        key={1}
                                        nested="input"
                                    >
                                        <Field
                                            label="*姓名："
                                            containerClassName="special-input"
                                            type="text"
                                            ref="userName"
                                        />
                                    </List.Item>
                                    <List.Item
                                        key={2}
                                        nested="input"
                                    >
                                        <Field
                                            label="*手机号码："
                                            containerClassName="special-input"
                                            type="text"
                                            ref="userMobile"
                                            maxLength='11'
                                        />
                                    </List.Item>
                                </div>

                                :

                                <div className="">
                                    <List.Item
                                        key={21}
                                        nested="input"
                                    >
                                        <Field
                                            label="*公司全称："
                                            containerClassName="special-input"
                                            type="text"
                                            ref="companyName"
                                        />
                                    </List.Item>
                                    <List.Item
                                        key={22}
                                        nested="input"
                                    >
                                        <Field
                                            label="*实际控制人姓名："
                                            containerClassName="special-input-xl"
                                            type="text"
                                            ref="companyUserName"
                                        />
                                    </List.Item>
                                    <List.Item
                                        key={23}
                                        nested="input"
                                    >
                                        <Field
                                            label="*实际控制人手机："
                                            containerClassName="special-input-xl"
                                            type="text"
                                            ref="companyUserTel"
                                            maxLength='11'
                                        />
                                    </List.Item>
                                </div>
                            }

                            <List.Item
                                key={3}
                                nested="input"
                            >
                                <div className="el-area">
                                    <Field
                                        label="*所在地："
                                        containerClassName="special-input"
                                        type="text"
                                        onClick={this._handleSelectCity.bind(this)}
                                        value={selectText}
                                        readOnly
                                    />
                                </div>
                            </List.Item>

                            <List.Item
                                key={4}
                                nested="input"
                            >
                                <div className="el-money">
                                    
                                    <Field
                                        label="*您是："
                                        containerClassName="special-input"
                                        type="text"
                                        ref="loanType"
                                        onClick={this._handleSelectLoanType.bind(this)}
                                        value={loanTypeText}
                                        readOnly
                                    >
                                        
                                    </Field>
                                </div>
                            </List.Item>

                            <List.Item
                                key={6}
                                nested="input"
                            >
                                <div className="el-money">
                                    <Field
                                        labelBefore="*借款金额："
                                        containerClassName="special-input"
                                        type="text"
                                        labelAfter='元'
                                        ref="amount"
                                    />
                                </div>
                            </List.Item>
                        </List>

                        <div className="el-use">
                            <Field
                                label="借款用途："
                                type="textarea"
                                maxLength='100'
                                ref="illustrate"
                            />
                        </div>

                        <div className="el-better">
                            <Field
                                label="一句话描述您的优势："
                                placeholder="包括但不限于产品、厂家、作物、渠道等"
                                ref="remark"
                            />
                        </div>
                        <div className="el-submit-btn">
                            <img 
                                onClick={this._handleSubmit.bind(this)}
                                className="el-submit-img" 
                                src={require("../../img/botany/submit.png")} 
                            />
                        </div>
                    </div>
                </div>

                <img className="el-footer-img" src={require("../../img/botany/text-footer.jpg")} />

                <CityPicker
                    isOpen={this.state.isCityPickOpen}
                    onFinished={this._handleCitySelected.bind(this)}
                    onCancel={this._handleCityCancel.bind(this)}
                />

                <LoanTypePicker
                    isOpen={this.state.isLoanTypePickOpen}
                    onFinished={this._handleLoanTypeSelected.bind(this)}
                    onCancel={this._handleLoanTypeCancel.bind(this)}
                />
                            
                <SpecialModal
                    role="customize"
                    isOpen={isRedbagModalOpen}
                >
                    <div className="botany-success-modal">
                        <p className="title">恭喜您</p>
                        <p className="text">信息提交成功，您已获得百万金融评选资格，请于11.21在2017中国农业金融创新发展论坛进行业务洽谈，确认资格! 
                        <br /><br />
                        联系人：袁健 15397807988</p>

                        <div className="footer">
                            <Link
                                className="btn-img"
                                to={'/BotanyIndex'}>
                            </Link>
                        </div>
                        
                    </div>
                </SpecialModal>

                <LI_Tips
                    text={tipsText}
                    isShow={tipsShow}
                    callback={this._handleTipsHide.bind(this)}
                    time={3000}
                    top={20}
                />
            </div>
        )
    }

    componentWillMount() {
        window.scrollTo(0, 0)
    }
    
    componentDidMount(){
        SetTitle('星星之火-百万金融评选预登记');

        FireStore.bind("change", function () {
            this.setState({
                data: FireStore.getAll()
            })
            console.log('change', this.state)
        }.bind(this));

        FireStore.bind("changeTipsStatus", function (status, msgContent) {
            console.log('changeTipsStatus status', status)
            console.log('changeTipsStatus msgContent', msgContent)
            this.setState({
                tipsShow: status,
                tipsText: msgContent
            })
            console.log('changeTipsStatus', this.state)
        }.bind(this));

        FireStore.bind("changeModalStatus", function () {
            this.setState({
                isRedbagModalOpen: true
            })
            console.log('changeModalStatus', this.state)
        }.bind(this));
        
    }

    componentWillUnmount() {
        FireStore.clearAll();
    }
}

module.exports = Botany