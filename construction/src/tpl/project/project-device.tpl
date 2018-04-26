<div class="module-device-list">
    <div class="table-container">
        <!-- 表格查询头部 -->
        <div class="hs-align-right table-search layui-form">
            <div class="layui-inline hs-float-left element-title">
                <a class="m-hover-href" href="#project-list" title="返回项目列表">项目列表</a>
                <span href="">/ {{d.pname}} / </span>
                <span>
                    <cite>设备信息列表</cite>
                </span>
            </div>
             
            {{#  if(d.roleid == -1){ }}
            <div class="layui-inline">
                <label class="layui-form-label">所属机构</label>
                <div class="layui-input-inline">
                    <select name="organizationList" lay-filter="organizationList" lay-search="">
                        <option value="">请选择或输入所属机构</option>
                    </select>
                </div>
            </div>
            {{# } }}

            <!-- 设备状态(1：使用中，2：故障，0：闲置)  -->
            <div class="layui-inline">
                <label class="layui-form-label">状态</label>
                <div class="layui-input-inline">
                    <select name="deviceStatus" lay-filter="deviceStatus">
                        <option value="">全部</option>
                        <option value="1">使用中</option>
                        <option value="2">故障</option>
                        <option value="3">闲置</option>
                    </select>
                </div>
            </div>

            <div class="layui-inline">
                <div class="layui-input-inline module-input-border">
                    <input type="text" id="keyword" name="keyword" lay-verify="title" autocomplete="off" placeholder="请输入设备名称" class="layui-input">
                    <button class="layui-btn" lay-submit="" lay-filter="" id="doSearch">
                        <i class="icon-search-white"></i>
                    </button>
                </div>
            </div>

        </div>

        <!-- 数据表的内容部分 -->
        <div class="table-content">
            {{#  if(d.roleid != 1){ }}
            <div id="addDevice" class="element-device-add">+ 添加</div>
            {{# } }}
            <table class="layui-hide" id="tableContent" lay-filter="deviceListTable"></table>
        </div>
    </div>

</div>