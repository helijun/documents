<div class="module-device-edit">
    <div class="layui-form">
        <input type="hidden" name="deviceid" value="{{d.deviceid}}" />
        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                设备型号
            </label>
            <div class="layui-input-block">
                <select id="devicetype" name="devicetype" lay-filter="">
                    <option vaule="1" {{# if(d.type == 1){ }}selected {{#} }}>平板</option>
                    <option vaule="2" {{# if(d.type == 2){ }}selected {{#} }}>立式机</option>
                </select>
            </div>
        </div>
    
        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                Mac地址
            </label>
            <div class="layui-input-block">
                <input type="text" id="macaddress" name="macaddress" lay-verify="macaddress|required" autocomplete="off" placeholder="请输入Mac地址"
                    class="layui-input" value="{{d.deviceid}}">
            </div>
        </div>
    
        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                生产日期
            </label>
            <div class="layui-input-block">
                <input type="text" id="produceddate" name="produceddate" class="layui-input" lay-verify="produceddate|required" placeholder="请选择生产日期" value="{{d.createtime}}" readonly>
            </div>
        </div>
    
        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                软件版本
            </label>
            <div class="layui-input-block">
                <input type="text" id="softversion" name="softversion" lay-verify="softversion|required" autocomplete="off" placeholder="请输入软件版本"
                    class="layui-input" value="{{d.softversion}}">
            </div>
        </div>
    
        <div class="layui-form-item hs-align-center">
            <button class="layui-btn element-submit" lay-submit="element-submit" lay-filter="element-submit">保存</button>
        </div>
    </div>
</div>