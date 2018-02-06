<div class="tpl-add-user layui-form" action="">
    <div class="layui-form-item">
        <label class="layui-form-label">
            <em class="hs-require-tips">*</em>
            会议账号
        </label>
        <div class="layui-input-block">
            <input type="text" name="username" value="{{JSON.parse(d).username}}" lay-verify="username|required" autocomplete="off" placeholder="" class="layui-input" style="border:0;padding-left:0">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">
            <em class="hs-require-tips">*</em>
            手机号码
        </label>
        <div class="layui-input-block">
            <input type="text" name="tel" lay-verify="tel|required|phone" autocomplete="off" placeholder="会议举办方对接人手机号" class="layui-input" maxlength="11">
        </div>
    </div>
    
    <div class="layui-form-item">
        <label class="layui-form-label">
            <em class="hs-require-tips">*</em>
            会议单位
        </label>
        <div class="layui-input-block">
            <input type="text" name="name" lay-verify="name|required" autocomplete="off" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">
            <em class="hs-require-tips">*</em>
            授权期限
        </label>
        <div class="layui-input-block">
            <input type="text" name="time" lay-verify="time|required" autocomplete="off" class="layui-input" id="timeRange" readonly>
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">
            <em class="hs-require-tips">*</em>
            对接人
        </label>
        <div class="layui-input-block">
            <input type="text" name="principal" lay-verify="principal|required" autocomplete="off" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">
            <em class="hs-require-tips">*</em>
            会议地址
        </label>
        <div class="layui-input-block">
            <input type="text" name="meetingaddress" lay-verify="meetingaddress|required" autocomplete="off" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">
            <em class="hs-require-tips">*</em>
            使用设备
        </label>
        <div class="layui-input-block">
            <input type="text" name="deviceids" lay-verify="deviceids|required" autocomplete="off" placeholder="点击添加使用设备" class="layui-input" id="addUserDevice">
        </div>
    </div>

    <div class="layui-form-item">
        <label class="layui-form-label">
            <em class="hs-require-tips">*</em>
            初始密码
        </label>
        <div class="layui-input-block">
            <input type="text" name="password" lay-verify="password|required" autocomplete="off" value="888888" placeholder="" class="layui-input">
        </div>
    </div>

    <div class="layui-form-item hs-align-center">
        <button class="layui-btn element-submit" lay-submit="element-submit" lay-filter="element-submit">创建</button>
    </div>
</div>