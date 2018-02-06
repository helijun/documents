<div class="module-meeting-vip">
    <div class="element-container">
        <div class="hs-align-right element-header">
            <div class="layui-inline hs-float-left element-title">
                <a href="#" id="gobackMeetingList">会议列表</a>
                <a href="#" id="gobackMeetingJoin">/ 参会名单</a>
                <span>/ 添加普通嘉宾</span>
            </div>
        </div>
        <div class="element-form-content layui-form">
            <div class="layui-form-item">
                <label class="layui-form-label">姓名</label>
                <div class="layui-input-inline">
                    <input type="text" name="name" lay-verify="name|required" autocomplete="off" placeholder="参会人姓名" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">性别</label>
                <div class="layui-input-block">
                    <input type="radio" name="sex" value="1" title="男" checked="">
                    <input type="radio" name="sex" value="0" title="女">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">手机</label>
                <div class="layui-input-inline">
                    <input type="text" name="phonenumber" lay-verify="phonenumber|required" autocomplete="off" placeholder="参会人手机号" class="layui-input">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">人脸照片上传</label>
                <div class="layui-input-block hs-flex">
                    <div class="vip-face-select" id="faceImg"></div>
                    <div class="element-desc vip-face-desc">
                        <p>请选择本地图片大小不超过2M 图片支持jpg、jpge、png格式</p>
                    </div>
                    <input type="hidden" name="faceimage"/>
                </div>
            </div>
            <div class="layui-form-item hs-align-center">
                <button class="layui-btn element-save" lay-submit="element-save" lay-filter="element-save">保存</button>
            </div>
        </div>
    </div>
</div>