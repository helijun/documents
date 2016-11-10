<script id="headerTpl" type="text/html">
    <div class="col-xs-3 nav-btn">
        {{each navBtn as value i}}
            <a href="{{value.href}}">
                <button type="button" class="btn btn-{{if value.isCheck}}success{{else}}default{{/if}}">{{value.name}}</button>
            </a>
        {{/each}}
    </div>
    <div class="col-xs-6 nav-title">
        <h1>{{title}}</h1>
    </div>
    <div class="col-xs-3">
        <div class="row text-center" id="currentTime">
            <h4>{{time}}</h4>
        </div>
        <div class="row text-right">
            <div class="col-xs-9" id="userName">
                <h4>欢迎您，{{user.name}}</h4>
            </div>
            <div class="col-xs-3">
                <button type="button" class="btn btn-warning" id="logoutBtn">退出登录</button>
            </div>
        </div>
    </div>
</script>