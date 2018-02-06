<div class="module-meeting-form-success">
    <div class="element-title">
        <%= title %>

        <!-- <i class="hs-float-right icon-question-full"></i> -->
    </div>
    <div class="element-tips">
        <i class="icon-success-plus"></i>
        <p>恭喜您报名成功！</p>
    </div>

    <div class="element-time">
        举办时间：<span><%= holdtimestart.substring(5, 16) %> 至 <%= holdtimeend.substring(5, 16) %></span>
    </div>
    <div class="element-address">
        举办单位：<span><%= sponsorname %></span>
    </div>
    <div class="element-address">
        举办地点：<span><%= address %></span>
    </div>
    <div class="element-address">
        联系人员：<span><%= principal %> <a href="tel:<%= tel %>">(<%= tel %>)</a></span>
    </div>

    <div class="element-before-time">
        <em>*</em>请您在<%= signinstarttime.substring(0, 16) %> 至 <%= signinendtime.substring(0, 16) %>内完成会议签到(通过刷脸完成签到)，谢谢。
    </div>
</div>