<div class="module-device-add">
    {{# if(d.roleid == 1){ }} 
        <!-- 系统管理员 -->
        <div class="layui-form">
            <div class="layui-form-item">
                <label class="layui-form-label">
                    <em class="hs-require-tips">*</em>
                    设备型号
                </label>
                <div class="layui-input-block">
                    <select id="devicetype" name="devicetype" lay-filter="">
                        <option vaule="1">平板</option>
                        <option vaule="2">立式机</option>
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
                        class="layui-input">
                </div>
            </div>
        
            <div class="layui-form-item">
                <label class="layui-form-label">
                    <em class="hs-require-tips">*</em>
                    生产日期
                </label>
                <div class="layui-input-block">
                    <input type="text" id="produceddate" name="produceddate" class="layui-input" lay-verify="produceddate|required" placeholder="请选择生产日期" readonly>
                </div>
            </div>
        
            <div class="layui-form-item">
                <label class="layui-form-label">
                    <em class="hs-require-tips">*</em>
                    软件版本
                </label>
                <div class="layui-input-block">
                    <input type="text" id="softversion" name="softversion" lay-verify="softversion|required" autocomplete="off" placeholder="请输入软件版本"
                        class="layui-input">
                </div>
            </div>
        
            <div class="layui-form-item hs-align-center">
                <button class="layui-btn element-submit" lay-submit="element-submit" lay-filter="element-submit">添加</button>
            </div>
        </div>

    {{# }else{ }}

        <!-- 设备拥有者 -->
        <div class="layui-form">
            <div class="layui-form-item">
                <label class="layui-form-label">
                    <em class="hs-require-tips">*</em>
                    Mac地址
                </label>
                <div class="layui-input-block">
                    <input type="text" id="macaddress" name="macaddress" lay-verify="macaddress|required" autocomplete="off" placeholder="请输入Mac地址"
                        class="layui-input">
                </div>
            </div>
    
            <div class="layui-form-item">
                <label class="layui-form-label">
                    <em class="hs-require-tips">*</em>
                    设备名称
                </label>
                <div class="layui-input-block">
                    <input type="text" id="name" name="name" lay-verify="name|required" autocomplete="off" placeholder="请输入设备名称" class="layui-input">
                </div>
            </div>
    
            <div class="layui-form-item hs-align-center">
                <button class="layui-btn element-submit-org" lay-submit="element-submit-org" lay-filter="element-submit-org">绑定</button>
            </div>
        </div>
    {{# } }}
    
</div>