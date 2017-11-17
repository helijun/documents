import {
    Event,
    appDispatcher,
    URL,
    LI
}  from '../common.config';
import { hashHistory } from 'react-router'

const initialState = {
    selectShow: false,//是否显示选择的城市options
    selectText: '',//城市显示文字
    loanTypeText: '',//经销商类型显示文字
    province: '',
    city: '',
    userType: 2,//公司
    company: 'select',
    owner: 'unselect'
};

const FireStore = {
    _state: {
        selectShow: false,//是否显示选择的城市options
        selectText: '',//城市显示文字
        loanTypeText: '',//经销商类型显示文字
        province: '',
        city: '',
        userType: 2,//公司
        company: 'select',
        owner: 'unselect'
    },
	getAll(){
        return this._state;
    },
    updateAll(source){
        Object.assign(this._state,source);
    },
    clearAll(){
        this._state = {
            selectShow: false,//是否显示选择的城市options
            selectText: '',//城市显示文字
            loanTypeText: '',//经销商类型显示文字
            province: '',
            city: '',
            userType: 2,//公司
            company: 'select',
            owner: 'unselect'
        }
    }
};
Event.mixin(FireStore);

appDispatcher.register(function(payload){
    let data = FireStore.getAll();
	switch(payload.actionName){
        case 'submitFormBotanyFire': 
            let data = payload.data.data;

            data.loanType = FireStore.getAll().userType
            data.city = FireStore.getAll().city
            data.province = FireStore.getAll().province

            const LoanTypeArr = [
                {
                    '经销商': 0,
                },
                {
                    '零售商': 1,
                },
                {
                    '厂家': 2,
                },
                {
                    '农户': 3,
                },
                {
                    '其他': 4,
                },
            ];

            LoanTypeArr.forEach((v) => {
                if (v['经销商']){
                    data.registrant = v['经销商'];
                }
            })

            LI.ajax({
                url: URL.AJAX + '/mxr/add.do',
                type: 'POST',
                data: data,
                before:  (params) => {
                    FireStore.trigger('changeTipsStatus', true, '提交中，请稍后..')
                },
                success: (data) => {
                    console.log(data.success)
                    if (data.success){
                        FireStore.trigger('changeTipsStatus', false)
                        FireStore.trigger('changeModalStatus')
                    }else{
                        FireStore.trigger('changeTipsStatus', true, data.msgContent)
                    }
                },
                error: () => {
                    FireStore.trigger('changeTipsStatus', true, '出错了，请重试..')
                }
            })
            
            break;
        case 'changeLoanTypeSelectBotanyFire':
            let LoanType = payload.data.LoanType;
            console.log('LoanType', LoanType)
            FireStore.updateAll({
                loanTypeText: LoanType
            })
            FireStore.trigger('change')
            break;    
        case 'changeCitySelectBotanyFire':
            let province = payload.data.province;
            let city = payload.data.city;
            FireStore.updateAll({
                selectText: province + city,
                province: province,
                city: city
            })
            FireStore.trigger('change')
            break;
        case 'changeSelectedBotanyFire': 
            console.log('1', payload.data.type == 'company')
            if (payload.data.type == 'company') {
                FireStore.updateAll({
                    company: 'select',
                    owner: 'unselect',
                    userType: 2,
                })
            } else {
                FireStore.updateAll({
                    company: 'unselect',
                    owner: 'select',
                    userType: 1,
                })
            }
            FireStore.trigger('change')
            break;
        case 'changeUnselectBotanyFire':
            console.log('2', payload.data.type == 'company')
            if (payload.data.type == 'company') {
                FireStore.updateAll({
                    company: 'unselect',
                    owner: 'select',
                    userType: 1,
                })
            }else{
                FireStore.updateAll({
                    company: 'select',
                    owner: 'unselect',
                    userType: 2,
                })
            }
            FireStore.trigger('change')
            break;
	}
})
export default FireStore;