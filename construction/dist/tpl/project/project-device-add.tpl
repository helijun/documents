<div class="module-device-add">
    <div class="layui-form">
        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                设备名称
            </label>
            <div class="layui-input-block">
                <input type="text" id="name" name="name" lay-verify="name|required" autocomplete="off" placeholder="请输入设备名称"
                    class="layui-input">
            </div>
        </div>
    
        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                设备编码
            </label>
            <div class="layui-input-block">
                <input type="text" id="deviceid" name="deviceid" lay-verify="deviceid|required" autocomplete="off" placeholder="请输入设备编码"
                    class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                设备型号
            </label>
            <div class="layui-input-block ">
                <select name="model" lay-filter="model">
                    <option value="2">立式机</option>
                    <option value="1">平板</option>
                </select>
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                使用类型
            </label>
            <div class="layui-input-block">
                <input type="radio" lay-filter="usetypeRadio" name="usetype" value="1" title="进" checked="">
                <input type="radio" lay-filter="usetypeRadio" name="usetype" value="2" title="出">
                <input type="radio" lay-filter="usetypeRadio" name="usetype" value="3" title="进&出">
            </div>
        </div>
    
        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                入库人员
            </label>
            <div class="layui-input-block">
                <input type="text" id="operator" name="operator" lay-verify="operator|required" autocomplete="off" placeholder="请输入入库人员姓名"
                    class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                采购单位
            </label>
            <div class="layui-input-block">
                <input type="text" id="purchase" name="purchase" lay-verify="purchase|required" autocomplete="off" placeholder="请输入采购单位名称"
                    class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">
                <em class="hs-require-tips">*</em>
                安装地点
            </label>
            <div class="layui-input-block">
                <input type="text" id="installaddress" name="installaddress" lay-verify="installaddress|required" autocomplete="off" placeholder="请输入安装地点"
                    class="layui-input">
            </div>
        </div>
    
        <div class="layui-form-item hs-align-center">
            <button class="layui-btn element-submit" lay-submit="element-submit" lay-filter="element-submit">添加</button>
        </div>
    </div>
    
</div>