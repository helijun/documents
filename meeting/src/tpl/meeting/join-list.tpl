<div class="module-meeting-join">
    <div class="element-container">
        <div class="hs-align-right element-header layui-form">
            <div class="layui-inline hs-float-left element-title">
                <a id="gobackMeetingList">会议列表</a>
                <span>/参会名单</span>
            </div>
                
            <div class="layui-inline">
                <div class="layui-input-inline module-input-border">
                    <input type="text" id="keyword" name="keyword" lay-verify="title" autocomplete="off" placeholder="请输入人员姓名或手机号" class="layui-input">
                    <button class="layui-btn" lay-submit="" lay-filter="" id="doSearch">
                        <i class="icon-search-white"></i>
                    </button>
                </div>
            </div>
            <div class="layui-inline">
                {{# if(dateFormat.utils.startAndEndDif(new Date(), d.holdtimestart.replace(/-/g, '/').replace(/-/g, '/')) < 0){ }}
                    <div class="layui-input-inline">
                        <button class="layui-btn element-add-guest disable" title="已到会议举办时间，不能再添加嘉宾">
                        + 添加嘉宾</button>
                    </div>
                {{# }else{ }}
                    <div class="layui-input-inline">
                        <button class="layui-btn element-add-guest" lay-submit="" lay-filter="" id="addGuest">
                        <i class="icon-add"></i> 添加嘉宾</button>
                    </div>
                {{# } }}
                <div class="layui-input-inline">
                    <button class="layui-btn element-export-data" lay-submit="" lay-filter="" id="exportData"><i class="icon-download"></i> 导出数据</button>
                </div>
            </div>
        </div>

        <!-- 数据表的内容部分 -->
        <div class="table-content">
            <div class="element-count-data"></div>
            <table class="layui-hide" id="tableContent" lay-filter="joinListTable"></table>
        </div>
    </div>
</div>
<!-- 添加嘉宾弹框 -->
<div class="layui-hide" id="addGuestDialog">
    <div class="guest-dialog-content">
        <button class="layui-btn element-add-vip" lay-submit="" lay-filter="" id="addVip">添加VIP嘉宾</button>
        <button class="layui-btn element-add-normal" lay-submit="" lay-filter="" id="addNormal">添加普通嘉宾</button>
    </div>
</div>
