<script id="loginRegistTpl" type="text/html">
    <div class="col-xs-4 login-regist row">
        <div class="row">
            <div class="col-xs-6 login" id="loginSpan">
                <button type="button" class="btn btn-danger">登录</button>
            </div>
            <div class="col-xs-6 regist" id="registSpan">
                <a href="/base/regist" onClick="javascript:window.location.href='/base/regist'">
                    <button type="button" class="btn btn-info" id="registSpan">
                    	注册
                    </button>
                </a>
            </div>
        </div>
    </div>
</script>
<script id="headerAvatarTpl" type="text/html">
    <div class="col-xs-4 header-avatar">
        <img title="查看详情" class="img-circle" id="avatar" src="{{if image}}{{$picPath image}}{{else}}/dist/img/default_avatar.png{{/if}}">
        <!-- <span class="caret"></span> -->
    </div>
</script>

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
            <div class="col-xs-3"></div>
            <div class="col-xs-6" id="userName">
                <h4>{{user.name}}</h4>
            </div>
            <div class="col-xs-3">
                <button type="button" class="btn btn-warning" id="logoutBtn">退出登录</button>
            </div>
        </div>
    </div>
</script>