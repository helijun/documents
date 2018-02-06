<div class="module-meeting-qr">
    <p class="element-title">
        <span>
            {{d.title}}
        </span>
    </p>
    <div class="element-qr"></div>

    <div class="element-list">
        <div class="element-list-content">
            <div><dd>举办单位：</dd>
                <span>{{d.name }}</span>
            </div>
            <div><dd>举办时间：</dd>
                <span>{{d.holdtimestart }} 至 {{d.holdtimeend }}</span>
            </div>
            <div><dd>联系人员：</dd>
                <span>{{d.principal }}</span>
            </div>
            <div><dd>联系电话：</dd>
                <span>{{d.tel }}</span>
            </div>
        </div>
    </div>
    
    <div class="layui-form-item hs-align-center" id="doPrintDiv">
        <button class="layui-btn element-print" lay-submit="element-print" lay-filter="element-print" id="doPrint">打 印</button>
    </div>

    <div class="element-footer-bg">
        <img class="hs-full-img" src="{{ENV.PAGE}}img/apply/meeting-bottom.png" alt="">
    </div>
</div>