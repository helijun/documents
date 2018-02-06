<div class="module-container-fix">
    <div class="module-meeting-join-detail">
        <div class="element-container">
            <div class="element-content">

                <p>人脸信息：
                    <span>
                        <img class="hs-point elment-faceimguri" height="100" src="{{d.faceimage}}" alt="">
                    </span>
                </p>
                <p>性别：
                    <span>{{#if(d.sex == 1){ }} 男 {{# }else{ }} 女 {{# } }}</span>
                </p>
                <p>手机：
                    <span>{{d.phonenumber}}</span>
                </p>
                <p>身份：
                    <span>
                        {{#if(d.isvip == 1){ }}
                            VIP
                        {{# }else{ }}
                            普通嘉宾
                        {{# } }}
                    </span>
                </p>
                <p>签到状态：
                    <span>
                        {{#if(d.issign == 1){ }} 已签到 {{# }else{ }} 未签到 {{# } }}
                    </span>
                </p>
            </div>
        </div>
    </div>
</div>