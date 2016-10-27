/**
 * js表单验证，淘自github，经过相关改造，现通用微信、app端所有表单页面
 * 
 * date 2016-08-29 
 */
;(function(win, undefined){

    var regItem = {
        // 是否为必填
        required: function(field) {
            var value = field.value;

            //判断是不是单选框，多选框的可能
            if(field.type === 'checkbox' || field.type === 'radio'){
                return field.checked === true;
            }
            return value !== null && value !== '';
        },
        //最大长度
        maxLength: function(field, length){
            var value = field.value;
            return value.length <= length;
        },
        //最小长度
        minLength: function(field, length){
            var value = field.value;
            return value.length >= length;
        }

    };

    var formValidate = function(form){
        this.form = document.forms[form];
        this.options = []
    };

    formValidate.prototype = {
        add: function(opts){
            
            var self = this;
            self.options.push(opts);
            return self;
        },
        remove: function(elem){
            var self = this, i = 0, j, len = self.options.length;

            for(; i < len; i++){
                if(elem.trim() === self.options[i].name.trim()){
                    j = i;
                }
            }
            self.options.splice(j,1);
            return self;
        },
        valid: function(){
            var self = this, i = 0, len = self.options.length;

            for(; i < len; i++){
                if(validate.call(self, self.options[i]) === false){
                    return false;
                }
            }
            return true;
        }

    };
    
    win.formValidate = formValidate;

    function validate(opts){
        var el = this.form[opts.name], i = 0;

        if(opts.rules){
            for(; i < opts.rules.length; i++){
                var valiReg = true, valiStr = true;
                if(typeof opts.rules[i] != 'string'){
                    valiReg = validateReg(el, opts.rules[i])
                }else{
                    valiStr = validateString(el, opts.rules[i])
                }

                if(!valiReg || !valiStr){
                    alertMessage.call(this, opts, opts.message[i]);
                    return false;
                }
            }
        }else if(opts.sameTo){
            var selfValue = el.value;
            var targetValue = this.form[opts.sameTo].value;
            if(selfValue !== targetValue){
                alertMessage.call(this, opts, opts.message[i]);
                return false;
            }
        }

        return true;
    }

    function alertMessage(opts, message){
        var errorEle = document.createElement('div');
        	errorEle.className = 'errorMessage';
        	
        var nodeEles = document.getElementsByClassName('errorMessage');

        if(nodeEles.length === 0){
            document.getElementsByTagName('body')[0].appendChild(errorEle);
        }
        
        var errEl = document.getElementsByClassName('errorMessage')[0];
	        errEl.innerHTML = message;
	        errorMessageStyle(errEl);
	        
        if(opts.callback){
            opts.callback(this.form[opts.name], errEl)
        }
    }

    function errorMessageStyle(errEl){

        errEl.style.display = 'block';

        if(!/animated fadeOut/.test(errEl.className)){
            errEl.className += ' animated fadeOut';
        }
        
        errEl.addEventListener('webkitAnimationEnd',endAnime);
        errEl.addEventListener('animationend',endAnime);

        function endAnime(){
            removeClass(errEl,'animated');
            removeClass(errEl,'fadeOut');
            errEl.style.display = 'none'
        }

    }


    function validateReg(el, rule){
        return rule.test(el.value)
    }

    function validateString(el, rule){
        var result,ruleArr = /(\w+)/ig.exec(rule);

        //不带参数的规则处理
        if(ruleArr[1] === ruleArr.input){
            result = regItem[ruleArr.input](el);

        }else{
            //带参数的规则处理，如：maxLength
            ruleArr = /(\w+)\((\d+)/ig.exec(rule);
            result = regItem[ruleArr[1]](el, ruleArr[2]);
        }
        return result
    }


    function removeClass(ele, oldClass){
        var classNames = ele.className.trim();
        	classNames = classNames.replace(/\s+/g,' ');
        
        var classNameArr = classNames.split(' ');
        for(var j = 0; j<classNameArr.length; j++){
            if(oldClass === classNameArr[j]){
                classNameArr.splice(j,1)
            }
        }
        return ele.className = classNameArr.join(' ');
    }
    
    function cssStyle(){
        var cssStyle = document.createElement('style');
	        cssStyle.type = 'text/css';
	        cssStyle.innerHTML = '.errorMessage{position:fixed;top:30%;right:0;left:0;display:block;margin:auto;padding:2.5%;width:60%;-webkit-border-radius:4px;background-color:rgba(0,0,0,.7);color:#fff;text-align:center;font-size:16px;transform:translateY(-50%);-ms-transform:translateY(-50%)}.animated{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-fill-mode:both;animation-fill-mode:both}@-webkit-keyframes fadeOut{50%{opacity:1}to{opacity:0}}@keyframes fadeOut{50%{opacity:1}to{opacity:0}}.fadeOut{-webkit-animation-name:fadeOut;animation-name:fadeOut}';

        document.head.appendChild(cssStyle);
    }
    
    cssStyle();

}(window));




