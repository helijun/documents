var changePwd={
    init:function(){
        changePwd.bind();
    },
    options:{
        wait:60,
        canGetVerifyCode:true,
        pwd: /^(?![^a-zA-Z]+$)(?!\\D+$).{6,20}$/,
    },
    getverificationCode: function(mobile){
        $.ajax({
            data: {mobile:mobile,type:2},
            type : "GET",
            url : WX_ROOT + "wechat/sendMessage",
            beforeSend : function(){

            },
            success : function(json) {

                var data = JSON.parse(json);
                if (data.type == '600'){
                    common.tips({msg:'发送' + data.msg});
                    changePwd.time()
                }
                else{
                    common.tips({msg: data.msg});
                }
            }
        });
    },
    time:function () {
        var o=$(".getCodeBtn2 ")
        if (changePwd.options.wait == 0) {
            changePwd.options.canGetVerifyCode=true;
            o.text("获取验证码");
            changePwd.options.wait = 60;
        } else {
            changePwd.options.canGetVerifyCode=false;
            console.log(changePwd.options.wait)
            o.text("重新发送(" + changePwd.options.wait + ")s");
            changePwd.options.wait--;
            setTimeout(function() {
                changePwd.time()
            },1000)
        }
    },
    
    changePwdFun:function(mobile,code,newPwd){
        $.ajax({
            data: {mobile:mobile,random:code,password:newPwd},
            type : "POST",
            url : WX_ROOT + 'usercenter/updatePwd',
            beforeSend : function(){
                common.alert({msg:'请稍后..',stayTime:-1});
            },
            success : function(json) {
                var data=JSON.parse(json.data)
                common.alert('hide');
                if(data.msgCode==600){
                    common.tips({
                        msg:'密码已修改，请重新登录',
                        stayTime: 3000,
                        callback:function(){
                            window.location.href = WX_ROOT + "base/login";
                        }
                    });
                }else{
                    common.tips({msg:data.message});
                }
            }
        });
    },
    bind:function(){
    	
    	var userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            var userInfoData = JSON.parse(userInfo);
            $('.telInput').val(userInfoData.mobile);
        }
    	
    	
    	/** 直接登录 **/
        $('.toLoginBtn').on('tap',function(){
            window.location.href = WX_ROOT + "base/login?shareId=" + common.getUrlParameter('shareId') + "&inviteId=" + common.getUrlParameter('inviteId')+ "&redirect_url=" + WX_ROOT + "carInsurance/index";
        })

        /** 发送验证码 **/
        $('.getCodeBtn2').on('tap',function(){
            var userInfo = localStorage.getItem('userInfo');
            if(changePwd.options.canGetVerifyCode){
            	var mobile = $('.telInput').val();
                changePwd.getverificationCode(mobile);
            }
        })
        
        $('#changePwd').on('tap',function(){
            var code=$('.verifyInput').val();
            var newPwd=$('.passwordInput').val();
            var NonPwd=false;
            if(changePwd.options.pwd.test(newPwd)){
                NonPwd=true;
            }
            
            if(NonPwd){
                    //try {
                        var mobile = $('.telInput').val();
                        changePwd.changePwdFun(mobile,code,newPwd)
                    //} catch (e) {
                    //    common.showId($('.ensureAlertSection'))
                    //}
            }else{
                common.tips({msg:'密码格式为6-16位的字母与数字的组合'});
            }
        })
    }
}
$(document).ready(function() {
    
    console.log(localStorage.getItem('forgetPwd'))
    if(1==localStorage.getItem('forgetPwd')){
        $('.headerSpan').text('找回密码')
    }else{
        $('.toLoginBtn').addClass('dis_none')
    }
    var mobile = localStorage.getItem('mobile');
    if (mobile) {
        $('.telInput').text(mobile)
    }
    
    changePwd.init();
});