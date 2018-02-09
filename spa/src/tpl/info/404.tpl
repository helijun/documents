<div class="module-meeting-form">
    <div class="element-has-header <%= !backgroundimage?'hs-none':'' %>">
        <div class="element-form-bg" style="background:url('<%= backgroundimage %>')">
            <div class="element-title">
                <%= title %>
                <!-- <i class="hs-float-right icon-question-gray"></i> -->
            </div>
        </div>
        <div class="element-fix-welcome">
            <p><i class="icon-chy-left"></i> 诚邀您 <i class="icon-chy-right"></i></p>
            <p class="element-welcome-content"><%= invitetitle%></p>
        </div>
        <p class="element-form-tips">
            请填写下列表单完成报名
        </p>
    </div>

    <div class="element-no-header <%= backgroundimage?'hs-none':'' %>">
        <div class="element-title">
            <%= title %>
            <i class="hs-float-right icon-question-full"></i>
        </div>
        <p class="element-form-tips">
            请填写下列表单完成报名
        </p>
    </div>
    
    <div class="weui-cells weui-cells_form">
        <div class="weui-cells__title">姓名</div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="text" placeholder="请填写您的真实姓名" name="username">
            </div>
        </div>

        <div class="weui-cells__title">性别</div>
        <div class="weui-cell element-sex-cell">
            <div class="element-sex">
                <dd>男</dd>
                <span class="element-sex-icon element-sex-1">
                    <i class="weui-icon-success"></i>
                </span>
            </div>

            <div class="element-sex">
                <dd>女</dd>
                <span class="element-sex-icon element-sex-2">
                    <i class="weui-icon-circle"></i>
                </span>
            </div>
        </div>

        <div class="weui-cells__title">手机</div>
        <div class="weui-cell">
            <div class="weui-cell__bd">
                <input class="weui-input" type="number" pattern="[0-9]*" placeholder="请输入您常用手机号" name="mobile">
            </div>
        </div>
        
        <div class="weui-cells__title">验证码</div>
        <div class="weui-cell weui-cell_vcode">
            <div class="weui-cell__bd">
                <input class="weui-input" type="number" pattern="[0-9]*" placeholder="手机短信验证码" name="verifcode">
            </div>
            <div class="weui-cell__ft">
                <button class="weui-vcode-btn">获取验证码</button>
            </div>
        </div>

        <div class="weui-cell el-upload-face">
            <div class="weui-cell__hd">
                <label for="" class="weui-label">上传人脸照片</label>
            </div>
            <div class="weui-cell__bd">
                <div class="element-upload-face">
                    <input class="file" accept="image/*" capture="camera" multiple="multiple" type="file" name="" id="file">
                </div>
            </div>
        </div>

        <a href="javascript:;" class="weui-btn weui-btn_primary" id="submit">提 交</a>
    </div>
    
</div>