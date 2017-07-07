var content= {
    init: function () {
        var self = content;
        self.bind();
    },
    options: {},
    getLetterDetail: {
        send: function (relation,toUserr) {
            var par = {};
            par.openid = JSON.parse(localStorage.getItem('wxUserInfo')).openid;
            par.relation = relation;//(关系)为谁打卡，1父母，2子女，3爱人，4好闺蜜，5好基友，6某个TA,
            par.fromUser = JSON.parse(localStorage.getItem('wxUserInfo')).nickname;//发送人姓名（微信网名）
            par.toUser = toUserr;//称呼

            $.ajax({
                url: WX_CORS,//固定的
                data: {
                    url: 'rest/weixin/love/insert',//真实的url
                    params: JSON.stringify(par)
                },
                type: "POST",
                success: function (json) {
                    if(json&&json.code!=-1) {
                        if ( json.code == 0) {
                            var loveId = json.data.loveId;
                            window.location.href = WX_ROOT + 'loveLetter/detail?loveId=' + loveId + "," + relation;
                        } else if(json.code == 8010){
                            common.tips({msg:json.msg})
                        }
                    } else {
                        common.error()
                    }
                },
                timeout: 3000
            });
        }
    },
    bind: function () {
        $('.dakaBtn ').on('tap', function () {
            var relation=$('.objectSelect').val();
            var toUserr=$('.nickNameInput').val();
            if(toUserr){
                content.getLetterDetail.send(relation,toUserr)
            }else{
                common.tips({msg:'请先输入Ta的昵称'})
            }
        })
    }
}
content.init()
