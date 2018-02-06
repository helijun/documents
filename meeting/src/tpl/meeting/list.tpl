<div class="module-meeting-list">
    <div class="table-container">

        <!-- 表格查询头部 -->
        <div class="hs-align-right table-search layui-form">
            <div class="layui-inline layui-form-label hs-float-left element-title">会议列表</div>
                
            <div class="layui-inline">
                <div class="layui-input-inline">
                    <button class="layui-btn element-add-device" lay-submit="" lay-filter="" id="addMeeting">+ 创建会议</button>
                </div>
            </div>
        </div>

        <!-- 数据表的内容部分 -->
        <div class="table-content">
            <table class="layui-hide" id="tableContent" lay-filter="meetingListTable"></table>
        </div>
    </div>

    <!-- 删除弹出确认框 -->
    <div class="layui-hide" id="delDialog">
        删除后不可恢复，确定删除会议吗？
    </div>

    <!-- 添加弹出确认框 -->
    <div class="layui-hide" id="addDialog">
        <div class="layui-form" action="">
            <div class="layui-form-item">
                <label class="layui-form-label">设备型号</label>
                <div class="layui-input-block">
                    <select name="interest" lay-filter="">
                        <option vaule>请选择</option>
                    </select>
                </div>
            </div>
            
            <div class="layui-form-item">
                <label class="layui-form-label">Mac地址</label>
                <div class="layui-input-block">
                    <input type="text" name="title" lay-verify="title" autocomplete="off" placeholder="请输入Mac地址" class="layui-input">
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">生产日期</label>
                <div class="layui-input-block">
                    <select name="interest" lay-filter="">
                        <option>请选择</option>
                    </select>
                </div>
            </div>

            <div class="layui-form-item">
                <label class="layui-form-label">软件版本</label>
                <div class="layui-input-block">
                    <select name="interest" lay-filter="">
                        <option>请选择</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 二维码栏 -->
<script type="text/html" id="meetingQrToolbar">
    <i class="icon-qr" lay-event="qr"></i>
</script>