var center = {
    init: function(){
        center.bind();
        center.getUserInfo();
    },
    getUserInfo: function(){
        /** 取用户信息 **/
        try {
            var data = JSON.parse(localStorage.getItem('userInfo'));
            if (data.realName) {
                $('#userName').html(data.realName);
            }else if(data.userName){
                $('#userName').html(data.username);
            }

            $('#emailName').html(data.email);
            $('#headerImg').attr('src',data.image || '');
            $('#userMobile').html(data.mobile);

            $('.sexSeclect').val(data.sex);
            $('.certificateSeclect').val(data.idCardType);

            $('.addressInput').html(data.address);
            $('#idCard').html(data.idCard);

        } catch (e) {
            common.tips({
                msg:'没有登录！',
                callback:function(){
                    window.location.href= WX_ROOT + 'base/login'
                }
            });
        }
    },
    options: {
        height:window.innerHeight-458
    },

    bind: function(){
        $('.insuranceDiv').css('height',center.options.height)

        /** 修改密码 **/
        $('.changePwd').on('tap',function(){
            localStorage.setItem('forgetPwd',0)
            window.location.href= WX_ROOT + 'usercenter/changePwd'
        })

        /** 修改地址 **/
        $('.address').on('tap',function(){
            window.location.href= WX_ROOT + 'usercenter/receiveAddress'
        })

        /** 修改姓名 **/
        $('#userNameDiv').on('tap',function(){
            window.location.href= WX_ROOT + 'usercenter/perfectPersonalData'
            sessionStorage.setItem('updateUserFlag', 2);
        })

        /** 修改邮箱 **/
        $('#emailDiv').on('tap',function(){
            window.location.href= WX_ROOT + 'usercenter/perfectPersonalData'
            sessionStorage.setItem('updateUserFlag', 3);
        })

        /** 修改证件号码 **/
        $('#idcardNumber').on('tap',function(){
            window.location.href= WX_ROOT + 'usercenter/perfectPersonalData'
            sessionStorage.setItem('updateUserFlag', 4);
        })

        var token = localStorage.getItem("token");

        //修改性别
        $('.sexSeclect').on('change',function(){
            var sex = $(this).val();

            $.ajax({
                data: {sex:sex,token:token,flag:5},
                type : "post",
                url : WX_ROOT + "usercenter/updateUserInfo",
                success : function(json) {
                    common.tips({
                        msg:'修改成功',
                        callback:function(){
                            common.queryUserByToken(token);//更新用户信息
                        }
                    })
                }
            });
        })

        /** 注销登录 **/
        $('.logout').on('tap',function(){
            $.ajax({
                data: {token:token},
                type : "post",
                url : WX_ROOT + "wechat/doLogout",
                success : function(json) {
                    if (json) {
                        var data = JSON.parse(json.data).msgCode
                        if (600 == data) {
                            common.tips({
                                msg:'注销成功',
                                callback:function(){
                                    var mobile = localStorage.getItem('mobile');
                                    localStorage.clear();
                                    sessionStorage.clear();

                                    localStorage.setItem(CLEAR_FLAG_KEY, new Date(ENV_DATE).getTime());
                                    if(mobile) localStorage.setItem('mobile', mobile);//保留手机号
                                    
                                    //localStorage.setItem('userInfo', 'testUser');//暂定
                                    window.location.href= WX_ROOT + 'base/login'
                                }
                            })
                        }
                    }
                }
            });
        })
    }
}

$(document).ready(function() {
    center.init();
});
