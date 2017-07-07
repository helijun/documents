var perfectPersonalData = {
    init: function(){
    	var self = perfectPersonalData;
    	self.bind();
    	self.initHtml();
    },
    options: {
    	editData:null,
    	editId:null,
    	updateUserFlag:sessionStorage.getItem('updateUserFlag'),
    	defaultProvienceId:5,
    	defaultCityId:76,
        height:window.innerHeight-458
    },
    initHtml: function(){
    	var self = perfectPersonalData;
    	
    	var userInfo = JSON.parse(localStorage.getItem('userInfo')),
    		headerSpan = $('.headerSpan'),
    		inputDiv = $('.InputsDiv'),
    		inputDivHtml = [];
    	
    	switch (parseInt(perfectPersonalData.options.updateUserFlag)) {
		case 1:
			headerSpan.html('修改地址');
			inputDivHtml.push('<div class="singleRow border_bottom">');
				inputDivHtml.push('<select class="provienceInput areaInput fl" id="provienceSelect">');
					inputDivHtml.push('<option value="-1">加载中..</option>');
				inputDivHtml.push('</select>');
				inputDivHtml.push('<select class="cityInput areaInput fl" id="citySelect">');
					inputDivHtml.push('<option value="-1">加载中..</option>');
				inputDivHtml.push('</select>');
			inputDivHtml.push('</div>');
			
			inputDivHtml.push('<div class="singleRow border_bottom">');
				inputDivHtml.push('<input class="addressInput" placeholder="请输入详细地址（收货地址）">');
			inputDivHtml.push('</div>');
			inputDiv.html(inputDivHtml.join(''));
			
	    	self.provience();
	    	self.city(self.options.defaultProvienceId);

			$('#provienceSelect').val(self.options.defaultProvienceId);
	    	$('#citySelect').val(self.options.defaultCityId);
	        $('.provienceInput').on('change',function(){
	            var provienceId=$('.provienceInput').val();
	            perfectPersonalData.city(provienceId)
	        })
	        
	        $('.addressInput').val(userInfo.address);
			break;
		case 2:
			headerSpan.html('修改姓名');
		    inputDivHtml.push('<div class="singleRow border_bottom">');
		    	inputDivHtml.push('<input class="nameInput" placeholder="请输入您的真实姓名">');
		    inputDivHtml.push('</div>');
		    inputDiv.html(inputDivHtml.join(''));
		    
		    $('.nameInput').val(userInfo.realName)
			break;
		case 3:
			headerSpan.html('修改邮箱');
		    inputDivHtml.push('<div class="singleRow border_bottom">');
		    	inputDivHtml.push('<input class="emailInput" placeholder="请输入您的邮箱">');
		    inputDivHtml.push('</div>');
		    inputDiv.html(inputDivHtml.join(''));
		    
		    $('.emailInput').val(userInfo.email)
			break;
		case 4:
			headerSpan.html('修改证件号码');
		    inputDivHtml.push('<div class="singleRow border_bottom">');
		    	inputDivHtml.push('<input class="idCardInput" placeholder="请输入您的证件号码">');
		    inputDivHtml.push('</div>');
		    inputDiv.html(inputDivHtml.join(''));
		    
		    $('.idCardInput').val(userInfo.idCard)
			break;	
		case 5:
			inputDivHtml.push('<div class="singleRow border_bottom">');
				inputDivHtml.push('<input class="userNameInput" placeholder="姓名">');
			inputDivHtml.push('</div>');
			inputDivHtml.push('<div class="singleRow border_bottom">');
				inputDivHtml.push('<input class="phoneNumberInput" placeholder="手机号">');
			inputDivHtml.push('</div>');
			inputDivHtml.push('<div class="singleRow border_bottom">');
				inputDivHtml.push('<select class="provienceInput areaInput fl" id="provienceSelect">');
					inputDivHtml.push('<option value="-1">加载中..</option>');
				inputDivHtml.push('</select>');
				inputDivHtml.push('<select class="cityInput areaInput fl" id="citySelect">');
					inputDivHtml.push('<option value="-1">加载中..</option>');
				inputDivHtml.push('</select>');
			inputDivHtml.push('</div>');
			
			inputDivHtml.push('<div class="singleRow border_bottom">');
				inputDivHtml.push('<input class="addressInput" placeholder="请输入详细地址（收货地址）">');
			inputDivHtml.push('</div>');
			inputDivHtml.push('<div class="singleRow border_bottom">');
				inputDivHtml.push('<p class="fl">设置为默认地址</p><div class="rightInput fr">');
				inputDivHtml.push('<input name="isTransfer" type="hidden" value="0" class="isHostInput">');
				inputDivHtml.push('<i class="checkBtn checkOffImg"></i></div>');
			inputDivHtml.push('</div>');
			inputDiv.html(inputDivHtml.join(''));
			
			self.provience();
	    	self.city(self.options.defaultProvienceId);

	    	var editData = localStorage.getItem('editData');
			console.log(editData)
	    	if (editData) {
				var data = JSON.parse(editData);
				$('.userNameInput').val(data.receiver);
		    	$('.phoneNumberInput').val(data.mobile)
		    	$('.provienceInput').val(data.provinceId);
				console.log(data.province);console.log(data.city)
				perfectPersonalData.city(data.provinceId)
		    	$('.cityInput').val(data.cityId);

		    	$('.addressInput').val(data.address);
		    	self.options.editId = data.id;
		    	self.options.editData = true;
		    	if (1 == data.isDefault) $('.checkBtn').removeClass('checkOffImg').addClass('checkOnImg');

				localStorage.removeItem('editData');
			}else{
				$('#provienceSelect').val(self.options.defaultProvienceId);
		    	$('#citySelect').val(self.options.defaultCityId);
			}

	    	$('.provienceInput').on('change',function(){
	            var provienceId=$('.provienceInput').val();
	            perfectPersonalData.city(provienceId)
	        })
			break;
		}
    	
    },
    city:function(provinceId){
        $.ajax({
        	async: false,
            data: {type:'city',provinceId:provinceId},
            type : "GET",
            url : WX_ROOT + "insurance/queryProvinceList",
            beforSend: function(){
                common.alert({'stayTime':-1});
            },
            success : function(json) {
                try {
                    var data = JSON.parse(json);
                    if (data.code == 600) {
                        var data = JSON.parse(json),cityHtml = '';
                    	$(data.data).each(function(k,v){
                    		cityHtml += '<option value='+ v.id +'>'+ v.name +'</option>';
                    	});
                    	$('#citySelect').html(cityHtml);
                    }
                    common.alert({show:false});
                } catch (e) {
                    common.tips({'msg':'系统繁忙'})
                }
            }
        });
    },
    provience:function(){
        $.ajax({
            async: false,
            data: {type:'province'},
            type : "GET",
            url : WX_ROOT + "insurance/queryProvinceList",
            beforSend: function(){
                common.alert({'stayTime':-1});
            },
            success : function(json) {
                try {
                    var data = JSON.parse(json);
                    if (data.code == 600) {
                    	var data = JSON.parse(json),provienceHtml = '';
                    	$(data.data).each(function(k,v){
                    		provienceHtml += '<option value='+ v.id +'>'+ v.name +'</option>';
                    	});
                    	$('#provienceSelect').html(provienceHtml);
                    }
                    common.alert({show:false});
                } catch (e) {
                    common.tips({'msg':'系统繁忙'})
                }
            }
        });
    },
    addAddress: function(token,flag){
    	var par = {};
    		par.token = token;
    		par.flag = 2;
	    	par.receiver = $('.userNameInput').val().trim();
	    	par.mobile = $('.phoneNumberInput').val().trim();
	    	par.provinceId = $('.provienceInput').val().trim();
	    	par.province = $('.provienceInput').children(':checked').text().trim();
	    	par.cityId = $('.cityInput').val().trim();
	    	par.city = $('.cityInput').children(':checked').text().trim();
	    	par.address = $('.addressInput').val().trim();
	    	
	    	var isCheck = $('.checkBtn').hasClass('checkOnImg');
	    	isCheck?par.isDefault = 1:par.isDefault = 0;
	    	
	    	if ('edit' == flag){
	    		par.setType = 2;
	    		par.id = perfectPersonalData.options.editId;
	    	}else if('add' == flag){
	    		par.setType = 1;
	    	}
	    	
    	$.ajax({
            data: par,
            type : "POST",
            url : WX_ROOT + 'usercenter/userAddress',
            beforeSend: function(){
            	common.tips({msg:'请稍后..'})
            },
            success : function(json) {
            	var data = JSON.parse(json);
            	if (600 == data.msgCode) {
                    common.tips({
                        msg:'保存成功',
                        updateText: true,
                        stayTime: 1500,
                        callback:function(){
                        	window.location.href = WX_ROOT + 'usercenter/receiveAddress'
                        }
                    })
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
        });
    },
    save: function(token,id){
		var par = {};
		
    	par.token = token;
    	switch (parseInt(perfectPersonalData.options.updateUserFlag)) {
		case 1:
			par.flag = 1;
			par.provience = $('.provienceInput :checked').text();
	        par.city = $('.cityInput :checked').text();
	        par.address = $('.addressInput').val();
			break;
		case 2:
			par.flag = 2;
			par.username = $('.nameInput').val();
			break;
		case 3:
			par.flag = 3;
			par.email = $('.emailInput').val();
			break;
		case 4:
			par.flag = 4;
			par.idCardNumber = $('.idCardInput').val();
			break;
		case 5:
			par.flag = 5;
			break;
		case 6:
			par.flag = 6;
			break;
    	}
    	
    	if(par.flag == 5){
    		if (perfectPersonalData.options.editData) 
    			perfectPersonalData.addAddress(token,'edit');
    		else
    			perfectPersonalData.addAddress(token,'add');
		}else{
			$.ajax({
                data: par,
                type : "POST",
                url : WX_ROOT + 'usercenter/updateUserInfo',
                beforeSend: function(){
                	common.tips({msg:'请稍后..'})
                },
                success : function(json) {
                	var data = JSON.parse(json.data);
                	if (600 == data.msgCode) {
                		common.tips({
                            msg:'修改成功',
                            updateText: true,
                            stayTime: 500,
                            callback:function(){
                            	common.queryUserByToken(token);//更新用户信息
                            	var toAdressPage = localStorage.getItem('toAdressPage');
                            	if (toAdressPage) {
                            		window.location.href = toAdressPage;
                            		localStorage.removeItem('toAdressPage');
                            	}else{
                            		window.location.href = WX_ROOT + 'usercenter/centerInfo'
                            	}
                            }
                        })
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
            });
		}
    	
    },
    bind: function(){
    	var self = perfectPersonalData;
    	$('.insuranceDiv').css('height',perfectPersonalData.options.height)
    	
    	//修改提交
        $('.ensureBtn').on('tap',function(){
        	var token =  localStorage.getItem('token');
        	if (token) {
        		perfectPersonalData.save(token);
			}else{
				common.tips({
					msg:'没有登录',
					callback:function(){
						window.location.href= WX_ROOT + 'base/login'
					}
				})
			}
        });
		$('.contentDiv ').on('tap','.checkBtn',function(){
			if($(this).hasClass('checkOnImg')){
				$(this).removeClass('checkOnImg').addClass('checkOffImg')
			}else{
				$(this).removeClass('checkOffImg ').addClass('checkOnImg')
			}
		})
    }
}
$(document).ready(function() {
	perfectPersonalData.init();
})