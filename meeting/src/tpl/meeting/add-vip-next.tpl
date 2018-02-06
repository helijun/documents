<div class="module-meeting-vip-next">
    <div class="element-container">
        <div class="hs-align-right element-header">
            <div class="layui-inline hs-float-left element-title">
                <a href="#" id="gobackMeetingList">会议列表</a>
                <a href="#" id="gobackMeetingJoin">/ 参会名单</a>
                <span>/ 添加VIP嘉宾</span>
            </div>
        </div>
        <div class="hs-flex element-welcome">
            <div class="element-form-content layui-form">
                <div class="layui-form-item">
                    <label class="layui-form-label">设置VIP欢迎语</label>
                    <div class="layui-input-inline">
                        <input type="text" name="viptitle" lay-verify="viptitle" autocomplete="off" placeholder="例如“诚邀XXXX先生/女士参加.....”" class="layui-input">
                        <div class="element-input-tips">20字以内</div>
                    </div>
                </div>
            
                <div class="layui-form-item hs-align-center">
                    <button class="layui-btn element-save" lay-submit="element-save" lay-filter="element-save">保存</button>
                </div>
            </div>
            <div class="content-right">
                <p class="element-title">预览区：</p>
                <ul class="hs-tabs-across switch-pad-machine">
                    <!-- 公用的水平tabs -->
                    <li class="tabs-item active" data-show="element-pad">
                        <p>平板</p>
                    </li>
                    <li class="tabs-item" data-show="element-machine">
                        <p>立式机</p>
                    </li>
                </ul>
                <div class="hs-tabs-content">
                    <div class="element-pad">
                        <div class="sub-tabs-content">
                            <div class="element-pad-screen"></div>
                            <div class="element-pad-recognize layui-hide"></div>
                        </div>
                    </div>
                    <div class="element-machine layui-hide">
                        <div class="element-machine-content"><!-- 
                            <dl class="sub-tabs">
                                <dd class="sub-tabs-item active" data-show="element-machine-screen">屏保</dd>
                                <dd class="sub-tabs-item" data-show="element-machine-recognize">识别界面</dd>
                            </dl>
                 -->
                            <div class="sub-tabs-content">
                                <div class="element-machine-screen"></div>
                                <div class="element-machine-recognize layui-hide"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>