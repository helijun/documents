<div class="module-account-list">

    <div class="table-container">
        <!-- 表格查询头部 -->
        <div class="hs-align-right table-search layui-form">
            <div class="layui-inline layui-form-label hs-float-left element-title">账号列表</div>
            
            <div class="layui-inline">
                <label class="layui-form-label">状态</label>
                <div class="layui-input-inline">
                    <select name="organizationStatus" lay-filter="organizationStatus">
                        <option value="">全部</option>
                        <option value="1">正常</option>
                        <option value="2">注销</option>
                    </select>
                </div>
            </div>
            
            <div class="layui-inline">
                <div class="layui-input-inline module-input-border">
                    <input type="text" id="keyword" name="keyword" lay-verify="title" autocomplete="off" placeholder="请输入机构名称搜索" class="layui-input">
                    <button class="layui-btn" lay-submit="" lay-filter="" id="doSearch">
                        <i class="icon-search-white"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- 数据表的内容部分 -->
        <div class="table-content">
            <div id="addAccount" class="element-account-add">+ 添加</div>
            <table class="layui-hide" id="tableContent" lay-filter="accountListTable"></table>
        </div>
    </div>

</div>