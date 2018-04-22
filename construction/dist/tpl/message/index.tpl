<div class="module-message-index">
    <ul class="hs-tabs-across">
        <li class="tabs-item active" data-status="1">
            <p>企业信息</p>
        </li>
        <li class="tabs-item" data-status="2">
            <p>修改密码</p>
        </li>
    </ul>
    <div class="module-content">
        <div class="module-content-list content-qiye">
            <div class="element-content-list">
                <div class="element-list">
                    <dd>管理账号：</dd>
                    <span>{{d.account}}</span>
                </div>
                <div class="element-list">
                    <dd>企业名称：</dd>
                    <span>{{d.name}}</span>
                </div>
                <div class="element-list">
                    <dd>企业法人：</dd>
                    <span>{{d.legalperson}}</span>
                </div>
                <div class="element-list">
                    <dd>企业电话：</dd>
                    <span>{{d.tel}}</span>
                </div>
                <div class="element-list">
                    <dd>企业地址：</dd>
                    <span>{{d.address}}</span>
                </div>
            </div>
        </div>
        <div class="module-content-list content-pwd layui-hide">
            <div class="layui-form">
                <div class="layui-form-item">
                    <label class="layui-form-label">
                        <em class="hs-require-tips">*</em>
                         旧密码
                    </label>
                    <div class="layui-input-block">
                        <input type="text" id="originalpwd" name="originalpwd" lay-verify="required" autocomplete="off" placeholder="请输入旧密码"
                            class="layui-input">
                    </div>
                </div>
            
                <div class="layui-form-item">
                    <label class="layui-form-label">
                        <em class="hs-require-tips">*</em>
                         新密码
                    </label>
                    <div class="layui-input-block">
                        <input type="text" id="newpwd" name="newpwd" class="layui-input" lay-verify="newpwd|required" placeholder="请输入新密码">
                    </div>
                </div>
            
                <div class="layui-form-item">
                    <label class="layui-form-label">
                        <em class="hs-require-tips">*</em>
                         确认密码
                    </label>
                    <div class="layui-input-block">
                        <input type="text" id="secondpwd" name="secondpwd" lay-verify="secondpwd|required" autocomplete="off" placeholder="请输入确认密码"
                            class="layui-input">
                    </div>
                </div>
            
                <div class="layui-form-item hs-align-center">
                    <button class="layui-btn element-submit" lay-submit="element-submit" lay-filter="element-submit">确认</button>
                </div>
            </div>
        </div>
    </div>
</div>