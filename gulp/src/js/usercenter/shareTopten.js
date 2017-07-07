var share={
	init: function(){
		share.registerHelper()
		share.getList();
		share.bind();
	},
	registerHelper: function() {
		Handlebars.registerHelper('rank', function(value) {
			this._index = value + 1;
			return this._index;
		});
		Handlebars.registerHelper('nickname', function (value, options) {
			if(''==value||null==value){
				return '--'
			}else{
				return value;
			}
		});
		Handlebars.registerHelper('headImg', function (value, options) {
			if(''==value||null==value){
				return WX_STATIC + 'img/logo.png'
			}else{
				return value;
			}
		});
	},
	getList:function(){
		$.ajax({
			type : "GET",
			url : WX_ROOT + "usercenter/queryUserInviteList",
			beforeSend : function(){
				common.alert({'stayTime':-1});
			},
			success : function(json) {
				if (json) {
					var data = JSON.parse(json);
					var tabTemplate = Handlebars.compile($('#list-top-ten').html());
					$('.listDataDiv').html(tabTemplate(data));
					
					for(var i=0;i<$('.singleDiv').length;i++){
						var id=$('.singleDiv').eq(i).attr('data-index')
						if(1==id||4==id||15==id){
							$('.singleDiv').eq(i).css('border-bottom','1px solid #ccc')
						}
					}
				}else{
					common.tips({'msg':'暂无数据'});
				}
				
				common.alert({show:false});
			}
		});
	},
	bind:function(){

		$('.prizeSection .morLayerDiv').off().on('tap',function(){
			common.close($('.prizeSection'));
		})

		$('.closeBtn').off().on('tap',function(){
			common.close($('.cheatSection'))
		})
		//$('.tipsDiv').off().on('tap',function(){
		//	common.showId($('.cheatSection'))
		//	common.close($('.prizeSection'));
		//})
		$('.listDataDiv').off().on('tap','.singleDiv',function(){
			common.showId($('.prizeSection'));
			var index = $(this).attr('data-index');
			if (index == 1) {
				$('.prizeSection .morLayerDiv').append('<img class="tipsImg" src='+ WX_STATIC + 'img/shareNum1.jpg>');
			}else if(index > 1 && index <= 4){
				$('.prizeSection .morLayerDiv').append('<img class="tipsImg" src='+ WX_STATIC + 'img/shareNum2.jpg>');
			}else{
				$('.prizeSection .morLayerDiv').append('<img class="tipsImg" src='+ WX_STATIC + 'img/shareNum3.jpg>');
			}
		})
	}
}

$(document).ready(function() { 
	var CLEAR_FLAG = localStorage.getItem(CLEAR_FLAG_KEY),//全新的清空策略
		mobile = localStorage.getItem('mobile'),
		userInfo = localStorage.getItem('userInfo'),
		dataTime = new Date(ENV_DATE).getTime();
	if (userInfo && !CLEAR_FLAG) {
		localStorage.clear();
	    sessionStorage.clear();
	    
	    if(mobile) localStorage.setItem('mobile', mobile);//保留手机号
	    
	    var stateMobile = common.getUrlParameter('state');
        if (stateMobile) {
            //将推荐人手机号码写到本地
            localStorage.setItem('inviteMobile',stateMobile);
        }
        
	    localStorage.setItem(CLEAR_FLAG_KEY, dataTime);
	    localStorage.setItem('userInfo', 'testUser');//暂定
	    
	    /*common.tips({
	        msg:'亲爱的天使客户，本次车险活动即将于7.18正式开始，此前的内测信息已清空，烦请重新注册！',
	        stayTime:4000,
	        callback:function(){
	            window.location.href= WX_ROOT + 'regist'
	        }
	    })*/
	    share.init();
	}else{
		localStorage.setItem(CLEAR_FLAG_KEY, dataTime);
		share.init();
	}
	//common.appendNav()
	//$('.ic-xj').css('background-position','-263px 0')
	//$('.sortA').addClass('currentNav')
	//$('.sortA').attr('href','')
});
