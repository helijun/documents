<div class="module-project-list">

    <div class="table-container">
        <div class="hs-align-center table-value layui-row">
            <div class="layui-col-md4">
                <p class="element-count-title">未开始项目</p>
                <p class="element-count-value">{{# console.log(d)}}{{d.nostart}}个</p>
            </div>
            <div class="layui-col-md4 element-border-left">
                <p class="element-count-title">进行中项目</p>
                <p class="element-count-value">{{d.ongoing}}个</p>
            </div>
            <div class="layui-col-md4 element-border-left">
                <p class="element-count-title">已完成项目</p>
                <p class="element-count-value">{{d.complete}}个</p>
            </div>
        </div>
        
        <!-- 表格查询头部 -->
        <div class="hs-align-right table-search layui-form">
            <div class="layui-inline layui-form-label hs-float-left element-title">项目列表</div>
            
            <div class="layui-inline">
                <div class="layui-tab layui-tab-card" lay-filter="status">
                    <!-- 1:未开始,2:进行中,3:已完成 -->
                    <ul class="layui-tab-title">
                        <li class="layui-this" data-status="">全部</li>
                        <li data-status="1">未开始</li>
                        <li data-status="2">进行中</li>
                        <li data-status="3">已完成</li>
                    </ul>
                </div>
            </div>

            {{#  if(d.roleid == 1){ }}
            <div class="layui-inline">
                <!-- <label class="layui-form-label">所属机构</label> -->
                <div class="layui-input-inline">
                    <select name="organizationList" lay-filter="organizationList" lay-search="">
                        <option value="">请选择或输入所属机构</option>
                    </select>
                </div>
            </div>
            {{# } }}
            
            <div class="layui-inline">
                <div class="layui-input-inline module-input-border">
                    <input type="text" id="keyword" name="keyword" lay-verify="title" autocomplete="off" placeholder="请输入项目名称" class="layui-input">
                    <button class="layui-btn" lay-submit="" lay-filter="" id="doSearch">
                        <i class="icon-search-white"></i>
                    </button>
                </div>
            </div>

        </div>

        <!-- 数据表的内容部分 -->
        <div class="table-content">
            {{#  if(d.roleid == 2){ }}
                <div id="addProject" class="element-project-add">+ 添加</div>
            {{# } }}
            <table class="layui-hide" id="tableContent" lay-filter="projectListTable"></table>
        </div>
    </div>

</div>