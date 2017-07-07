var receiveAddress = {
    init: function(){
    	receiveAddress.registerHelper();
    	var token = localStorage.getItem("token");
    	if (token) receiveAddress.getUserAddress(token);
		
    	receiveAddress.bind();
    },
    registerHelper: function() {
		Handlebars.registerHelper('isDefault', function(value) {
			if(1 == value)
				return 'color-red'
			else
				return 'color-white'
		});
	},
    getUserAddress: function(token){
    	$.ajax({
            async: false,
            data: {token:token,flag:1},
            type : "GET",
            url : WX_ROOT + "usercenter/userAddress",
            beforeSend : function(){
                common.alert({'stayTime':-1});
            },
            success : function(json) {
            	if (json) {
            		sessionStorage.setItem('userAddress', json);
					console.log('userAddress',json)
            		var data = JSON.parse(json);
            		if (600 == data.msgCode) {
                        console.log(data.detail.length)
                        if (data.detail && data.detail.length > 0) {
                        	var tabTemplate = Handlebars.compile($('#listDiv').html());
                            $('.contentDiv').html(tabTemplate(data.detail));
						}else{
							$('.contentDiv').text('亲暂时还没有收货地址哦，请点击右上角添加一个吧！').addClass('no-add-data')
						}
					}else if(610 == data.msgCode){
						common.tips({
	                        msg:'身份验证过期，请重新登录！',
	                        updateText: true,
	                        stayTime: 2000,
	                        callback:function(){
	                        	localStorage.setItem('toRegistPage',window.location.href);
	                        	window.location.href = WX_ROOT + 'base/login'
	                        }
	                    })
					}
				}
                common.alert({show:false});
            }
        });
    },
    
    deleteAddress: function(token,id){
    	$.ajax({
            data: {token:token,flag:2,setType:3,id:id},
            type : "POST",
            url : WX_ROOT + "usercenter/userAddress",
            success : function(json) {
            	$('#address-panel'+id).addClass('dis_none');
				common.tips({msg:'删除成功'})
				common.close($('.delSection'))
            }
        });
    },
    options: {
        
    },
    bind: function(){
    	
    	$('.addSpan').on('touchend',function(){
    		sessionStorage.setItem('updateUserFlag',5);
            window.location.href= WX_ROOT + 'usercenter/perfectPersonalData'
        })

        $('.delete').on('touchend',function(e){
			common.showId($('.delSection'))
			$('.delSection').attr('data-id',$(e.currentTarget).attr('data-id'))
        	e.stopPropagation();
        	e.preventDefault();

        })
		$('.cancelDelBtn').on('touchend',function(){
			common.close($('.delSection'))
		})
		$('.ensureDelBtn').on('touchend',function(){
			var token = localStorage.getItem("token"),
				id = $('.delSection').attr('data-id')
			if (token) receiveAddress.deleteAddress(token,id);
		})

        $('.edit').on('touchend',function(e){
        	e.stopPropagation();
        	e.preventDefault();
        	
        	var data = JSON.parse(sessionStorage.getItem('userAddress')),
        		currentId = $(e.currentTarget).attr('data-id');
        	
        	sessionStorage.setItem('updateUserFlag',5);
        	$(data.detail).each(function(k,v){
        		if (currentId == v.id) localStorage.setItem('editData', JSON.stringify(v));
        	})
        	
            window.location.href= WX_ROOT + 'usercenter/perfectPersonalData'
        })
        
        $('.address-panel').on('tap',function(e){
        	var currentId = $(e.currentTarget).attr('data-addressId');
        	
    		localStorage.setItem("addressId",currentId);
    		
    		var data = JSON.parse(sessionStorage.getItem('userAddress'));
	    	$(data.detail).each(function(k,v){
	    		if (currentId == v.id) sessionStorage.setItem('selectedAddress', JSON.stringify(v));
	    	})
	    	
    		var toAdressPage = sessionStorage.getItem('toAdressPage');
    		if (toAdressPage) window.location.href = toAdressPage;
        })
    }
}

$(document).ready(function() { 
	receiveAddress.init();
});
