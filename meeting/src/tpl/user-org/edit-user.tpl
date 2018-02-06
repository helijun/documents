<div class="module-user-org-edit">
    <div class="layui-form">
        <input type="hidden" name="sponsorid" value="{{ d.sponsorid}}" class="layui-input">
        <div class="layui-form-item">
            <label class="layui-form-label">
                会议单位
            </label>
            <div class="layui-form-mid layui-word-aux">{{ d.name}}</div>
            <input type="hidden" name="name" value="{{ d.name}}" class="layui-input">
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">
                会议账号
            </label>
            <div class="layui-form-mid layui-word-aux">{{ d.username}}</div>
            <input type="hidden" name="username" value="{{ d.username}}" class="layui-input">
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                重置密码
            </label>
            <div class="layui-input-block">
                <input type="text" id="password" name="password" lay-verify="password|required" autocomplete="off" placeholder="请输入新密码" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item hs-align-center">
            <button class="layui-btn element-submit-org" lay-submit="element-submit-org" lay-filter="element-submit-org">确认</button>
        </div>
    </div>
</div>