define([
    'jquery',
    'underscore',
    'common',
    'css!css/device/list'
], function(
    $, 
    _, 
    HSKJ
){
    return function() {


        HSKJ.renderTpl('.module-container', 'text!tpl/device/list.tpl', { 'name': 345 }, function () {
            console.log('rend success')
        })
        console.log('render list')
    }}
)