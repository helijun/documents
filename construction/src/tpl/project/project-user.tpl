<div class="module-user-list">
    <div class="table-container">
        <!-- 表格查询头部 -->
        <div class="hs-align-right table-search layui-form">
            <div class="layui-inline hs-float-left element-title">
                <a class="m-hover-href" href="#project-list" title="返回项目列表">项目列表</a>
                <span href="">/ {{d.pname}} / </span>
                <span>
                    <cite>人员列表</cite>
                </span>
            </div>
                
            <div class="layui-inline">
                <div class="layui-input-inline module-input-border">
                    <input type="text" id="keyword" name="title" lay-verify="title" autocomplete="off" placeholder="请输入需要查找的姓名" class="layui-input">
                    <button class="layui-btn" lay-submit="" lay-filter="" id="doSearch">
                         <i class="icon-search-white"></i>
                    </button>
                </div>
            </div>
        </div>

        <div class="table-content">
            {{# if(d.roleid == 2){ }}
                <div id="addProjectUser" class="element-user-add">+ 添加</div>
            {{# } }}
            <table class="layui-hide" id="tableContent" lay-filter="userListTable" ></table>
        </div>
    </div>


</div>
