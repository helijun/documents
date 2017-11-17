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
        },
        //身份证长度、地区、生日合法性
        idCardNo: function(field){
        	//18位身份证号码的基本格式校验
            var iSum = 0,info = "";
            if(!formRule.reg.idCard.test(field.value)){
            	return false;
            }
            
            //身份证地区非法校验
            var fieldValue = field.value.replace(/x$/i,"a");
            if(allCity[parseInt(fieldValue.substr(0,2))]==null){
                return false;
            }

            //身份证出生日期非法校验
            var sBirthday = fieldValue.substr(6,4) + "-" +  Number(fieldValue.substr(10,2)) + "-" + Number(fieldValue.substr(12,2));
            var d = new Date(sBirthday.replace(/-/g,"/"));
            
            if(sBirthday != (d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate())){
                return false;
            }

            for(var i = 17;i >= 0; i --){
                iSum += (Math.pow(2,i) % 11) * parseInt(fieldValue.charAt(17 - i),11)
            }
            
            if(iSum % 11 != 1){
                return false;
            }
            
            return true;
        },
        //身份证最大年龄
        idCardMaxAge: function(field,age){
            var array = [6, 10, 12, 14],newDate = new Date();
            
            var year = field.value.substring(array[0],array[1]),
                month = field.value.substring(array[1],array[2]),
                day = field.value.substring(array[2],array[3]);
            
            var newYear = newDate.getFullYear(),
                newMonth = newDate.getMonth() + 1,
                newDay = newDate.getDate();
            
            if (newYear - year > age) {
                return false;
            }

            if (newYear - year == age) {
                //当前月大于生日月
                if (newMonth > month) {
                    return false;
                }
                //当前月等于生日月，且当前日期大于生日期
                else if(newMonth == month && newDay > day){
                    return false;
                }
            }

            return true;
        },
        //身份证最小年龄，TODO为idCardMinAge
        idCardAge: function(field,age){
        	var array = [6, 10, 12, 14],newDate = new Date();
        	
        	var year = field.value.substring(array[0],array[1]),
        		month = field.value.substring(array[1],array[2]),
        		day = field.value.substring(array[2],array[3]);
        	
        	var newYear = newDate.getFullYear(),
        		newMonth = newDate.getMonth() + 1,
        		newDay = newDate.getDate();
        	
        	if (newYear - year < age) {
				return false;
			}
        	
        	if (newYear - year == age) {
				//当前月小于生日月
        		if (newMonth < month) {
        			return false;
				}
        		//当前月等于生日月，且当前日期小于生日期
        		else if(newMonth == month && newDay < day){
        			return false;
        		}
			}
        	
        	return true;
        	/*
        	var age = field.value.substring(6,14),
        		ageArr = age.split('');
        		ageArr.splice(4, 0, '-');
        		ageArr.splice(age.length - 1, 0, '-');*/
        }

    };
    
    var allCity = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
            21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",
            34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",
            43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川"
            ,52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",
            64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"}
    
    //表单验证正则常量
    var formRule = {
		//正则表达式
		reg:{
			Chinese:/^[\u2E80-\u9FFF]+$/,
			mobile:/^[1-9]\d{10}$/,
			number:/\d+/,
			email:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			idCard:/^\d{17}(\d|x)$/i
		},
		//提示信息
		msg:{
			require:'必须填写',
			Chinese:'必须是中文',
			mobile:'手机号不正确',
			email:'邮箱格式不正确',
			idCard: '身份证不合法'
		}
	}

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
    win.formRule = formRule;

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




