<div class="module-meeting-detail">
    <div class="hs-align-right element-header layui-form">
        <div class="layui-inline hs-float-left element-title">
            <a href="#" id="gobackMeetingList">会议列表</a>
            <span>/ 会议详情</span>
        </div>
    
        <div class="layui-inline">
            <p class="element-create-time">创建时间：{{ d.createtime.substring(0, 10)}}</p>
        </div>
    </div>
    <div class="element-desc">
        <div class="element-desc-content">
            <p>会议名称：
                <span>{{d.title}}</span>
            </p>
            <p>会议介绍：
                {{#  if(d.content.length > 145){ }}
                <span>{{ d.content.substr(0,145)+'...' }}</span>
                {{#  }else{ }}
                <span>{{ d.content || '' }}</span>
                {{# } }}
            </p>
            <p>会议时间：
                <span>{{d.holdtimestart.substr(0, 16) }} 至 {{d.holdtimeend.substr(0, 16) }}</span>
            </p>
            <p>会议地点：
                <span>{{d.address || ''}}</span>
            </p>
        </div>
    </div>
    <div class="element-content">
        <div class="element-content-center">
            <div class="element-statistics">
                <p class="element-title">数据统计</p>
                <div class="hs-flex">
                    <div class="element-statistics-list card-one">
                        <p class="element-count">{{d.employees || 0}}</p>
                        <p class="element-text">表单提交量(人)</p>
                    </div>
                    <div class="element-statistics-list card-two">
                        <p class="element-count">{{d.visits || 0}}</p>
                        <p class="element-text">表单浏览量(次)</p>
                    </div>
                    <div class="element-statistics-list card-three">
                        <p class="element-count">{{d.commits || 0}}</p>
                        <p class="element-text">今日提交量(人)</p>
                    </div>
                    <div class="element-statistics-list card-four">
                        <p class="element-count">{{d.employeerecords || 0}}</p>
                        <p class="element-text">完成签到数(人)</p>
                    </div>
                </div>

                <div class="element-info">
                    <p class="element-title">报名信息</p>
                    <p>报名时间：
                        <span>{{d.applystarttime.substr(0, 16) }} 至 {{d.applyendtime.substr(0, 16) }}</span>
                    </p>
                    <p>报名地址：
                        <span><a target="_blank" href="{{d.applyUrl }}">{{d.applyUrl }}</a></span>
                        <span class="element-qr" id="meetingDetailQr"></span>
                    </p>
                </div>
                <div class="element-sign-in">
                    <p class="element-title">签到信息</p>
                    <p>签到时间：
                        <span>{{d.signinstarttime.substr(0, 16) }} 至 {{d.signinendtime.substr(0, 16) }}</span>
                    </p>
                    <p>签到地址：
                        <span>{{d.signinaddress}}</span>
                    </p>
                    <p>签到设备：
                        <span>{{d.names}}</span>
                    </p>
                </div>

                <div class="layui-form-item hs-align-center">
                    <button class="layui-btn element-goback" lay-submit="" lay-filter="">返回</button>
                </div>
            </div>
        </div>
    </div>

    
</div>