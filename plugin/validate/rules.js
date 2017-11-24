/**
 * js表单验证正则常量
 * 
 * @author helijun
 * 
 * date 2016-08-29 
 */
var rule = {
	//正则表达式
	reg:{
		Chinese:/^[\u2E80-\u9FFF]+$/,
		mobile:/^[1-9]\d{10}$/,
		number:/\d+/,
		email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
	},
	//提示信息
	msg:{
		require:'必须填写',
		Chinese:'必须是中文',
		mobile:'手机号不正确',
		email:'邮箱格式不正确'
	}
}



