<script id="leftNavTpl" type="text/html">
    <ul class="accordion">
        {{each listItem as value i}}
            <li class="{{if i==0}}open{{/if}}">
                <div class="link" data-template="{{value.template}}">
                     {{value.title}}<i class="fa fa-chevron-down">></i>
                </div>
                <ul class="submenu" {{if i==0}}style="display:block"{{/if}}>
                    {{each value.subTitle as value2 i}}
                        <li data-machineId='{{value2.id}}' data-template='{{value.subTemplate}}'>{{value2.name}}</li>
                    {{/each}}
                </ul>
            </li>
        {{/each}}
    </ul>
</script>