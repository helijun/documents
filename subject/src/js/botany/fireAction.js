import {
    appDispatcher
}  from '../common.config';

const FireAction = {
	changeLoanTypeSelect(LoanType) {
		appDispatcher.dispatch({
			actionName: "changeLoanTypeSelectBotanyFire",
			data: {
				LoanType: LoanType
			}
		})
	},
	changeCitySelect(province, city){
		appDispatcher.dispatch({
			actionName: "changeCitySelectBotanyFire",
			data: {
				province: province,
				city: city
			}
		})
	},

	changeRadioSelected(type){
		appDispatcher.dispatch({
			actionName: "changeSelectedBotanyFire",
			data: {
				type: type
			}
		})
	},
	changeRadioUnSelect(type) {
		appDispatcher.dispatch({
			actionName: "changeUnselectBotanyFire",
			data: {
				type: type
			}
		})
	},
	submitFireForm(data) {
		appDispatcher.dispatch({
			actionName: "submitFormBotanyFire",
			data: {
				data: data
			}
		})
	}
}

export default FireAction;