<div class="module-device-list">
    {{# if(d.roleid == 1){ }}
        <ul class="hs-tabs-across">
            <!-- 公用的水平tabs -->
            <li class="tabs-item active" data-status="4">
                <p>已激活设备</p>
            </li>
            <li class="tabs-item" data-status="1">
                <p>未激活设备</p>
            </li>
        </ul>
    {{# } }}

    <div class="table-container" 
        {{# if(d.roleid != 1){ }}
         style="margin: 0px"
        {{# } }}
    >
        <!-- 表格查询头部 -->
        <div class="hs-align-right table-search layui-form">
            <div class="layui-inline layui-form-label hs-float-left element-title">设备信息列表</div>
            <div class="layui-inline" id="searchDeviceDiv">

                {{# if(d.roleid == 1){ }}
                <label class="layui-form-label">激活日期</label>
                <div class="layui-input-inline">
                    <input type="text" class="layui-input" id="activationDate" placeholder="请选择激活日期" readonly/>
                </div>
                {{# } }}
                {{# if(d.roleid == 2){ }}
                <label class="layui-form-label">绑定日期</label>
                <div class="layui-input-inline">
                    <input type="text" class="layui-input" id="activationDate" placeholder="请选择绑定日期" readonly/>
                </div>
                {{# } }}

            </div>
            <div class="layui-inline">
                <div class="layui-input-inline module-input-border">
                    <input type="text" id="keyword" name="keyword" lay-verify="title" autocomplete="off" placeholder="请输入设备mac地址或授权单位" class="layui-input">
                    <button class="layui-btn" lay-submit="" lay-filter="" id="doSearch">
                        <i class="icon-search-white"></i>
                    </button>
                </div>
            </div>

            <!-- 需要做数据权限控制 -->
            <div class="layui-inline layui-hide" id="addDeviceDiv">
                <div class="layui-input-inline">
                    <button class="layui-btn element-add-device" lay-submit="" lay-filter="" id="addDevice">+ 
                        {{#  if(d.roleid == 1){ }}
                            添加设备
                        {{#  }else{ }} 
                            绑定设备
                        {{# } }}
                    </button>
                </div>
            </div>
        </div>

        <!-- 数据表的内容部分 -->
        <div class="table-content">
            <div id="totalinfo" class="element-count-data"></div>
            <table class="layui-hide" id="tableContent" lay-filter="deviceListTable"></table>
        </div>
    </div>

</div>