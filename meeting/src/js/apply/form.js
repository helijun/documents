
require(
[
    'jquery',
    'underscore',
    'common'
],
function ($, _, HSKJ) {
    var index = {
        init: function () {
            this.renderHtml();
            this.wactch();
        },

        renderHtml: function (data) {
            var self = this;
            require(['text!tpl/apply/index.tpl'], function (html) {
                $('article').html(_.template(html)(data || {}));
            })
        },

        wactch: function () {
            
        }
    }
    index.init();
})