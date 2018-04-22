<div class="module-project-edit">
    <div class="layui-form">

        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                机构
            </label>
            <div class="layui-input-block">
                <input type="text" id="name" name="name" lay-verify="name|required" autocomplete="off" placeholder="请输入机构名称"
                    class="layui-input" value={{d.username}} readonly>
            </div>
        </div>
    
        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                负责人
            </label>
            <div class="layui-input-block">
                <input type="text" id="principal" name="principal" lay-verify="principal|required" autocomplete="off" placeholder="请输入负责人姓名"
                    class="layui-input" value={{d.principal}} maxlength="10">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                联系手机
            </label>
            <div class="layui-input-block">
                <input type="text" id="tel" name="tel" lay-verify="phone|required" autocomplete="off" placeholder="请输入经理负责人手机号码"
                    class="layui-input" value={{d.tel}} maxlength="11">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                密码
            </label>
            <div class="layui-input-block">
                <input type="text" value={{d.password || 123456}} id="password" name="password" lay-verify="password|required" autocomplete="off" placeholder="请输入账号密码"
                    class="layui-input" maxlength="16">
            </div>
        </div>
    
        <div class="layui-form-item hs-align-center">
            <button class="layui-btn element-submit" lay-submit="element-submit" lay-filter="element-submit">添加</button>
        </div>
    </div>
    
</div>