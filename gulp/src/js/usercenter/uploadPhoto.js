var uploadPhoto = {
        init: function(){
        	uploadPhoto.author();
        	uploadPhoto.bind();
        },
        options: {
            signature:null,
            timestamp:null,
            nonceStr:null,
            appid:null
        },
        author: function(){
            var redirect_uri = window.location.href.split('#')[0],authorUrl; 
            
            if (!uploadPhoto.options.signature) {
                $.ajax({
                    async: false,
                    data: {url:redirect_uri},
                    type : "GET",
                    url : WX_ROOT + "wechat/signature",
                    beforSend: function(){
                        common.alert({'stayTime':-1});
                    },
                    success : function(json) {
                        var data = JSON.parse(json);
                            uploadPhoto.options.signature = data.signature;
                            uploadPhoto.options.nonceStr = data.nonceStr;
                            uploadPhoto.options.timestamp = data.timestamp;  
                            uploadPhoto.options.appid = data.appid;
                    },
                    complete:function(){
                        common.alert({show:false});
                    }
                });
            }

            uploadPhoto.share(uploadPhoto.options.appid, uploadPhoto.options.timestamp, uploadPhoto.options.signature, uploadPhoto.options.nonceStr, authorUrl);

        },
        share: function(appid,timestamp,signature,nonceStr,url){
        	wx.config({
        	    debug: true, 
        	    appId: appid, 
        	    timestamp: timestamp, 
        	    nonceStr: nonceStr, 
        	    signature: signature,
        	    jsApiList: [
        	                'chooseImage',
        	                'previewImage',
        	                'uploadImage',
        	                'downloadImage'
							]
        	}); 
        	wx.ready(function(){
        		
        	});
        	
        	wx.error(function(res){
        		common.tips({'msg':'获取授权证书失败！'})
        	});
        },
        bind: function(){

            $('.upload-photo').on('tap',function(){
                wx.chooseImage({
                    count: 1, 
                    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
                    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
                    success: function (res) {
                        console.log(res.localIds);
                        common.tips({msg:res.localIds});
                        $('.id-card img').prop('src',res.localIds[0])
                    }
                });
            });
        }
    }

$(document).ready(function() { 
	uploadPhoto.init();
}); 