<div class="module-meeting-add">
    <div class="element-container">
        <div class="hs-align-right element-header layui-form">
            <div class="layui-inline layui-form-label hs-float-left element-title">
                <a href="#" id="gobackMeetingList">会议列表</a>
                <span>/创建会议</span>
            </div>
                
            <div class="layui-inline">
                    <!-- <div class="element-description" lay-submit="" lay-filter="" id="description">
                        <i class="icon-question-full"></i>    
                        <span>操作说明</span>
                    </div> -->
            </div>
        </div>

        <!-- 步骤条部分 -->
        <div class="element-step">
            <ul class="element-step-ul">
                <li class="element-step-list element-step-one element-can-click active" data-content="meeting-info">会议信息<i></i></li>
                <li class="element-step-list element-step-two" data-content="apply-form">报名表单<i></i></li>
                <li class="element-step-list element-step-three" data-content="enter-info">签到信息<i></i></li>
                <li class="element-step-list element-step-four" data-content="meeting-success">完成创建<i></i></li>
            </ul>
            <div class="element-dashed"></div>
        </div>

        <div class="element-content">
            <!-- 会议信息 -->
            <div class="meeting-info hs-flex">
                <div class="content-left layui-form">
                    <div class="layui-form-item">
                        <label class="layui-form-label"><em>*</em>会议标题</label>
                        <div class="layui-input-inline">
                            <input type="text" name="title" id="meetingTitle" lay-verify="required|meetingTitle" autocomplete="off" placeholder="请输入会议标题" class="layui-input" maxlength="20">
                            <div class="element-input-tips">20字以内</div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <em>*</em>会议内容</label>
                        <div class="layui-input-inline">
                            <textarea placeholder="请输入会议内容" name="content" id="meetingContent" lay-verify="required|meetingContent" class="layui-textarea" maxlength="150"></textarea>
                            <div class="element-input-tips">20~150字以内</div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <em>*</em>举办时间</label>
                        <div class="layui-input-inline element-datetime-input">
                            <input type="text" name="meetingdatetime" id="meetingdatetime" lay-verify="required|meetingdatetime" autocomplete="off" placeholder="请选择举办时间" class="layui-input" readonly>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <em>*</em>举办地点</label>
                        <div class="layui-input-inline">
                            <input type="text" name="address" id="meetingLocation" lay-verify="required|meetingLocation" autocomplete="off" placeholder="请输入举办地点" class="layui-input" maxlength="100">
                            <div class="element-input-tips">50字以内</div>
                        </div>
                    </div>
                    <div class="layui-form-item hs-align-center">
                        <button class="layui-btn element-save" lay-submit="element-save" lay-filter="element-save">保存</button>
                    </div>
                </div>
                <div class="content-right">
                    <p class="element-title">预览区：</p>
                    <div class="element-mobile">
                        <div class="element-mobile-content">
                            <!-- 所有要联动的以change-开头 -->
                            <div class="change-meeting-info-title"><!-- 禾思科技2017年会 --></div>             
                            <div class="change-meeting-info-content"> <!-- 禾思科技 2017 年会介XXX XXXXXXXXXXXXXXXXXXXXXX XXXXXXXXXXXXXXXXXXXXXX XXXXXXX --></div>
                            <div class="change-meeting-info-datetime">
                                举办时间：<span><!-- 17.12.08 08:30- 1712.08 11:30 --></span>
                            </div>
                            <div class="change-meeting-info-location">
                                 举办地点：<span><!-- 深圳市南山区生态科技 厦1单元3603 --></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <!-- 报名表单 -->
            <div class="apply-form hs-flex layui-hide">
                <div class="content-left layui-form">
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <em>*</em>报名有效期</label>
                        <div class="layui-input-inline">
                            <input type="text" name="meetingapplytime" id="meetingApplyTime" lay-verify="required|meetingApplyTime" autocomplete="off" placeholder="请选择报名有效期" class="layui-input" readonly>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            表头设置
                            <br>
                            <span class="sub-label">（非必填项）</span>
                        </label>
                        <div class="layui-input-block">
                            <p class="element-sub-title">1.上传背景图片</p>

                            <div class="form-header-set">
                                <div class="form-header-select" id="uploadHeaderImg">
                                    
                                </div>
                                <div class="form-header-desc">
                                    <p>背景图片尽量保持简洁 <em class="form-header-example">示例</em></p>
                                    <p>本地上传图片支持png / jpg格式，10M以内，640px*250px</p>
                                </div>
                            </div>
                            <p class="element-sub-title">2.邀请语设置</p>
                            <div class="layui-input-inline element-recommend">
                                <input type="text" name="invitetitle"  id="recommend" autocomplete="off" placeholder="诚邀您" class="layui-input" maxlength="20">
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <em>*</em>报名表设置</label>
                        <div class="layui-input-block">
                            <!-- TODO可扩展表单字段 -->
                            <span class="element-diy-form">姓名</span>
                            <span class="element-diy-form">手机</span>
                            <span class="element-diy-form">人脸照片</span>
                        </div>
                    </div>
                    <div class="layui-form-item hs-align-center">
                        <button class="layui-btn element-save" lay-submit="element-save2" lay-filter="element-save2">保存</button>
                    </div>
                </div>
                <div class="content-right">
                    <p class="element-title">预览区：</p>
                    <div class="element-mobile">
                        <div class="element-mobile-content">
                            <!-- 所有要联动的以change-开头 -->
                            <div class="change-apply-form-headimg">
                                <p class="element-title change-meeting-info-title"><!-- 禾思科技2017年会 --></p>
                            </div>
                            <div class="change-apply-form-recommend"> 
                                <p class="element-recommend-start">诚邀您</p>
                                <p class="element-recommend-text change-meeting-form-recommend"><!-- 参加禾思科技2017年会参加禾思科技2017年会参加禾思科技2017年会 --></p>
                            </div>
                            <div class="change-apply-form-diy"><!-- TODO 后期todo预留，现全部是静态 -->
                                <p class="element-form-tips">请填写下列表单完成报名</p>
                                <div class="element-diy-form">
                                    <div class="diy-form-item hs-flex">
                                        <label class="diy-form-label">姓名</label>
                                        <div class="diy-input-inline"></div>
                                    </div>
                                    <div class="diy-form-item hs-flex">
                                        <label class="diy-form-label">手机</label>
                                        <div class="diy-input-inline"></div>
                                    </div>
                                    <div class="diy-form-item hs-flex">
                                        <div class="diy-input-inline"></div>
                                        <div class="diy-btn element-element-code">验证码</div>
                                    </div>              
                                    <div class="diy-form-item hs-flex hs-flex-left-center">
                                        <label class="diy-form-label">人脸照片上传</label>
                                        <div class="diy-upload-file">
                                            <i class="icon-file-upload-default"></i>
                                        </div>
                                    </div>
                                    <div class="diy-btn element-btn-submit">提交</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 签到信息 -->
            <div class="enter-info hs-flex layui-hide">
                <div class="content-left layui-form" lay-filter="enter-info-form">
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <em>*</em>签到有效期</label>
                        <div class="layui-input-inline">
                            <input type="text" name="meetingsigntime" id="meetingsigntime" lay-verify="required|meetingsigntime" autocomplete="off" placeholder="请选择签到有效期" class="layui-input" readonly>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <em>*</em>签到地址</label>
                        <div class="layui-input-inline">
                            <input type="text" name="signinaddress" id="meetingSignLocation" lay-verify="required|meetingSignLocation" autocomplete="off" placeholder="请输入签到地址" class="layui-input" maxlength="20">
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            <em>*</em>签到欢迎语</label>
                        <div class="layui-input-inline">
                            <input type="text" name="signinwelcome" id="meetingSignWelcome" lay-verify="required|meetingSignWelcome" autocomplete="off" placeholder="请输入签到欢迎语" class="layui-input" maxlength="20">
                            <div class="element-input-tips">20字以内</div>
                        </div>
                    </div>
                    <div class="layui-form-item">
                        <label class="layui-form-label">
                            签到设备</label>
                        <div class="layui-input-block">
                            {{# if(d.hasMachineType == 1){ }}
                                <div class="layui-form-mid layui-word-aux">平板</div>
                            {{# }else if(d.hasMachineType == 2){ }}
                                <div class="layui-form-mid layui-word-aux">立式机</div>
                            {{# }else if(d.hasMachineType == 3){ }}
                                <div class="layui-form-mid layui-word-aux">立式机</div>
                                <div class="layui-form-mid layui-word-aux">平板</div>
                            {{# } }}
                        </div>
                    </div>

                    <label class="layui-form-label element-module-set">
                        <em>*</em>签到模板设置
                    </label>
                    
                    <div class="layui-form-item {{ d.hasMachineType == 1?'layui-hide':'' }}">
                        <label class="layui-form-label">立式机</label>
                        <!-- 设备屏保 -->
                        <div class="layui-input-block">
                            <div class="layui-form-mid layui-word-aux">1.签到屏保设置</div>
                            <div class="hs-checkbox" name="machine-screen-diy" data-show="area-machine-screen">
                                <i class="icon-checkbox-select"></i>
                                自定义屏保
                            </div>
                            <div class="hs-checkbox" name="machine-screen-default" data-show="area-machine-screen">
                                <i class="icon-checkbox-selected"></i>
                                默认屏保
                            </div>
                        </div>
                        <div class="layui-input-block hs-flex layui-hide" data-area="area-machine-screen">
                            <div class="machine-screen-select" id="uploadMachineScreenImg"></div>
                            <div class="element-desc machine-screen-desc">
                                <p class="element-example machine-screen-example">示例</p>
                                <p>本地上传图片支持png / jpg格式，10M以内，1920px*1080px</p>
                            </div>
                        </div>
                        <br>
                        <!-- 设备识别 -->
                        <div class="layui-input-block">
                            <div class="layui-form-mid layui-word-aux">2.识别界面信息展示</div>
                            <div class="hs-checkbox" name="machine-recognize-diy" data-show="area-machine-recognize">
                                <i class="icon-checkbox-select"></i>
                                自定义海报
                            </div>
                            <div class="hs-checkbox" name="machine-recognize-default" data-show="area-machine-recognize">
                                <i class="icon-checkbox-selected"></i>
                                签到嘉宾展示
                            </div>
                        </div>
                        <div class="layui-input-block layui-hide hs-flex" data-area="area-machine-recognize">
                            <div class="machine-recognize-select" id="uploadMachineRecognizeImg"></div>
                            <div class="element-desc machine-recognize-desc">
                                <p class="element-example machine-recognize-example">示例</p>
                                <p>本地上传图片支持png / jpg格式，10M以内，480px*1080px</p>
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item {{ d.hasMachineType == 2?'layui-hide':'' }}">
                        <label class="layui-form-label">平板</label>
                        <!-- 设备屏保 -->
                        <div class="layui-input-block">
                            <div class="layui-form-mid layui-word-aux">1.签到屏保设置</div>
                            <div class="hs-checkbox" name="pad-screen-diy" data-show="area-pad-screen">
                                <i class="icon-checkbox-select"></i>
                                自定义屏保
                            </div>
                            <div class="hs-checkbox" name="pad-screen-default" data-show="area-pad-screen">
                                <i class="icon-checkbox-selected"></i>
                                默认屏保
                            </div>
                        </div>
                        <div class="layui-input-block layui-hide hs-flex" data-area="area-pad-screen">
                            <div class="pad-screen-select" id="uploadPadScreenImg"></div>
                            <div class="element-desc pad-screen-desc">
                                <p class="element-example pad-screen-example">示例</p>
                                <p>本地上传图片支持png / jpg格式，10M以内，1280px*800px</p>
                            </div>
                        </div>
                    </div>
                    <div class="layui-form-item hs-align-center">
                        <button class="layui-btn element-save" lay-submit="element-complete" lay-filter="element-complete">完成</button>
                    </div>
                </div>
                <div class="content-right">
                    <p class="element-title">预览区：</p>
                    
                    <ul class="hs-tabs-across switch-pad-machine">
                        <!-- 公用的水平tabs -->
                        <li class="tabs-item active {{ d.hasMachineType == 2?'layui-hide':'' }}" data-show="element-pad">
                            <p>平板</p>
                        </li>
                        {{# if(d.hasMachineType == 2){ }}
                            <li class="tabs-item active" data-show="element-machine">
                        {{# }else if(d.hasMachineType == 3 || d.hasMachineType == 1){ }}
                            <li class="tabs-item layui-hide" data-show="element-machine">
                        {{# } }}
                            <p>立式机</p>
                        </li>
                    </ul>
                    <div class="hs-tabs-content">
                        <!-- 平板 -->
                        <div class="element-pad {{ d.hasMachineType == 2?'layui-hide':'' }}">
                            <dl class="sub-tabs">
                                <dd class="sub-tabs-item active" data-show="element-pad-screen">屏保</dd>
                                <dd class="sub-tabs-item" data-show="element-pad-recognize">识别界面</dd>
                            </dl>
                        
                            <div class="sub-tabs-content">
                                <div class="element-pad-screen change-pad-screen">
                                    <p class="change-meeting-info-title"></p>
                                </div>
                                <div class="element-pad-recognize layui-hide">
                                    <p class="change-meeting-info-title"></p>
                                    <p class="change-meeting-info-welcome"></p>
                                </div>
                            </div>
                        </div>
                        <!-- 立式机 -->
                        <div class="element-machine {{ (d.hasMachineType == 1 || d.hasMachineType == 3)?'layui-hide':'' }}">
                            <div class="element-machine-content">
                                <dl class="sub-tabs">
                                    <dd class="sub-tabs-item active" data-show="element-machine-screen">屏保</dd>
                                    <dd class="sub-tabs-item" data-show="element-machine-recognize">识别界面</dd>
                                </dl>
                                
                                <div class="sub-tabs-content">
                                    <div class="element-machine-screen change-machine-screen">
                                        <p class="change-meeting-info-title"></p>
                                    </div>
                                    <div class="element-machine-recognize layui-hide">
                                        <p class="change-meeting-info-title"></p>
                                        <p class="change-meeting-info-welcome"></p>
                                        <div class="change-machine-recognize"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 签到成功 -->
            <div class="meeting-success layui-hide">
                <div class="element-tips">
                    <i class="icon-success"></i> 您的会议已创建成功! 
                </div>
                <div class="element-success-content">
                    <div class="element-meeting-info success-meeting-name">
                        会议名称:
                        <span>XXXXXXXXXXXXXXXX</span>
                    </div>
                    <div class="element-meeting-info success-meeting-datetime">
                        报名表有效期:
                        <span>2017-12-21至2017-12-30</span>
                    </div>
                    <div class="element-meeting-info success-meeting-laction">
                        报名地址:
                        <span>https://meeting.heils.cn/xxxx/xxxxxxxx</span>
                        <p class="element-sub-tips">(报名表地址仅在报名有效期内生效，提前及过期访问将无法填写及提交)</p>
                    </div>
                    <div class="element-meeting-info success-element-qr">
                        <label>报名表地址二维码:</label>
                        <div class="success-meeting-qr"></div>
                    </div>
                    <div class="element-btn">
                        <a href="#" class="layui-btn element-detail">查看会议详情</a>
                        <a href="#" class="layui-btn element-goback">返回会议列表</a>
                    </div>
                </div> 
            </div>
        </div>
    </div>
</div>