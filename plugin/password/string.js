/**
 * 加解密字符串
 * @author helijun
 * @return {[type]}   [description]
 */
(function(win) {
	var pwdString = {
        init: function(){
            var self = pwdString;
            
        },
        
        options: {
            defaultPwd: 'helijun'
        },

        //加密
        encrypt: function(str, pwd){
            var self = pwdString;

        	if(!str) return '';

            str = encodeURIComponent(str);

            pwd = encodeURIComponent(pwd || self.options.defaultPwd);

            var prand = '';
            for(var i = 0; i < pwd.length; i ++) {
                prand += pwd.charCodeAt(i).toString();
            }

            var sPos = Math.floor(prand.length / 5),
                mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) +
                       prand.charAt(sPos * 4) + prand.charAt(sPos * 5)),
                incr = Math.ceil(pwd.length / 2),
                modu = Math.pow(2, 31) - 1;

            if(mult < 2) return '';

            var salt = Math.round(Math.random() * 1000000000) % 100000000;
            prand += salt;   

            while(prand.length > 10) {
                prand = (parseInt(prand.substring(0, 10)) + 
                         parseInt(prand.substring(10, prand.length))).toString();
            }

            prand = (mult * prand + incr) % modu;

            var encChr = '',encStr = '';
            for(var i = 0, len = str.length; i < len; i += 1) {
                encChr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
                if(encChr < 16) {
                    encStr += '0' + encChr.toString(16);
                }else{
                    encStr += encChr.toString(16);
                }
                prand = (mult * prand + incr) % modu;
            }  

            salt = salt.toString(16);
            while(salt.length < 8) {
                salt = '0' + salt;
            }
            encStr += salt;

            return encStr;
        },
        
        //解密
        decrypt: function(str, pwd){
            var self = pwdString;

        	if(str == '') return '';

            pwd = encodeURIComponent(pwd || self.options.defaultPwd);

            if(str == undefined || str.length < 8) {
                return '';
            }
            
            var prand = '';
            for(var i = 0; i < pwd.length; i++) {
                prand += pwd.charCodeAt(i).toString();
            }

            var sPos = Math.floor(prand.length / 5),
                mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2) + prand.charAt(sPos * 3) +
                       prand.charAt(sPos * 4) + prand.charAt(sPos * 5)),
                incr = Math.round(pwd.length / 2),
                modu = Math.pow(2, 31) - 1,
                salt = parseInt(str.substring(str.length - 8, str.length), 16);

            str = str.substring(0, str.length - 8);
            prand += salt;

            while(prand.length > 10) {
                prand = (parseInt(prand.substring(0, 10)) + 
                         parseInt(prand.substring(10, prand.length))).toString();   
            }
            prand = (mult * prand + incr) % modu;
            
            var encChr = '',encStr = '';
            for(var i = 0, len = str.length; i < len; i += 2) {
                encChr = parseInt(parseInt(str.substring(i, i + 2), 16) ^ Math.floor((prand / modu) * 255));   
                encStr += String.fromCharCode(encChr);   
                prand = (mult * prand + incr) % modu;   
            }

            return decodeURIComponent(encStr);
        },
        
        render: function(){
            var self = pwdString;
        }
    }
	
	win.pwdString = pwdString;
})(window);