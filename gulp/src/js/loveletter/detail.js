var detail={
    init:function(){
        $('article').show();

        var self=detail;
        
        var openid = JSON.parse(localStorage.getItem('wxUserInfo')).openid;
        var loveId = common.getUrlParameter('loveId').split(',')[0];
        self.getDetail.send(openid,loveId);
        self.author();
        self.bind();
    },
    options:{
        signature:null,
        nonceStr:null,
        timestamp:null,
        appid:null,
        loveLetterImg:null,
        isOwner:0
    },
    enterWxAuthor: function(){
        var wxUserInfo = localStorage.getItem("wxUserInfo");
        if (!wxUserInfo) {
            var code = common.getUrlParameter('code');
            if (code) {
                common.getWxUserInfo();
                detail.init();
            }else{
                //没有微信用户信息，没有授权-->> 需要授权，跳转授权页面
                window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ WX_APPID +'&redirect_uri='+ window.location.href +'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
            }
        }else{
            detail.init();
        }
    },

    author: function(){
        var redirect_uri = window.location.href.split('#')[0],authorUrl; 
        
        if (!detail.options.signature) {
            $.ajax({
                async: false,
                data: {url:redirect_uri},
                type : "GET",
                url: WX_ROOT + "wechat/signature",
                beforSend: function(){
                    common.alert({'stayTime':-1});
                },
                success : function(json) {
                    if (json) {
                        var data = JSON.parse(json);

                        detail.options.signature = data.signature;
                        detail.options.nonceStr = data.nonceStr;
                        detail.options.timestamp = data.timestamp;  
                        detail.options.appid = data.appid;
                        
                        var relation = $('.letterMainDiv').attr('data-relation');
                        authorUrl = window.location.href.split('?')[0] + "?loveId="+ common.getUrlParameter("loveId").split(',')[0] + ","+ relation;
                    }else{
                        /*common.tips({msg:'系统繁忙,获取signature失败!'});*/
                    }
                },
                complete:function(){
                    common.alert({show:false});
                }
            });
        }

        detail.share(detail.options.appid, detail.options.timestamp, detail.options.signature, detail.options.nonceStr, authorUrl);

    },
    share: function(appid,timestamp,signature,nonceStr,url){
        wx.config({
            debug: false, 
            appId: appid, 
            timestamp: timestamp, 
            nonceStr: nonceStr, 
            signature: signature,
            jsApiList: ['onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'chooseImage',
                        'previewImage',
                        'uploadImage',
                        'downloadImage'
                        ]
        }); 
        wx.ready(function(){
            var letterMainDiv = $('.letterMainDiv');
            var wxUserInfo = localStorage.getItem("wxUserInfo"),
                toUser = letterMainDiv.attr('data-toUser'),
                fromUser = letterMainDiv.attr('data-fromuser');
            	relation = letterMainDiv.attr('data-relation');
            	
            var imgUrl = 'http://h5.sztoda.cn/static/img/love_letter_share_detail.png',
                title = fromUser +'送给'+ toUser +'的情书！' + '拆开看看',
                desc = '哎哟，发现一封情书~';
            
            if(relation == 7){
            	toUser = toUser.indexOf('老师')>=0?toUser:toUser + '老师';
            	title = "感恩教师节，"+ '致'+ toUser +'..';
                desc = '用岁月，编撰人生；用热情，浇灌花朵；用巫思，铸就精彩；用奉献，燃烧生命。教师节快乐！';
            }

            if((new Date().getTime())/1000 <= 1474127999){//中秋节17号前
                title = "谨此中秋佳节之际，"+ '祝福送'+ toUser +'..';
                desc = '皓月当空，月华流泻，满地如霜，中秋节快乐！';
                imgUrl = 'http://h5.sztoda.cn/static/img/Mid-autumn.png';
            }
                
            //分享到朋友圈
            wx.onMenuShareTimeline({
                title: title, 
                link: url, 
                imgUrl: imgUrl,
                success: function () { 
                    common.saveShareRecord(title,desc,url,imgUrl,1);
                    $('.shareSection').addClass('dis_none');//关闭分享蒙层
                }
            });
            
            //分享给朋友
            wx.onMenuShareAppMessage({
                title: title, 
                desc: desc, 
                link: url, 
                imgUrl: imgUrl, // 分享图标
                success: function () { 
                    common.saveShareRecord(title,desc,url,imgUrl,2);//分享统计，分享来源 1 朋友圈 2分享给朋友  3分享到QQ  4分享到QQ空间
                    $('.shareSection').addClass('dis_none');//关闭分享蒙层
                }
            });
            
        });
        
        wx.error(function(res){
            common.tips({'msg':'获取授权证书失败！'})
        });
    },

    //详情页内容动态数据
    getDetail:{
        send:function(openid,loveId){
            var par = {};
                par.openid = openid;
                par.loveId = loveId;

            $.ajax({
                async: false,
                url : WX_CORS,//固定的
                beforSend:function(){
                    common.alert({'stayTime':-1});
                },
                data: {
                    url:'rest/weixin/love/list',//真实的url
                    params:JSON.stringify(par)
                },
                type : "GET",
                success: function(json){
                    if(json && json.code == 0) {
                        console.log("getDetail",json.data);

                        var data = json.data,
                            toUser = data.toUser,
                            fromUser = data.fromUser,
                            openid= data.openid,
                            createDate = data.createDate,
                            relation = data.relation;

                        /** 当前日期 **/
                        var month = (new Date().getMonth()+1) < 10?'0'+(new Date().getMonth()+1):(new Date().getMonth()+1);
                        var day = (new Date().getDate()) < 10?'0'+(new Date().getDate()):(new Date().getDate());
                        var result = new Date().getFullYear()+'-'+month+'-'+ day ;//拼写出的日期yyyy-MM-dd

                        var lovecheck = data.loveCheck,
                            startTime = new Date(result).getTime()/1000

                        var html = '',
                            isCanGetGift = false,//是否能够领取礼物
                            isTodayOwnerCheck = false,//今天是否能够打卡
                            isTodayFriendCheck = false,//朋友是否已经打过卡
                            loveNum = 0, 
                            dakaNum = 0;

                        var $dakaBtn = $('.dakaBtn'),
                            $dakaNum = $('.dakaNum'),
                            $loveNum = $('.loveNum'),
                            $dakaRestNum = $('.dakaRestNum'),
                            $getTicketBtn = $('.getTicketBtn'),
                            $teamDivUl = $('.teamDiv ul');

                        if (lovecheck.length > 0) {
                            for (var i = 0; i < lovecheck.length; i++) {
                                if (lovecheck[i].type == 1) {//自己打卡
                                    dakaNum ++;
                                    console.log(new Date(lovecheck[i].checkTime).getTime())
                                    new Date(lovecheck[i].checkTime).getTime()/1000 >= startTime?isTodayOwnerCheck = true:isTodayOwnerCheck = false;
                                    /*isCanGetGift*/
                                } else if (lovecheck[i].type == 2) {//亲友打卡
                                    loveNum ++;
                                    lovecheck[i].friendOpenid == JSON.parse(localStorage.getItem('wxUserInfo')).openid?isTodayFriendCheck = true:isTodayFriendCheck = false;

                                    html += ' <li>';
                                        html += '<img src=' + lovecheck[i].friendImg + ' class="headImg">';
                                            html += ' <span class="sayText">' + lovecheck[i].wishText + '</span>';
                                        html += '<img src="../static/img/loveletter_heart1.png" class="zanImg">';
                                            html += '<span>  x1</span>';
                                    html += '</li>'
                                }
                            }

                            //按钮颜色控制
                            if (isTodayOwnerCheck) {//今日已打卡
                                $dakaBtn.addClass('hadDaka').removeClass('notDaka').text('今日已打卡').off();
                            } else {//今日没打卡
                                $dakaBtn.addClass('notDaka').removeClass('hadDaka').text('打卡')
                            }

                            if(loveNum == 0) html += '<p>还没有亲友团呢，赶紧分享吧</p>'

                            dakaNum = dakaNum + parseInt(loveNum/7);
                            
                            //自己打卡次数、亲友打卡次数
                            $dakaNum.text(dakaNum);
                            $loveNum.text(loveNum);

                            if (dakaNum > 7) {
                                $dakaRestNum.text(parseInt(7 - dakaNum%7))
                            }else{
                                $dakaRestNum.text(parseInt(7 - dakaNum))
                            }
                            console.log('dakaNum26',dakaNum)

                            if($dakaNum.text() >= 7){//可以领券
                                $dakaBtn.addClass('left-45')
                                $getTicketBtn.show();
                            }

                            $teamDivUl.html(html)
                        } else {
                            //没有打卡记录
                            $dakaBtn.addClass('notDaka').removeClass('hadDaka').text('打卡')
                            $('.dakaNum,.loveNum').text(0)
                            $dakaRestNum.text(7)
                            $teamDivUl.html('<p class="nonePerpel">还没有亲友团给你打卡呢，赶紧分享吧</p>')
                        }

                        //添加配置数据
                        $('.letterMainDiv')
                            .attr('data-loveid',common.getUrlParameter('loveId').split(',')[0])
                            .attr('data-loveOpenid',openid)
                            .attr('data-fromUser',fromUser)
                            .attr('data-toUser',toUser)
                            .attr('data-relation',relation);

                        $('.dakaTime').text(createDate)
                        $('.toUser').text(toUser);
                        $('.fromUser').text(fromUser);

                        //判断是自己进来还是好友，根据情书openid和本地openid
                        var ownerOpenid = JSON.parse(localStorage.getItem('wxUserInfo')).openid;
                        if (ownerOpenid.trim() === openid.trim()){
                            //自己打卡
                            detail.options.isOwner = 1;

                            $('.selfDiv').show();
                            $('.text-tips').show();

                            $('.imgDiv').on('tap',detail.uploadImage);//渲染拍照功能

                            $('#notDaka').on('tap', detail.daka); //打卡

                            $('.again-write a').text('再写一封');
                        }else{
                            //亲友打卡,判断是否已经打过卡
                            var otherDiv = $('.otherDiv');
                                otherDiv.show();
                            $('.love_shareBg').removeClass('dis_none')
                            if(isTodayFriendCheck) {
                                otherDiv.html('<p class="me-too-play" id="meToPlay">我也要玩！</p><p class="help-share" id="meToPlay">帮他分享攒爱~</p>');

                                $('#meToPlay').off().on('tap',function(){
                                    window.location.href = WX_ROOT + 'loveLetter/index'
                                })

                                $('.help-share').on('tap',function(){
                                    $('.shareSection').removeClass('dis_none')
                                })
                            }

                            $('.again-write a').text('我也要玩');
                            $('#friendDaka').on('tap',detail.daka); //打卡
                        }

                        //如果是第一次生成情书、将文字图片更新到服务器
                        if (!json.data.loveText || !json.data.loveImg) {
                            detail.randomLetter(json.data.loveText,json.data.loveImg);
                        }else{
                            //有图片和文字
                            $('.imgDiv img').prop('src',json.data.loveImg);
                            $('.letterContent').text(json.data.loveText);
                        }

                        //判断是否可以领取
                        var ownerDakaCount = parseInt($('.dakaNum').text());
                        if(ownerDakaCount){
                           $('.get-gift-p').show().on('tap',function(){
                                window.location.href = WX_ROOT + 'loveLetter/exchangeList'
                           })
                        } 

                        //打开footer
                        $('footer').show();
                    }else {
                        //code=-1
                        common.error();
                    }
                },
                complete:function(){
                    common.alert({show:false})
                },
                timeout:3000
            });
        }
    },

    //动态生成情书
    randomLetter:function(loveText,loveImg){
        $.getJSON(WX_STATIC + 'json/qingshu.json',function(json){
            console.log("getJSOJ",json)

            var letterContent = $('.letterContent'),
                imgDiv = $('.imgDiv img'),
                img = null,
                relation = $('.letterMainDiv').attr('data-relation');

            switch (parseInt(relation)){ 
                case 1 : 
                    arr = json['parents']
                    img = WX_STATIC + 'img/loveLetter/parents/parents' + (Math.round(Math.random()*30) - 1) + ".jpg"
                    break; 
                case 2 : 
                    arr = json['son']
                    img = WX_STATIC + 'img/loveLetter/children/children' + (Math.round(Math.random()*30) - 1) + ".jpg"
                    break; 
                case 3 : 
                    arr = json['lover']
                    img = WX_STATIC + 'img/loveLetter/lover/lover' + (Math.round(Math.random()*30) - 1) + ".jpg"
                    break; 
                case 4 : 
                    arr = json['friends']
                    img = WX_STATIC + 'img/loveLetter/friend/friend' + (Math.round(Math.random()*30) - 1) + ".jpg"
                    break;
                case 5 : 
                    arr = json['friends']
                    img = WX_STATIC + 'img/loveLetter/friend/friend' + (Math.round(Math.random()*30) - 1) + ".jpg"
                    break;  
                case 6 : 
                    arr = json['oneself']
                    img = WX_STATIC + 'img/loveLetter/oneself/oneself' + (Math.round(Math.random()*30) - 1) + ".jpg"
                    break; 
                case 7 : 
                    arr = json['teacher']
                    img = WX_STATIC + 'img/loveLetter/teacher/teacher' + (Math.round(Math.random()*17) - 1) + ".jpg"
                    break;
                default : 
                    arr = json['lover'];
                    img = WX_STATIC + 'img/loveLetter/lover/lover' + (Math.round(Math.random()*30) - 1) + ".jpg"
                    break; 
                } 

                letterContent.html(arr[Math.round(Math.random()*arr.length) - 1] || '生命这么浅，我们涉水而过，湿了 脚踝，丢了鞋子，到了对岸，如此 而已');
                imgDiv.prop('src',img || WX_STATIC + 'img/loveletter_title.png')
                detail.updateLetter();
        })
    },

    //第一次生成情书，或者自己打卡，需要更新图片、文字
    updateLetter: function(){
        var par = {};
            par.loveid = loveLetterId = $('.letterMainDiv').attr('data-loveid');//自己的openid;
            par.loveImg = detail.options.loveLetterImg || $('.imgDiv img').prop('src');
            par.loveText = $('.letterContent').text();

        $.ajax({
            url : WX_CORS,//固定的
            data: {
                url:'rest/weixin/love/update',//真实的url
                params:JSON.stringify(par)
            },
            type : "POST",
            success: function(json){
                if(json && json.code!=-1) {
                    console.log("更新情书信息成功")
                } else {
                    common.error();
                }
            },
            timeout:3000
        });
    },

    //打卡 type1自己 2亲友
    daka:function(e){
        $('.heart2323').addClass('loveletter_heart2')
        if ($(e.currentTarget)[0].innerText == '今日已打卡') return;

        var loveLetterId = $('.letterMainDiv').attr('data-loveid'),//情书的id
            loveOpenid = $('.letterMainDiv').attr('data-loveOpenid'),//情书对应的openid
            openid=JSON.parse(localStorage.getItem('wxUserInfo')).openid;//自己的openid

        var friendImg = '',
            wishText = '',
            html = '',
            type = 1;//默认自己打卡

        if(openid.trim() === loveOpenid.trim()){
            //自己打卡
            type = 1;
            //detail.randomLetter();//随机切换情书
        }else{
            //朋友打卡
            friendImg = JSON.parse(localStorage.getItem('wxUserInfo')).headimgurl;

            //动态生成祝福语
            $.ajax({
                async: false,
                url : WX_STATIC + 'json/wish.json',//固定的
                success: function(json){
                    var relation = $('.letterMainDiv').attr('data-relation'),
                        arry;
                    switch (parseInt(relation)){ 
                        case 1 : 
                            arr = json['parents']
                            break; 
                        case 2 : 
                            arr = json['son']
                            break; 
                        case 3 : 
                            arr = json['lover']
                            break; 
                        case 4 : 
                            arr = json['friends']
                            break;
                        case 5 : 
                            arr = json['friends']
                            break;  
                        case 6 : 
                            arr = json['oneself']
                            break;
                        case 7 : 
                            arr = json['teacher']
                            break;
                        default : 
                            arr = json['friends']
                            break; 
                        }

                    wishText = arr[Math.round(Math.random()*arr.length) - 1] || '赞一个！'; 
                },
                timeout:3000
            });

            type=2

            html += ' <li>';
            html += '<img src=' + friendImg + ' class="headImg">';
            html += ' <span class="sayText">' + (wishText  || '赞一个！' ) + '</span>';
            html += '<img src="../static/img/loveletter_heart1.png" class="zanImg">';
            html += '<span>  x1</span>';
            html += '</li>';
        }


        var par = {};
            par.friendOpenid = openid;
            par.loveLetterId = loveLetterId;
            par.friendImg = friendImg;
            par.wishText = wishText;
            par.type = type;

        $.ajax({
            url : WX_CORS,//固定的
            data: {
                url:'rest/weixin/love/check',//真实的url
                params:JSON.stringify(par)
            },
            type : "POST",
            success: function(json){
                if(json && json.code != -1) {
                    if (json.code == 0) {
                        common.tips({msg:json.msg})

                        $('.dakaBtn').removeClass('notDaka').addClass('hadDaka').text('今日已打卡');

                        var dakaNum = $('.dakaNum'),
                            dakaRestNum = $('.dakaRestNum'),
                            loveNum = $('.loveNum');

                            dakaNum.html(parseInt(dakaNum.text()) + 1);

                            if (parseInt(dakaNum.text()) > 7) {
                                dakaRestNum.html(7 - (dakaNum.text())%7)
                            }else{
                                dakaRestNum.html(7 - (dakaNum.text()))
                            }
                            
                            var teamUl = $('.teamDiv ul');
                                if(type == 2) teamUl.children('p').remove();//只有别人打卡的时候才去掉
                                teamUl.append(html);

                            //判断是否可以领取
                            var ownerDakaCount = parseInt($('.dakaNum').text());

                            if(ownerDakaCount >= 7){
                                $('.dakaBtn').addClass('left-45')
                                $('.getTicketBtn').show().on('tap',function(){
                                    window.location.href = WX_ROOT + 'loveLetter/exchangeList'
                                })
                            } 
                    }else if(json.code == 8001){
                        common.tips({msg:json.msg})
                    }

                    $('.otherDiv').html('<p class="me-too-play" id="meToPlay">我也要玩！</p><p class="help-share" id="meToPlay">帮他分享攒爱~</p>');

                    $('#meToPlay').off().on('tap',function(){
                        window.location.href = WX_ROOT + 'loveLetter/index'
                    })

                    $('.help-share').on('tap',function(){
                        $('.shareSection').removeClass('dis_none')
                    })
                } else {
                    common.error();
                }
            },
            timeout:3000
        });
    },

    //拍照开始
    uploadImage: function(e){
        wx.chooseImage({
            count: 1, 
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                console.log(res.localIds);
                $('.imgDiv img').prop('src',res.localIds[0])
                detail.uploadToWeixinServer(res.localIds[0],'loveLetter')
            }
        });
    },
    uploadToWeixinServer: function(localId,type){
        wx.uploadImage({
            localId: localId,
            isShowProgressTips: 1, 
            success: function (res) {
                detail.uploadToOwnerServer(res.serverId,type);//上传到我们自己的服务器
            }
        });
    },
    uploadToOwnerServer: function(serverId,type){
        $.ajax({
            data: {serverId:serverId,type:type},
            type : "POST",
            url : WX_ROOT + "wechat/uploadPhoto",
            success : function(json) {
                if (json) {
                    var data = JSON.parse(json.data);
                    detail.options.loveLetterImg = data.path + data.name;
                    detail.updateLetter()
                }
            }
        });


    },
    //拍照结束

    bind:function(){
        //分享按钮
    	$('.shareBtn').on('tap',function(){
            $('.shareSection').removeClass('dis_none')
        })
        
        $('.morLayerDiv').on('tap',function(){
            $('.shareSection').addClass('dis_none')
        })
        //领取保障
        $('.getTicketBtn').on('tap',function(){
           window.location.href=WX_ROOT+'loveLetter/exchangeList'
        })
    }
}

$(document).ready(function() {
	
		$('#playDirect').css('height',window.innerHeight);//活动指引预览高度

        detail.enterWxAuthor();
        /*detail.init();*/

        /** 摇一摇 **/
        //先判断设备是否支持HTML5摇一摇功能
        if (window.DeviceMotionEvent) {
            //获取移动速度，得到device移动时相对之前某个时间的差值比
            if (detail.options.isOwner == 1) {
                //自己打卡才渲染摇一摇
                //预加摇一摇声音
                var shakeAudio = new Audio();
                    shakeAudio.src = '../static/audio/7631.mp3';
                    /*shakeAudio.src = '../static/audio/7631.mp3';*/
                    
                var shake_options = {
                    preload  : 'auto'
                }
                for(var key in shake_options){
                    if(shake_options.hasOwnProperty(key) && (key in shakeAudio)){
                        shakeAudio[key] = shake_options[key];
                    }
                }
                window.addEventListener('devicemotion', deviceMotionHandler, false);
            }
            
        }else{
            alert('您好，你目前所用的设备好像不支持重力感应哦！');
        }
         
        //设置临界值,这个值可根据自己的需求进行设定，默认就3000也差不多了
        var shakeThreshold = 3000;
        //设置最后更新时间，用于对比
        var lastUpdate = 0;
        //设置位置速率
        var curShakeX=curShakeY=curShakeZ=lastShakeX=lastShakeY=lastShakeZ=0;
         
        function deviceMotionHandler(event){
         
            //获得重力加速
            var acceleration = event.accelerationIncludingGravity;
         
            //获得当前时间戳
            var curTime = new Date().getTime();
         
            if ((curTime - lastUpdate)> 100) {
         
                //时间差
                var diffTime = curTime - lastUpdate;
                    lastUpdate = curTime;
         
                //x轴加速度
                curShakeX = acceleration.x;
                //y轴加速度
                curShakeY = acceleration.y;
                //z轴加速度
                curShakeZ = acceleration.z;
         
                var speed = Math.abs(curShakeX + curShakeY + curShakeZ - lastShakeX - lastShakeY - lastShakeZ) / diffTime * 10000;
         
                if (speed > shakeThreshold) {
                    //TODO 相关方法，比如：
                    shakeAudio.play();
                    /*alert('哈哈哈，，瞧你那傻样')*/
                    detail.randomLetter();
                    //播放音效
                    
                    /*
                    //播放动画
                    $('.shake_box').addClass('shake_box_focus');
                    clearTimeout(shakeTimeout);
                    var shakeTimeout = setTimeout(function(){
                        $('.shake_box').removeClass('shake_box_focus');
                    },1000)*/
         
                }
         
	            lastShakeX = curShakeX;
	            lastShakeY = curShakeY;
	            lastShakeZ = curShakeZ;
            }
        }
        
        var loopAudio = document.createElement("audio");
        	loopAudio.src = '../static/audio/KissTheRain.mp3';
        	loopAudio.play();
        	
        	loopAudio.addEventListener('ended',function(){
        		setTimeout(function(){
        			loopAudio.play();
        		}, 100)
        	})
        	
})
