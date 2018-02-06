<div class="module-meeting-stat">
    <div class="table-container">

        <!-- 表格查询头部 -->
        <div class="hs-align-right table-search layui-form">
            <div class="layui-inline layui-form-label hs-float-left element-title">会议统计</div>
                
            <div class="layui-inline">
                <div class="layui-input-inline module-input-border">
                    <input type="text" name="keywords" lay-verify="title" autocomplete="off" placeholder="请输入您需要查找的内容" class="layui-input">
                    <button class="layui-btn" lay-submit="" lay-filter="" id="doSearch">
                        <i class="icon-search-white"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- 数据表的内容部分 -->
        <div class="table-content">
            <div class="element-count-data"></div>
            <table class="layui-hide" id="tableContent" lay-filter="meetingStatTable"></table>
        </div>
    </div>

</div>
<!-- 用来存放关联设备弹框的div -->
<div class="layui-hide" id="useDeviceDiv"></div>
<script type="text/html" id="statCountDelToolbar">
    <a class="hs-color-base hs-point" lay-event="del">删除</a>
</script>