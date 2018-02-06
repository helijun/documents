<div class="module-user-list">
    <div class="table-container">
        <!-- 表格查询头部 -->
        <div class="hs-align-right table-search layui-form">
            <div class="layui-inline layui-form-label hs-float-left element-title">授权账号列表 </div>
                
            <div class="layui-inline">
                <div class="layui-input-inline module-input-border">
                    <input type="text" id="keyword" name="title" lay-verify="title" autocomplete="off" placeholder="请输入需要查找的账号或单位名称" class="layui-input">
                    <button class="layui-btn" lay-submit="" lay-filter="" id="doSearch">
                         <i class="icon-search-white"></i>
                    </button>
                </div>
            </div>
            <!-- 需要做数据权限控制 -->
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button class="layui-btn element-add-device" lay-submit="" lay-filter="" id="addUser">+ 创建账号</button>
                </div>
            </div>
        </div>

        <!-- 数据表的内容部分 -->
        <div class="table-content">
            <div class="element-count-data"></div>
            <table class="layui-hide" id="tableContent" lay-filter="userListTable" ></table>
        </div>
    </div>

    <!-- 注销弹出确认框 -->
    <div class="layui-hide" id="delDialog">
        注销账号将清空所有账号相关信息，你确定要注销此账号？
    </div>
</div>
<!-- 表单操作部分 -->
<script type="text/html" id="tableEdit">
    <a class="hs-color-base" lay-event="edit">重置密码</a>
    <!-- <a class="hs-color-base" lay-event="del">注销</a> -->
</script>