<div class="module-meeting-apply">
    <div class="element-title">
        <%= title %>
    </div>
    <p class="element-solid"></p>
    
    <div class="element-content">
        <%= content %>
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
    <div class="element-apply">
        <% if(dateFormat.utils.startAndEndDif(new Date(), applystarttime.replace(/-/g, '/').replace(/-/g, '/')) > 0){ %>
            <a class="disable">暂未到报名时间</a>
        <% }else if(dateFormat.utils.startAndEndDif(new Date(), applyendtime.replace(/-/g, '/').replace(/-/g, '/')) < 0){ %>
            <a class="disable">已过报名时间</a>
        <% }else{ %>
            <a id="enterApply" class="">马上报名</a>
        <% } %>
    </div>
    <div class="element-bottom-img">
        <img class="hs-full-img" src="../../img/apply/meeting-bottom.png" alt="">
    </div>
</div>